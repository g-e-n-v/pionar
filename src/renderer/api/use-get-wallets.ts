import { useQuery } from '@tanstack/react-query'

export const genGetWallets = () => ['get-wallets']

export function useGetWallets() {
  return useQuery({
    queryFn: window.api.getWallets,
    queryKey: genGetWallets()
  })
}
