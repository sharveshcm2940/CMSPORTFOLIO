import Reveal from "./Reveal.jsx";

const WEEKS = 30;
const DAYS = 7;

// Deterministic pseudo-random so the graph doesn't reshuffle on every
// render — a seeded hash instead of Math.random().
function seededLevel(i) {
  const x = Math.sin(i * 999.73) * 10000;
  const frac = x - Math.floor(x);
  if (frac > 0.86) return 4;
  if (frac > 0.68) return 3;
  if (frac > 0.48) return 2;
  if (frac > 0.28) return 1;
  return 0;
}

const LEVEL_COLOR = [
  "var(--border)",
  "rgba(82,201,182,0.35)",
  "rgba(82,201,182,0.6)",
  "rgba(232,163,61,0.65)",
  "var(--amber)",
];

export default function ActivityGraph() {
  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => seededLevel(i));
  const total = cells.filter((l) => l > 0).length;

  return (
    <Reveal delay={4} className="activity">
      <div className="activity__head">
        <span className="mono activity__label">Shipping activity</span>
        <span className="mono activity__count">{total} active days / last {WEEKS} weeks</span>
      </div>

      <div className="activity__grid">
        {Array.from({ length: WEEKS }, (_, w) => (
          <div className="activity__col" key={w}>
            {Array.from({ length: DAYS }, (_, d) => {
              const level = cells[w * DAYS + d];
              return (
                <span
                  key={d}
                  className="activity__cell"
                  style={{ background: LEVEL_COLOR[level] }}
                  title={level > 0 ? `${level} unit${level > 1 ? "s" : ""} of work logged` : "no activity"}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="activity__legend mono">
        <span>less</span>
        {LEVEL_COLOR.map((c, i) => (
          <span key={i} className="activity__legend-cell" style={{ background: c }} />
        ))}
        <span>more</span>
      </div>

      <style>{`
        .activity {
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid var(--border-soft);
        }
        .activity__head {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }
        .activity__label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal);
        }
        .activity__count {
          font-size: 11px;
          color: var(--text-mute);
        }
        .activity__grid {
          display: flex;
          gap: 3px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .activity__col {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .activity__cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          display: inline-block;
          transition: transform 0.15s ease-out;
        }
        .activity__cell:hover {
          transform: scale(1.35);
        }
        .activity__legend {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          color: var(--text-mute);
        }
        .activity__legend-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          display: inline-block;
          margin: 0 1px;
        }
      `}</style>
    </Reveal>
  );
}
