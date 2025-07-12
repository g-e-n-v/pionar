import { Divider } from 'antd'

import { useGetWallets } from '~/api/use-get-wallets'
import { ButtonAddWallets } from '~/components/wallets/button-add-wallets'
import { ButtonRefreshWallets } from '~/components/wallets/button-refresh-wallets'
import { TableWallets } from '~/components/wallets/table-wallets'

export function WalletsPage() {
  const getWallets = useGetWallets()

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <ButtonAddWallets />

        <Divider type="vertical" />

        <ButtonRefreshWallets
          color="green"
          variant="outlined"
          walletIds={getWallets.data?.map((item) => item.id) ?? []}
        >
          Refresh
        </ButtonRefreshWallets>
      </div>

      <TableWallets />
    </>
  )
}
