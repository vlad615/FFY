import { useState } from 'react'
import s from './DualRange.module.css'

interface DualRangeProps {
  min: number
  max: number
  step?: number
  onChange?: (range: [number, number]) => void
}

export function DualRange({ min, max, step = 1, onChange }: DualRangeProps) {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)

  const toPercent = (value: number) => ((value - min) / (max - min)) * 100

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step)
    setMinVal(value)
    onChange?.([value, maxVal])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step)
    setMaxVal(value)
    onChange?.([minVal, value])
  }

  return (
    <div className={s.dualRange}>
      <div className={s.dualRangeTrack} />
      <div
        className={s.dualRangeProgress}
        style={{
          left: `${toPercent(minVal)}%`,
          right: `${100 - toPercent(maxVal)}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className={s.dualRangeInput}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className={s.dualRangeInput}
      />
      <div className={s.dualRangeValues}>
        <span>Raiting</span>
        <span>
          {minVal} - {maxVal}
        </span>
      </div>
    </div>
  )
}
