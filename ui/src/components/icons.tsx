import { StatusChip } from './status_chip'

type IconProps = {
  className?: string
}

type ActiveIconProps = {
  active: boolean
}

export function FuelIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 20V7.2A2.2 2.2 0 0 1 6.7 5h6.1a2.2 2.2 0 0 1 2.2 2.2V20" />
      <path d="M4.5 20h10.5" />
      <path d="M7.2 9h5" />
      <path d="M15 11.2h1.1a1.8 1.8 0 0 1 1.8 1.8v1.3a1.35 1.35 0 0 0 2.7 0V8.1L18.2 5.8" />
    </svg>
  )
}

export function EngineIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12.5h4.4l1.7-4.4 2.7 8.4 2-4h9.2" />
    </svg>
  )
}

function TurnLeftMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.5 19v-3.2A4.8 4.8 0 0 0 10.7 11H5" />
      <path d="M8.4 7.4 4.6 11l3.8 3.6" />
    </svg>
  )
}

function TurnRightMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 19v-3.2A4.8 4.8 0 0 1 13.3 11H19" />
      <path d="M15.6 7.4 19.4 11l-3.8 3.6" />
    </svg>
  )
}

function SeatBeltMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="4.8" r="2" />
      <path d="M9.1 20.6v-2.3c0-1 .6-1.9 1.5-2.4L12 14.8l1.4.9c.9.5 1.5 1.4 1.5 2.4v2.5" />
      <path d="M8.4 10.4c.9 1.2 2.1 1.8 3.6 1.8s2.7-.6 3.6-1.8" />
      <path d="M6.6 11.4 15.4 20.4" />
    </svg>
  )
}

function LightsMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.2 18h5.6" />
      <path d="M10.2 21h3.6" />
      <path d="M8.4 14.1a5.6 5.6 0 1 1 7.2 0c-.55.45-.9 1.05-.9 1.7V17H9.3v-1.2c0-.65-.35-1.25-.9-1.7z" />
    </svg>
  )
}

function LockMark({ locked }: { locked: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.2" y="10.8" width="11.6" height="8.6" rx="1.8" />
      {locked ? (
        <path d="M8.6 10.8V8.2a3.4 3.4 0 0 1 6.8 0v2.6" />
      ) : (
        <path d="M8.6 10.8V8.2a3.4 3.4 0 0 1 6.8 0V7.2" />
      )}
    </svg>
  )
}

export function TurnLeftIcon({ active }: ActiveIconProps) {
  return (
    <StatusChip
      icon={<TurnLeftMark />}
      tone={active ? 'cyan' : 'muted'}
      iconOnly
      aria-label={active ? 'Left turn signal on' : 'Left turn signal off'}
    />
  )
}

export function TurnRightIcon({ active }: ActiveIconProps) {
  return (
    <StatusChip
      icon={<TurnRightMark />}
      tone={active ? 'cyan' : 'muted'}
      iconOnly
      aria-label={active ? 'Right turn signal on' : 'Right turn signal off'}
    />
  )
}

export function SeatBeltIcon({ active }: ActiveIconProps) {
  return (
    <StatusChip
      icon={<SeatBeltMark />}
      tone={active ? 'cyan' : 'amber'}
      iconOnly
      aria-label={active ? 'Seat belt on' : 'Seat belt off'}
    />
  )
}

export function LightsIcon({ active }: ActiveIconProps) {
  return (
    <StatusChip
      icon={<LightsMark />}
      tone={active ? 'cyan' : 'muted'}
      iconOnly
      aria-label={active ? 'Lights on' : 'Lights off'}
    />
  )
}

export function LockIcon({ active }: ActiveIconProps) {
  return (
    <StatusChip
      icon={<LockMark locked={active} />}
      tone={active ? 'cyan' : 'muted'}
      iconOnly
      aria-label={active ? 'Locked' : 'Unlocked'}
    />
  )
}
