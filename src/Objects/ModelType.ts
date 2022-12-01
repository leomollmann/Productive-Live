import { Object3D, Scene } from "three"
import Model from "./Model"

enum ModelType {
  'pump', 'reservatory', 'pipe'
}

export interface ModelInstance {
  id: ModelType
  owner?: Object3D
  disposed: boolean
  inScene: boolean
  price: number
  add(scene: Scene): void
  remove(scene: Scene): void
}

export type ModelMaster = {
  id: ModelType
  title: string
  model: Model
  getInstace(): ModelInstance
}

export default ModelType