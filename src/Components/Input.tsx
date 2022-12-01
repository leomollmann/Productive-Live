import { useEffect, useState } from "react"

type Props = {
  max: number
  min: number
  value: number
  onChange(x: number): void
  unit: string
}

function Input({ max, min, value, unit, onChange }: Props) {
  const [trueVal, setTrueVal] = useState(value.toString())

  useEffect(() => {
    setTrueVal(value.toString())
  }, [value])

  return (
    <span className="flex flex-row gap-1">
      <input
        className="text-end outline-none w-16 border-b-[1px] border-gray-7"
        max={max} 
        min={min} 
        value={parseInt(trueVal)} 
        onBlur={() => setTrueVal(value.toString())}
        onChange={e => {
          const val = parseInt(e.target.value) || 0
          setTrueVal(e.target.value)
          onChange(Math.min(Math.max(val, min), max))
        }}
      />
      {unit}
    </span>
  )
}

export default Input