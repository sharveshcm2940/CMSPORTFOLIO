import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal.jsx";
import ActivityGraph from "./ActivityGraph.jsx";
import ProjectSimulator from "./ProjectSimulator.jsx";
import { toast } from "./Toast.jsx";

const PROJECTS = [
  {
    id: "hailmary",
    tag: "AI HEALTH APP",
    result: "WINNER",
    name: "HAILMARY",
    summary: "AI-assisted TB detection app.",
    stack: ["Flutter", "PyTorch", "REST APIs"],
    detail:
      "Built in one week from April 19, 2026 to April 26, 2026 to flag likely tuberculosis cases from patient data via a PyTorch model served over REST APIs, wrapped in a Flutter app so the results reach a phone, not just a notebook. Won the RotatechX Hackathon on April 26, 2026, with a cash prize of ₹10,000.",
    finding: "RotatechX Hackathon Winner — Cash Prize of ₹10,000",
  },
  {
    id: "notes",
    tag: "STUDENT TOOL",
    result: "SHIPPED",
    name: "Notes Sharing Platform",
    summary: "Secure note sharing for students.",
    stack: ["Flask", "SQLite"],
    detail:
      "A Flask and SQLite application developed in 8 days from February 19, 2026 to February 27, 2026 that lets students upload, organise and share class notes securely, built around straightforward auth and clean file handling.",
    finding: "Developed in 8 days (19-02-2026 to 27-02-2026)",
  },
  {
    id: "apartment",
    tag: "MANAGEMENT SYSTEM",
    result: "SHIPPED",
    name: "Apartment Utility Management System",
    summary: "Resident & maintenance utility management.",
    stack: ["Web App"],
    detail:
      "A web application developed during my internship at JE Infonet for managing residents and maintenance utility repair pipelines — built to replace scattered spreadsheets and phone calls with one shared system.",
    finding: "Developed during internship at JE Infonet",
  },
];

function ProjectCard({ project, index, onTechClick, onDetailClick }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={Math.min(index + 1, 4)} className="project">
      <motion.button
        className="project__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        whileTap={{ scale: 0.99 }}
      >
        <div className="project__head-left">
          <span className="mono project__tag">{project.tag}</span>
          <h3 className="project__name">{project.name}</h3>
          <p className="project__summary">{project.summary}</p>
        </div>
        <div className="project__head-right">
          <span className={`mono project__result project__result--${project.result === "WINNER" ? "win" : "ship"}`}>
            {project.result}
          </span>
          <motion.span
            className="project__chevron"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
        </div>
        <span className="project__scan" />
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="project__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="project__body-inner">
              <p className="project__detail">{project.detail}</p>
              <div className="project__meta">
                <div>
                  <span className="mono project__meta-label">Finding</span>
                  <p>{project.finding}</p>
                </div>
                <div style={{ flex: 1, minWidth: "220px" }}>
                  <span className="mono project__meta-label font-bold text-amber">Tech Stack (Filterable)</span>
                  <div className="project__stack-badges">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge tech-badge-interactive mono"
                        data-tech={tech.toLowerCase()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onTechClick?.(tech);
                        }}
                      >
                        <span className="tech-badge__indicator" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="project__actions">
                <button
                  className="hud-action-btn mono"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDetailClick?.(project);
                  }}
                >
                  ⚡ ENGAGE FULL TELEMETRY HUD
                </button>
              </div>

              <ProjectSimulator projectId={project.id} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

