# SpeedPulse

A [FiveM](https://fivem.net) speedometer built with React, TypeScript, and Vite. Its main purpose is to show vehicle speed, with RPM, gear, fuel, engine health, and status indicators on the same flat, matte panel. The RPM input follows the FiveM range of `0.0` to `1.0`.

**Author:** Simon Gomes  
**Version:** 1.0.0

## Features

- RPM bar driven by a value from `0.0` to `1.0`, shown as a percentage of the scale
- Each RPM segment keeps the same height when it is lit or idle; only the color changes
- Speed, gear, fuel range, and engine temperature
- Turn signals, seat belt, lights, and lock, each controlled by an `active` flag

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://127.0.0.1:5173`.

## Scripts

| Command        | What it does                       |
| -------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server               |
| `npm run build`   | Typecheck and build for production |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Cluster

`rpm` is a fraction of the full scale. `0` leaves every segment idle, `0.58` lights 58% of the bar, and `1` lights the whole bar. The readout converts that fraction into RPM using the redline.

```tsx
<RpmBar rpm={0.58} redline={7.5} />
```

Lit segments are cyan, then amber in the warning zone and red at redline. Segments that are not lit stay gray.

Status icons take `active`:

| Icon              | `active`            | Inactive              |
| ----------------- | ------------------- | --------------------- |
| Left / right turn | Blue, **ON**        | Gray, **OFF**         |
| Seat belt         | Blue, **SEAT BELT** | Yellow, **SEAT BELT** |
| Lights            | Blue, **LIGHTS ON** | Gray, **LIGHTS OFF**  |
| Lock              | Blue, **LOCKED**    | Gray, **UNLOCKED**    |

```tsx
<TurnLeftIcon active={false} />
<SeatBeltIcon active={false} />
<LightsIcon active={true} />
<LockIcon active={false} />
<TurnRightIcon active={false} />
```

## Project layout

```
src/
  components/
    hud.tsx            Cluster layout
    rpm_bar.tsx        RPM scale
    speed_readout.tsx  Speed
    gear_readout.tsx   Gear
    meter.tsx          Fuel and engine bars
    icons.tsx          Indicator icons
    status_chip.tsx    Indicator frame
    hud.css
```
