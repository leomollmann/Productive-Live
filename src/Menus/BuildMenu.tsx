import React from "react"

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function BuildMenu({ canvas }: Props) {
    const lockPointer = () => {
        canvas.current!.requestPointerLock()
    }

    return (
        <div id="menu">
            <div id="title">Build Menu</div>
            <button id="play" onClick={lockPointer}>Resume</button>
        </div> 
    )
}

export default BuildMenu