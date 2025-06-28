import { Proxy } from '#/types/db.type'
import { useEffect } from 'react'

import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'

export function useElectronListener() {
  useEffect(() => {
    window.electron.onFinishCheckProxy(({ id, status }) =>
      queryClient.setQueriesData({ queryKey: genGetProxiesKey() }, (proxies?: Proxy[]) =>
        proxies?.map((p) => (Number(p.id) === id ? { ...p, status } : p))
      )
    )
  }, [])
}
