import { Button } from 'antd'
import { Trash } from 'iconsax-reactjs'

import { useDeleteProxies } from '~/api/use-delete-proxies'
import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'

export function ButtonDeleteAllProxies() {
  const deleteProxies = useDeleteProxies()

  const handleDeleteProxies = async () => {
    await deleteProxies.mutateAsync()
    queryClient.invalidateQueries({ queryKey: genGetProxiesKey() })
  }

  return (
    <Button
      color="danger"
      disabled={deleteProxies.isPending}
      icon={<Trash size={16} variant="Bulk" />}
      loading={deleteProxies.isPending}
      onClick={handleDeleteProxies}
      variant="outlined"
    >
      Delete all
    </Button>
  )
}
