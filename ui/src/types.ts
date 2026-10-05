export type HudIndicators = {
  leftTurn: boolean;
  rightTurn: boolean;
  seatBelt: boolean;
  lights: boolean;
  locked: boolean;
};

export type HudMeter = {
  percent: number;
  detail: string;
};

export type HudData = {
  speed: number;
  unit: string;
  rpm: number;
  redline: number;
  gear: number;
  drive: string;
  transmission: string;
  fuel: HudMeter;
  engine: HudMeter;
  indicators: HudIndicators;
};

export type NuiMessage =
  | { action: "setVisible"; visible: boolean }
  | { action: "update"; visible?: boolean; data: HudData };

export const defaultHudData: HudData = {
  speed: 128,
  unit: "KM/H",
  rpm: 0.3,
  redline: 7.5,
  gear: 4,
  drive: "D",
  transmission: "AUTO",
  fuel: {
    percent: 68,
    detail: "286 KM",
  },
  engine: {
    percent: 96,
    detail: "104°C",
  },
  indicators: {
    leftTurn: false,
    rightTurn: false,
    seatBelt: false,
    lights: true,
    locked: false,
  },
};
