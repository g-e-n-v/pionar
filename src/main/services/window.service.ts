import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron/main'
import { join } from 'path'

const state = {
  window: null as BrowserWindow | null
}

export function createWindow() {
  if (state.window) return

  state.window = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  state.window.on('ready-to-show', () => {
    state.window?.show()
    state.window?.maximize()
    state.window?.webContents.openDevTools()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    state.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    state.window.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

export const getWindow = () => state.window
