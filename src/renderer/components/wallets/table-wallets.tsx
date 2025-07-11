import { Table } from 'antd'
import { isNil } from 'lodash-es'

import { useGetWallets } from '~/api/use-get-wallets'
import { Text } from '~/components/typography/text'
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
          render: (text, { availableBalance }) => (
            <div className="flex items-center gap-2">
              <div
                className={cn('size-3 rounded-full bg-green-500', {
                  'bg-red-500': isNil(availableBalance)
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
          dataIndex: 'nativeBalance',
          title: 'Native Balance'
        },
        { dataIndex: 'walletUpdatedAt', render: formatDatetime, title: 'Last update' }
      ]}
      dataSource={getWallets.data}
      pagination={{ className: 'px-4' }}
      rowKey={(record) => record.walletId}
      scroll={{ x: 'max-content' }}
    />
  )
}
