import { useMutation } from '@tanstack/react-query'

import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'

export function useVerifyProxies() {
  return useMutation({
    mutationFn: window.api.verifyProxies,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: genGetProxiesKey() })
  })
}
