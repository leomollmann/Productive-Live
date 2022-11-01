import { Material, Object3D } from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

class Model {
    public material?: Material
    public object?: Object3D
    private materialPath: string
    private objectPath: string

    constructor(materialPath: string, objectPath: string) {
        this.materialPath = materialPath
        this.objectPath = objectPath
    }

    async load(): Promise<void> {
        const materialLoader = new MTLLoader()
        const materials = await materialLoader.loadAsync(this.materialPath)
        materials.preload()

        const objectLoader = new OBJLoader()
        objectLoader.materials = materials
        this.object = await objectLoader.loadAsync(this.objectPath)

        this.object.scale.set(0.01, 0.01, 0.01)
    }
}

export default Model