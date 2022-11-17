import { PumpMaster } from './Pump'
import pumpImg from './Pump.png'
import iconPropeller from './IconPropeller.png'
import iconChassi from './IconChassi.png'
import { GameState } from '../..'
import { initBuild } from '../../Tools/build'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import Button from '../../Components/Button'
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  close(): void
}

const SAMPLE = 20
const data = new Array(SAMPLE + 1).fill(0).map((_, i) => {
  const step: number = i / SAMPLE
  return {
    load: step,
    efficiency: PumpMaster.curve(step)
  }
})

export function PumpMasterCard({ close }: Props) {
  const state = GameState.useObserver()

  const build = () => {
    state.build = PumpMaster.model.object
    initBuild()
    close()
  }

  return (
    <section className='flex flex-col w-full gap-4 scroll-auto'>
      <div className='flex gap-4 h-fit w-full'>
        <div
          style={{ backgroundImage: `url("${pumpImg}")` }}
          className="w-48 h-48 shrink-0 bg-cover"
        />
        <span className='flex flex-col gap-2'>
          <h1 className='text-center text-xl'>{PumpMaster.title}</h1>
          <Button onClick={build}>PLACE <VerticalAlignBottomOutlined /></Button>
          <p className='mt-2 text-base'>{PumpMaster.description}</p>
        </span>
      </div>
      <div className='flex gap-2'>
        <ResponsiveContainer height={200} width="100%">
          <AreaChart
            margin={{ left: -20 }}
            data={data}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3C4F6E" stopOpacity={0.6} />
                <stop offset="85%" stopColor="#3C4F6E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area dataKey="efficiency" type="monotone" stroke="#3C4F6E" fillOpacity={1} fill="url(#gradient)" />
            <XAxis type="number" dataKey="load" end={1} begin={0} tickCount={5} />
            <YAxis type="number" dataKey="efficiency" end={1} begin={0} tickCount={5} />
            <Tooltip
              labelFormatter={x => `At load ${Math.round(x * 100)}%`}
              formatter={(x: any) => `${Math.round(x * 100)}%`}
              separator=": "
              trigger="hover"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={200} width="100%">
          <AreaChart
            margin={{ left: -20 }}
            data={data}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3C4F6E" stopOpacity={0.6} />
                <stop offset="85%" stopColor="#3C4F6E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area dataKey="efficiency" type="monotone" stroke="#3C4F6E" fillOpacity={1} fill="url(#gradient)" />
            <XAxis dataKey="load" end={1} begin={0} tickCount={5} />
            <YAxis dataKey="efficiency" end={1} begin={0} tickCount={5} />
            <Tooltip
              labelFormatter={x => `At load ${Math.round(x * 100)}%`}
              formatter={(x: any) => `${Math.round(x * 100)}%`}
              separator=": "
              trigger="hover"
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </section>
  )
}

export function PumpCard() {
  return (
    <div className='bg-white shadow p-2 cursor-pointer text-center gap-2 flex flex-col'>
      <p>{PumpMaster.title}</p>
      <div className="relative spinable">
        <img height={128} width={128} className="relative z-10" src={iconChassi} />
        <img height={128} width={128} className="absolute bottom-0 spinner" src={iconPropeller} />
      </div>
      <p className='text-sm'></p>
    </div>
  )
}