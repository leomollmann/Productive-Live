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
  power: new Watt(2000),
  curve: (x: number) => ((-1/Math.exp(x))+2)/2,
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