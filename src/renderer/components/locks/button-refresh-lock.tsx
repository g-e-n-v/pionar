import { Button } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'

import { genGetLocksKey } from '~/api/use-get-locks'
import { useRefreshLock } from '~/api/use-refresh-lock'
import { queryClient } from '~/configs/tanstack-query.config'

type ButtonRefreshLockProps = {
  lockId: number
}

export function ButtonRefreshLock({ lockId }: ButtonRefreshLockProps) {
  const refreshLock = useRefreshLock()

  const handleRefreshLock = async () => {
    await refreshLock.mutateAsync(lockId)
    await queryClient.invalidateQueries({ queryKey: genGetLocksKey() })
  }

  return (
    <Button
      color="green"
      disabled={refreshLock.isPending}
      icon={<Refresh2 size={16} variant="Bulk" />}
      loading={refreshLock.isPending}
      onClick={handleRefreshLock}
      variant="text"
    />
  )
}
