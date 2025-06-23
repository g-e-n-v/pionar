import { App, Button } from 'antd'
import { Trash } from 'iconsax-reactjs'

import { useDeleteTag } from '~/api/use-delete-tag'
import { genGetTagsKey } from '~/api/use-get-tags'
import { queryClient } from '~/configs/tanstack-query.config'

type ButtonDeleteTagProps = {
  tagId: number
}

export function ButtonDeleteTag({ tagId }: ButtonDeleteTagProps) {
  const { modal, notification } = App.useApp()

  const deleteTag = useDeleteTag()

  const handleDeleteTag = async () => {
    modal.confirm({
      content: 'Are you sure you want to delete this tag?',
      okButtonProps: {
        disabled: deleteTag.isPending,
        loading: deleteTag.isPending
      },
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        await deleteTag.mutateAsync(tagId)
        notification.success({ message: 'Tag deleted' })
        queryClient.invalidateQueries({ queryKey: genGetTagsKey() })
      },
      title: 'Delete Tag'
    })
  }

  return (
    <Button
      className="text-red-500"
      icon={<Trash size={16} variant="Bulk" />}
      onClick={handleDeleteTag}
      type="text"
    />
  )
}
