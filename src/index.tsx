import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import MutationStore from './Lib/MutationStore'

export enum OverlayTypes {
  None,
  Main,
  ProductionPlanner,
  Build
}

type GameStateType = { 
  overlay: OverlayTypes
  build?: THREE.Object3D 
}

export const GameState = MutationStore<GameStateType>({ overlay: OverlayTypes.Main })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
