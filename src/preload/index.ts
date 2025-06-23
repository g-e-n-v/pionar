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

  addProxies: (proxies: ProxyInsert[]) => ipcRenderer.invoke('add-proxies', proxies),
  getProxies: () => ipcRenderer.invoke('get-proxies')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
