import reservatoryImg from './Reservatory.png'
import iconReservatory from './IconReservatory.png'
import { GameState } from '../..'
import { initBuild } from '../../Tools/build'
import { ReservatoryMaster } from './Reservatory'
import Button from '../../Components/Button'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'

type Props = {
    close(): void
}

export function ReservatoryMasterCard({ close }: Props) {
    const state = GameState.useObserver()

    const build = () => {
        state.build = ReservatoryMaster.model.object
        initBuild()
        close()
    }
    
    return (
        <section className='flex flex-col w-full gap-4 scroll-auto'>
            <div className='flex gap-4 h-fit w-full'>
                <img height={192} width={192} src={reservatoryImg}/>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-center text-base'>{ReservatoryMaster.title}</h1>
                    <Button onClick={build}>PLACE <VerticalAlignBottomOutlined /></Button>
                    <p>{ReservatoryMaster.description}</p>
                </span>
            </div>
        </section>
    )
}

export function ReservatoryCard() {
    return (
        <div className='bg-white shadow p-2 cursor-pointer text-center gap-2 flex flex-col'>
            <p>{ReservatoryMaster.title}</p>
            <div className="relative expandable">
                <img height={128} width={128} className="relative z-10" src={iconReservatory}/>
                <div className='expander w-4 bg-sky-600 absolute bottom-0 left-7'/>
            </div> 
            <p className='text-sm'>Capacity: {ReservatoryMaster.capacity} L</p>
        </div>
    )
}