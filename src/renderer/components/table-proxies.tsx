import { Table } from 'antd'

export function TableProxies() {
  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { key: 'id', title: '#' },
        { key: 'host', title: 'Host' },
        { key: 'port', title: 'Port' },
        { key: 'username', title: 'Username' },
        { key: 'password', title: 'Password' }
      ]}
    />
  )
}
