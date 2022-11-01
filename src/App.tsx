import { useEffect, useRef } from 'react'
import { addListeners } from './Engine/interaction'
import { initRenderer } from './Engine/loop'
import Menus from './Menus/Menus'
import { PumpMaster } from './Objects/Pump/Pump'
import { ReservatoryMaster } from './Objects/Reservatory/Reservatory'

Promise.all([
  PumpMaster.model.load(),
  ReservatoryMaster.model.load()
])

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const removeListeners = addListeners(canvas)
    initRenderer(canvas)

    return removeListeners
  }, [])

  return (
    <>
      <Menus canvas={canvas}/>
      <canvas ref={canvas} id="game" />
    </>
  );
}

export default App;
