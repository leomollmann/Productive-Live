import React from "react"
import ShaftMine from "../Objects/ShaftMine"
import BuildingCard from "./BuildingCard"

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

const buildings = [
    new ShaftMine()
]

function BuildMenu({ canvas }: Props) {
    const lockPointer = () => {
        canvas.current!.requestPointerLock()
    }

    return (
        <div className="menu">
            <div className="menu-container">
                <h1>Build Menu</h1>
                <div>
                    {buildings.map(x => <BuildingCard building={x}/>)}
                </div>
                <button id="play" onClick={lockPointer}>Resume</button>
            </div>
        </div> 
    )
}

export default BuildMenu