import { Button } from 'antd'
import { DirectboxReceive } from 'iconsax-reactjs'
import { sumBy } from 'lodash-es'

import { useCollectFunds } from '~/api/use-collect-funds'
import { useGetWallets } from '~/api/use-get-wallets'
import { useMasterWalletValue } from '~/stores/setting.store'
import { formatNumber } from '~/utils/number.util'

export function ButtonCollectFunds() {
  const masterWallet = useMasterWalletValue()

  const getWallets = useGetWallets()

  const collectFunds = useCollectFunds()

  const totalAvailableBalance = sumBy(getWallets.data, (item) => item.availableBalance ?? 0)

  const handleCollectFunds = async () => {
    await collectFunds.mutateAsync(masterWallet)
  }

  return (
    <Button
      color="green"
      disabled={!masterWallet || collectFunds.isPending}
      icon={<DirectboxReceive size={16} variant="Bulk" />}
      loading={collectFunds.isPending}
      onClick={handleCollectFunds}
      variant="outlined"
    >
      Collect Funds ( {formatNumber(totalAvailableBalance)}π )
    </Button>
  )
}
