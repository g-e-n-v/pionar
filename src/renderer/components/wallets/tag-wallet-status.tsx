import { Tag } from 'antd'

import { cn } from '~/utils/cn.util'

type TagWalletStatusProps = {
  status: string
  total?: number
}

export function TagWalletStatus({ status, total }: TagWalletStatusProps) {
  return (
    <Tag
      className={cn('text-white border-none', {
        'bg-gray-500': status === 'not_started',
        'bg-green-500': status === 'valid',
        'bg-orange-500': status === 'processing',
        'bg-red-500': status === 'invalid'
      })}
    >
      {status} {total ? `(${total})` : ''}
    </Tag>
  )
}
