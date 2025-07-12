import { useMutation } from '@tanstack/react-query'

export function useCollectFunds() {
  return useMutation({
    mutationFn: () => window.api.collectFunds('')
  })
}
