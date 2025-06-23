import { Spin } from 'antd'
import { SpinProps } from 'antd/es/spin'
import { PropsWithChildren } from 'react'

type LoaderProps = PropsWithChildren<{ loading?: boolean; size?: SpinProps['size'] }>

export function Loader({ children, loading, size }: LoaderProps) {
  return loading ? <Spin size={size} /> : children
}
