import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal>
          <p className="eyebrow">Summary</p>
          <h2 className="section-title">
            A builder who'd rather ship the working version than talk about
            the perfect one.
          </h2>
        </Reveal>

        <div className="about__body">
          <Reveal delay={1}>
            <p className="about__text">
              I'm a B.Tech Information Technology student with hands-on
              experience across web development and AI-based applications.
              I'm comfortable building responsive web applications using
              Flask, React, JavaScript and SQL databases, and I'm drawn to
              software engineering, full-stack development, and AI — with a
              strong willingness to learn whatever the next project asks of
              me.
            </p>
            <p className="about__text mt-4">
              My engineering philosophy centers around modular design systems, robust type safety, and structural micro-optimization. Whether streamlining chest radiograph neural net layers for Edge-device deployment or establishing strict SQLite cascades, I build systems that scale gracefully.
            </p>
          </Reveal>

          <Reveal delay={2} className="about__record">
            <div className="about__record-row">
              <span className="mono about__record-label">Institution</span>
              <span>Sri Venkateswara College of Engineering (SVCE)</span>
            </div>
            <div className="about__record-row">
              <span className="mono about__record-label">Program</span>
              <span>B.Tech, Information Technology</span>
            </div>
            <div className="about__record-row">
              <span className="mono about__record-label">Expected</span>
              <span>2028</span>
            </div>
            <div className="about__record-row">
              <span className="mono about__record-label">Focus Areas</span>
              <span>Data Structures, Database Management, ML Serving</span>
            </div>
            <div className="about__record-row">
              <span className="mono about__record-label">Languages</span>
              <span>English, Tamil</span>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        @media (max-width: 900px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .about__text {
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-dim);
        }
        .about__record {
          margin-top: 36px;
          border-top: 1px solid var(--border-soft);
        }
        .about__record-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 4px;
          border-bottom: 1px solid var(--border-soft);
          font-size: 14.5px;
          color: var(--text);
          transition: background 0.25s var(--ease), padding-left 0.25s var(--ease);
        }
        .about__record-row:hover {
          background: var(--panel);
          padding-left: 12px;
        }
        .about__record-label {
          color: var(--text-mute);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding-top: 2px;
        }
      `}</style>
    </section>
  );
}
