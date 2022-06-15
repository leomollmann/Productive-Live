import Stats from 'stats.js'
import * as THREE from 'three'
import controls, { Keys, resetConstrols } from './interaction'
import { getInteractionRotation, getInteractionMovement } from './movement'
import texture from '../Textures/crosshair.png'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const scene = new THREE.Scene()
const clock = new THREE.Clock()
const caster = new THREE.Raycaster()
scene.background = new THREE.Color(0xf0f0f0)

const floor = new THREE.GridHelper(100, 50)
scene.add(floor)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0,4,3)
camera.rotateX(-Math.PI / 3)

const origin = new THREE.Vector3(0,0,0)
scene.add(new THREE.ArrowHelper( new THREE.Vector3(0,1,0), origin, 1, 0xff0000 ))
scene.add(new THREE.ArrowHelper( new THREE.Vector3(1,0,0), origin, 1, 0x00ff00 ))
scene.add(new THREE.ArrowHelper( new THREE.Vector3(0,0,1), origin, 1, 0x0000ff ))

let renderer: THREE.WebGLRenderer

const HUDCamera = new THREE.OrthographicCamera( -window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 10 )
HUDCamera.position.z = 10
const HUDScene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader();
textureLoader.load(texture, texture => {
    const material = new THREE.SpriteMaterial({ map: texture })
    if(!material.map) return

    const width = material.map.image.width
    const height = material.map.image.height

    const crosshair = new THREE.Sprite(material)
    crosshair.center.set(0, 0)
    crosshair.scale.set(width, height, 1)
    HUDScene.add(crosshair)
})

const geometry = new THREE.BoxGeometry()
const lights = [
    new THREE.PointLight( 0xffffff, 1, 0 ),
    new THREE.PointLight( 0xffffff, 1, 0 ),
    new THREE.PointLight( 0xffffff, 1, 0 )
]

lights[0].position.set( 0, 200, 0)
lights[1].position.set( 100, 200, 100)
lights[2].position.set( -100, -200, -100)

lights.forEach(light => scene.add(light))

const materials = {
  basicLine: new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1}),
  phongMesh: new THREE.MeshPhongMaterial({color: 0x156289, emissive: 0x072534, flatShading: true})
}

function onFloor() {
    caster.setFromCamera({x: 0, y: 0}, camera)
    const intersection = caster.intersectObject(floor)[0]

    if(intersection) {
        const cube = new THREE.Group()
        cube.add(new THREE.Mesh(geometry, materials.basicLine.clone()))
        cube.add(new THREE.Mesh(geometry, materials.phongMesh.clone()))
        cube.position.set(intersection.point.x, intersection.point.y, intersection.point.z)
        scene.add(cube)
    }
}

const onKeyDown = (e: KeyboardEvent) => { controls.keys[e.code as Keys] = true 
}
const onKeyUp = (e: KeyboardEvent) => { controls.keys[e.code as Keys] = false }
const onMouseMove = (e: MouseEvent) => {
  if(controls.locked) {
    controls.mouseX += e.movementX
    controls.mouseY += e.movementY
  }
}

export function pauseGame() {
    resetConstrols()
    controls.locked = false
    clock.stop()
}

export function resumeGame() {
    controls.locked = true
    clock.start()
    animate()
}

function animate() {
    if(!clock.running) return

    stats.begin()

    getInteractionMovement(camera)
    getInteractionRotation(camera)

    render()
    stats.end()

    requestAnimationFrame(animate)
}

function render() {
    renderer.clear()
    renderer.render(scene, camera)
    renderer.clearDepth()
    renderer.render(HUDScene, HUDCamera)
}

export function initRenderer(canvas: HTMLCanvasElement) {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClear = false

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        HUDCamera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    } 

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', onWindowResize)
    canvas.addEventListener('click', onFloor)
    canvas.ownerDocument.addEventListener('mousemove', onMouseMove)

    render()
}