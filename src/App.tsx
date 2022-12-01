import { useEffect, useRef } from 'react'
import { addListeners } from './Engine/interaction'
import { initRenderer } from './Engine/loop'
import Menus from './Menus/Menus'
import { pumpMaster } from './Objects/Pump/Pump'
import { reservatoryMaster } from './Objects/Reservatory/Reservatory'
import Overlays from './Overlay/Overlays'

Promise.all([
  pumpMaster.model.load(),
  reservatoryMaster.model.load()
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
      <Overlays />
      <Menus canvas={canvas}/>
      <canvas ref={canvas} id="game" />
    </>
  );
}

export default App;
