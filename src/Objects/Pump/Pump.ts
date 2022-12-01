import { Object3D, Scene } from "three"
import { LiterPerSecond, Meter, Pascal, Watt } from "../../Physics/SI"
import Liquid from "../Liquid/Liquid"
import Model from "../Model"
import material from "./Pump.mtl"
import object from "./Pump.obj"

export const PumpMaster = {
  model: new Model(material, object),
  title: "Liquid Pump",
  description: "Centrifugal liquid pump, used to move liquid content between pipes. Moves fluid from the center pipe to the bottom pipe when powered.",
  minPower: new Watt(2000),
  power: new Watt(5000),
  maxPower: new Watt(10000),
  basePrice: 1000,
  sellFactor: 0.2,
  maxHeadXFlow: 80,
  minHeadXFlow: 20,
  headXFlow: 50,
  power_price: (x: number) => (0.3 * x * x) - (0.2 * x) + 0.1,
  power_efficiency: (x: number) => ((-1/Math.exp(x))+2)/2,
  getStats: (liquid: Liquid) => {
    const staticPressure = new Pascal(100000)
    const head = new Meter(10)
    const flow = new LiterPerSecond(10)
    return { staticPressure, head, flow }
  } 
}

export class PumpInstance {
  private owner?: Object3D
  public pressure: number

  constructor(pressure: number) {
    this.pressure = pressure
  }

  add(scene: Scene) {
    if(PumpMaster.model.object) {
      this.owner = PumpMaster.model.object.clone(true)
      scene.add(this.owner)
    } else {
      throw new Error('PumpMaster not loaded')
    }
  }

  remove(scene: Scene) {
    if(this.owner) scene.remove(this.owner)
  }
}