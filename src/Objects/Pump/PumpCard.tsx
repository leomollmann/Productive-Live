import { pumpMaster } from './Pump'
import pumpImg from './Pump.png'
import parallelImg from './parallel.png'
import seriesImg from './series.png'
import iconPropeller from './IconPropeller.png'
import iconChassi from './IconChassi.png'
import { initBuild } from '../../Tools/build'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import Button from '../../Components/Button'
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from 'recharts'
import currency from '../../Utils/currency'
import Input from '../../Components/Input'
import useUpdate from '../../Utils/useUpdate'
import MinMaxSlider from '../../Components/MinMaxSlider'
import { Equation } from 'react-equation'
import { getScalar } from '../../Physics/SI'

type Props = {
  close(): void
}

const SAMPLE = 20
const load_efficiency = new Array(SAMPLE + 1).fill(0).map((_, i) => {
  const step: number = i / SAMPLE
  return {
    load: step,
    efficiency: pumpMaster.power_efficiency(step)
  }
})

const maxEfficiency = load_efficiency[SAMPLE]

const price_power = new Array(SAMPLE + 1).fill(0).map((_, i) => {
  const step: number = i / SAMPLE
  const powerFactor = (step * (pumpMaster.maxPower.value - pumpMaster.minPower.value)) + pumpMaster.minPower.value
  return {
    power: powerFactor,
    price: pumpMaster.power_price(step) * pumpMaster.basePrice
  }
})

