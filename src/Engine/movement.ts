import { Camera, Euler, Vector3 } from "three";
import controls from "./interaction";

const PI_2 = Math.PI / 2
const BASE_VELOCITY = 10 // m/s

export function getInteractionMovement(camera: Camera, delta: number) {
  if(controls.locked) {
    const distance = BASE_VELOCITY * delta
    if(controls.keys.KeyW) moveZ(camera, distance)
    else if(controls.keys.KeyS) moveZ(camera, -distance)

    if(controls.keys.KeyD) moveX(camera, distance)
    else if(controls.keys.KeyA) moveX(camera, -distance)
    
    if(controls.keys.Space) moveY(camera, distance)
    else if(controls.keys.ShiftLeft) moveY(camera, -distance)
  }
}

function moveZ(camera: Camera, ammount: number) {
  const vector = new Vector3().setFromMatrixColumn(camera.matrix, 0)
  vector.crossVectors(camera.up, vector)
  camera.position.addScaledVector(vector, ammount)
}

function moveX(camera: Camera, ammount: number) {
  const vector = new Vector3().setFromMatrixColumn(camera.matrix, 0)
  camera.position.addScaledVector(vector, ammount)
}

function moveY(camera: Camera, ammount: number) {
  camera.position.addScaledVector(camera.up, ammount)
}

const SENSITIVITY = 0.005

export function getInteractionRotation(camera: Camera) {
  if(controls.locked) {
    const rotation = new Euler(0, 0, 0, 'YXZ')

    rotation.y = controls.mouseX * -SENSITIVITY
    rotation.x = Math.min(Math.max(controls.mouseY * -SENSITIVITY, -PI_2), PI_2)

    camera.quaternion.setFromEuler(rotation)
  }
}