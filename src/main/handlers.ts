import { resetDatabase } from '#/database'
import { addProxies, deleteProxies, getProxies, verifyProxies } from '#/handlers/proxies.handler'
import { addTag, deleteTag, getTags, updateTag } from '#/handlers/tags.handler'
import { addWallets } from '#/handlers/wallets.handler'
import { ProxyInsert, TagInsert, TagUpdate } from '#/types/db.type'
import { ipcMain } from 'electron/main'

export function registerIpcHandlers() {
  ipcMain.handle('reset-database', resetDatabase)

  ipcMain.handle('get-tags', () => getTags())
  ipcMain.handle('add-tag', (_, tag: TagInsert) => addTag(tag))
  ipcMain.handle('update-tag', (_, id: number, tag: TagUpdate) => updateTag(id, tag))
  ipcMain.handle('delete-tag', (_, id: number) => deleteTag(id))

  ipcMain.handle('add-proxies', (_, proxies: ProxyInsert[]) => addProxies(proxies))
  ipcMain.handle('get-proxies', () => getProxies())
  ipcMain.handle('verify-proxies', (_, url: string) => verifyProxies(url))
  ipcMain.handle('delete-proxies', () => deleteProxies())

  ipcMain.handle('add-wallets', (_, mnemonics: Array<string>) => addWallets(mnemonics))
}
