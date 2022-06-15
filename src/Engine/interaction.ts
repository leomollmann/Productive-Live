export enum Keys {
	MoveLeft = 'KeyA',
	MoveRight = 'KeyD',
	MoveForeward = 'KeyW',
	MoveBackward = 'KeyS',
	MoveUp = 'Space',
	MoveDown = 'ShiftLeft',
	Escape = 'Escape'
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
		[Keys.Escape]: false
	},
	locked: false,
	mouseX: 0,
	mouseY: 0
}

export function resetConstrols() {
	for(const key in controls.keys) {
		controls.keys[key as Keys] = false
	}
}

export default controls