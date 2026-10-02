import type { ReactNode } from 'react'

type StatusChipProps = {
  icon: ReactNode
  label?: string
  state: string
  tone: 'cyan' | 'amber' | 'muted'
}

export function StatusChip({ icon, label, state, tone }: StatusChipProps) {
  return (
    <div className={`status status-${tone} is-framed`}>
      <span className="status-mark">{icon}</span>
      <span className="status-label">
        {label ? <span>{label}</span> : null}
        <span className="status-state">{state}</span>
      </span>
    </div>
  )
}
