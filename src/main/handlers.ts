import { resetDatabase } from '#/database'
import { createTag, getTags, updateTag } from '#/handlers/tags.handler'
import { TagInsert, TagUpdate } from '#/types/db.type'
import { ipcMain } from 'electron/main'

export function registerIpcHandlers() {
  ipcMain.handle('reset-database', resetDatabase)

  ipcMain.handle('get-tags', getTags)
  ipcMain.handle('create-tag', async (_, tag: TagInsert) => createTag(tag))
  ipcMain.handle('update-tag', async (_, id: number, tag: TagUpdate) => updateTag(id, tag))
}
