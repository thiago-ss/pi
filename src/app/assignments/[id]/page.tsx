import { AssignmentForm } from "@/components/assignment-form"
import { getAssignment } from "@/lib/actions"

export default async function EditAssignmentPage({ params }: { params: { id: string } }) {
  const assignment = await getAssignment(parseInt(params.id))

  if (!assignment) {
    return <div>Assignment not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Assignment</h1>
      <AssignmentForm assignment={assignment} />
    </div>
  )
}