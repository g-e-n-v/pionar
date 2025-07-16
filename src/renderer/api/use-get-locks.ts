import { useQuery } from '@tanstack/react-query'

export const genGetLocksKey = () => ['get-locks']

export function useGetLocks() {
  return useQuery({
    queryFn: window.api.getLocks,
    queryKey: genGetLocksKey()
  })
}
