import React, { RefObject, useRef } from 'react'
import useEventListener from './useEventListener'

type Handler = (event: MouseEvent) => void

export default function useMakeClickable<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) {
  const { App } = window

  useEventListener('mouseenter', () => App.makeClickable(), ref)
  useEventListener('mouseleave', () => App.makeUnclickable(), ref)
}
