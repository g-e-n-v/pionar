import { useQuery } from '@tanstack/react-query'

export const genGetProxiesKey = () => ['get-proxies']

export function useGetProxies() {
  return useQuery({
    queryFn: window.api.getProxies,
    queryKey: genGetProxiesKey()
  })
}
