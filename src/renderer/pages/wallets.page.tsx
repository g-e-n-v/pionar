import { ButtonAddWallets } from '~/components/wallets/button-add-wallet'
import { TableWallets } from '~/components/wallets/table-wallets'

export function WalletsPage() {
  return (
    <>
      <div className="mb-4">
        <ButtonAddWallets />
      </div>

      <TableWallets />
    </>
  )
}
