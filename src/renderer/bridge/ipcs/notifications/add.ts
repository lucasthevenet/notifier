import { ipcRenderer, IpcRendererEvent } from 'electron'
import type Notification from 'main/factories/notifications/Notification'

import { IPC } from 'shared/constants'

export function onNotificationAdded(
  fn: (event: IpcRendererEvent, notification: Notification) => void
) {
  const channel = 'notification-add'

  ipcRenderer.on(channel, (event, notification) => {
    fn(event, notification)
  })
}
