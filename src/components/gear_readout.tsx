type GearReadoutProps = {
  gear: number
  drive: string
  transmission: string
}

export function GearReadout({ gear, drive, transmission }: GearReadoutProps) {
  return (
    <div className="gear">
      <span className="gear-label">GEAR</span>
      <span className="gear-value">{gear}</span>
      <span className="gear-mode">
        <span className="gear-drive">{drive}</span>
        <span className="gear-dot" aria-hidden="true">
          ·
        </span>
        <span>{transmission}</span>
      </span>
    </div>
  )
}
