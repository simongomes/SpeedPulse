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

export function RpmBar({
  rpm,
  redline,
  segments = 20,
  warnSegments = 3,
  redSegments = 3,
}: RpmBarProps) {
  const redStart = segments - redSegments;
  const warnStart = redStart - warnSegments;
  const percent = rpmPercent(rpm);
  const filled = litCount(rpm, segments);
  const maxRpm = redStart > 0 ? (redline * 1000 * segments) / redStart : redline * 1000;
  const displayRpm = Math.round(percent * maxRpm);

  const bars = Array.from({ length: segments }, (_, index) => ({
    tone: segmentTone(index, filled, warnStart, redStart),
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
      <div
        className="rpm-bars"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))` }}
      >
        {bars.map((bar, index) => (
          <span key={index} className={`rpm-seg rpm-seg-${bar.tone}`} />
        ))}
      </div>
    </div>
  );
}
