import { BrowserWindowConstructorOptions, screen } from 'electron'
import { createWindow } from 'main/factories'
import { join } from 'path'
import { WindowProps } from 'shared/types'
import { APP_CONFIG } from '~/app.config'

export * from './ipcs'

export function AboutWindow() {
  let options: WindowProps = {
    id: 'about',
    alwaysOnTop: true,
    autoHideMenuBar: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    transparent: true,
    show: true,
    webPreferences: {
      preload: join(__dirname, 'bridge.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    focusable: false,
    fullscreenable: false,
    minimizable: false,
  }
  const display = screen.getPrimaryDisplay()
  const displayWidth = display.workArea.x + display.workAreaSize.width
  const displayHeight = display.workArea.y + display.workAreaSize.height
  options.height = displayHeight / 2
  options.width = 400
  options.x = displayWidth - 400
  options.y = displayHeight / 2

  const window = createWindow(options)
  window.setVisibleOnAllWorkspaces(true)
  window.setIgnoreMouseEvents(true, { forward: true })

  return window
}
