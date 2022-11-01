import { Object3D, Scene } from "three"
import Model from "../Model"
import material from "./Reservatory.mtl"
import object from "./Reservatory.obj"

export const ReservatoryMaster = {
    model: new Model(material, object),
    title: "Liquid Reservatory",
    description: "Liquid storage building, used to hold liquids, create passive pressure or to be a buffer for other machies.",
    capacity: 10
}

export class ReservatoryInstance {
    private owner?: Object3D
    public pressure: number

    constructor(pressure: number) {
        this.pressure = pressure
    }

    add(scene: Scene) {
        if(ReservatoryMaster.model.object) {
            this.owner = ReservatoryMaster.model.object.clone(true)
            scene.add(this.owner)
        } else {
            throw new Error('PumpMaster not loaded')
        }
    }

    remove(scene: Scene) {
        if(this.owner) scene.remove(this.owner)
    }
}