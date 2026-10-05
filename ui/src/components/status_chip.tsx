import type { ReactNode } from 'react'

type StatusChipProps = {
  icon: ReactNode
  label?: string
  state?: string
  tone: 'cyan' | 'amber' | 'muted'
  iconOnly?: boolean
  'aria-label'?: string
}

export function StatusChip({
  icon,
  label,
  state,
  tone,
  iconOnly = false,
  'aria-label': ariaLabel,
}: StatusChipProps) {
  return (
    <div
      className={`status status-${tone} is-framed${iconOnly ? ' status-icon-only' : ''}`}
      aria-label={ariaLabel}
    >
      <span className="status-mark">{icon}</span>
      {!iconOnly && state ? (
        <span className="status-label">
          {label ? <span>{label}</span> : null}
          <span className="status-state">{state}</span>
        </span>
      ) : null}
    </div>
  )
}
