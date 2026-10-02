import type { ReactNode } from 'react'

type MeterProps = {
  icon: ReactNode
  label: string
  percent: number
  detail: string
  tone: 'cyan' | 'green'
}

export function Meter({ icon, label, percent, detail, tone }: MeterProps) {
  return (
    <div className={`meter meter-${tone}`}>
      <div className="meter-head">
        <span className="meter-label">
          {icon}
          {label}
        </span>
        <span className="meter-values">
          <span className="meter-percent">{percent}%</span>
          <span className="meter-detail">{detail}</span>
        </span>
      </div>
      <div className="meter-track">
        <span className="meter-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
