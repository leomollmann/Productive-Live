import React from 'react'
import { GameState, OverlayTypes } from '..'
import BuildMenu from './BuildMenu'
import MainMenu from './MainMenu'
import ProductionPlannerMenu from './ProductionPlanner/ProductionPlannerMenu'

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function Menus({ canvas }: Props) {
    const overlay = GameState.useObserver().overlay

    const lockPointer = () => {
        canvas.current!.requestPointerLock()
    }

    switch (overlay) {
        case OverlayTypes.Main: return <MainMenu close={lockPointer} />
        case OverlayTypes.ProductionPlanner: return <ProductionPlannerMenu close={lockPointer} />
        case OverlayTypes.Build: return <BuildMenu close={lockPointer} />
        default: return null
    }
}

export default Menus