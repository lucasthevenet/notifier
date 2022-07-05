import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function dismissNotification(notificationId: string) {
  const channel = 'notification-dismiss'

  ipcRenderer.send(channel, notificationId)
}
