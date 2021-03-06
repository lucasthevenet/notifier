import NotificationManager from './NotificationManager'
import INotificationOptions from './INotificationOptions'
import { v4 as uuidv4 } from 'uuid'

import { EventEmitter } from 'events'

/**
 * Represents a Notification.
 * Emits two events:
 *  - display: Fires when the notification is actually visible
 *  - close: Fires when the notification is closed
 *
 * @class Notification
 */
class Notification extends EventEmitter {
  /**
   * The notification´s unique ID.
   *
   * @type {string}
   * @memberof Notification
   */
  public id: string
  /**
   * Supplied notification options.
   *
   * @private
   * @type {INotificationOptions}
   * @memberof Notification
   */
  public options: INotificationOptions

  /**
   * Creates an instance of Notification.
   * @param {INotificationOptions} options
   * @memberof Notification
   */
  constructor(options: INotificationOptions) {
    super()
    this.id = uuidv4()
    this.options = options
  }
  /**
   * Asks the NotificationManager to remove this notification.
   *
   * @memberof Notification
   */
  public close() {
    NotificationManager.destroyNotification(this)
  }
}

export default Notification
