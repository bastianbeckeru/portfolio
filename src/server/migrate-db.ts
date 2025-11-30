'use server';

import { db } from './db';
import { familyRelations, familyRelationTypeEnum, users } from './db/schema';
import type { Person } from './local-db';

export async function migrateJsonToDatabase(people: Person[]) {
  try {
    console.log('🚀 Iniciando migración...');

    // Paso 1: Insertar todos los usuarios primero
    console.log(`📝 Insertando ${people.length} usuarios...`);

    const usersToInsert = people.map((person) => ({
      id: person.id,
      name: person.name,
      dateOfBirth: new Date(person.birthDate),
      phone: `+${person.phone.countryCode}${person.phone.number}`,
      email: person.email || null,
    }));

    await db.insert(users).values(usersToInsert);
    console.log('✅ Usuarios insertados correctamente');

    // Paso 2: Crear relaciones familiares
    console.log('👨‍👩‍👧‍👦 Creando relaciones familiares...');

    const relationsToInsert = people
      .filter((person) => person.childrenIds && person.childrenIds.length > 0)
      .flatMap((parent) =>
        parent.childrenIds!.map((childId) => ({
          userId: parent.id,
          relatedUserId: childId,
          relationType: 'parent' as (typeof familyRelationTypeEnum)[0],
        }))
      );

    if (relationsToInsert.length > 0) {
      await db.insert(familyRelations).values(relationsToInsert);
      console.log(
        `✅ ${relationsToInsert.length} relaciones familiares creadas`
      );
    }

    console.log('🎉 Migración completada exitosamente');

    return {
      success: true,
      usersInserted: people.length,
      relationsInserted: relationsToInsert.length,
    };
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  }
}
