import { Table } from 'antd'

import { useGetWallets } from '~/api/use-get-wallets'

export function TableWallets() {
  const getWallets = useGetWallets()

  console.log(getWallets.data)

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'id', key: 'id', title: '#', width: 60 },
        { dataIndex: 'mnemonic', title: 'Mnemonic' },
        { dataIndex: 'publicKey', title: 'Address' },
        { dataIndex: 'nativeBalance', title: 'Native Balance' }
      ]}
      dataSource={[]}
    />
  )
}
