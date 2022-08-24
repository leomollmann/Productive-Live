import React from "react"

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function MainMenu({ canvas }: Props) {
    const lockPointer = () => {
        canvas.current!.requestPointerLock()
    }

    return (
        <div className="menu dark">
            <div id="title">Productive</div>
            <button id="play" onClick={lockPointer}>Resume</button>
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