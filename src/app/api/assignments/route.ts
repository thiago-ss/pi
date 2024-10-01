import { NextResponse } from 'next/server'
import { getAssignments } from '@/lib/actions'

export const revalidate = 0;

export async function GET() {
  const assignments = await getAssignments()
  return NextResponse.json(assignments)
}