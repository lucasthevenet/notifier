import React, { useRef } from 'react'
import { ipcRenderer } from 'electron'
import useEventListener from './useEventListener'

export default function useMakeClickable() {
  const elementRef = useRef<HTMLElement>(null)

  const handleMouseEnter = () => ipcRenderer.send('make-clickable')
  const handleMouseLeave = () => ipcRenderer.send('make-unclickable')

  useEventListener('mouseenter', handleMouseEnter, elementRef)
  useEventListener('mouseleave', handleMouseLeave, elementRef)

  return elementRef
}
