type SpeedReadoutProps = {
  speed: number
  unit: string
}

export function SpeedReadout({ speed, unit }: SpeedReadoutProps) {
  return (
    <div className="speed">
      <span className="speed-value">{speed}</span>
      <span className="speed-unit">{unit}</span>
    </div>
  )
}
