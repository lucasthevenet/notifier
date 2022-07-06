import { contextBridge, ipcRenderer } from 'electron'

import * as ipcs from './ipcs'

declare global {
  interface Window {
    App: typeof API
  }
}

const API = {
  ...ipcs,
  makeClickable: () => ipcRenderer.send('make-clickable'),
  makeUnclickable: () => ipcRenderer.send('make-unclickable'),
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  username: process.env.USER,
}

contextBridge.exposeInMainWorld('App', API)
