import { Input, Table } from 'antd'
import { groupBy } from 'lodash-es'

import { useGetProxies } from '~/api/use-get-proxies'
import { TagProxyStatus } from '~/components/tags/tag-proxy-status'

export function TableProxies() {
  const getProxies = useGetProxies()

  const proxies = groupBy(getProxies.data, 'status')

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'id', key: 'id', title: '#', width: 60 },
        { dataIndex: 'host', key: 'host', title: 'Host' },
        { dataIndex: 'port', key: 'port', title: 'Port' },
        { dataIndex: 'username', key: 'username', title: 'Username' },
        {
          dataIndex: 'password',
          key: 'password',
          render: (password) => <Input.Password readOnly value={password} variant="borderless" />,
          title: 'Password'
        },
        {
          dataIndex: 'status',
          key: 'status',
          render: (status) => <TagProxyStatus status={status} />,
          sorter: (a, b) => a.status.localeCompare(b.status),
          title: 'Status'
        }
      ]}
      dataSource={getProxies.data}
      loading={getProxies.isLoading}
      pagination={{ className: 'px-4', defaultPageSize: 50 }}
      rowKey="id"
      scroll={{ y: 'calc(100vh - 280px)' }}
      title={() => (
        <div className="flex items-center gap-2">
          <span className="font-medium">Summary:</span>
          {Object.entries(proxies).map(([status, proxies]) => (
            <TagProxyStatus key={status} status={status} total={proxies.length} />
          ))}
        </div>
      )}
    />
  )
}
