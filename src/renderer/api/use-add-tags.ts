import { useMutation } from '@tanstack/react-query'

export function useAddTag() {
  return useMutation({
    mutationFn: window.api.addTag
  })
}
