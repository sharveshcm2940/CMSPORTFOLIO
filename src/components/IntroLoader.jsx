import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const start = performance.now();
    const durationMs = 1100;
    let frame;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setPct(Math.round(t * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 220);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="intro__inner mono">
            <span className="intro__label">INITIALIZING PORTFOLIO SCAN</span>
            <div className="intro__bar">
              <motion.div
                className="intro__bar-fill"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="intro__pct">{pct.toString().padStart(2, "0")}%</span>
          </div>

          <style>{`
            .intro {
              position: fixed;
              inset: 0;
              z-index: 100;
              background: var(--bg);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .intro__inner {
              width: min(320px, 70vw);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
            }
            .intro__label {
              font-size: 11px;
              letter-spacing: 0.14em;
              color: var(--text-mute);
            }
            .intro__bar {
              width: 100%;
              height: 1px;
              background: var(--border);
              position: relative;
              overflow: hidden;
            }
            .intro__bar-fill {
              position: absolute;
              inset: 0;
              background: linear-gradient(90deg, var(--amber), var(--teal));
            }
            .intro__pct {
              font-size: 13px;
              color: var(--amber);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
