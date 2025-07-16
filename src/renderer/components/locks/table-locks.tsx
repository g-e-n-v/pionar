import { Table, Tag } from 'antd'
import dayjs from 'dayjs'

import { useGetLocks } from '~/api/use-get-locks'
import { Text } from '~/components/typography/text'
import { ButtonRefreshWallets } from '~/components/wallets/button-refresh-wallets'
import { cn } from '~/utils/cn.util'
import { formatDatetime } from '~/utils/date.util'

export function TableLocks() {
  const getLocks = useGetLocks()

  const totalAmount = getLocks.data?.reduce((acc, cur) => acc + cur.amount, 0)

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'id', fixed: 'left', title: '#', width: 60 },
        {
          dataIndex: 'mnemonic',
          render: (text) => (
            <Text className="flex items-center" copyable ellipsisMiddle>
              {text}
            </Text>
          ),
          sorter: (a, b) => a.mnemonic!.localeCompare(b.mnemonic!),
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
          dataIndex: 'amount',
          render: (value, record) => (
            <span
              className={cn('text-red-500', {
                'text-green-500': dayjs(record.unlockAt).isBefore(dayjs())
              })}
            >
              {value}
            </span>
          ),
          sorter: (a, b) => a.amount - b.amount,
          title: 'Amount'
        },
        {
          dataIndex: 'unlockAt',
          render: formatDatetime,
          sorter: (a, b) => dayjs(a.unlockAt).diff(dayjs(b.unlockAt)),
          title: 'Unlock At'
        },
        {
          render: (_, { id, status }) => (
            <>
              <ButtonRefreshWallets disabled={status === 'processing'} walletId={id} />
            </>
          ),
          title: 'Actions'
        }
      ]}
      dataSource={getLocks.data}
      loading={getLocks.isLoading}
      pagination={{ className: 'px-4', defaultPageSize: 20 }}
      rowKey={(row) => row.id}
      scroll={{ x: 'max-content', y: 'calc(100vh - 260px)' }}
      title={() => (
        <div>
          <Tag color="blue">{totalAmount} &pi;</Tag>
        </div>
      )}
    />
  )
}
