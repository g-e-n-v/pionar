import { Table } from 'antd'

export function TableWallets() {
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
