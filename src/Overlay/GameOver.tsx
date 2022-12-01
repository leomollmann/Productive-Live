import { useEffect } from "react"
import { GameState } from ".."
import { lockControls } from "../Engine/interaction"
import { pauseGame } from "../Engine/loop"

const GAME_OVER_LIMIT = 4000

function GameOver() {
  const state = GameState.useObserver()

  useEffect(() => {
    if(state.balance <= GAME_OVER_LIMIT) {
      pauseGame()
      document.exitPointerLock()
      lockControls()
    }
  }, [state.balance])

  const restart = () => {
    window.location.reload()
  }

  if(state.balance > GAME_OVER_LIMIT) return null

  return (
    <div className="menu dark">
      <div id="title">You Failed</div>
      <h1 className="text-lg text-white">Your colony is financially unsustainable,</h1>
      <h1 className="text-lg text-white">your debt has surpassed the profit margin</h1>
      <button className="mt-8" id="play" onClick={restart}>Try Again</button>
    </div> 
  )
}

export default GameOver