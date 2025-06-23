import { resetDatabase } from '#/database'
import { getTags } from '#/handlers/tags.handler'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      getTags: typeof getTags
      resetDatabase: typeof resetDatabase
    }
    electron: ElectronAPI
  }
}
