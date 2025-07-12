/* eslint-disable perfectionist/sort-object-types */
import { resetDatabase } from '#/database'
import { addProxies, deleteProxies, getProxies, verifyProxies } from '#/handlers/proxies.handler'
import { addTag, deleteTag, getTags, updateTag } from '#/handlers/tags.handler'
import { addWallets, getWallets, refreshWallets } from '#/handlers/wallets.handler'
import { ElectronAPI } from '@electron-toolkit/preload'

type Fn<Input, Output = void> = (args: Input) => Output

declare global {
  interface Window {
    api: {
      resetDatabase: typeof resetDatabase

      addTag: typeof addTag
      getTags: typeof getTags
      updateTag: typeof updateTag
      deleteTag: typeof deleteTag

      addProxies: typeof addProxies
      getProxies: typeof getProxies
      verifyProxies: typeof verifyProxies
      deleteProxies: typeof deleteProxies

      addWallets: typeof addWallets
      getWallets: typeof getWallets
      refreshWallets: typeof refreshWallets
    }
    electron: ElectronAPI & {
      onFinishCheckProxy: (callback: Fn<{ id: number; status: string }>) => void
    }
  }
}
