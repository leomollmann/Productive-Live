import { Slider } from "antd"

type Props = {
  max: number
  min: number
  value: number
  onChange(x: number): void
  unit: string
}

function MinMaxSlider({ max, min, value, unit, onChange }: Props) {
  return (
    <div>
      <Slider 
        value={value}
        max={max}
        min={min}
        onChange={onChange}
      />
      <div className="flex justify-between">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

export default MinMaxSlider