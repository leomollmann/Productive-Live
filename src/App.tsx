import React, { useEffect, useRef, useState } from 'react'
import { initRenderer, pauseGame, resumeGame } from './Engine/loop'
import Menu from './Menu'

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const canvas = useRef<HTMLCanvasElement>(null)

  const onPointerlockChange = () => {
    if(document.pointerLockElement === canvas.current) {
      setMenuOpen(false)
      resumeGame()
    } else {
      setMenuOpen(true)
      pauseGame()
    }
  }

  useEffect(() => {
    canvas.current!.ownerDocument.addEventListener(
      'pointerlockchange', 
      onPointerlockChange
    )

    initRenderer(canvas.current!)

    return () => canvas.current!.ownerDocument.removeEventListener(
      'pointerlockchange', 
      onPointerlockChange
    )
  }, [])

  return (
    <>
      {menuOpen && <Menu canvas={canvas} />}
      <canvas ref={canvas} id="game" />
    </>
  );
}

export default App;
