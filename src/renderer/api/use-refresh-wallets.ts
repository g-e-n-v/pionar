import { useMutation } from '@tanstack/react-query'

export function useRefreshWallets() {
  return useMutation({
    mutationFn: window.api.refreshWallets
  })
}
