type SpeedReadoutProps = {
  speed: number
  unit: string
}

export function SpeedReadout({ speed, unit }: SpeedReadoutProps) {
  const display = Math.max(0, Math.round(speed)).toString().padStart(3, '0')

  return (
    <div className="speed">
      <span className="speed-value">{display}</span>
      <span className="speed-unit">{unit}</span>
    </div>
  )
}
