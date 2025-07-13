import { Select, SelectProps, Tag } from 'antd'

import { useGetTags } from '~/api/use-get-tags'

type SelectTagsProps = SelectProps<
  Array<number>,
  {
    color: null | string
    label: string
    value: number
  }
>

export function SelectTags(props: SelectTagsProps) {
  const getTags = useGetTags()

  return (
    <Select
      allowClear
      loading={getTags.isLoading}
      mode="multiple"
      optionRender={({ data, key, label }) => (
        <Tag color={data.color ?? undefined} key={key}>
          {label}
        </Tag>
      )}
      options={getTags.data?.map((tag) => ({
        color: tag.color,
        label: tag.text,
        value: tag.id
      }))}
      placeholder="Select tags"
      tagRender={({ label, value, ...rest }) => (
        <Tag color={getTags.data?.find((tag) => tag.id === value)?.color ?? undefined} {...rest}>
          {label}
        </Tag>
      )}
      {...props}
    />
  )
}
