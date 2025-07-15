import { IPCInput } from '#/types/ipc-event.type'
import { throttle } from 'lodash-es'
import { useRef } from 'react'

import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletLockCount() {
  const updateLockCount = useRef(
    throttle(({ id, lockCount }: IPCInput<'wallet:lock-count'>) => {
      const queryKey = genGetWalletsKey()

      const fn = (wallets: Awaited<ReturnType<typeof window.api.getWallets>>) => {
        return wallets.map((wallet) => (wallet.id === id ? { ...wallet, lockCount } : wallet))
      }

      queryClient.setQueryData(queryKey, fn)
    }, 1000)
  )

  useElectronListen('wallet:lock-count', updateLockCount.current)
}
