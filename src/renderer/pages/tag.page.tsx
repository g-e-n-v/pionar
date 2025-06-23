import { FormCreateTag } from '~/components/form-create-tag'
import { TableTags } from '~/components/table-tags'

export function TagPage() {
  return (
    <div className="flex flex-col gap-4">
      <FormCreateTag />
      <TableTags />
    </div>
  )
}
