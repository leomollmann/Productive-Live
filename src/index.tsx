import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import MutationStore from './Lib/MutationStore'

export enum OverlayTypes {
  None,
  Main,
  Build
}

export const OverlayManager = MutationStore<{ current: OverlayTypes }>({ current: OverlayTypes.Main })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
