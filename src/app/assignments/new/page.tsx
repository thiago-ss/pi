import { AssignmentForm } from "@/components/assignment-form"

export default function NewAssignmentPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Assignment</h1>
      <AssignmentForm />
    </div>
  )
}