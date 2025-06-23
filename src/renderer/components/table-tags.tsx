import { ColorPicker, Table, Tag } from 'antd'

import { useGetTags } from '~/api/use-get-tags'

export function TableTags() {
  const getTags = useGetTags()

  return (
    <Table
      className="shadow rounded-lg overflow-hidden bg-white"
      columns={[
        {
          key: 'id',
          title: '#',
          width: 60
        },
        {
          dataIndex: 'color',
          key: 'tag',
          render: (color) => <ColorPicker defaultValue={color} showText />,
          title: 'Color',
          width: 140
        },
        {
          dataIndex: 'text',
          key: 'text',
          title: 'Text'
        },
        {
          key: 'preview',
          render: (_, { color, text }) => <Tag color={color ?? undefined}>{text}</Tag>,
          title: 'Preview'
        }
      ]}
      dataSource={getTags.data}
      loading={getTags.isLoading}
      rowKey="id"
    />
  )
}
