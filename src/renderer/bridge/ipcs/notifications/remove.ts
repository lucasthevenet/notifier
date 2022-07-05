import { ipcRenderer, IpcRendererEvent } from 'electron'

import { IPC } from 'shared/constants'

export function onNotificationRemoved(
  fn: (event: IpcRendererEvent, id: string) => void
) {
  const channel = 'notification-remove'

  ipcRenderer.on(channel, (event, id) => {
    fn(event, id)
  })
}
