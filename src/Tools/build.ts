import { GameState } from ".."
import { getFloorContactPoint } from "../Engine/loop"
import { scene } from "../Engine/scene"

let callId: NodeJS.Timer
function moveGhostCallback() {
    const state = GameState.getState()
    const intersection = getFloorContactPoint()
    if(intersection && state.build) {
        state.build.position.set(
            intersection.point.x,
            intersection.point.y,
            intersection.point.z
        )
    }
}

export function buildObject() {
    const state = GameState.getState()
    const intersection = getFloorContactPoint()
    if(intersection && state.build) {
        const object = state.build.clone(true)

        object.position.set(
            intersection.point.x, 
            intersection.point.y,
            intersection.point.z
        )
        scene.add(object)
    }
}

export function initBuild() {
    const state = GameState.getState()
    if(state.build) {
        scene.add(state.build)
        callId = setInterval(moveGhostCallback, 10)
    }
}

export function finishBuild() {
    const state = GameState.getState()
    if(state.build) {
        scene.remove(state.build)
        state.build = undefined
        clearInterval(callId)
        GameState.notify()
    }
}