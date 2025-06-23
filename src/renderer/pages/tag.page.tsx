import { useGetTags } from '~/api/use-get-tags'
import { TableTags } from '~/components/table-tags'

export function TagPage() {
  const getTags = useGetTags()

  console.log(getTags.data)

  return (
    <>
      <TableTags />
    </>
  )
}
