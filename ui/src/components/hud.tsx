import {
  EngineIcon,
  FuelIcon,
  LightsIcon,
  LockIcon,
  SeatBeltIcon,
  TurnLeftIcon,
  TurnRightIcon,
} from "./icons";
import { GearReadout } from "./gear_readout";
import { Meter } from "./meter";
import { RpmBar } from "./rpm_bar";
import { SpeedReadout } from "./speed_readout";
import type { HudData } from "../types";
import "./hud.css";

type HudProps = {
  data: HudData;
};

export function Hud({ data }: HudProps) {
  const { indicators } = data;

  return (
    <section className="hud" aria-label="Vehicle cluster">
      <RpmBar rpm={data.rpm} redline={data.redline} />

      <div className="cluster">
        <SpeedReadout speed={data.speed} unit={data.unit} />
        <span className="cluster-rule" aria-hidden="true" />
        <GearReadout
          gear={data.gear}
          drive={data.drive}
          transmission={data.transmission}
        />
        <span className="cluster-rule" aria-hidden="true" />
        <div className="meters">
          <Meter
            icon={<FuelIcon />}
            label="FUEL"
            percent={data.fuel.percent}
            detail={data.fuel.detail}
            tone="cyan"
          />
          <Meter
            icon={<EngineIcon />}
            label="ENGINE"
            percent={data.engine.percent}
            detail={data.engine.detail}
            tone="green"
          />
        </div>
      </div>

      <div className="statuses">
        <TurnLeftIcon active={indicators.leftTurn} />
        <SeatBeltIcon active={indicators.seatBelt} />
        <LightsIcon active={indicators.lights} />
        <LockIcon active={indicators.locked} />
        <TurnRightIcon active={indicators.rightTurn} />
      </div>
    </section>
  );
}
