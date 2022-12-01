import { Object3D, Scene } from "three"
import { getScalar, LiterPerSecond, Meter, Pascal, Watt } from "../../Physics/SI"
import Model from "../Model"
import ModelType, { ModelInstance, ModelMaster } from "../ModelType"
import material from "./Pump.mtl"
import object from "./Pump.obj"

class PumpMaster implements ModelMaster {
  id = ModelType.pump
  title = "Liquid Pump"
  model = new Model(material, object)
  minPower = new Watt(2000)
  power = new Watt(5000)
  maxPower = new Watt(10000)
  basePrice = 4000
  sellFactor = 0.2
  maxHeadXFlow = 80
  minHeadXFlow = 20
  headXFlow = 50
  power_price = (x: number) => (0.3 * x * x) - (0.2 * x) + 0.1
  power_efficiency = (x: number) => ((-1/Math.exp(x))+2)/2

  getStats() {
    const staticPressure = new Pascal(100000)
    const head = new Meter(10)
    const flow = new LiterPerSecond(10)
    return { staticPressure, head, flow }
  }
  
  getInstace() {
    return new PumpInstance(
      new Watt(this.power.value),
      this.headXFlow
    )
  }
}

export const pumpMaster = new PumpMaster()

export class PumpInstance implements ModelInstance {
  id = ModelType.pump
  disposed: boolean = false
  inScene: boolean = false
  owner?: Object3D
  price: number
  power: Watt
  headXFlow: number


  constructor(power: Watt, headXFlow: number) {
    this.owner = pumpMaster.model.object?.clone(true)
    this.price = pumpMaster.power_price(getScalar(power, pumpMaster.maxPower, pumpMaster.minPower)) * pumpMaster.basePrice
    this.power = power
    this.headXFlow = headXFlow
  }

  add(scene: Scene) {
    if(!this.inScene && this.owner) {
      scene.add(this.owner)
      this.inScene = true
    } else {
      throw new Error('Pump model not loaded')
    }
  }

  remove(scene: Scene) {
    if(this.owner) scene.remove(this.owner)
    this.disposed = true
    this.inScene = false
  }
}