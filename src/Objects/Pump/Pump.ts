import { Material, Object3D, Scene } from "three"
import material from "./Pump.mtl"
import object from "./Pump.obj"
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

class PumpModel {
    public material?: Material
    public object?: Object3D

    async load(): Promise<void> {
        const materialLoader = new MTLLoader()
        const materials = await materialLoader.loadAsync(material)
        materials.preload()

        const objectLoader = new OBJLoader()
        objectLoader.materials = materials
        this.object = await objectLoader.loadAsync(object)

        this.object.scale.set(0.01, 0.01, 0.01)
    }
}

export const PumpMaster = {
    model: new PumpModel(),
    title: "Liquid Pump",
    description: "Centrifugal liquid pump, used to move liquid content between pipes. Moves fluid from the bottom pipe to the center pipe when the passive flow isn't enought.",
    pressure: 10,
    curve: (x: number) => ((-1/Math.exp(x))+2)/2
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