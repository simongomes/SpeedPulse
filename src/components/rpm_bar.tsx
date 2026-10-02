type RpmBarProps = {
  rpm: number;
  redline: number;
  segments?: number;
  warnSegments?: number;
  redSegments?: number;
};

type SegmentTone = "active" | "idle" | "warn" | "red";

function rpmPercent(rpm: number) {
  return Math.min(Math.max(rpm, 0), 1);
}

function litCount(rpm: number, segments: number) {
  return Math.round(rpmPercent(rpm) * segments);
}

function segmentTone(
  index: number,
  filled: number,
  warnStart: number,
  redStart: number,
): SegmentTone {
  if (index >= filled) return "idle";
  if (index >= redStart) return "red";
  if (index >= warnStart) return "warn";
  return "active";
}

function segmentHeight(index: number, segments: number): number {
  if (segments <= 1) return 1;
  const t = index / (segments - 1);
  return 0.3 + t * 0.7;
}

export function RpmBar({
  rpm,
  redline,
  segments = 24,
  warnSegments = 4,
  redSegments = 4,
}: RpmBarProps) {
  const redStart = segments - redSegments;
  const warnStart = redStart - warnSegments;
  const percent = rpmPercent(rpm);
  const filled = litCount(rpm, segments);
  const maxRpm = redStart > 0 ? (redline * 1000 * segments) / redStart : redline * 1000;
  const displayRpm = Math.round(percent * maxRpm);

  const bars = Array.from({ length: segments }, (_, index) => ({
    tone: segmentTone(index, filled, warnStart, redStart),
    height: segmentHeight(index, segments),
  }));

  return (
    <div className="rpm">
      <div className="rpm-head">
        <p className="rpm-readout">
          <span className="rpm-value">{displayRpm.toLocaleString("en-US")}</span>
          <span className="rpm-unit">RPM</span>
        </p>
        <p className="rpm-scale">
          <span>REV ×1000</span>
          <span className="rpm-dot" aria-hidden="true">
            ·
          </span>
          <span>REDLINE {redline.toFixed(1)}</span>
        </p>
      </div>
      <div className="rpm-bars" aria-hidden="true">
        {bars.map((bar, index) => (
          <span
            key={index}
            className={`rpm-seg rpm-seg-${bar.tone}`}
            style={{ height: `${bar.height * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
