import { Table } from 'antd'

import { useGetWallets } from '~/api/use-get-wallets'
import { Text } from '~/components/typography/text'
import { ButtonRefreshWallets } from '~/components/wallets/button-refresh-wallets'
import { cn } from '~/utils/cn.util'
import { formatDatetime } from '~/utils/date.util'

export function TableWallets() {
  const getWallets = useGetWallets()

  console.log(getWallets.data)

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'walletId', title: '#', width: 60 },
        {
          dataIndex: 'mnemonic',
          render: (text, { status }) => (
            <div className="flex items-center gap-2">
              <div
                className={cn('size-3 rounded-full', {
                  'bg-gray-500': status === 'not_started',
                  'bg-green-500': status === 'valid',
                  'bg-orange-500': status === 'processing',
                  'bg-red-500': status === 'invalid'
                })}
              />
              <Text className="flex items-center" copyable ellipsisMiddle>
                {text}
              </Text>
            </div>
          ),
          title: 'Mnemonic'
        },
        {
          dataIndex: 'publicKey',
          render: (text) => (
            <Text className="flex items-center" copyable ellipsisMiddle>
              {text}
            </Text>
          ),
          title: 'Address'
        },
        {
          dataIndex: 'availableBalance',
          title: 'Balance'
        },
        {
          dataIndex: 'lockCount',
          sorter: true,
          title: 'Lock Count'
        },
        { dataIndex: 'walletUpdatedAt', render: formatDatetime, title: 'Last update' },
        {
          fixed: 'right',
          render: (_, { id, status }) => (
            <>
              <ButtonRefreshWallets disabled={status === 'processing'} walletIds={[id]} />
            </>
          ),
          title: 'Action'
        }
      ]}
      dataSource={getWallets.data}
      pagination={{ className: 'px-4' }}
      rowKey={(record) => record.id}
      scroll={{ x: 'max-content' }}
    />
  )
}
