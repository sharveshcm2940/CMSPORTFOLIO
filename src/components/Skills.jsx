import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";

const STACK = [
  { id: "01", label: "Languages", items: ["C", "C++", "Java", "Python", "PHP", "JavaScript"] },
  { id: "02", label: "Web", items: ["HTML", "CSS", "React", "Flask"] },
  { id: "03", label: "Database", items: ["MySQL", "SQLite"] },
  { id: "04", label: "AI / Mobile", items: ["Flutter", "PyTorch", "REST APIs"] },
  { id: "05", label: "Tools", items: ["Git", "GitHub", "VS Code", "PyCharm", "Android Studio"] },
];

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Object-Oriented Programming",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
];

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Stack</p>
          <h2 className="section-title">What I reach for when a project starts.</h2>
        </Reveal>

        <div className="skills__rows">
          {STACK.map((row, i) => (
            <Reveal key={row.id} delay={Math.min(i + 1, 4)} className="skills__row">
              <span className="mono skills__index">{row.id}</span>
              <span className="skills__label">{row.label}</span>
              <div className="skills__chips">
                {row.items.map((item) => (
                  <motion.span
                    key={item}
                    className="mono skills__chip"
                    whileHover={{ y: -3, color: "var(--amber)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4} className="skills__course">
          <span className="mono skills__course-label">Coursework</span>
          <div className="skills__course-list">
            {COURSEWORK.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .skills__rows {
          margin-top: 56px;
          border-top: 1px solid var(--border-soft);
        }
        .skills__row {
          display: grid;
          grid-template-columns: 40px 160px 1fr;
          align-items: baseline;
          gap: 20px;
          padding: 22px 12px;
          border-bottom: 1px solid var(--border-soft);
          position: relative;
          transition: all 0.3s var(--ease);
        }
        .skills__row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--amber);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s var(--ease);
        }
        .skills__row:hover {
          background: linear-gradient(90deg, rgba(232, 163, 61, 0.03) 0%, transparent 100%);
          padding-left: 20px;
        }
        .skills__row:hover::before {
          transform: scaleY(1);
        }
        .skills__index {
          font-size: 12px;
          color: var(--text-mute);
        }
        .skills__label {
          font-family: var(--font-display);
          font-size: 17px;
          color: var(--text);
        }
        .skills__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
        }
        .skills__chip {
          font-size: 13px;
          color: var(--text-dim);
          position: relative;
        }
        .skills__chip:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -10px;
          top: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--border);
          transform: translateY(-50%);
        }
        @media (max-width: 700px) {
          .skills__row {
            grid-template-columns: 30px 1fr;
          }
          .skills__chips {
            grid-column: 1 / -1;
          }
        }
        .skills__course {
          margin-top: 56px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          align-items: baseline;
        }
        .skills__course-label {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal);
        }
        .skills__course-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          font-size: 14px;
          color: var(--text-dim);
        }
      `}</style>
    </section>
  );
}
