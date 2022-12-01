import { BarChartOutlined, CheckCircleOutlined, FormOutlined, StopOutlined, ToolOutlined } from "@ant-design/icons/lib/icons"
import { ReactNode } from "react"
import { GameState, GameStateType } from ".."
import { Keys } from "../Engine/interaction"
import ModelType from "../Objects/ModelType"
import { PumpInstance } from "../Objects/Pump/Pump"
import { ReservatoryInstance } from "../Objects/Reservatory/Reservatory"
import currency from "../Utils/currency"

type OverlayButtonProps = {
  children: ReactNode
  keyCode: Keys
  text: string
}

function OverlayButton({ children, text, keyCode }: OverlayButtonProps) {
  return (
    <span className="flex flex-col items-center">
      <div className="relative rounded-full h-12 w-12 border-[1px] border-primary bg-white text-primary">
        <span className="absolute top-0 bottom-0 left-0 right-0 justify-center flex items-center opacity-40 text-4xl">{children}</span>
        <span className="leading-3 font-bold absolute top-0 bottom-1 left-0 right-0 justify-center flex items-center text-2xl">{keyCode.replace('Key', '')}</span>
      </div>
      <p className="font-semibold">{text}</p>
    </span>
  )
}

function ActionsOverlay() {
  const state = GameState.useObserver()
  
  if(state.build) return (<>
    <OverlayButton keyCode={Keys.Cancel} text="cancel">
      <StopOutlined />
    </OverlayButton>
    <OverlayButton keyCode={Keys.Build} text="build">
      <ToolOutlined />
    </OverlayButton>
  </>)

  return (<>
    <OverlayButton keyCode={Keys.Build} text="build">
      <ToolOutlined />
    </OverlayButton>
    <OverlayButton keyCode={Keys.Planner} text="plan">
      <FormOutlined />
    </OverlayButton>
    <OverlayButton keyCode={Keys.Metrics} text="metrics">
      <BarChartOutlined />
    </OverlayButton>
  </>)
}

function checkTutorial(state: GameStateType) {
  if(!state.tutorial[1].done && state.buildings.find(x => x.id === ModelType.pump && (x as PumpInstance).power.value >= 5000)) {
    state.tutorial[1].done = true
    GameState.notify()
  }

  if(!state.tutorial[2].done && state.buildings.find(x => x.id === ModelType.pump && (x as PumpInstance).power.value >= 10000)) {
    state.tutorial[2].done = true
    GameState.notify()
  }

  if(!state.tutorial[3].done && state.buildings.find(x => x.id === ModelType.reservatory && (x as ReservatoryInstance).capacity.value >= 5000)) {
    state.tutorial[3].done = true
    GameState.notify()
  }
}

function Overlays() {
  const state = GameState.useObserver()
  checkTutorial(state)

  return (
    <>
      <div className="absolute top-4 left-4 text-base flex flex-row gap-2 align-bottom">
        <h2 className="font-normal mb-0 mt-auto">Balance:</h2> 
        <h1 className="font-semibold mb-0 text-xl" style={{ color: state.balance < 0 ? '#B20B0B' : '#489E3A'}}>{currency(state.balance)}</h1>
      </div>
      <div className="absolute top-4 right-4 text-lg w-80 flex flex-col gap-2">
        <h1 className="text-center mb-2 text-xl">Tutorial</h1>
        <h2 className="font-bold text-center">Phase 0, collect water</h2>
        {state.tutorial.map(x => (
          <span key={x.step} className="flex flex-row gap-2 items-center text-green">
            {x.done ? <CheckCircleOutlined/> : null}
            <p className={x.done ? "line-through opacity-60 text-primary" : 'text-primary'}>{x.step}: {x.text}</p>
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-8 absolute bottom-8 left-8 right-8">
        <ActionsOverlay />
      </div>
    </>
  )
}

export default Overlays