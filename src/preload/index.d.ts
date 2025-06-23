/* eslint-disable perfectionist/sort-object-types */
import { resetDatabase } from '#/database'
import { addProxies, getProxies } from '#/handlers/proxies.handler'
import { addTag, deleteTag, getTags, updateTag } from '#/handlers/tags.handler'
import { ElectronAPI } from '@electron-toolkit/preload'

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
    }
    electron: ElectronAPI & {
      onFinishCheckProxy: (callback: () => void) => void
    }
  }
}
