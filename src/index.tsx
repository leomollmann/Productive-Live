import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MutationStore from './Lib/MutationStore'

import './index.css'
import 'antd/dist/antd.css'
import { ModelInstance, ModelMaster } from './Objects/ModelType'

export enum MenuTypes {
  None,
  Main,
  ProductionPlanner,
  Build
}

type Tutorial = {
  step: number
  text: string
  done: boolean
}

export type GameStateType = { 
  menu: MenuTypes
  balance: number
  build?: ModelMaster
  buildings: ModelInstance[]
  tutorial: Tutorial[]
}

const tutorialPhase0: Tutorial[] = [
  { step: 1, text: "Press B to open the build menu", done: false },
  { step: 2, text: "Build a pump with 5.000W of power", done: false },
  { step: 3, text: "Build one more pump with 10.000W of power", done: false },
  { step: 4, text: "Build a reservatory with 5.000L capacity", done: false },
  { step: 5, text: "Connect the smaller pump to the reservatory", done: false },
]

export const GameState = MutationStore<GameStateType>({ menu: MenuTypes.Main, balance: 5000, buildings: [], tutorial: tutorialPhase0 })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
