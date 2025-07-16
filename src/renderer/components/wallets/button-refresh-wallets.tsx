import { Button, ButtonProps, Dropdown } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'

import { useGetWallets } from '~/api/use-get-wallets'
import { useRefreshWallets } from '~/api/use-refresh-wallets'

type ButtonRefreshWalletsProps = ButtonProps & {
  walletId?: number
}

export function ButtonRefreshWallets({
  disabled,
  loading,
  walletId,
  ...props
}: ButtonRefreshWalletsProps) {
  const refreshWallets = useRefreshWallets()
  const getWallets = useGetWallets()

  const handleRefreshWallet = async (type: string) => {
    switch (type) {
      case 'all': {
        const ids = getWallets.data?.map((w) => w.id)
        ids && (await refreshWallets.mutateAsync(ids))
        break
      }

      case 'invalid-wallet': {
        const ids = getWallets.data?.filter((w) => w.status === 'invalid')?.map((w) => w.id)
        ids && (await refreshWallets.mutateAsync(ids))
        break
      }

      case 'valid-wallet': {
        const ids = getWallets.data?.filter((w) => w.status === 'valid')?.map((w) => w.id)
        ids && (await refreshWallets.mutateAsync(ids))
        break
      }

      default:
        break
    }
  }

  if (walletId) {
    return (
      <Button
        color="green"
        disabled={disabled || refreshWallets.isPending}
        icon={<Refresh2 size={16} variant="Bulk" />}
        loading={loading || refreshWallets.isPending}
        onClick={() => refreshWallets.mutateAsync([walletId])}
        variant="text"
        {...props}
      />
    )
  }

  return (
    <Dropdown
      menu={{
        items: [
          { key: 'all', label: 'All' },
          { key: 'invalid-wallet', label: 'Only invalid wallet' },
          { key: 'valid-wallet', label: 'Only valid wallet' }
        ],
        onClick: ({ key }) => handleRefreshWallet(key)
      }}
    >
      <Button
        color="green"
        disabled={disabled || refreshWallets.isPending}
        icon={<Refresh2 size={16} variant="Bulk" />}
        loading={loading || refreshWallets.isPending}
        variant="text"
        {...props}
      />
    </Dropdown>
  )
}
