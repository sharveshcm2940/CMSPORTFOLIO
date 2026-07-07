import { useRef } from "react";
import Reveal from "./Reveal.jsx";

const LOG = [
  "$ git clone je-infonet/web-team",
  "> onboarding complete — role: Web Developer Intern",
  "> building responsive pages with HTML, CSS, JavaScript, Flask",
  "> assisting backend integration, testing, debugging",
  "> collaborating via Git across the team",
  "$ duration: 1 month — status: complete",
];

export default function Experience() {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-2px)`;
    node.style.boxShadow = `${px * -10}px ${py * -10}px 30px rgba(82, 201, 182, 0.08)`;
  };

  const onMouseLeave = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    node.style.boxShadow = "none";
  };

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Log</p>
          <h2 className="section-title">Where I've put the stack to work.</h2>
        </Reveal>

        <Reveal delay={1}>
          <div 
            ref={cardRef}
            className="experience__card"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out", willChange: "transform" }}
          >
            <div className="experience__head">
              <div>
                <h3 className="experience__role">Web Developer Intern</h3>
                <p className="mono experience__org">JE INFONET</p>
              </div>
              <span className="mono experience__duration">1 MONTH</span>
            </div>

            <div className="experience__terminal mono">
              <div className="experience__terminal-bar">
                <span /> <span /> <span />
                <span className="experience__terminal-title">intern-log.sh</span>
              </div>
              <div className="experience__terminal-body">
                {LOG.map((line, i) => (
                  <p key={i} style={{ animationDelay: `${i * 0.12}s` }} className="experience__line">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .experience__card {
          margin-top: 56px;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          background: var(--panel);
        }
        .experience__head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 28px 32px;
          border-bottom: 1px solid var(--border-soft);
          flex-wrap: wrap;
          gap: 12px;
        }
        .experience__role {
          font-size: 21px;
          color: var(--text);
        }
        .experience__org {
          margin-top: 6px;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--teal);
        }
        .experience__duration {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--amber);
          border: 1px solid var(--amber-dim);
          padding: 6px 12px;
          border-radius: 999px;
          height: fit-content;
        }
        .experience__terminal-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          background: var(--bg-soft);
          border-bottom: 1px solid var(--border-soft);
        }
        .experience__terminal-bar span:not(.experience__terminal-title) {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--border);
          display: inline-block;
        }
        .experience__terminal-title {
          margin-left: 10px;
          font-size: 11px;
          color: var(--text-mute);
        }
        .experience__terminal-body {
          padding: 22px 28px 28px;
        }
        .experience__line {
          font-size: 13.5px;
          line-height: 2.1;
          color: var(--text-dim);
          opacity: 0;
          animation: type-in 0.5s var(--ease) forwards;
        }
        @keyframes type-in {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .experience__line:first-child,
        .experience__line:last-child {
          color: var(--amber);
        }
      `}</style>
    </section>
  );
}
