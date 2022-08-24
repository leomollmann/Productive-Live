import React, { useEffect, useRef } from 'react'
import { addListeners } from './Engine/interaction'
import { initRenderer } from './Engine/loop'
import Menus from './Menus/Menus'

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const removeListeners = addListeners(canvas)
    initRenderer(canvas)

    return removeListeners
  }, [])

  return (
    <>
      <canvas ref={canvas} id="game" />
      <Menus canvas={canvas}/>
    </>
  );
}

export default App;
