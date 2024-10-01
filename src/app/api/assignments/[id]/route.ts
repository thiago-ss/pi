import { NextResponse } from 'next/server'
import { getAssignment } from '@/lib/actions'

export const revalidate = 0;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const assignment = await getAssignment(id)
  
  if (!assignment) {
    return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
  }
  
  return NextResponse.json(assignment)
}