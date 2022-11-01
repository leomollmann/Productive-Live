import { PumpMaster } from "../Objects/Pump/Pump"

type Props = {
    close(): void 
}

Promise.all([
    PumpMaster.model.load()
])

function MainMenu({ close }: Props) {
    return (
        <div className="menu dark">
            <div id="title">Productive</div>
            <button id="play" onClick={close}>Resume</button>
            <div id="instructions">
                <span>Move: WASD</span>
                <span>Up: SPACE</span>
                <span>Down: Left Shift</span>
                <span>Look: Mouse</span>
                <span>Place: Left Click</span>
            </div>
        </div> 
    )
}

export default MainMenu