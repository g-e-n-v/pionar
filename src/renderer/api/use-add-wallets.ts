import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'

import { getErrorMessage } from '~/utils/error.util'

export function useAddWallets() {
  const { notification } = App.useApp()

  return useMutation({
    mutationFn: window.api.addWallets,
    onError: (error) => notification.error({ message: getErrorMessage(error) })
  })
}
