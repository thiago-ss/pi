import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date").notNull(),
  groupMembers: text("group_members").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});