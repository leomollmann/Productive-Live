import React from 'react'
import { OverlayManager, OverlayTypes } from '..'
import BuildMenu from './BuildMenu'
import MainMenu from './MainMenu'

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function Menus({ canvas }: Props) {
    const overlay = OverlayManager.useObserver().current

    switch (overlay) {
        case OverlayTypes.Main: return <MainMenu canvas={canvas} />
        case OverlayTypes.Build: return <BuildMenu canvas={canvas} />
        default: return null
    }
}

export default Menus