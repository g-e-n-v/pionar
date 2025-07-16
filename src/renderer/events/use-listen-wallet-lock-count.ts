import { throttle } from 'lodash-es'
import { useRef } from 'react'

import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletLockCount() {
  const updateLockCount = useRef(
    throttle(() => queryClient.invalidateQueries({ queryKey: genGetWalletsKey() }), 1000)
  )

  useElectronListen('wallet:lock-count', updateLockCount.current)
}
