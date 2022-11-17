import { GameState, MenuTypes } from "..";
import { finishBuild } from "../Tools/build";
import controls, { Keys, lockControls, unlockControls } from "./interaction";
import { pauseGame, resumeGame } from "./loop";

function setOverlay(overlay: MenuTypes) {
    const state = GameState.getState()
    state.menu = overlay
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

    if(state.menu === MenuTypes.None) {
        if(controls.keys[Keys.Escape]) {
            setOverlay(MenuTypes.Main)
            pauseGame()
            return
        } 

        if(controls.keys[Keys.Planner]) {
            setOverlay(MenuTypes.ProductionPlanner)
            return
        }

        if(controls.keys[Keys.Build]) {
            setOverlay(MenuTypes.Build)
            return
        }
    }
}

export function setIdleState() {
    const overlay = GameState.getState()
    if(overlay.menu === MenuTypes.Main) resumeGame()
    overlay.menu = MenuTypes.None
    GameState.notify()
    lockControls()
}