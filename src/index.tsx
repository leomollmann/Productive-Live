import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MutationStore from './Lib/MutationStore'

import './index.css'
import 'antd/dist/antd.css'

export enum MenuTypes {
  None,
  Main,
  ProductionPlanner,
  Build
}

type GameStateType = { 
  menu: MenuTypes
  balance: number
  build?: THREE.Object3D 
}

export const GameState = MutationStore<GameStateType>({ menu: MenuTypes.Main, balance: 5000 })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
