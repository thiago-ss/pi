import useSWR from 'swr'
import { AssignmentData } from './actions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useAssignments() {
  const { data, error, mutate } = useSWR<AssignmentData[]>('/api/assignments', fetcher)

  return {
    assignments: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export function useAssignment(id: number) {
  const { data, error, mutate } = useSWR<AssignmentData>(`/api/assignments/${id}`, fetcher)

  return {
    assignment: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}