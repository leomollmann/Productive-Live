import React from "react"
import Building from "../Objects/Building"
import { buildObject } from "../Tools/build"

type Props = {
    building: Building
}

function BuildingCard({ building }: Props) {
    return (
        <div onClick={() => buildObject(building.clone())}>
            {building.name}
            {building.description}
        </div>
    )
}

export default BuildingCard