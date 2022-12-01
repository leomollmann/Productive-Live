import { GameState } from ".."
import { getFloorContactPoint } from "../Engine/loop"
import { scene } from "../Engine/scene"
import { BASE_SCALE } from "../Objects/Model"
import { ModelMaster } from "../Objects/ModelType"

let callId: NodeJS.Timer
function moveGhostCallback() {
  const state = GameState.getState()
  const intersection = getFloorContactPoint()
  if(intersection && state.build?.model.object) {
    state.build.model.object.position.set(
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
      const instance = state.build.getInstace()

      instance.owner?.position.set(
          intersection.point.x, 
          intersection.point.y,
          intersection.point.z
      )
      
      instance.add(scene)

      state.buildings.push(instance)
      state.balance -= instance.price

      GameState.notify()
      console.log(state)
    }
}

export function initBuild(master: ModelMaster, scalar: number) {
  const state = GameState.getState()
  state.build = master
  if(state.build?.model.object) {
    const object = state.build.model.object
    const scale = (scalar * 2 + 0.5) * BASE_SCALE
    object.scale.set(scale, scale, scale)

    scene.add(object)
    callId = setInterval(moveGhostCallback, 10)
  }
}

export function finishBuild() {
  const state = GameState.getState()
  if(state.build?.model.object) {
    scene.remove(state.build.model.object)
    state.build = undefined
    clearInterval(callId)
    GameState.notify()
  }
}