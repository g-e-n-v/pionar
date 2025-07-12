import { Button } from 'antd'
import { DirectboxReceive } from 'iconsax-reactjs'
import { sumBy } from 'lodash-es'

import { useGetWallets } from '~/api/use-get-wallets'
import { formatNumber } from '~/utils/number.util'

export function ButtonCollectFunds() {
  const getWallets = useGetWallets()

  const totalAvailableBalance = sumBy(getWallets.data, (item) => item.availableBalance ?? 0)

  return (
    <Button color="green" icon={<DirectboxReceive size={16} variant="Bulk" />} variant="outlined">
      Collect Funds ( {formatNumber(totalAvailableBalance)}π )
    </Button>
  )
}
