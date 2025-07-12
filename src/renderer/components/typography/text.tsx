import { Typography } from 'antd'
import { Copy, CopySuccess } from 'iconsax-reactjs'

export type TextProps = Parameters<typeof Typography.Text>[0] & {
  children: string
  ellipsisMiddle?: boolean
}

export function Text({ children, copyable, ellipsisMiddle, ...props }: TextProps) {
  const ellipsisMiddleText = `${children.slice(0, 10)}...${children.slice(-10).trim()}`

  const handleCopyText = () => window.navigator.clipboard.writeText(children)

  return (
    <Typography.Text
      copyable={
        copyable && {
          icon: [
            <Copy key="copy" size={16} variant="TwoTone" />,
            <CopySuccess key="copied" size={16} variant="Bulk" />
          ],
          onCopy: handleCopyText
        }
      }
      {...props}
    >
      {ellipsisMiddle ? ellipsisMiddleText : children}
    </Typography.Text>
  )
}
