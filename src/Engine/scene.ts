import * as THREE from 'three'

export const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf0f0f0)

export const floor = new THREE.GridHelper(100, 50)
scene.add(floor)

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 4, 3)
camera.rotateX(-Math.PI / 3)

const origin = new THREE.Vector3(0, 0, 0)
scene.add(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, 1, 0xff0000))
scene.add(new THREE.ArrowHelper(new THREE.Vector3(1,0,0), origin, 1, 0x00ff00))
scene.add(new THREE.ArrowHelper(new THREE.Vector3(0,0,1), origin, 1, 0x0000ff))

const lights = [
    new THREE.PointLight(0xffffff, 1, 0),
    new THREE.PointLight(0xffffff, 1, 0),
    new THREE.PointLight(0xffffff, 1, 0)
]

lights[0].position.set(0, 200, 0)
lights[1].position.set(100, 200, 100)
lights[2].position.set(-100, -200, -100)

lights.forEach(light => scene.add(light))