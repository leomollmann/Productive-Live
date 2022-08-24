import { OverlayManager, OverlayTypes } from "..";
import controls, { Keys, lockControls, unlockControls } from "./interaction";
import { pauseGame, resumeGame } from "./loop";

function setOverlay(overlay: OverlayTypes) {
    const state = OverlayManager.getState()
    state.current = overlay
    OverlayManager.notify()
    document.exitPointerLock()
    unlockControls()
}

export function checkUserState() {
    const overlay = OverlayManager.getState()
    if(overlay.current === OverlayTypes.None) {
        if(controls.keys[Keys.Escape]) {
            setOverlay(OverlayTypes.Main)
            pauseGame()
        } else if(controls.keys[Keys.Build]) {
            setOverlay(OverlayTypes.Build)
        }
    } 
}

export function setIdleState() {
    const overlay = OverlayManager.getState()
    if(overlay.current === OverlayTypes.Main) resumeGame()
    overlay.current = OverlayTypes.None
    OverlayManager.notify()
    lockControls()
}