import { PumpMaster } from './Pump'
import pumpImg from './Pump.png'
import iconPropeller from './IconPropeller.png'
import iconChassi from './IconChassi.png'
import { GameState } from '../..'
import { initBuild } from '../../Tools/build'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import Button from '../../Components/Button'
import { Chart, LineAdvance, Axis } from "bizcharts";

type Props = {
    close(): void
}

const SAMPLE = 20
const data = new Array(SAMPLE + 1).fill(0).map((_, i) => {
    const step: number = i/SAMPLE
    return {
        work: step,
        efficiency: PumpMaster.curve(step)
    }
})

export function PumpMasterCard() {
    const state = GameState.useObserver()

    const build = () => {
        state.build = PumpMaster.model.object
        initBuild()
        
    }
    
    return (
        <section className='flex flex-col w-full gap-4 scroll-auto'>
            <div className='flex gap-4 h-fit w-full'>
                <img height={192} width={192} src={pumpImg}/>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-center text-base'>{PumpMaster.title}</h1>
                    <Button onClick={build}>PLACE <VerticalAlignBottomOutlined /></Button>
                    <p>{PumpMaster.description}</p>
                </span>
            </div>
            <Chart padding={[20, 20, 20, 40]} autoFit height={300} data={data}  >
                <LineAdvance
                    shape="smooth"
                    
                    area
                    position="work*efficiency"
                />
                <Axis name="work" title={{ text: "Work" }} />
            </Chart>
        </section>
    )
}

export function PumpCard() {
    return (
        <div className='bg-white shadow p-2 cursor-pointer text-center gap-2 flex flex-col'>
            <p>{PumpMaster.title}</p>
            <div className="relative spinable">
                <img height={128} width={128} className="relative z-10" src={iconChassi}/>
                <img height={128} width={128} className="absolute bottom-0 spinner" src={iconPropeller} />
            </div>
            <p className='text-sm'>Work: {PumpMaster.pressure} g/cm²</p>
        </div>
    )
}