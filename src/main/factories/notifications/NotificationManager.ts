import NotificationContainer from './NotificationContainer'
import INotificationOptions from './INotificationOptions'
import Notification from './Notification'

/**
 * Handles the creation of NotificationContainer and
 * Notifications that get pushed into them.
 *
 * @todo Change to Singleton
 *
 * @class NotificationManager
 */
class NotificationManager {
  /**
   * The active NotificationContainer.
   *
   * @private
   * @static
   * @type {NotificationContainer}
   * @memberof NotificationManager
   */
  private static container: NotificationContainer | null
  /**
   * Prepares a NotificationContainer.
   *
   * @private
   * @static
   * @memberof NotificationManager
   */
  private static getContainer(): NotificationContainer {
    if (!this.container) {
      this.container = new NotificationContainer()
    }

    return this.container
  }
  /**
   * Destroys a notification (and container if there are none left).
   *
   * @static
   * @param {Notification} notification
   * @memberof NotificationManager
   */
  public static destroyNotification(notification: Notification) {
    if (this.container) {
      this.container.removeNotification(notification)
      // Once we have no notifications left, destroy the container.
      if (this.container.notifications.length == 0) {
        this.container.dispose()
        this.container = null
      }
    }
  }
  /**
   * Creates a new Notification and pushes it to the
   * NotificationContainer.
   *
   * @static
   * @param {INotificationOptions} options
   * @memberof NotificationManager
   */
  public static createNotification(
    options: INotificationOptions
  ): Notification {
    const container = this.getContainer()
    const notification = new Notification(options)

    container.addNotification(notification)

    return notification
  }
}

export default NotificationManager
