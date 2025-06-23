import { Table } from 'antd'

import { useGetProxies } from '~/api/use-get-proxies'
import { TagProxyStatus } from '~/components/tag-proxy-status'

export function TableProxies() {
  const getProxies = useGetProxies()

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'id', key: 'id', title: '#' },
        { dataIndex: 'host', key: 'host', title: 'Host' },
        { dataIndex: 'port', key: 'port', title: 'Port' },
        { dataIndex: 'username', key: 'username', title: 'Username' },
        { dataIndex: 'password', key: 'password', title: 'Password' },
        {
          dataIndex: 'status',
          key: 'status',
          render: (status) => <TagProxyStatus status={status} />,
          title: 'Status'
        }
      ]}
      dataSource={getProxies.data}
      loading={getProxies.isLoading}
      pagination={{ className: 'px-4', defaultPageSize: 50 }}
      rowKey="id"
      scroll={{ y: 'calc(100vh - 220px)' }}
    />
  )
}
