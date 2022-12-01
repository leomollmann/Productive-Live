import reservatoryImg from './Reservatory.png'
import iconReservatory from './IconReservatory.png'
import { initBuild } from '../../Tools/build'
import { reservatoryMaster } from './Reservatory'
import Button from '../../Components/Button'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { getScalar } from '../../Physics/SI'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import currency from '../../Utils/currency'
import { Equation } from 'react-equation'
import Input from '../../Components/Input'
import MinMaxSlider from '../../Components/MinMaxSlider'
import useUpdate from '../../Utils/useUpdate'

const SAMPLE = 20
const price_capacity = new Array(SAMPLE + 1).fill(0).map((_, i) => {
  const step: number = i / SAMPLE
  const powerFactor = (step * (reservatoryMaster.maxCapacity.value - reservatoryMaster.minCapacity.value)) + reservatoryMaster.minCapacity.value
  return {
    capacity: powerFactor,
    price: reservatoryMaster.capacity_price(step) * reservatoryMaster.basePrice
  }
})

type Props = {
  close(): void
}

export function ReservatoryMasterCard({ close }: Props) {
  const update = useUpdate()

  const scalar = getScalar(reservatoryMaster.capacity, reservatoryMaster.maxCapacity, reservatoryMaster.minCapacity)
  const price = reservatoryMaster.capacity_price(scalar) * reservatoryMaster.basePrice

  const build = () => {
    initBuild(reservatoryMaster, scalar)
    close()
  }

  return (
    <section className='flex flex-col w-full gap-4 scroll-auto'>
      <div className='flex gap-4 h-fit w-full'>
        <div
          style={{ backgroundImage: `url("${reservatoryImg}")` }}
          className="w-48 h-48 shrink-0 bg-cover"
        />
        <span className='flex flex-col gap-4'>
          <h1 className='text-center text-base'>{reservatoryMaster.title}</h1>
          <Button onClick={build}>PLACE <VerticalAlignBottomOutlined /></Button>
          <p>Liquid storage building, used to hold liquids, create passive pressure or to be a buffer for other machies.</p>
        </span>
      </div>

      <div>
        <div className='border-b-[1px] border-primary text-primary text-lg italic text-center mb-4 mx-2'>Capacity x Price</div>
        <div className='flex flex-col'>
          <ResponsiveContainer height={200} width="100%">
            <AreaChart
              margin={{ left: -20, right: 20 }}
              data={price_capacity}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3C4F6E" stopOpacity={0.6} />
                  <stop offset="85%" stopColor="#3C4F6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="price" type="monotone" stroke="#3C4F6E" fillOpacity={1} fill="url(#gradient)" />
              <XAxis type="number" dataKey="capacity" domain={['dataMin', 'dataMax']} tickCount={5} />
              <YAxis type="number" dataKey="price" tickCount={5} />
              <Tooltip
                labelFormatter={x => `Capacity ${Math.round(x)}L`}
                formatter={(x: any) => `${currency(x)}`}
                separator=": "
                trigger="hover"
              />
            </AreaChart>
          </ResponsiveContainer>
          <span className='ml-auto mt-[-0.2rem] italic text-xs'>
            <Equation value='0.3*x^2+0.4'/>
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-row justify-center'>
            <p className='end'>Power:</p>
            <b className='text-lg ml-2'>
              <Input 
                unit={reservatoryMaster.capacity.unit}
                max={reservatoryMaster.maxCapacity.value}
                min={reservatoryMaster.minCapacity.value}
                value={reservatoryMaster.capacity.value}
                onChange={x => {
                  reservatoryMaster.capacity.value = x
                  update()
                }}
              />
            </b>
          </div>
          <MinMaxSlider 
            unit={reservatoryMaster.capacity.unit}
            max={reservatoryMaster.maxCapacity.value}
            min={reservatoryMaster.minCapacity.value}
            value={reservatoryMaster.capacity.value}
            onChange={x => {
              reservatoryMaster.capacity.value = x
              update()
            }}
          />
          <div className='flex justify-center gap-2 mt-[-1.5rem]'>
            <p>Buy: <b className='text-lg text-red'>{currency(price)}</b></p>
            <p>Sell: <b className='text-lg text-green'>{currency(price * reservatoryMaster.sellFactor)}</b></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReservatoryCard() {
  return (
    <div className='bg-white shadow p-2 cursor-pointer text-center gap-2 flex flex-col'>
      <p>{reservatoryMaster.title}</p>
      <div className="relative expandable">
        <img height={128} width={128} className="relative z-10" src={iconReservatory} />
        <div className='expander w-4 bg-sky-600 absolute bottom-0 left-7' />
      </div>
      <p className='text-sm'>Capacity: {reservatoryMaster.capacity.value}{reservatoryMaster.capacity.unit}</p>
    </div>
  )
}