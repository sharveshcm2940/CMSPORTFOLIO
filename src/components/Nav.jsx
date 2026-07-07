import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScanProgress } from "../hooks/useScanProgress.js";
import { useTheme } from "../hooks/useTheme.js";

const LINKS = [
  { id: "about", label: "Summary" },
  { id: "terminal", label: "Console" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Log" },
  { id: "projects", label: "Reports" },
  { id: "project-timeline", label: "Chronology" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { progress } = useScanProgress(LINKS.map((l) => l.id));
  const { theme, changeTheme } = useTheme();

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="nav">
      <div className="nav__inner container">
        <button className="nav__mark mono" onClick={() => scrollTo("hero")}>
          C.M.S<span className="nav__mark-dot">_</span>
        </button>

        <nav className="nav__links mono">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav__right">
          {/* Global Theme Selector */}
          <div className="theme-selector mono">
            <span className="theme-selector__label">THEME:</span>
            <select
              className="theme-selector__select"
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              aria-label="Change system theme"
            >
              <option value="classic">Classic</option>
              <option value="matrix">Matrix</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="amber">Amber CRT</option>
              <option value="monochrome">Stark Mono</option>
            </select>
          </div>

          <button
            className="nav__toggle mono"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Progress Bar */}
      <div className="nav__progress" style={{ width: `${progress}%` }} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__drawer mono"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((l, i) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}>
                <span className="nav__drawer-index">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(13, 18, 16, 0.72);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-soft);
        }
        .nav__inner {
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__mark {
          background: none;
          border: none;
          color: var(--text);
          font-size: 15px;
          letter-spacing: 0.06em;
          cursor: pointer;
          padding: 0;
        }
        .nav__mark-dot {
          color: var(--amber);
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .nav__links {
          display: flex;
          gap: 28px;
        }
        .nav__links button, .nav__toggle {
          background: none;
          border: none;
          color: var(--text-dim);
          font-size: 12.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 0;
          position: relative;
        }
        .nav__links button::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: var(--amber);
          transition: width 0.3s var(--ease);
        }
        .nav__links button:hover::after {
          width: 100%;
        }
        .nav__links button:hover {
          color: var(--text);
        }
        
        .nav__right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        /* High tech theme selector style */
        .theme-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          border: 1px solid var(--border-soft);
          background: rgba(0, 0, 0, 0.25);
          padding: 4px 8px;
          border-radius: 3px;
        }
        .theme-selector__label {
          color: var(--text-mute);
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .theme-selector__select {
          background: none;
          border: none;
          color: var(--amber);
          outline: none;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding-right: 4px;
        }
        .theme-selector__select option {
          background: var(--panel);
          color: var(--text);
          font-weight: normal;
        }
        
        .nav__toggle {
          display: none;
          color: var(--amber);
        }
        @media (max-width: 780px) {
          .nav__links { display: none; }
          .nav__toggle { display: block; }
        }
        .nav__drawer {
          display: none;
        }
        @media (max-width: 780px) {
          .nav__drawer {
            display: flex;
            flex-direction: column;
            background: var(--bg-soft);
            border-bottom: 1px solid var(--border-soft);
          }
          .nav__drawer button {
            display: flex;
            gap: 14px;
            align-items: baseline;
            background: none;
            border: none;
            border-top: 1px solid var(--border-soft);
            color: var(--text-dim);
            text-align: left;
            padding: 16px 20px;
            font-size: 14px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .nav__drawer-index {
            color: var(--amber);
            font-size: 11px;
          }
        }
        .nav__progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--amber) 0%, var(--teal) 100%);
          box-shadow: 0 1px 4px rgba(232, 163, 61, 0.3);
          transition: width 0.1s ease-out;
        }
      `}</style>
    </header>
  );
}
