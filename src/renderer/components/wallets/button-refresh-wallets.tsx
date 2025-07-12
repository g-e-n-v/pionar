import { Button } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'

import { useRefreshWallets } from '~/api/use-refresh-wallets'

type ButtonRefreshWalletsProps = {
  walletIds: Array<number>
}

export function ButtonRefreshWallets({ walletIds }: ButtonRefreshWalletsProps) {
  const refreshWallets = useRefreshWallets()

  const handleRefreshWallet = async () => {
    await refreshWallets.mutateAsync(walletIds)
  }

  return (
    <Button
      color="green"
      icon={<Refresh2 size={16} variant="Bulk" />}
      onClick={handleRefreshWallet}
      variant="text"
    />
  )
}
