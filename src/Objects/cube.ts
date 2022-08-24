import * as THREE from 'three'

export class Cube extends THREE.Group {
    static _geometry = new THREE.BoxGeometry()
    static _lineMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1})
    static _meshMaterial = new THREE.MeshPhongMaterial({color: 0x156289, emissive: 0x072534, flatShading: true})

    constructor() {
        super()
        this.add(new THREE.Mesh(Cube._geometry, Cube._lineMaterial.clone()))
        this.add(new THREE.Mesh(Cube._geometry, Cube._meshMaterial.clone()))
    }
}