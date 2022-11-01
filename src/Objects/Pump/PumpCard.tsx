import { PumpMaster } from './Pump'
import pumpImg from './Pump.png'
import iconPropeller from './IconPropeller.png'
import iconChassi from './IconChassi.png'
import { GameState } from '../..'
import { initBuild } from '../../Tools/build'

type Props = {
    close(): void
}

export function PumpMasterCard({ close }: Props) {
    const state = GameState.useObserver()

    const build = () => {
        state.build = PumpMaster.model.object
        initBuild()
        close()
    }
    
    return (
        <div>
            <img height={256} width={256} src={pumpImg}/>
            
            <button onClick={build}>PLACE</button>
        </div>
    )
}

export function PumpCard() {
    return (
        <div className='bg-white shadow p-2 cursor-pointer'>
            <span>{PumpMaster.title}</span>
            <div className="relative">
                <img height={128} width={128} className="relative z-10" src={iconChassi}/>
                <img height={128} width={128} className="absolute bottom-0 hover:spin" src={iconPropeller} />
            </div>
            <span>{PumpMaster.pressure}</span>
        </div>
    )
}