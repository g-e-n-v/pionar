import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletLockCount() {
  useElectronListen('wallet:lock-count', ({ id, lockCount }) => {
    const queryKey = genGetWalletsKey()

    const fn = (wallets: Awaited<ReturnType<typeof window.api.getWallets>>) => {
      return wallets.map((wallet) => (wallet.id === id ? { ...wallet, lockCount } : wallet))
    }

    queryClient.setQueryData(queryKey, fn)
  })
}
