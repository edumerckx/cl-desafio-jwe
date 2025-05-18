import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const historyTable = pgTable('history', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  timestamp: varchar('timestamp').notNull(),
  encrypted: varchar('encrypted').notNull()
});
