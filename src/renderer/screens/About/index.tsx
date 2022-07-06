/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import { InboxIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import type Notification from 'main/factories/notifications/Notification'
import NotificationExpanded from 'renderer/components/NotificationExpanded'
import { useMakeClickable } from 'renderer/hooks'

export function AboutScreen() {
  const { App } = window // The "App" comes from the bridge
  const [notifications, setNotifications] = useState<Notification[]>([])
  const ref = useRef()
  useMakeClickable(ref)

  useEffect(() => {
    App.onNotificationAdded((_, notification) => {
      setNotifications((prev) => [...prev, notification])
    })
    App.onNotificationRemoved((_, id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    })
  }, [])

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div
          className="w-full flex flex-col items-center space-y-4 sm:items-end"
          ref={ref as any}
        >
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {notifications.map((notification) => (
            <NotificationBlock
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
      {/* <NotificationExpanded /> */}
    </>
  )
}

const NotificationBlock = ({
  notification,
}: {
  notification: Notification
}) => {
  const { App } = window
  const { title, body, description, icon } = notification.options.content
  const ref = useRef()
  useMakeClickable(ref)
  return (
    <Transition
      show
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        ref={ref as any}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
              <div className="mt-3 flex space-x-7">
                <button
                  type="button"
                  className="bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Undo
                </button>
                <button
                  type="button"
                  className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => App.dismissNotification(notification.id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
