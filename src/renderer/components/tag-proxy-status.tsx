import { Tag } from 'antd'

import { cn } from '~/utils/cn.util'

type TagProxyStatusProps = {
  status: string
}

export function TagProxyStatus({ status }: TagProxyStatusProps) {
  return (
    <Tag
      className={cn('text-white border-none', {
        'bg-gray-500': status === 'not-verified',
        'bg-green-500': status === 'active',
        'bg-orange-500': status === 'processing',
        'bg-red-500': status === 'inactive'
      })}
    >
      {status}
    </Tag>
  )
}
