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
import "./hud.css";

const indicators = {
  leftTurn: false,
  rightTurn: false,
  seatBelt: false,
  lights: true,
  locked: false,
};

export function Hud() {
  return (
    <section className="hud" aria-label="Vehicle cluster">
      <RpmBar rpm={0.3} redline={7.5} />

      <div className="cluster">
        <SpeedReadout speed={128} unit="KM/H" />
        <span className="cluster-rule" aria-hidden="true" />
        <GearReadout gear={4} drive="D" transmission="AUTO" />
        <span className="cluster-rule" aria-hidden="true" />
        <div className="meters">
          <Meter
            icon={<FuelIcon />}
            label="FUEL"
            percent={68}
            detail="286 KM"
            tone="cyan"
          />
          <Meter
            icon={<EngineIcon />}
            label="ENGINE"
            percent={96}
            detail="104°C"
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
