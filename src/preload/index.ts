/* eslint-disable perfectionist/sort-objects */
import { ProxyInsert, TagInsert, TagUpdate } from '#/types/db.type'
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

  addWallets: (mnemonics: Array<string>) => ipcRenderer.invoke('add-wallets', mnemonics)
}

/* ------------------------------ Events ------------------------------ */
const createListener = (key: string) => (callback: (...args: unknown[]) => void) =>
  ipcRenderer.on(key, (_, ...args) => callback(...args))

const event = {
  onFinishCheckProxy: createListener('check-proxy-finish')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electron', Object.assign(electronAPI, event))
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
