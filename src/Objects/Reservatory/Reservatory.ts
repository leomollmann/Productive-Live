import { Object3D, Scene } from "three"
import { getScalar, Liter } from "../../Physics/SI"
import Model from "../Model"
import ModelType, { ModelInstance, ModelMaster } from "../ModelType"
import material from "./Reservatory.mtl"
import object from "./Reservatory.obj"

class ReservatoryMaster implements ModelMaster {
  id = ModelType.reservatory
  model = new Model(material, object)
  title = "Liquid Reservatory"
  maxCapacity = new Liter(10000)
  capacity = new Liter(2000)
  minCapacity = new Liter(1000)
  basePrice = 1000
  sellFactor = 0.4
  capacity_price = (x: number) => (0.3 * x * x) + 0.4

  getInstace() {
    return new ReservatoryInstance(this.capacity)
  }
}

export const reservatoryMaster = new ReservatoryMaster()

export class ReservatoryInstance implements ModelInstance {
  id = ModelType.reservatory
  owner?: Object3D
  disposed: boolean = false
  inScene: boolean = false
  price: number
  capacity: Liter

  constructor(capacity: Liter) {
    this.owner = reservatoryMaster.model.object?.clone(true)
    this.price = reservatoryMaster.capacity_price(getScalar(capacity, reservatoryMaster.maxCapacity, reservatoryMaster.minCapacity)) * reservatoryMaster.basePrice
    this.capacity = new Liter(capacity.value)
  }

  add(scene: Scene) {
    if(!this.inScene && this.owner) {
      scene.add(this.owner)
      this.inScene = true
    } else {
      throw new Error('Reservatory model not loaded')
    }
  }

  remove(scene: Scene) {
    if(this.owner) scene.remove(this.owner)
    this.disposed = true
    this.inScene = false
  }
}