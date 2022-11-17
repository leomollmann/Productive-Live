import React from 'react'
import { GameState, MenuTypes } from '..'
import BuildMenu from './BuildMenu'
import MainMenu from './MainMenu'
import ProductionPlannerMenu from './ProductionPlanner/ProductionPlannerMenu'

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function Menus({ canvas }: Props) {
    const overlay = GameState.useObserver().menu

    const lockPointer = () => {
        canvas.current!.requestPointerLock()
    }

    switch (overlay) {
        case MenuTypes.Main: return <MainMenu close={lockPointer} />
        case MenuTypes.ProductionPlanner: return <ProductionPlannerMenu close={lockPointer} />
        case MenuTypes.Build: return <BuildMenu close={lockPointer} />
        default: return null
    }
}

export default Menus