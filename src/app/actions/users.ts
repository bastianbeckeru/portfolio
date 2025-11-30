// src/app/actions/users.ts
'use server';

import { db } from '@/server/db';
import { users, familyRelations, secretSantaAssignments } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export type UserWithRelations = {
  id: string;
  name: string;
  dateOfBirth: Date | null;
  phone: string | null;
  email: string | null;
  createdAt: Date | null;
  relations: {
    id: string;
    relationType: string;
    relatedUser: {
      id: string;
      name: string;
    };
  }[];
};

export async function getAllUsers(): Promise<UserWithRelations[]> {
  try {
    const result = await db.query.users.findMany({
      with: {
        familyRelationsAsUser: {
          with: {
            relatedUser: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return result.map((user) => ({
      id: user.id,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
      relations: user.familyRelationsAsUser.map((rel) => ({
        id: rel.id,
        relationType: rel.relationType,
        relatedUser: rel.relatedUser,
      })),
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        familyRelationsAsUser: {
          with: {
            relatedUser: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getAssignmentByUuid(id: string) {
  const assignment = await db.query.secretSantaAssignments.findFirst({
    where: eq(secretSantaAssignments.id, id),
    with: {
      giver: true,
      receiver: true,
    },
  });

  if (!assignment) {
    return { status: 'not_found' as const };
  }

  if (assignment.viewedAt) {
    return {
      status: 'already_viewed' as const,
      viewedAt: assignment.viewedAt,
      giverName: assignment.giver.name
    };
  }

  // Mark as viewed
  await db
    .update(secretSantaAssignments)
    .set({ viewedAt: new Date() })
    .where(eq(secretSantaAssignments.id, id));

  return {
    status: 'success' as const,
    assignment: {
      giverName: assignment.giver.name,
      receiverName: assignment.receiver.name,
      year: assignment.year,
    },
  };
}

export async function getDashboardData() {
  const currentYear = new Date().getFullYear();
  const allUsers = await getAllUsers();

  // Fetch all assignments for the current year
  const assignments = await db.query.secretSantaAssignments.findMany({
    where: eq(secretSantaAssignments.year, currentYear),
  });

  // Map assignments to users
  const dashboardData = allUsers.map((user) => {
    const assignment = assignments.find((a) => a.giverId === user.id);
    return {
      id: user.id,
      name: user.name,
      assignmentId: assignment?.id || null,
      viewed: !!assignment?.viewedAt,
    };
  });

  return dashboardData;
}

// -------------------------------------------------------------

/**
 * Genera asignaciones de Secret Friend respetando las reglas familiares.
 * @returns Objeto con el formato { giverId: receiverId }
 * @throws Error si no se puede generar una asignación válida
 */
export async function secretSanta(people: UserWithRelations[]): Promise<Record<string, string>> {
  if (people.length < 2) {
    throw new Error('Se necesitan al menos 2 personas para Secret Friend');
  }

  // Validar configuración primero
  const validation = validateConfiguration(people);
  if (!validation.valid) {
    throw new Error(
      `Configuración inválida:\n${validation.issues.join('\n')}`
    );
  }

  let receivers = shuffle(people);
  let attempts = 0;
  const maxAttempts = 5000;

  while (attempts < maxAttempts) {
    const valid = people.every((giver, idx) => {
      const receiver = receivers[idx];
      if (!receiver) return false;
      return isValidAssignment(giver, receiver);
    });

    if (valid) {
      const result: Record<string, string> = {};
      people.forEach((giver, idx) => {
        const receiver = receivers[idx];
        if (receiver) {
          result[giver.id] = receiver.id;
        }
      });

      console.log('Assignments:', result);

      // Persist assignments
      const year = new Date().getFullYear();

      try {
        await db.insert(secretSantaAssignments).values(
          Object.entries(result).map(([giverId, receiverId]) => ({
            giverId,
            receiverId,
            year,
          }))
        );
      } catch (e) {
        console.error("Failed to persist assignments", e);
      }

      return result;
    }

    receivers = shuffle(people);
    attempts++;
  }

  throw new Error(
    `No se pudo generar una asignación válida después de ${maxAttempts} intentos. ` +
    'Verifica que las reglas permitan una solución.'
  );
}

function validateConfiguration(people: UserWithRelations[]): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  for (const giver of people) {
    const validReceivers = people.filter((receiver) =>
      isValidAssignment(giver, receiver)
    );

    if (validReceivers.length === 0) {
      issues.push(
        `${giver.name} no tiene ningún receptor válido según las reglas`
      );
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Valida si una asignación de Secret Friend es permitida.
 * Reglas:
 * I. Una persona no puede ser su propio amigo secreto
 * II. Padres no pueden regalar a sus hijos (si el hijo es menor de 18)
 * III. Hijos no pueden regalar a sus padres (si el hijo es menor de 18)
 */
function isValidAssignment(
  giver: UserWithRelations,
  receiver: UserWithRelations
): boolean {
  // Regla I: No puede regalarse a sí mismo
  if (giver.id === receiver.id) return false;

  const giverAge = calculateAge(giver.dateOfBirth);
  const receiverAge = calculateAge(receiver.dateOfBirth);

  // Regla II: Padres no pueden regalar a sus hijos, a menos que el hijo sea mayor de edad (>= 18)
  const childrenIds = getChildrenIds(giver);
  if (childrenIds.includes(receiver.id)) {
    if (receiverAge < 18) return false;
  }

  // Regla III: Hijos no pueden regalar a sus padres, a menos que el hijo (giver) sea mayor de edad (>= 18)
  const parentIds = getParentIds(giver);
  if (parentIds.includes(receiver.id)) {
    if (giverAge < 18) return false;
  }

  // Regla IV (opcional): Cónyuges no se regalan entre sí
  const spouseIds = getSpouseIds(giver);
  if (spouseIds.includes(receiver.id)) return false;

  return true;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j] as T;
    a[j] = temp as T;
  }
  return a;
}

function getChildrenIds(user: UserWithRelations): string[] {
  return user.relations
    .filter((rel) => rel.relationType === 'parent') // El usuario es padre del relacionado
    .map((rel) => rel.relatedUser.id);
}

function getParentIds(user: UserWithRelations): string[] {
  return user.relations
    .filter((rel) => rel.relationType === 'child') // El usuario es hijo del relacionado
    .map((rel) => rel.relatedUser.id);
}

function getSpouseIds(user: UserWithRelations): string[] {
  return user.relations
    .filter((rel) => rel.relationType === 'spouse')
    .map((rel) => rel.relatedUser.id);
}

function calculateAge(dateOfBirth: Date | null): number {
  if (!dateOfBirth) return 0;
  const diff = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}