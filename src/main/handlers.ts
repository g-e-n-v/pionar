import { resetDatabase } from '#/database'
import { addProxies } from '#/handlers/proxies.handler'
import { addTag, getTags, updateTag } from '#/handlers/tags.handler'
import { ProxyInsert, TagInsert, TagUpdate } from '#/types/db.type'
import { ipcMain } from 'electron/main'

export function registerIpcHandlers() {
  ipcMain.handle('reset-database', resetDatabase)

  ipcMain.handle('get-tags', getTags)
  ipcMain.handle('add-tag', async (_, tag: TagInsert) => addTag(tag))
  ipcMain.handle('update-tag', async (_, id: number, tag: TagUpdate) => updateTag(id, tag))

  ipcMain.handle('add-proxies', async (_, proxies: ProxyInsert[]) => addProxies(proxies))
}
