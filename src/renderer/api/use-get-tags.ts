import { useQuery } from '@tanstack/react-query'

const genGetTagsKey = () => ['get-tags']

export function useGetTags() {
  return useQuery({
    queryFn: window.api.getTags,
    queryKey: genGetTagsKey()
  })
}
