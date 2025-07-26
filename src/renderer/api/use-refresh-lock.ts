import { useMutation } from '@tanstack/react-query'

export function useRefreshLock() {
  return useMutation({
    mutationFn: window.api.refreshLock
  })
}
