import { throttle } from 'lodash-es'
import { useRef } from 'react'

import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletStatus() {
  const updateWalletStatus = useRef(
    throttle(
      () => {
        const queryKey = genGetWalletsKey()
        queryClient.refetchQueries({ queryKey })
      },
      1000,
      {}
    )
  )

  useElectronListen('wallet:status', updateWalletStatus.current)
}
