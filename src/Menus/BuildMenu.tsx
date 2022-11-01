import { PumpCard } from "../Objects/Pump/PumpCard"

type Props = {
    close(): void
}

function BuildMenu({ close }: Props) {
    return (
        <div className="menu">
            <PumpCard close={close}/>
            <button id="play" onClick={close}>Resume</button>
        </div> 
    )
}

export default BuildMenu