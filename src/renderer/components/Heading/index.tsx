import { PropsWithChildren } from 'react'

export function Heading({ children }: PropsWithChildren<{}>) {
  return <h1 className="text-5xl pb-2">{children}</h1>
}
