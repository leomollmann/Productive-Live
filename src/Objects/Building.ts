import * as THREE from 'three'

class Building extends THREE.Group {
    public name: string
    public description: string

    constructor(name: string, description: string) {
        super()
        this.name = name
        this.description = description
    }
}

export default Building