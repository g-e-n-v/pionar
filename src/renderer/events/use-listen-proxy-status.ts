import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenProxyStatus() {
  useElectronListen('proxy:status', ({ id, status }) => {
    const queryKey = genGetProxiesKey()

    const fn = (proxies: Awaited<ReturnType<typeof window.api.getProxies>>) => {
      return proxies.map((proxy) => (proxy.id === id ? { ...proxy, status } : proxy))
    }

    queryClient.setQueryData(queryKey, fn)
  })
}
