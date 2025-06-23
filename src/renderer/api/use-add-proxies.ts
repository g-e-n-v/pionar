import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'

import { getErrorMessage } from '~/utils/error.util'

export function useAddProxies() {
  const { notification } = App.useApp()

  return useMutation({
    mutationFn: window.api.addProxies,
    onError: (error) => notification.error({ message: getErrorMessage(error) })
  })
}
