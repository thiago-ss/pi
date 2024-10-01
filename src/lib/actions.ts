"use server"

import { db } from "./db";
import { assignments } from "./db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from 'next/cache';

export interface AssignmentData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  groupMembers: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getAssignments(): Promise<AssignmentData[]> {
  const results = await db.select().from(assignments).orderBy(assignments.dueDate);
  return results.map(assignment => ({
    ...assignment,
    dueDate: assignment.dueDate.toISOString(),
    groupMembers: JSON.parse(assignment.groupMembers),
    createdAt: assignment.createdAt.toISOString(),
    updatedAt: assignment.updatedAt.toISOString(),
  }));
}

export async function getAssignment(id: number): Promise<AssignmentData | null> {
  const results = await db.select().from(assignments).where(eq(assignments.id, id));
  
  if (results.length === 0) {
    return null;
  }
  
  const assignment = results[0];
  return {
    ...assignment,
    dueDate: assignment.dueDate.toISOString(),
    groupMembers: JSON.parse(assignment.groupMembers),
    createdAt: assignment.createdAt.toISOString(),
    updatedAt: assignment.updatedAt.toISOString(),
  };
}

export async function createAssignment(data: Omit<AssignmentData, 'id' | 'createdAt' | 'updatedAt'>) {
  const result = await db.insert(assignments).values({
    title: data.title,
    description: data.description,
    dueDate: new Date(data.dueDate),
    groupMembers: JSON.stringify(data.groupMembers),
  }).returning();
  
  revalidatePath('/');
  return result[0];
}

export async function updateAssignment(id: number, data: Partial<Omit<AssignmentData, 'id' | 'createdAt' | 'updatedAt'>>) {
  const result = await db.update(assignments)
    .set({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      groupMembers: data.groupMembers ? JSON.stringify(data.groupMembers) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(assignments.id, id))
    .returning();
  
  revalidatePath('/');
  revalidatePath(`/assignments/${id}`);
  return result[0];
}

export async function deleteAssignment(id: number): Promise<void> {
  await db.delete(assignments).where(eq(assignments.id, id));
  revalidatePath('/');
}