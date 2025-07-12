import { genGetWalletsKey } from '~/api/use-get-wallets'
import { queryClient } from '~/configs/tanstack-query.config'
import { useElectronListen } from '~/events/use-electron-listen'

export function useListenWalletStatus() {
  useElectronListen('wallet:status', ({ id, status }) => {
    console.log('wallet:status', { id, status })
    const queryKey = genGetWalletsKey()

    const fn = (wallets: Awaited<ReturnType<typeof window.api.getWallets>>) => {
      return wallets.map((wallet) => (wallet.id === id ? { ...wallet, status } : wallet))
    }

    queryClient.setQueryData(queryKey, fn)
  })
}
