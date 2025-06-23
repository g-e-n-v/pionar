import { resetDatabase } from '#/database'
import { getTags } from '#/handlers/tags.handler'
import { ipcMain } from 'electron/main'

export function registerIpcHandlers() {
  ipcMain.handle('reset-database', resetDatabase)

  ipcMain.handle('get-tags', getTags)
}
