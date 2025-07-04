import { FormAddTag } from '~/components/tags/form-add-tag'
import { TableTags } from '~/components/tags/table-tags'

export function TagPage() {
  return (
    <div className="flex flex-col gap-4">
      <FormAddTag />
      <TableTags />
    </div>
  )
}
