import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const familyRelationTypeEnum = [
  'parent', // Asimétrica (solo se registra 'parent', 'child' se infiere)
  'spouse', // Simétrica
  'sibling', // Simétrica
  'cousin', // Simétrica
  // Solo se mantienen los roles de 'mayor jerarquía'
] as const;

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  dateOfBirth: integer('date_of_birth', { mode: 'timestamp' }),
  gender: text('gender', { enum: ['male', 'female', 'other'] }),
  phone: text('phone').unique(),
  email: text('email').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
});

// Tabla de relaciones familiares
export const familyRelations = sqliteTable('family_relations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  relatedUserId: text('related_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  relationType: text('relation_type', {
    enum: familyRelationTypeEnum,
  }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const secretSantaAssignments = sqliteTable('secret_santa_assignments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  giverId: text('giver_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  receiverId: text('receiver_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  year: integer('year').notNull(),
  viewedAt: integer('viewed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),
});

// Definir relaciones de Drizzle ORM
export const usersRelations = relations(users, ({ many }) => ({
  familyRelationsAsUser: many(familyRelations, {
    relationName: 'userRelations',
  }),
  familyRelationsAsRelated: many(familyRelations, {
    relationName: 'relatedUserRelations',
  }),
}));

export const familyRelationsRelations = relations(
  familyRelations,
  ({ one }) => ({
    user: one(users, {
      fields: [familyRelations.userId],
      references: [users.id],
      relationName: 'userRelations',
    }),
    relatedUser: one(users, {
      fields: [familyRelations.relatedUserId],
      references: [users.id],
      relationName: 'relatedUserRelations',
    }),
  })
);

export const secretSantaAssignmentsRelations = relations(
  secretSantaAssignments,
  ({ one }) => ({
    giver: one(users, {
      fields: [secretSantaAssignments.giverId],
      references: [users.id],
      relationName: 'giverAssignments',
    }),
    receiver: one(users, {
      fields: [secretSantaAssignments.receiverId],
      references: [users.id],
      relationName: 'receiverAssignments',
    }),
  })
);
