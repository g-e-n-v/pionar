import { initializeDatabase } from '#/database'
import { registerIpcHandlers } from '#/handlers'
import { createWindow } from '#/services/window.service'
import { optimizer } from '@electron-toolkit/utils'
import { app } from 'electron'

app.whenReady().then(async () => {
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  registerIpcHandlers()

  await initializeDatabase()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
