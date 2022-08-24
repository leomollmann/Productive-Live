import React from 'react'
import { OverlayManager, OverlayTypes } from '.'
import MainMenu from './Menu'

type Props = {
    canvas: React.RefObject<HTMLCanvasElement>
}

function Menus({ canvas }: Props) {
    const overlay = OverlayManager.useObserver().current

    switch (overlay) {
        case OverlayTypes.Main: return <MainMenu canvas={canvas} />
        default: return null
    }
}

export default Menus