import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAssignments, AssignmentData } from "@/lib/actions"

export const revalidate = 0; // This enables on-demand ISR

export default async function Home() {
  const assignments: AssignmentData[] = await getAssignments();

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assignments Dashboard</h1>
        <Link href="/assignments/new">
          <Button>New Assignment</Button>
        </Link>
      </div>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{assignment.title}</h2>
              <p className="text-gray-600 mb-2">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500 mb-4">
                {assignment.description.length > 100
                  ? `${assignment.description.slice(0, 100)}...`
                  : assignment.description}
              </p>
              <Link href={`/assignments/${assignment.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}