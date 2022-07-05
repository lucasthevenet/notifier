import { BrowserWindow, ipcMain, screen } from 'electron'
import * as path from 'path'
import Notification from './Notification'
import { createWindow } from 'main/factories'
import { WindowProps } from 'shared/types'
import { join } from 'path'

/**
 * Container where Notifications are pushed into.
 *
 * @class NotificationContainer
 */
class NotificationContainer {
  /**
   * The container's width.
   * @default 300
   *
   * @static
   * @memberof NotificationContainer
   */
  public static CONTAINER_WIDTH: number = 300
  /**
   * Determines if the container window has been loaded.
   *
   * @type {boolean}
   * @memberof NotificationContainer
   */
  public ready: boolean = false
  /**
   * Collection of Notifications that are currently inside
   * the container.
   *
   * @private
   * @type {Notification[]}
   * @memberof NotificationContainer
   */
  public notifications: Notification[] = []
  /**
   * The Electron BrowserWindow for this container.
   *
   * @private
   * @type {BrowserWindow}
   * @memberof NotificationContainer
   */
  private window: BrowserWindow | null
  /**
   * Creates an instance of NotificationContainer.
   * @memberof NotificationContainer
   */
  constructor() {
    let options: WindowProps = {
      id: 'about',
    }

    const display = screen.getPrimaryDisplay()
    const displayWidth = display.workArea.x + display.workAreaSize.width
    const displayHeight = display.workArea.y + display.workAreaSize.height

    options.height = displayHeight
    options.width = displayWidth //NotificationContainer.CONTAINER_WIDTH
    options.alwaysOnTop = true
    options.skipTaskbar = true
    options.resizable = false
    options.minimizable = false
    options.fullscreenable = false
    options.focusable = false
    options.show = false
    options.frame = false
    options.transparent = true
    options.x = 0 //displayWidth - NotificationContainer.CONTAINER_WIDTH
    options.y = 0
    options.webPreferences = {
      preload: join(__dirname, 'bridge.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
    this.window = createWindow(options)
    this.window.setVisibleOnAllWorkspaces(true)
    this.window.setIgnoreMouseEvents(true, { forward: true })
    this.window.showInactive()
    this.window.webContents.openDevTools({ mode: 'detach' })

    ipcMain.on('notification-clicked', (e: any, id: string) => {
      const notification = this.notifications.find(
        (notification) => notification.id == id
      )

      if (notification) {
        notification.emit('click')
      }
    })

    ipcMain.on('notification-dismiss', (e: any, id: string) => {
      console.log('notification-dismiss', id)
      const notification = this.notifications.find(
        (notification) => notification.id == id
      )

      if (notification) {
        this.removeNotification(notification)
      }
    })

    ipcMain.on('make-clickable', (e: any) => {
      this.window && this.window.setIgnoreMouseEvents(false)
    })

    ipcMain.on('make-unclickable', (e: any) => {
      this.window && this.window.setIgnoreMouseEvents(true, { forward: true })
    })

    this.window.webContents.on('did-finish-load', () => {
      this.ready = true
      this.notifications.forEach(this.displayNotification)
    })

    // this.window.on('closed', () => {
    //   this.window = null
    // })
  }

  /**
   * Adds a notification logically (notifications[]) and
   * physically (DOM Element).
   *
   * @param {Notification} notification
   * @memberof NotificationContainer
   */
  public addNotification(notification: Notification) {
    if (this.ready) {
      this.displayNotification(notification)
    }

    this.notifications.push(notification)
  }

  /**
   * Displays the notification visually.
   *
   * @private
   * @param {Notification} notification
   * @memberof NotificationContainer
   */
  private displayNotification = (notification: Notification) => {
    this.window &&
      this.window.webContents.send('notification-add', notification)
    notification.emit('display')
    if (notification.options.timeout) {
      setTimeout(() => {
        notification.close()
      }, notification.options.timeout)
    }
  }

  /**
   * Removes a notification logically (notifications[]) and
   * physically (DOM Element).
   *
   * @param {Notification} notification
   * @memberof NotificationContainer
   */
  public removeNotification(notification: Notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1)
    this.window &&
      this.window.webContents.send('notification-remove', notification.id)
    notification.emit('close')
  }

  /**
   * Destroys the container.
   *
   * @memberof NotificationContainer
   */
  public dispose() {
    this.window && this.window.close()
  }
}

export default NotificationContainer
