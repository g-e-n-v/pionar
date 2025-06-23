import { resetDatabase } from '#/database'
import { createTag, getTags, updateTag } from '#/handlers/tags.handler'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      createTag: typeof createTag
      getTags: typeof getTags
      resetDatabase: typeof resetDatabase
      updateTag: typeof updateTag
    }
    electron: ElectronAPI
  }
}
