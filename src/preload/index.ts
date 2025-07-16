/* eslint-disable perfectionist/sort-objects */
import { ProxyInsert, TagInsert, TagUpdate } from '#/types/db.type'
import { IPCEvent } from '#/types/ipc-event.type'
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import { ipcRenderer } from 'electron/renderer'

const api = {
  resetDatabase: () => ipcRenderer.invoke('reset-database'),

  getTags: () => ipcRenderer.invoke('get-tags'),
  addTag: (tag: TagInsert) => ipcRenderer.invoke('add-tag', tag),
  updateTag: (id: number, tag: TagUpdate) => ipcRenderer.invoke('update-tag', id, tag),
  deleteTag: (id: number) => ipcRenderer.invoke('delete-tag', id),

  addProxies: (proxies: ProxyInsert[]) => ipcRenderer.invoke('add-proxies', proxies),
  getProxies: () => ipcRenderer.invoke('get-proxies'),
  verifyProxies: (url: string) => ipcRenderer.invoke('verify-proxies', url),
  deleteProxies: () => ipcRenderer.invoke('delete-proxies'),

  addWallets: (mnemonics: Array<string>) => ipcRenderer.invoke('add-wallets', mnemonics),
  getWallets: () => ipcRenderer.invoke('get-wallets'),
  refreshWallets: (walletIds: Array<number>) => ipcRenderer.invoke('refresh-wallets', walletIds),
  collectFunds: (receiver: string) => ipcRenderer.invoke('collect-funds', receiver),

  getLocks: () => ipcRenderer.invoke('get-locks')
}

/* ------------------------------ Events ------------------------------ */
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld(
      'electron',
      Object.assign(electronAPI, {
        on: <T extends IPCEvent['type']>(
          type: T,
          callback: (event: Extract<IPCEvent, { type: T }>) => void
        ) => {
          const listener = (_event, value) => callback(value)
          ipcRenderer.on(type, listener)

          return () => ipcRenderer.removeListener(type, listener)
        }
      })
    )
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
