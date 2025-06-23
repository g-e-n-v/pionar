import { useMutation } from '@tanstack/react-query'

export function useDeleteProxies() {
  return useMutation({
    mutationFn: window.api.deleteProxies
  })
}
