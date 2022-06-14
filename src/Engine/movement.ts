import { Camera, Euler, Vector3 } from "three";
import controls from "./interaction";

const PI_2 = Math.PI / 2
const BASE_VELOCITY = 0.1

export function getInteractionMovement(camera: Camera) {
  if(controls.locked) {
    if(controls.keys.KeyW) moveZ(camera, BASE_VELOCITY)
    else if(controls.keys.KeyS) moveZ(camera, -BASE_VELOCITY)

    if(controls.keys.KeyD) moveX(camera, BASE_VELOCITY)
    else if(controls.keys.KeyA) moveX(camera, -BASE_VELOCITY)
    
    if(controls.keys.Space) moveY(camera, BASE_VELOCITY)
    else if(controls.keys.ShiftLeft) moveY(camera, -BASE_VELOCITY)
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