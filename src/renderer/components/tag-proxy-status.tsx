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
        'bg-green-500': status === 'live',
        'bg-red-500': status === 'dead',
        'bg-violet-500': status === 'invalid-format'
      })}
    >
      {status}
    </Tag>
  )
}
