import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function createNotification(options) {
  const channel = 'notification-create'

  ipcRenderer.invoke(channel, options)
}
