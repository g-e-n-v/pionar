import { IPCInput } from '#/types/ipc-event.type'
import { throttle } from 'lodash-es'
import { useRef } from 'react'

import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletStatus() {
  const updateWalletStatus = useRef(
    throttle(({ id, status }: IPCInput<'wallet:status'>) => {
      const queryKey = genGetWalletsKey()

      const fn = (wallets: Awaited<ReturnType<typeof window.api.getWallets>>) => {
        return wallets.map((wallet) => (wallet.id === id ? { ...wallet, status } : wallet))
      }

      queryClient.setQueryData(queryKey, fn)
    }, 1000)
  )

  useElectronListen('wallet:status', updateWalletStatus.current)
}
