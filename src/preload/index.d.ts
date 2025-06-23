/* eslint-disable perfectionist/sort-object-types */
import { resetDatabase } from '#/database'
import { addProxies } from '#/handlers/proxies.handler'
import { addTag, getTags, updateTag } from '#/handlers/tags.handler'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      resetDatabase: typeof resetDatabase

      addTag: typeof addTag
      getTags: typeof getTags
      updateTag: typeof updateTag

      addProxies: typeof addProxies
    }
    electron: ElectronAPI
  }
}
