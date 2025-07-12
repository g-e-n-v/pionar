import { useQuery } from '@tanstack/react-query'

export const genGetWalletsKey = () => ['get-wallets']

export function useGetWallets() {
  return useQuery({
    queryFn: window.api.getWallets,
    queryKey: genGetWalletsKey()
  })
}
