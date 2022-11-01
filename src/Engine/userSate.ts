import { GameState, OverlayTypes } from "..";
import { finishBuild } from "../Tools/build";
import controls, { Keys, lockControls, unlockControls } from "./interaction";
import { pauseGame, resumeGame } from "./loop";

function setOverlay(overlay: OverlayTypes) {
    const state = GameState.getState()
    state.overlay = overlay
    GameState.notify()
    document.exitPointerLock()
    unlockControls()
}

export function checkUserState() {
    const state = GameState.getState()
    if(state.build && controls.keys[Keys.Cancel]) {
        finishBuild()
        return
    }

    if(state.overlay === OverlayTypes.None) {
        if(controls.keys[Keys.Escape]) {
            setOverlay(OverlayTypes.Main)
            pauseGame()
            return
        } 

        if(controls.keys[Keys.ProductionPlanner]) {
            setOverlay(OverlayTypes.ProductionPlanner)
            return
        }

        if(controls.keys[Keys.Build]) {
            setOverlay(OverlayTypes.Build)
            return
        }
    }
}

export function setIdleState() {
    const overlay = GameState.getState()
    if(overlay.overlay === OverlayTypes.Main) resumeGame()
    overlay.overlay = OverlayTypes.None
    GameState.notify()
    lockControls()
}