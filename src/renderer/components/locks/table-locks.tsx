import { Table, Tag } from 'antd'
import dayjs from 'dayjs'

import { useGetLocks } from '~/api/use-get-locks'
import { ButtonRefreshLock } from '~/components/locks/button-refresh-lock'
import { Text } from '~/components/typography/text'
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
          dataIndex: 'unlockAt',
          render: formatDatetime,
          sorter: (a, b) => dayjs(a.unlockAt).diff(dayjs(b.unlockAt)),
          title: 'Unlock At'
        },
        {
          dataIndex: 'amount',
          render: (value, record) => (
            <span
              className={cn(
                'text-red-500',
                { 'text-green-500': dayjs(record.unlockAt).isBefore(dayjs()) },
                { 'line-through text-gray-500': !!record.isClaimed }
              )}
            >
              {value}
            </span>
          ),
          sorter: (a, b) => a.amount - b.amount,
          title: 'Amount'
        },
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
          render: (_, { id }) => (
            <>
              <ButtonRefreshLock lockId={id} />
            </>
          ),
          title: 'Actions',
          width: 100
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
