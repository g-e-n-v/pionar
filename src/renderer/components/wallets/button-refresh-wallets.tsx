import { App, Button, ButtonProps } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'

import { useRefreshWallets } from '~/api/use-refresh-wallets'

type ButtonRefreshWalletsProps = ButtonProps & {
  walletIds: Array<number>
}

export function ButtonRefreshWallets({
  disabled,
  loading,
  walletIds,
  ...props
}: ButtonRefreshWalletsProps) {
  const { notification } = App.useApp()
  const refreshWallets = useRefreshWallets()

  const handleRefreshWallet = async () => {
    await refreshWallets.mutateAsync(walletIds)
    notification.success({
      description: 'The wallet has been refreshed',
      message: 'Refresh wallet success'
    })
  }

  return (
    <Button
      color="green"
      disabled={disabled || refreshWallets.isPending}
      icon={<Refresh2 size={16} variant="Bulk" />}
      loading={loading || refreshWallets.isPending}
      onClick={handleRefreshWallet}
      variant="text"
      {...props}
    />
  )
}
