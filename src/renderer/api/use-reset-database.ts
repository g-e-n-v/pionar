import { useMutation } from '@tanstack/react-query'

export function useResetDatabase() {
  return useMutation({
    mutationFn: window.api.resetDatabase
  })
}
