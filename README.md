# SpeedPulse

A [FiveM](https://fivem.net) speedometer built with React, TypeScript, and Vite. Its main purpose is to show vehicle speed, with RPM, gear, fuel, engine health, and status indicators on the same flat, matte panel. The RPM input follows the FiveM range of `0.0` to `1.0`.

**Author:** Simon Gomes  
**Version:** 1.0.0

## Features

- RPM bar driven by a value from `0.0` to `1.0`, shown as a percentage of the scale
- Each RPM segment keeps the same height when it is lit or idle; only the color changes
- Speed, gear, fuel range, and engine temperature
- Turn signals, seat belt, lights, and lock, each controlled by an `active` flag

## Resource layout

```
SpeedPulse/
  fxmanifest.lua
  client/main.lua       NUI visibility + vehicle telemetry
  server/main.lua       Server entry (hooks later)
  shared/config.lua     Tunables (units, interval, redline)
  ui/                   React + Vite NUI project
    src/
      components/
      app.tsx
      types.ts
    dist/               Built NUI (required in-game)
```

## Install (FiveM)

1. Place this folder in your server `resources` directory (already under `[local]` is fine).
2. Build the UI once:

```bash
cd ui
yarn install
yarn build
```

3. Ensure `server.cfg` (or your resources list) includes:

```cfg
ensure SpeedPulse
```

4. Restart the resource or the server.

## UI development

```bash
cd ui
yarn install
yarn dev
```

Open the local URL Vite prints, usually `http://127.0.0.1:5173`. The browser preview uses mock HUD data. In-game, `client/main.lua` pushes live updates via `SendNUIMessage`.

| Command       | What it does                       |
| ------------- | ---------------------------------- |
| `yarn dev`    | Start the Vite dev server          |
| `yarn build`  | Typecheck and build into `ui/dist` |
| `yarn preview`| Preview the production build       |
| `yarn lint`   | Run ESLint                         |

## Config

Edit `shared/config.lua`:

| Key                 | Default | Meaning                                      |
| ------------------- | ------- | -------------------------------------------- |
| `UpdateInterval`    | `100`   | Client → NUI refresh rate (ms)               |
| `UseMetric`         | `true`  | `true` = KM/H, `false` = MPH                 |
| `Redline`           | `7.5`   | Redline shown on the RPM scale (x1000)       |
| `HideWhenOnFoot`    | `true`  | Hide HUD when not in a vehicle               |
| `DriverOnly`        | `true`  | Only show for the driver seat                |

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
