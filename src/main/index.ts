import { app, ipcMain } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock } from './factories'
import { createNotification } from './factories/notifications'
import { MainWindow, registerAboutWindowCreationByIPC } from './windows'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(MainWindow)

  ipcMain.handle('notification-create', (e, options) => {
    const notification = createNotification(options)
    notification.emit('display')
    return notification
  })
  registerAboutWindowCreationByIPC()
})
