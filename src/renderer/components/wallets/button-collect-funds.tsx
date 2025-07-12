import { Button } from 'antd'
import { DirectboxReceive } from 'iconsax-reactjs'

export function ButtonCollectFunds() {
  return (
    <Button color="green" icon={<DirectboxReceive size={16} variant="Bulk" />} variant="outlined">
      Collect Funds
    </Button>
  )
}
