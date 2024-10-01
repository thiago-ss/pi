"use server"

import { db } from "./db";
import { assignments } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getAssignments() {
  return db.select().from(assignments).orderBy(assignments.dueDate);
}

export async function getAssignment(id: number) {
  const results = await db.select().from(assignments).where(eq(assignments.id, id));
  return results[0];
}

export async function createAssignment(data: any) {
  const { title, description, dueDate, groupMembers } = data;
  return db.insert(assignments).values({
    title,
    description,
    dueDate: new Date(dueDate),
    groupMembers: JSON.stringify(groupMembers),
  }).returning();
}

export async function updateAssignment(data: any) {
  const { id, title, description, dueDate, groupMembers } = data;
  return db.update(assignments)
    .set({
      title,
      description,
      dueDate: new Date(dueDate),
      groupMembers: JSON.stringify(groupMembers),
      updatedAt: new Date(),
    })
    .where(eq(assignments.id, id))
    .returning();
}

export async function deleteAssignment(id: number) {
  return db.delete(assignments).where(eq(assignments.id, id));
}