export function PumpMasterCard({ close }: Props) {
  const update = useUpdate()

  const scalar = getScalar(pumpMaster.power, pumpMaster.maxPower, pumpMaster.minPower)
  const price = pumpMaster.power_price(scalar) * pumpMaster.basePrice

  const build = () => {
    initBuild(pumpMaster, scalar)
    close()
  }

  return (
    <section className='flex flex-col w-full gap-4'>
      <div className='flex gap-4 h-fit w-full'>
        <div
          style={{ backgroundImage: `url("${pumpImg}")` }}
          className="w-48 h-48 shrink-0 bg-cover"
        />
        <span className='flex flex-col gap-3'>
          <h1 className='text-center text-xl'>{pumpMaster.title}</h1>
          <Button onClick={build}>PLACE <VerticalAlignBottomOutlined /></Button>
          <p className='mt-2 text-base'>Centrifugal liquid pump, used to move liquid content between pipes. Moves fluid from the center pipe to the bottom pipe when powered.</p>
        </span>
      </div>

      <div>
        <div className='border-b-[1px] border-primary text-primary text-lg italic text-center mb-4 mx-2'>Power x Price</div>
        <div className='flex flex-col'>
          <ResponsiveContainer height={200} width="100%">
            <AreaChart
              margin={{ left: -20, right: 20 }}
              data={price_power}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3C4F6E" stopOpacity={0.6} />
                  <stop offset="85%" stopColor="#3C4F6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="price" type="monotone" stroke="#3C4F6E" fillOpacity={1} fill="url(#gradient)" />
              <XAxis type="number" dataKey="power" domain={['dataMin', 'dataMax']} tickCount={5} />
              <YAxis type="number" dataKey="price" tickCount={5} />
              <Tooltip
                labelFormatter={x => `Power ${Math.round(x)}W`}
                formatter={(x: any) => `${currency(x)}`}
                separator=": "
                trigger="hover"
              />
            </AreaChart>
          </ResponsiveContainer>
          <span className='ml-auto mt-[-0.2rem] italic text-xs'>
            <Equation value='0.3x^2-0.2x+0.1'/>
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-row justify-center'>
            <p className='end'>Power:</p>
            <b className='text-lg ml-2'>
              <Input 
                unit={pumpMaster.power.unit}
                max={pumpMaster.maxPower.value}
                min={pumpMaster.minPower.value}
                value={pumpMaster.power.value}
                onChange={x => {
                  pumpMaster.power.value = x
                  update()
                }}
              />
            </b>
          </div>
          <MinMaxSlider 
            value={pumpMaster.power.value}
            max={pumpMaster.maxPower.value}
            min={pumpMaster.minPower.value}
            onChange={x => {
              pumpMaster.power.value = x
              update()
            }}
            unit={pumpMaster.power.unit}
          />
          <div className='flex justify-center gap-2 mt-[-1.5rem]'>
            <p>Buy: <b className='text-lg text-red'>{currency(price)}</b></p>
            <p>Sell: <b className='text-lg text-green'>{currency(price * pumpMaster.sellFactor)}</b></p>
          </div>
        </div>
      </div>

      <div>
        <div className='border-b-[1px] border-primary text-primary text-lg italic text-center mb-4 mx-2'>Head x Flow</div>
        <p>The energy above is split in a ratio between head and flow, how high the fluid will climb vs how fast will it move.</p>
        <div className='flex flex-row justify-around mt-2'>
          <span className='flex flex-row'>
            <p className='end'>Head:</p>
            <b className='text-lg ml-2'>
              <Input 
                unit={'%'}
                max={pumpMaster.maxHeadXFlow}
                min={pumpMaster.minHeadXFlow}
                value={pumpMaster.headXFlow}
                onChange={x => {
                  pumpMaster.headXFlow = x
                  update()
                }}
              />
            </b>
          </span>
          <p className='italic'>VS</p>
          <span  className='flex flex-row'>
            <p className='end'>Flow:</p>
            <b className='text-lg ml-2'>
              <Input 
                unit={'%'}
                max={pumpMaster.maxHeadXFlow}
                min={pumpMaster.minHeadXFlow}
                value={100 - pumpMaster.headXFlow}
                onChange={x => {
                  pumpMaster.headXFlow = 100 - x
                  update()
                }}
              />
            </b>
          </span>
        </div>
        <MinMaxSlider 
          value={pumpMaster.headXFlow}
          max={pumpMaster.maxHeadXFlow}
          min={pumpMaster.minHeadXFlow}
          onChange={x => {
            pumpMaster.headXFlow = x
            update()
          }}
          unit={'%'}
        />
        <p className='mt-2'>You can add two pumps together in series or parallel to enhance its individual properties.</p>
        <div className='flex gap-4'>
          <div className="w-full p-3 flex flex-col items-center">
            <p className='italic'>SERIES</p>
            <p>Pump 1 Head + Pump 2 Head</p>
            <div
              style={{ backgroundImage: `url("${seriesImg}")` }}
              className="w-full aspect-square shrink-0 bg-cover"
            />
          </div>
          <div className="w-full p-3 flex flex-col items-center">
            <p className='italic'>PARALLEL</p>
            <p>Pump 1 Flow + Pump 2 Flow</p>
            <div
              style={{ backgroundImage: `url("${parallelImg}")` }}
              className="w-full aspect-square shrink-0 bg-cover"
            />
          </div>
        </div>
      </div>

      <div className='pb-4'>
        <div className='border-b-[1px] border-primary text-primary text-lg italic text-center mb-4 mx-2'>Load x Efficiency</div>
        <p className='mt-2 text-base'>The efficiency curve tells how much of the power is wasted as heat, if the pump suits your system well it will be more efficient.</p>
        <div className='flex flex-col'>
          <ResponsiveContainer height={200} width="100%">
            <AreaChart
              margin={{ left: -20, right: 20 }}
              data={load_efficiency}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3C4F6E" stopOpacity={0.6} />
                  <stop offset="85%" stopColor="#3C4F6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="efficiency" type="monotone" stroke="#3C4F6E" fillOpacity={1} fill="url(#gradient)" />
              <XAxis type="number" dataKey="load" tickCount={5} />
              <YAxis type="number" dataKey="efficiency" tickCount={5} />
              <Tooltip
                labelFormatter={x => `At load ${Math.round(x * 100)}%`}
                formatter={(x: any) => `${Math.round(x * 100)}%`}
                separator=": "
                trigger="hover"
              />
            </AreaChart>
          </ResponsiveContainer>
          <span className='ml-auto mt-[-0.2rem] italic text-xs'>
            <Equation value='(-1/e^x+2)/2'/>
          </span>
        </div>
      </div>
    </section>
  )
}

export function PumpCard() {
  return (
    <div className='bg-white shadow p-2 cursor-pointer text-center gap-2 flex flex-col'>
      <p>{pumpMaster.title}</p>
      <div className="relative spinable">
        <img height={128} width={128} className="relative z-10" src={iconChassi} />
        <img height={128} width={128} className="absolute bottom-0 spinner" src={iconPropeller} />
      </div>
      <p className='text-sm'>Power: {pumpMaster.power.value}{pumpMaster.power.unit}</p>
    </div>
  )
}