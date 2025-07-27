import { resetDatabase } from '#/database'
import { getLocks, refreshLock } from '#/handlers/locks.hanlder'
import { addProxies, deleteProxies, getProxies, verifyProxies } from '#/handlers/proxies.handler'
import { addTag, deleteTag, getTags, updateTag } from '#/handlers/tags.handler'
import { addWallets, collectFunds, getWallets, refreshWallets } from '#/handlers/wallets.handler'
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

  ipcMain.handle('add-wallets', (_, args) => addWallets(args))
  ipcMain.handle('get-wallets', () => getWallets())
  ipcMain.handle('refresh-wallets', (_, walletIds: Array<number>) => refreshWallets(walletIds))
  ipcMain.handle('collect-funds', (_, receiver) => collectFunds(receiver))

  ipcMain.handle('get-locks', () => getLocks())
  ipcMain.handle('refresh-lock', (_, lockId: number) => refreshLock(lockId))
}
