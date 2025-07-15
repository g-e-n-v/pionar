import { Divider, Table, Tag } from 'antd'
import { Lock1, Wallet } from 'iconsax-reactjs'
import { groupBy, sumBy } from 'lodash-es'

import { useGetWallets } from '~/api/use-get-wallets'
import { Text } from '~/components/typography/text'
import { ButtonRefreshWallets } from '~/components/wallets/button-refresh-wallets'
import { TagWalletStatus } from '~/components/wallets/tag-wallet-status'
import { useListenWalletLockCount } from '~/events/use-listen-wallet-lock-count'
import { useListenWalletStatus } from '~/events/use-listen-wallet-status'
import { cn } from '~/utils/cn.util'
import { formatDatetime } from '~/utils/date.util'

export function TableWallets() {
  useListenWalletStatus()
  useListenWalletLockCount()

  const getWallets = useGetWallets()

  const wallets = groupBy(getWallets.data, 'status')

  const totalWalletHasLock = getWallets.data?.filter(
    (wallet) => Number(wallet.lockCount) > 0
  ).length

  const totalLock = sumBy(getWallets.data, (w) => Number(w.lockCount))

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        { dataIndex: 'id', title: '#', width: 60 },
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
          sorter: (a, b) => a.status.localeCompare(b.status),
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
          sorter: (a, b) => (a.availableBalance ?? 0) - (b.availableBalance ?? 0),
          title: 'Balance'
        },
        {
          dataIndex: 'lockCount',
          sorter: (a, b) => Number(a.lockCount) - Number(b.lockCount),
          title: 'Lock Count'
        },
        { dataIndex: 'walletUpdatedAt', render: formatDatetime, title: 'Last update' },
        {
          fixed: 'right',
          render: (_, { id, status }) => (
            <>
              <ButtonRefreshWallets disabled={status === 'processing'} walletId={id} />
            </>
          ),
          title: 'Action'
        }
      ]}
      dataSource={getWallets.data}
      pagination={{ className: 'px-4' }}
      rowKey={(record) => record.id}
      scroll={{ x: 'max-content' }}
      title={() => (
        <div className="flex items-center">
          {Object.entries(wallets).map(([status, wallets]) => (
            <TagWalletStatus key={status} status={status} total={wallets.length} />
          ))}

          <Divider type="vertical" />

          <Tag className="flex items-center gap-1" color="geekblue">
            <Wallet size={14} variant="Bulk" />
            {totalWalletHasLock}
          </Tag>

          <Tag className="flex items-center gap-1" color="blue">
            <Lock1 size={14} variant="Bulk" />
            {totalLock}
          </Tag>
        </div>
      )}
    />
  )
}
