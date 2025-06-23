import { useMutation } from '@tanstack/react-query'

export function useDeleteTag() {
  return useMutation({
    mutationFn: window.api.deleteTag
  })
}
