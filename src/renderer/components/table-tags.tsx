import { ColorPicker, Table, Tag } from 'antd'

import { useGetTags } from '~/api/use-get-tags'
import { ButtonDeleteTag } from '~/components/button-delete-tag'

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
          render: (color) => <ColorPicker defaultValue={color} open={false} showText />,
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
          title: 'Preview',
          width: 140
        },
        {
          key: 'actions',
          render: (_, tag) => (
            <div>
              <ButtonDeleteTag tagId={tag.id} />
            </div>
          ),
          title: 'Actions',
          width: 140
        }
      ]}
      dataSource={getTags.data}
      loading={getTags.isLoading}
      rowKey="id"
    />
  )
}
