import Stats from 'stats.js'
import * as THREE from 'three'
import { getInteractionRotation, getInteractionMovement } from './movement'
import { camera, floor, scene } from './scene'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()
const caster = new THREE.Raycaster()

let renderer: THREE.WebGLRenderer

export function resizeScene() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

export function getFloorContactPoint(): THREE.Intersection<THREE.Object3D<THREE.Event>> | undefined {
    caster.setFromCamera({x: 0, y: 0}, camera)
    return caster.intersectObject(floor)[0]
}

export function pauseGame() {
    clock.stop()
}

export function resumeGame() {
    clock.start()
    animate()
}

function animate() {
    if(!clock.running) return

    stats.begin()
    const delta = clock.getDelta()

    getInteractionMovement(camera, delta)
    getInteractionRotation(camera)

    render()
    stats.end()

    requestAnimationFrame(animate)
}

function render() {
    renderer.clear()
    renderer.render(scene, camera)
    renderer.clearDepth()
}

export function initRenderer(canvas: React.RefObject<HTMLCanvasElement>) {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas.current! })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClear = false

    render()
}