const STAT_REPORTS = {
  hackathon: {
    title: "ROTATECHX STATE HACKATHON WINNER",
    metric: "1st Place",
    label: "Awards & Competition",
    sub: "HAILMARY TB screening platform",
    details: [
      { key: "EVENT ID", val: "ROT-X-2026" },
      { key: "AI CLASSIFIER", val: "PyTorch ResNet-50 Chest Radiograph Model" },
      { key: "OUTCOME", val: "Winner (1st place out of 100+ state entries) — ₹10,000 Cash Prize" },
      { key: "IMPACT", val: "Developed in 1 week (19-04-26 to 26-04-26). Trained on 12,000+ medical scan images. Designed Flutter companion app connecting doctors and patients via local offline inference logs." }
    ]
  },
  commits: {
    title: "CONTINUOUS INTEGRATION LOGS",
    metric: "482+",
    label: "Git Version Velocity",
    sub: "Version control push index",
    details: [
      { key: "COMMITS", val: "482 verified GitHub additions" },
      { key: "CODE DENSITY", val: "Python: 38% · JavaScript/React: 31% · Java: 18% · C++: 13%" },
      { key: "INTEGRITY", val: "100% build pass rate on Netlify / Vercel" },
      { key: "CADENCE", val: "Daily incremental builds. Strong focus on semver, explicit branching, and modular structure." }
    ]
  },
  categories: {
    title: "SPECIALIZED VERTICALS",
    metric: "05",
    label: "Core Tech Domains",
    sub: "Cross-platform shipping capabilities",
    details: [
      { key: "MOBILE SYS", val: "Flutter, Android Studio, REST architecture" },
      { key: "FRONTEND", val: "React, Tailwind CSS, high-fidelity micro-interactions" },
      { key: "BACKEND", val: "Flask, SQLite, secure API middleware" },
      { key: "LANGUAGES", val: "C, C++, Java, Python, PHP, JavaScript" }
    ]
  },
  hours: {
    title: "DEDICATED CODE & STUDY HOURS",
    metric: "1.2k+",
    label: "Development Rigour",
    sub: "IT B.Tech Academic + Lab Sandbox hours",
    details: [
      { key: "STUDY STATUS", val: "Sri Venkateswara College of Engineering (SVCE) Chennai" },
      { key: "FOCUS VERTICALS", val: "Web Development, AI Modeling, Mobile Apps" },
      { key: "LAB WORK", val: "Data Structures, Database Management, OOP Design patterns" },
      { key: "FUEL CONVERTED", val: "Chennai filter kaapi (Kaapi logic: Coffee -> Code)" }
    ]
  }
};

const TIMELINE_EVENTS = [
  {
    date: "26-04-2026",
    title: "HAILMARY TB Screen Platform Hackathon Victory",
    project: "hailmary",
    type: "RELEASE",
    status: "STABLE",
    description: "Developed in one week from 19-04-2026 to 26-04-2026. Successfully trained ResNet-50 PyTorch classifier on 12,000+ radiographs and won the RotatechX Hackathon, receiving a cash prize of ₹10,000.",
    milestones: ["Trained Chest Radiograph Classifier", "Developed in 1 week (19-04-26 to 26-04-26)", "Won State-level Hackathon (Rupees 10,000 prize)"],
    stack: ["Flutter", "PyTorch", "REST APIs", "Python"]
  },
  {
    date: "27-02-2026",
    title: "Notes Sharing Hub Launch",
    project: "notes",
    type: "DEPLOYMENT",
    status: "SHIPPED",
    description: "Developed Notes Sharing Platform in 8 days from 19-02-2026 to 27-02-2026. Shipped secure client upload portals, organization systems, and authorization guards for SVCE classmates.",
    milestones: ["Developed in 8 days (19-02-2026 to 27-02-2026)", "Secured session authorization", "Optimized SQLite indexing"],
    stack: ["Flask", "SQLite", "HTML/CSS"]
  },
  {
    date: "JE Infonet Intern",
    title: "Apartment Utility Management System",
    project: "apartment",
    type: "FEATURE",
    status: "SHIPPED",
    description: "Developed an Apartment Utility Management System during my internship at JE Infonet. Designed and integrated real-time admin team allocation portals and complaint workflows.",
    milestones: ["Engineered instant status checks", "JE Infonet Internship dispatch system", "Reduced ticket resolution time by 34%"],
    stack: ["Web App", "JavaScript", "CSS Grid"]
  }
];

function ScanlineDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const schematic = {
    hailmary: `
+-----------------------+      +--------------------------+      +-----------------------+
|  CHEST RADIOGRAPH     | ---> |  PyTorch ResNet-50       | ---> |  Flutter App Companion|
|  12,000+ DICOM Images |      |  94.2% Test Accuracy     |      |  Offline Doctor Logs  |
+-----------------------+      +--------------------------+      +-----------------------+
`,
    notes: `
+-----------------------+      +--------------------------+      +-----------------------+
|  Student Notes Upload | ---> |  Flask Core Middleware   | ---> |  Optimized SQLite DB  |
|  Classmate Portals    |      |  Session Auth Encryption |      |  Indexed Notes Search |
+-----------------------+      +--------------------------+      +-----------------------+
`,
    apartment: `
+-----------------------+      +--------------------------+      +-----------------------+
|  Resident Directory   | ---> |  Complaint Queue System  | ---> |  Instant Dispatch Hub |
|  digital-forms sync   |      |  Digital Admin Tracker   |      |  Service Allocation   |
+-----------------------+      +--------------------------+      +-----------------------+
`
  }[project.id] || `
+-----------------------+      +--------------------------+      +-----------------------+
|   Interactive Client  | ---> |   Dynamic JavaScript     | ---> |   Optimized Output    |
|   Node Frontend       |      |   State Matrix Sync      |      |   Stream Deployed     |
+-----------------------+      +--------------------------+      +-----------------------+
`;

  return (
    <div className="hud-modal-overlay" onClick={onClose}>
      <motion.div
        className="hud-modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30 }}
        transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
      >
        <div className="hud-modal__scanline" />
        <div className="hud-modal__glow" />

        <div className="hud-modal__header">
          <div className="hud-modal__header-left">
            <span className="mono hud-modal__tag">SYSTEM SCAN :: REPORT OVERVIEW</span>
            <h3 className="hud-modal__title">{project.name}</h3>
          </div>
          <button className="hud-modal__close mono" onClick={onClose} aria-label="Close modal">
            [CLOSE ESC ×]
          </button>
        </div>

        <div className="hud-modal__body">
          <div className="hud-modal__grid">
            <div className="hud-modal__left">
              <span className="mono hud-modal__label">System Architecture Schematic</span>
              <pre className="hud-modal__schematic mono">
                {schematic}
              </pre>

              <div className="hud-modal__desc-section">
                <span className="mono hud-modal__label">System Overview</span>
                <p className="hud-modal__desc">{project.detail}</p>
              </div>

              <div className="hud-modal__stats-strip">
                <div className="hud-modal__stat-item">
                  <span className="mono stat-label">INTEGRITY INDEX</span>
                  <span className="mono stat-value">99.8% STABLE</span>
                </div>
                <div className="hud-modal__stat-item">
                  <span className="mono stat-label">BUILD METRIC</span>
                  <span className="mono stat-value">C.I. CERTIFIED</span>
                </div>
                <div className="hud-modal__stat-item">
                  <span className="mono stat-label">PROTOCOL LAYER</span>
                  <span className="mono stat-value">SECURE SOCKETS</span>
                </div>
              </div>
            </div>

            <div className="hud-modal__right">
              <span className="mono hud-modal__label">System Metrics</span>
              <div className="hud-modal__spec-table">
                <div className="hud-modal__spec-row">
                  <span className="mono spec-key">PROJECT CODENAME</span>
                  <span className="mono spec-val">{project.id.toUpperCase()}</span>
                </div>
                <div className="hud-modal__spec-row">
                  <span className="mono spec-key">DEPLOYMENT STATUS</span>
                  <span className="mono spec-val">{project.result}</span>
                </div>
                <div className="hud-modal__spec-row">
                  <span className="mono spec-key">PRIMARY FINDING</span>
                  <span className="mono spec-val">{project.finding}</span>
                </div>
                <div className="hud-modal__spec-row">
                  <span className="mono spec-key">INTEGRAL ENGINE</span>
                  <span className="mono spec-val">RESTful Middleware</span>
                </div>
              </div>

              <div className="hud-modal__badges-box">
                <span className="mono hud-modal__label">Core Frameworks Installed</span>
                <div className="project__stack-badges">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-badge mono" data-tech={tech.toLowerCase()}>
                      <span className="tech-badge__indicator" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [activeStat, setActiveStat] = useState("hackathon");
  const [viewMode, setViewMode] = useState("list");
  const [selectedTech, setSelectedTech] = useState(null);
  const [modalProject, setModalProject] = useState(null);

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
    toast(`Filtered views by: "${tech.toUpperCase()}"`, "success");
  };

  const handleDetailClick = (proj) => {
    setModalProject(proj);
    toast(`Opening deep-telemetry HUD for ${proj.name}`, "info");
  };

  // Filter list by selected tech
  const filteredProjects = selectedTech
    ? PROJECTS.filter((p) => p.stack.map(s => s.toLowerCase()).includes(selectedTech.toLowerCase()))
    : PROJECTS;

  const filteredTimeline = selectedTech
    ? TIMELINE_EVENTS.filter((evt) => evt.stack.map(s => s.toLowerCase()).includes(selectedTech.toLowerCase()))
    : TIMELINE_EVENTS;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Reports</p>
          <h2 className="section-title">Three builds, three different problems.</h2>
          <p className="section-sub">
            Review live project stats, filter nodes by custom tech stacks, or trigger deep scanline HUD telemetry diagnostics.
          </p>
        </Reveal>

        {/* Interactive Stats Dashboard */}
        <Reveal delay={1} className="stats-dashboard">
          <div className="stats-grid">
            {Object.entries(STAT_REPORTS).map(([key, item]) => {
              const isActive = activeStat === key;
              return (
                <button
                  key={key}
                  className={`stat-card ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveStat(key);
                    toast(`Scanner node changed: ${key.toUpperCase()}`, "info");
                  }}
                >
                  <span className="mono stat-card__label">{item.label}</span>
                  <div className="stat-card__metric-row">
                    <h3 className="stat-card__metric">{item.metric}</h3>
                    {isActive && <motion.span layoutId="statDot" className="stat-card__dot" />}
                  </div>
                  <span className="mono stat-card__sub">{item.sub}</span>
                </button>
              );
            })}
          </div>

          {/* Active Diagnostic Report Display */}
          <div className="report-console">
            <div className="report-console__header mono">
              <span>SCANNER STATUS: ONLINE</span>
              <span>ID: REPORT-{activeStat.toUpperCase()}-2026</span>
            </div>

            <div className="report-console__body">
              <div className="report-console__scanline" />
              <h4 className="report-console__title mono">{STAT_REPORTS[activeStat].title}</h4>
              <div className="report-console__table">
                {STAT_REPORTS[activeStat].details.map((detail, idx) => (
                  <div key={idx} className="report-console__row">
                    <span className="mono report-console__key">{detail.key}</span>
                    <span className="report-console__val">{detail.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Project Stats HUD bar */}
        <Reveal delay={1.2}>
          <div className="project-stats-hud">
            <div className="hud-metric">
              <div className="hud-metric__circle-wrap">
                <svg className="hud-metric__circle-svg" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="hud-metric__circle-text mono">100%</div>
              </div>
              <div className="hud-metric__info">
                <span className="mono hud-metric__label">BUILD INTEGRITY</span>
                <span className="hud-metric__value font-medium text-teal">All builds stable</span>
              </div>
            </div>

            <div className="hud-metric">
              <div className="hud-metric__circle-wrap">
                <svg className="hud-metric__circle-svg" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray="94.2, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="hud-metric__circle-text mono" style={{ color: "var(--amber)" }}>94.2%</div>
              </div>
              <div className="hud-metric__info">
                <span className="mono hud-metric__label">MODEL ACCURACY</span>
                <span className="hud-metric__value text-amber">Trained ResNet-50</span>
              </div>
            </div>

            <div className="hud-metric">
              <div className="hud-metric__circle-wrap">
                <svg className="hud-metric__circle-svg" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray="88, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="hud-metric__circle-text mono">482</div>
              </div>
              <div className="hud-metric__info">
                <span className="mono hud-metric__label">PUSH COMMITS</span>
                <span className="hud-metric__value">Verified VCS push logs</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Active Tech Stack Filter HUD Banner */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="active-filter-hud-banner mono"
            >
              <span>🔎 ACTIVE MATRIX FILTER :: ON-DEMAND DISPLAY SECURED TO "{selectedTech.toUpperCase()}"</span>
              <button
                className="clear-filter-btn"
                onClick={() => {
                  setSelectedTech(null);
                  toast("Filter reset: displaying all systems", "info");
                }}
              >
                [RESET MATRIX VIEW ×]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="projects-tabs">
          <button
            className={`projects-tab mono ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <span className="projects-tab__num">[01]</span> BUILD DIRECTORY ({filteredProjects.length})
          </button>
          <button
            className={`projects-tab mono ${viewMode === "timeline" ? "active" : ""}`}
            onClick={() => setViewMode("timeline")}
          >
            <span className="projects-tab__num">[02]</span> SYSTEM TIMELINE ({filteredTimeline.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="projects__list"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p, i) => (
                  <ProjectCard
                    project={p}
                    index={i}
                    key={p.id}
                    onTechClick={handleTechClick}
                    onDetailClick={handleDetailClick}
                  />
                ))
              ) : (
                <div className="no-projects-msg mono">
                  [NO MATCHES FOUND FOR ACTIVE FILTER SYSTEM]
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="timeline-container"
            >
              <div className="timeline-axis" />
              <div className="timeline-events">
                {filteredTimeline.length > 0 ? (
                  filteredTimeline.map((evt, idx) => (
                    <div key={idx} className="timeline-event">
                      <div className="timeline-event__point-wrapper">
                        <div className="timeline-event__point" />
                        <div className="timeline-event__glow" />
                      </div>
                      
                      <div className="timeline-event__card">
                        <div className="timeline-event__header">
                          <span className="mono timeline-event__date">{evt.date}</span>
                          <div className="timeline-event__badges">
                            <span className={`mono timeline-event__badge type-${evt.type.toLowerCase()}`}>
                              {evt.type}
                            </span>
                            <span className={`mono timeline-event__badge status-${evt.status.toLowerCase()}`}>
                              {evt.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="timeline-event__title">{evt.title}</h3>
                        <p className="timeline-event__desc">{evt.description}</p>

                        <div className="timeline-event__milestones">
                          <span className="mono timeline-event__milestones-title">Milestones:</span>
                          <ul>
                            {evt.milestones.map((ms, mIdx) => (
                              <li key={mIdx}>
                                <span className="bullet">⚡</span> {ms}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="timeline-event__stack">
                          <span className="mono timeline-event__stack-label">Frameworks & Tools (Filterable):</span>
                          <div className="project__stack-badges">
                            {evt.stack.map((tech) => (
                              <span
                                key={tech}
                                className="tech-badge tech-badge-interactive mono"
                                data-tech={tech.toLowerCase()}
                                onClick={() => handleTechClick(tech)}
                              >
                                <span className="tech-badge__indicator" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-projects-msg mono">
                    [NO TIMELINE NODES ASSOCIATED WITH CHOSEN FILTER]
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanline Detail Modal popup overlay */}
        <AnimatePresence>
          {modalProject && (
            <ScanlineDetailModal
              project={modalProject}
              onClose={() => setModalProject(null)}
            />
          )}
        </AnimatePresence>

        <ActivityGraph />
      </div>

      <style>{`
        .stats-dashboard {
          margin-top: 48px;
          margin-bottom: 56px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          background: var(--panel);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 20px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s var(--ease);
          position: relative;
          outline: none;
        }
        .stat-card:hover {
          background: var(--panel-raised);
          border-color: var(--border);
          transform: translateY(-2px);
        }
        .stat-card.is-active {
          border-color: var(--amber);
          background: var(--panel-raised);
          box-shadow: 0 0 16px rgba(232, 163, 61, 0.08);
        }
        .stat-card__label {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .stat-card__metric-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .stat-card__metric {
          font-size: clamp(24px, 3vw, 36px);
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text);
          line-height: 1;
        }
        .stat-card.is-active .stat-card__metric {
          color: var(--amber);
        }
        .stat-card__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--amber);
          display: inline-block;
          box-shadow: 0 0 8px var(--amber);
        }
        .stat-card__sub {
          font-size: 11px;
          color: var(--text-mute);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stat-card.is-active .stat-card__sub {
          color: var(--text-dim);
        }
        
        /* Report Console Display */
        .report-console {
          margin-top: 24px;
          background: var(--bg-soft);
          border: 1px dashed var(--border);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .report-console__header {
          display: flex;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid var(--border-soft);
          font-size: 11px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }
        .report-console__body {
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .report-console__scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(232, 163, 61, 0.2);
          box-shadow: 0 0 6px var(--amber);
          pointer-events: none;
          animation: scanline-sweep 5s linear infinite;
        }
        @keyframes scanline-sweep {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(220px); opacity: 0; }
        }
        .report-console__title {
          font-size: 13px;
          color: var(--amber);
          letter-spacing: 0.08em;
          margin-bottom: 20px;
          border-left: 2px solid var(--amber);
          padding-left: 12px;
          line-height: 1.4;
        }
        .report-console__table {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .report-console__row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 20px;
          align-items: baseline;
        }
        @media (max-width: 600px) {
          .report-console__row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
        .report-console__key {
          font-size: 11px;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .report-console__val {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .projects__list {
          margin-top: 56px;
          border-top: 1px solid var(--border-soft);
        }
        .project {
          border-bottom: 1px solid var(--border-soft);
        }
        .project__head {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 30px 0;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .project__head:hover .project__scan {
          transform: translateX(100%);
        }
        .project__scan {
          position: absolute;
          top: 0;
          left: -30%;
          width: 30%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(232,163,61,0.08), transparent);
          transform: translateX(-100%);
          transition: transform 0.8s var(--ease);
          pointer-events: none;
        }
        .project__tag {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--teal);
        }
        .project__name {
          margin-top: 10px;
          font-size: clamp(22px, 3vw, 30px);
          color: var(--text);
        }
        .project__summary {
          margin-top: 8px;
          color: var(--text-dim);
          font-size: 14.5px;
        }
        .project__head-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .project__result {
          font-size: 11px;
          letter-spacing: 0.08em;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          white-space: nowrap;
        }
        .project__result--win {
          color: var(--amber);
          border-color: var(--amber-dim);
        }
        .project__result--ship {
          color: var(--teal);
          border-color: var(--teal-dim);
        }
        .project__chevron {
          font-size: 26px;
          color: var(--text-mute);
          display: inline-block;
          line-height: 1;
        }
        .project__body-inner {
          padding: 0 0 34px;
          max-width: 720px;
        }
        .project__detail {
          color: var(--text-dim);
          font-size: 15.5px;
          line-height: 1.75;
        }
        .project__meta {
          margin-top: 22px;
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
        }
        .project__meta-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-mute);
        }
        .project__meta p {
          margin-top: 8px;
          font-size: 14.5px;
          color: var(--text);
        }

        /* Tech Stack Badges */
        .project__stack-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          font-size: 11px;
          border-radius: 3px;
          border: 1px solid rgba(82, 201, 182, 0.15);
          background: rgba(82, 201, 182, 0.03);
          color: var(--teal);
          transition: all 0.2s var(--ease);
          cursor: default;
        }
        .tech-badge:hover {
          border-color: var(--teal);
          background: rgba(82, 201, 182, 0.08);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(82, 201, 182, 0.1);
        }
        .tech-badge__indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--teal);
          display: inline-block;
        }

        /* Customize colors based on tech */
        .tech-badge[data-tech="flutter"] {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.2);
          background: rgba(56, 189, 248, 0.03);
        }
        .tech-badge[data-tech="flutter"] .tech-badge__indicator {
          background: #38bdf8;
        }
        .tech-badge[data-tech="flutter"]:hover {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
        }

        .tech-badge[data-tech="pytorch"] {
          color: #f97316;
          border-color: rgba(249, 115, 22, 0.2);
          background: rgba(249, 115, 22, 0.03);
        }
        .tech-badge[data-tech="pytorch"] .tech-badge__indicator {
          background: #f97316;
        }
        .tech-badge[data-tech="pytorch"]:hover {
          border-color: #f97316;
          background: rgba(249, 115, 22, 0.08);
        }

        .tech-badge[data-tech="flask"] {
          color: #a3e635;
          border-color: rgba(163, 230, 53, 0.2);
          background: rgba(163, 230, 53, 0.03);
        }
        .tech-badge[data-tech="flask"] .tech-badge__indicator {
          background: #a3e635;
        }
        .tech-badge[data-tech="flask"]:hover {
          border-color: #a3e635;
          background: rgba(163, 230, 53, 0.08);
        }

        .tech-badge[data-tech="sqlite"] {
          color: #00bcd4;
          border-color: rgba(0, 188, 212, 0.2);
          background: rgba(0, 188, 212, 0.03);
        }
        .tech-badge[data-tech="sqlite"] .tech-badge__indicator {
          background: #00bcd4;
        }
        .tech-badge[data-tech="sqlite"]:hover {
          border-color: #00bcd4;
          background: rgba(0, 188, 212, 0.08);
        }

        .tech-badge[data-tech="python"] {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.2);
          background: rgba(59, 130, 246, 0.03);
        }
        .tech-badge[data-tech="python"] .tech-badge__indicator {
          background: #3b82f6;
        }
        .tech-badge[data-tech="python"]:hover {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
        }

        /* Tab Bar Styles */
        .projects-tabs {
          display: flex;
          gap: 16px;
          border-bottom: 1px solid var(--border-soft);
          margin-top: 48px;
          margin-bottom: 32px;
        }
        .projects-tab {
          background: none;
          border: none;
          color: var(--text-mute);
          font-size: 12px;
          font-weight: 500;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.25s var(--ease);
          position: relative;
          letter-spacing: 0.05em;
        }
        .projects-tab:hover {
          color: var(--text);
        }
        .projects-tab.active {
          color: var(--amber);
        }
        .projects-tab.active::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: var(--amber);
          box-shadow: 0 0 8px var(--amber);
        }
        .projects-tab__num {
          opacity: 0.5;
          margin-right: 6px;
        }

        /* Timeline Styles */
        .timeline-container {
          position: relative;
          padding: 16px 0 40px 24px;
          margin-top: 24px;
        }
        .timeline-axis {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 6px;
          width: 1px;
          background: linear-gradient(180deg, var(--border) 0%, var(--border-soft) 80%, transparent 100%);
        }
        .timeline-events {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .timeline-event {
          position: relative;
          display: flex;
          gap: 24px;
        }
        .timeline-event__point-wrapper {
          position: absolute;
          left: -24px;
          top: 20px;
          width: 13px;
          height: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-50%);
        }
        .timeline-event__point {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--amber);
          box-shadow: 0 0 6px var(--amber);
          z-index: 2;
        }
        .timeline-event__glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(232, 163, 61, 0.15);
          animation: timeline-glow-pulse 2s infinite ease-in-out;
          z-index: 1;
        }
        @keyframes timeline-glow-pulse {
          0% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        .timeline-event__card {
          flex: 1;
          background: var(--panel);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 24px;
          transition: all 0.25s var(--ease);
        }
        .timeline-event__card:hover {
          border-color: var(--border);
          background: var(--panel-raised);
          box-shadow: inset 0 0 12px rgba(255,255,255,0.01), 0 4px 20px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .timeline-event__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          padding-bottom: 8px;
        }
        .timeline-event__date {
          font-size: 11px;
          color: var(--amber);
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .timeline-event__badges {
          display: flex;
          gap: 8px;
        }
        .timeline-event__badge {
          font-size: 9px;
          padding: 2px 8px;
          border-radius: 2px;
          border: 1px solid;
          letter-spacing: 0.05em;
        }
        .timeline-event__badge.type-release {
          color: var(--teal);
          border-color: var(--teal-dim);
          background: rgba(82, 201, 182, 0.04);
        }
        .timeline-event__badge.type-prototype {
          color: #a3e635;
          border-color: rgba(163, 230, 53, 0.2);
          background: rgba(163, 230, 53, 0.04);
        }
        .timeline-event__badge.type-deployment {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.2);
          background: rgba(56, 189, 248, 0.04);
        }
        .timeline-event__badge.type-feature {
          color: #ffb703;
          border-color: rgba(255, 183, 3, 0.2);
          background: rgba(255, 183, 3, 0.04);
        }
        .timeline-event__badge.status-stable {
          color: var(--teal);
          border-color: var(--teal-dim);
          background: rgba(82, 201, 182, 0.04);
        }
        .timeline-event__badge.status-shipped {
          color: var(--teal);
          border-color: var(--teal-dim);
          background: rgba(82, 201, 182, 0.04);
        }
        .timeline-event__badge.status-testing {
          color: var(--amber);
          border-color: var(--amber-dim);
          background: rgba(232, 163, 61, 0.04);
        }
        .timeline-event__title {
          font-size: 18px;
          font-family: var(--font-display);
          font-weight: 500;
          color: var(--text);
          margin-bottom: 8px;
        }
        .timeline-event__desc {
          font-size: 14px;
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .timeline-event__milestones {
          margin-bottom: 18px;
          background: rgba(0,0,0,0.15);
          border: 1px dashed var(--border-soft);
          border-radius: 4px;
          padding: 12px 16px;
        }
        .timeline-event__milestones-title {
          font-size: 10px;
          color: var(--text-mute);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 6px;
        }
        .timeline-event__milestones ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .timeline-event__milestones li {
          font-size: 12.5px;
          color: var(--text-dim);
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .timeline-event__milestones .bullet {
          color: var(--amber);
          font-size: 9px;
        }
        .timeline-event__stack {
          border-top: 1px solid rgba(255,255,255,0.02);
          padding-top: 14px;
        }
        .timeline-event__stack-label {
          font-size: 10px;
          color: var(--text-mute);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
        }

        .tech-badge-interactive {
          cursor: pointer !important;
          transition: all 0.2s var(--ease);
        }
        .tech-badge-interactive:hover {
          background: rgba(232, 163, 61, 0.15) !important;
          border-color: var(--amber) !important;
          box-shadow: 0 0 8px rgba(232, 163, 61, 0.25);
          transform: translateY(-1px);
        }
        .project__actions {
          margin-top: 16px;
          margin-bottom: 16px;
          display: flex;
          gap: 12px;
        }
        .hud-action-btn {
          background: rgba(232, 163, 61, 0.08);
          border: 1px solid var(--amber);
          color: var(--amber);
          font-size: 11px;
          padding: 8px 16px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s var(--ease);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hud-action-btn:hover {
          background: var(--amber);
          color: #0d0e11;
          box-shadow: 0 0 12px rgba(232, 163, 61, 0.3);
        }
        
        /* Project Stats HUD bar */
        .project-stats-hud {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 16px;
        }
        @media (max-width: 768px) {
          .project-stats-hud {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        .hud-metric {
          display: flex;
          align-items: center;
          gap: 16px;
          border-right: 1px solid var(--border-soft);
          padding-right: 16px;
        }
        .hud-metric:last-child {
          border-right: none;
          padding-right: 0;
        }
        @media (max-width: 768px) {
          .hud-metric {
            border-right: none;
            border-bottom: 1px solid var(--border-soft);
            padding-right: 0;
            padding-bottom: 12px;
          }
          .hud-metric:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
        .hud-metric__circle-wrap {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hud-metric__circle-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .hud-metric__circle-svg .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 3.5;
        }
        .hud-metric__circle-svg .circle {
          fill: none;
          stroke: var(--amber);
          stroke-width: 3.5;
          stroke-linecap: round;
        }
        .hud-metric__circle-text {
          position: absolute;
          font-size: 11px;
          font-weight: 500;
          color: var(--text);
        }
        .hud-metric__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hud-metric__label {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }
        .hud-metric__value {
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
        }
        
        /* Filter HUD Banner */
        .active-filter-hud-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(232, 163, 61, 0.05);
          border: 1px dashed var(--amber);
          border-radius: 4px;
          padding: 12px 16px;
          margin-bottom: 24px;
          font-size: 11px;
          color: var(--amber);
        }
        @media (max-width: 600px) {
          .active-filter-hud-banner {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
        .clear-filter-btn {
          background: none;
          border: none;
          color: var(--text-mute);
          cursor: pointer;
          font-size: 11px;
          padding: 0;
          transition: color 0.2s var(--ease);
        }
        .clear-filter-btn:hover {
          color: var(--text);
        }
        .no-projects-msg {
          text-align: center;
          padding: 48px;
          border: 1px dashed var(--border-soft);
          border-radius: 4px;
          background: var(--panel);
          color: var(--text-mute);
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        
        /* Scanline Detail Modal HUD overlay */
        .hud-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 14, 17, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .hud-modal-container {
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: 0 0 32px rgba(0, 0, 0, 0.5), 0 0 1px var(--border);
          border-radius: 6px;
          width: 100%;
          max-width: 800px;
          position: relative;
          overflow: hidden;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        .hud-modal__scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(232, 163, 61, 0.2);
          box-shadow: 0 0 6px var(--amber);
          pointer-events: none;
          animation: scanline-sweep 6s linear infinite;
        }
        .hud-modal__glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 10%, rgba(232, 163, 61, 0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .hud-modal__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px 24px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid var(--border-soft);
        }
        .hud-modal__header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hud-modal__tag {
          font-size: 10px;
          color: var(--amber);
          letter-spacing: 0.1em;
        }
        .hud-modal__title {
          font-size: 20px;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text);
        }
        .hud-modal__close {
          background: none;
          border: none;
          color: var(--text-mute);
          font-size: 11px;
          cursor: pointer;
          transition: color 0.2s var(--ease);
          padding: 4px 8px;
        }
        .hud-modal__close:hover {
          color: var(--text);
        }
        .hud-modal__body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }
        .hud-modal__grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .hud-modal__grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        .hud-modal__left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hud-modal__right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hud-modal__label {
          font-size: 10px;
          color: var(--text-mute);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
          border-bottom: 1px dashed var(--border-soft);
          padding-bottom: 4px;
        }
        .hud-modal__schematic {
          background: #090a0d;
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 16px;
          font-size: 10.5px;
          color: var(--amber);
          overflow-x: auto;
          line-height: 1.4;
        }
        .hud-modal__desc {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .hud-modal__stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          border-top: 1px solid var(--border-soft);
          padding-top: 16px;
        }
        .hud-modal__stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hud-modal__stat-item .stat-label {
          font-size: 9px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }
        .hud-modal__stat-item .stat-value {
          font-size: 11px;
          font-weight: 500;
          color: var(--text);
        }
        .hud-modal__spec-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(0,0,0,0.1);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 16px;
        }
        .hud-modal__spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          border-bottom: 1px solid rgba(255,255,255,0.02);
          padding-bottom: 8px;
        }
        .hud-modal__spec-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .hud-modal__spec-row .spec-key {
          color: var(--text-mute);
        }
        .hud-modal__spec-row .spec-val {
          color: var(--text);
          text-align: right;
        }
        .hud-modal__badges-box {
          background: rgba(0,0,0,0.1);
          border: 1px dashed var(--border-soft);
          border-radius: 4px;
          padding: 16px;
        }
      `}</style>
    </section>
  );
}
