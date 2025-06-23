import { useMutation } from '@tanstack/react-query'

export function useCreateTag() {
  return useMutation({
    mutationFn: window.api.createTag
  })
}
