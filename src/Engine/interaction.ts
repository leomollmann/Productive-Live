import { buildObject } from "../Tools/build"
import { resizeScene } from "./loop"
import { checkUserState, setIdleState } from "./userSate"

export enum Keys {
	MoveLeft = 'KeyA',
	MoveRight = 'KeyD',
	MoveForeward = 'KeyW',
	MoveBackward = 'KeyS',
	MoveUp = 'Space',
	MoveDown = 'ShiftLeft',
	Escape = 'Escape',
    ProductionPlanner = 'KeyP',
    Cancel = 'KeyC',
	Build = 'KeyB'
}

type Controls = {
	keys: Record<Keys, boolean>
	locked: boolean
	mouseX: number
	mouseY: number
}

const controls: Controls = {
	keys: {
		[Keys.MoveLeft]: false,
		[Keys.MoveRight]: false,
		[Keys.MoveForeward]: false,
		[Keys.MoveBackward]: false,
		[Keys.MoveUp]: false,
		[Keys.MoveDown]: false,
		[Keys.Escape]: false,
		[Keys.Build]: false,
        [Keys.Cancel]: false,
        [Keys.ProductionPlanner]: false
	},
	locked: false,
	mouseX: 0,
	mouseY: 0
}

export function unlockControls() {
	for(const key in controls.keys) {
		controls.keys[key as Keys] = false
	}
	controls.locked = false
}

export function lockControls() {
	controls.locked = true
}

export function addListeners(canvas: React.RefObject<HTMLCanvasElement>) { 
    const onKeyDown = (e: KeyboardEvent) => { 
        controls.keys[e.code as Keys] = true
        checkUserState()
    }
    const onKeyUp = (e: KeyboardEvent) => { controls.keys[e.code as Keys] = false }
    const onMouseMove = (e: MouseEvent) => {
        if(controls.locked) {
            controls.mouseX += e.movementX
            controls.mouseY += e.movementY
        }
    }

    const onPointerlockChange = () => {
        if(document.pointerLockElement === canvas.current) {
            setIdleState()
        } else {
            if(controls.locked) {
                controls.keys[Keys.Escape] = true
                checkUserState()
            }
        }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', resizeScene)
    canvas.current!.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange)
    canvas.current!.addEventListener('click', buildObject)
    canvas.current!.ownerDocument.addEventListener('mousemove', onMouseMove)

    return () => {
        window.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('keyup', onKeyUp)
        window.removeEventListener('resize', resizeScene)
        canvas.current!.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange)
        canvas.current!.removeEventListener('click', buildObject)
        canvas.current!.ownerDocument.removeEventListener('mousemove', onMouseMove)
    }
}

export default controls