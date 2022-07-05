/**
 * The notification options.
 *
 * @export
 * @interface INotificationOptions
 */
export default interface INotificationOptions {
  content?: {
    title?: string
    description?: string
    icon?: string
    body?: string
  }
  timeout?: number
}
