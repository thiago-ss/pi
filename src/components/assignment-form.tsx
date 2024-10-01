"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createAssignment, updateAssignment, deleteAssignment, AssignmentData } from "@/lib/actions"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  dueDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  groupMembers: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>;

export function AssignmentForm({ assignment }: { assignment?: AssignmentData }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: assignment?.title || "",
      description: assignment?.description || "",
      dueDate: assignment?.dueDate ? new Date(assignment.dueDate).toISOString().split('T')[0] : "",
      groupMembers: assignment?.groupMembers ? assignment.groupMembers.join(", ") : "",
    },
  })

  async function onSubmit(values: FormValues) {
    const groupMembers = values.groupMembers
      ? values.groupMembers.split(",").map((member) => member.trim())
      : []

    if (assignment) {
      await updateAssignment(assignment.id, {
        ...values,
        dueDate: values.dueDate,
        groupMembers,
      })
    } else {
      await createAssignment({
        ...values,
        dueDate: values.dueDate,
        groupMembers,
      })
    }

    router.push("/")
    router.refresh()
  }

  async function onDelete() {
    if (assignment) {
      setIsDeleting(true)
      await deleteAssignment(assignment.id)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Assignment title" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title of your assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your assignment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Select the due date for the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Members</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter group members (comma-separated)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the names of group members, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">
            {assignment ? "Update Assignment" : "Create Assignment"}
          </Button>
          {assignment && (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Assignment"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}