import { useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter.js";
import { useMagnetic } from "../hooks/useMagnetic.js";
import TechOrbits from "./TechOrbits.jsx";

const ROLES = [
  "full-stack developer",
  "AI application builder",
  "B.Tech IT student",
  "hackathon winner",
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const scanRef = useRef(null);
  const primaryBtn = useMagnetic(14);
  const secondaryBtn = useMagnetic(10);

  const onMouseMove = (e) => {
    const node = scanRef.current;
    if (!node) return;
    const { innerWidth, innerHeight } = window;
    const px = (e.clientX / innerWidth - 0.5) * 24;
    const py = (e.clientY / innerHeight - 0.5) * 24;
    node.style.transform = `translate(${px}px, ${py}px)`;
  };

  return (
    <section id="hero" className="hero" onMouseMove={onMouseMove}>
      <div className="hero__scan" ref={scanRef} />
      <div className="container hero__inner">
        <div className="hero__grid">
          <div className="hero__content">
            <motion.p
              className="mono hero__loc"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              CHENNAI, INDIA — SESSION ACTIVE
            </motion.p>

            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              C.M. Sharvesh
            </motion.h1>

            <motion.p
              className="mono hero__role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="hero__prompt">$</span> {typed}
              <span className="hero__caret">▌</span>
            </motion.p>

            <motion.p
              className="hero__desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              I build responsive web applications and AI-driven tools — from Flask
              and React front to back — with an eye for the kind of detail that
              turns a working prototype into something people trust.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                ref={primaryBtn.ref}
                className="btn btn--filled"
                href="#projects"
                onMouseMove={primaryBtn.onMouseMove}
                onMouseLeave={primaryBtn.onMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View reports
              </a>
              <a
                ref={secondaryBtn.ref}
                className="btn btn--ghost"
                href="mailto:sharveshcm29@gmail.com"
                onMouseMove={secondaryBtn.onMouseMove}
                onMouseLeave={secondaryBtn.onMouseLeave}
              >
                sharveshcm29@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="hero__badges mono"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__badge">
                <span className="hero__badge-dot hero__badge-dot--live" />
                build: passing
              </span>
              <span className="hero__badge">
                <span className="hero__badge-dot hero__badge-dot--amber" />
                status: open to work
              </span>
              <span className="hero__badge">branch: main</span>
            </motion.div>
          </div>

          <motion.div
            className="hero__orbits-col"
            initial={{ opacity: 0, scale: 0.92, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TechOrbits />
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 68px;
          border-bottom: 1px solid var(--border-soft);
          overflow: hidden;
        }
        .hero__scan {
          position: absolute;
          inset: -24px;
          background:
            radial-gradient(ellipse 800px 400px at 15% 20%, rgba(232,163,61,0.06), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 80%, rgba(82,201,182,0.06), transparent 60%);
          pointer-events: none;
          transition: transform 0.2s ease-out;
          will-change: transform;
        }
        .hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
        }
        .hero__grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hero__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero__orbits-col {
            display: flex;
            justify-content: center;
            margin-top: 24px;
          }
        }
        .hero__loc {
          font-size: 12px;
          letter-spacing: 0.16em;
          color: var(--teal);
          margin-bottom: 28px;
        }
        .hero__name {
          font-size: clamp(48px, 9vw, 104px);
          line-height: 0.98;
          color: var(--text);
        }
        .hero__role {
          margin-top: 26px;
          font-size: clamp(15px, 2vw, 19px);
          color: var(--text-dim);
          min-height: 26px;
        }
        .hero__prompt {
          color: var(--amber);
        }
        .hero__caret {
          color: var(--amber);
          animation: blink 1s steps(1) infinite;
        }
        .hero__desc {
          margin-top: 30px;
          max-width: 540px;
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-dim);
        }
        .hero__actions {
          margin-top: 44px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .hero__badges {
          margin-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.03em;
          color: var(--text-mute);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 7px 13px;
        }
        .hero__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .hero__badge-dot--live {
          background: var(--teal);
          box-shadow: 0 0 0 0 rgba(82,201,182,0.6);
          animation: badge-pulse 2s infinite;
        }
        .hero__badge-dot--amber {
          background: var(--amber);
        }
        @keyframes badge-pulse {
          0% { box-shadow: 0 0 0 0 rgba(82,201,182,0.5); }
          70% { box-shadow: 0 0 0 6px rgba(82,201,182,0); }
          100% { box-shadow: 0 0 0 0 rgba(82,201,182,0); }
        }
        .btn {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 14px 26px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease), transform 0.15s ease-out;
          display: inline-block;
          will-change: transform;
        }
        .btn--filled {
          background: var(--amber);
          color: #14100a;
          border-color: var(--amber);
        }
        .btn--filled:hover {
          transform: translateY(-2px);
          background: #f0ae4d;
        }
        .btn--ghost {
          color: var(--text-dim);
        }
        .btn--ghost:hover {
          color: var(--teal);
          border-color: var(--teal-dim);
          transform: translateY(-2px);
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
