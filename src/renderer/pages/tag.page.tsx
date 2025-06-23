import { FormAddTag } from '~/components/form-add-tag'
import { TableTags } from '~/components/table-tags'

export function TagPage() {
  return (
    <div className="flex flex-col gap-4">
      <FormAddTag />
      <TableTags />
    </div>
  )
}
