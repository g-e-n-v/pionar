import { throttle } from 'lodash-es'
import { useEffect } from 'react'

import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'

export function useElectronListener() {
  useEffect(() => {
    const updateCacheThrottle = throttle(
      () => queryClient.invalidateQueries({ queryKey: genGetProxiesKey() }),
      500
    )

    window.electron.onFinishCheckProxy(updateCacheThrottle)
  }, [])
}
