import { Table } from 'antd'

export function TableTags() {
  return (
    <Table
      className="shadow rounded-lg overflow-hidden"
      columns={[
        {
          key: 'id',
          title: '#',
          width: 60
        },
        {
          key: 'tag',
          title: 'Color',
          width: 60
        },
        {
          key: 'text',
          title: 'Text'
        }
      ]}
    />
  )
}
