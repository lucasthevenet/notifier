import { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren<{}>) {
  return <section className="flex flex-col py-4 px-24">{children}</section>
}
