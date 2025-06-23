import { useMutation } from '@tanstack/react-query'

export function useVerifyProxies() {
  return useMutation({
    mutationFn: window.api.verifyProxies
  })
}
