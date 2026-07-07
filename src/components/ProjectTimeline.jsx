import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  Cpu, 
  Database, 
  Code, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Flame, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Terminal,
  Clock
} from "lucide-react";
import Reveal from "./Reveal.jsx";
import { toast } from "./Toast.jsx";

const TIMELINE_DATA = {
  hailmary: {
    title: "HAILMARY — AI TB DETECTION",
    subtitle: "Developed in 1 week (19-04-2026 to 26-04-2026) • Won Hackathon with Rupees 10,000 Cash Prize",
    accent: "var(--amber)",
    phases: [
      {
        id: "hm-p1",
        number: "Phase 01",
        title: "Dataset Prep & Augmentation",
        date: "19-04-2026",
        status: "Completed",
        icon: Database,
        details: "Aggregated and audited over 15,000+ clinical chest radiograph scans. Developed standard Z-score intensity normalization, crop functions, and image augmentation routines (rotation, shear, brightness adjustments) to avoid model overfitting on minor radiographic artifacts.",
        highlights: [
          "Curated 15K chest radiograph scans",
          "Z-score intensity normalization pipeline",
          "Completed during Day 1-2 sprint"
        ],
        code: `def normalize_radiograph(img_path):
    # Z-score normalization & resizing
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_resized = cv2.resize(img, (224, 224))
    mean, std = img_resized.mean(), img_resized.std()
    return (img_resized - mean) / (std + 1e-6)`,
        metricLabel: "Dataset Standard Deviation",
        metricVal: "0.24 σ"
      },
      {
        id: "hm-p2",
        number: "Phase 02",
        title: "Model Training & Quantization",
        date: "22-04-2026",
        status: "Completed",
        icon: Cpu,
        details: "Selected PyTorch ResNet-50 as the primary backbone. Trained on CUDA workstations using AdamW optimizer and Cosine Annealing scheduler. Serialized parameters to ONNX and applied INT8 weight quantization to reduce memory footprint by 64% without loss in precision.",
        highlights: [
          "PyTorch ResNet-50 backbone selection",
          "CUDA parallel weight training",
          "Quantized to 23.4 MB model weight"
        ],
        code: `model = models.resnet50(pretrained=True)
# INT8 Quantization hook
quantized_model = torch.quantization.quantize_dynamic(
    model, {nn.Linear}, dtype=torch.qint8
)
torch.onnx.export(quantized_model, dummy_input, "tb_resnet.onnx")`,
        metricLabel: "Validation Accuracy",
        metricVal: "94.20%"
      },
      {
        id: "hm-p3",
        number: "Phase 03",
        title: "Flask API Endpoint Serving",
        date: "24-04-2026",
        status: "Completed",
        icon: Code,
        details: "Constructed a secure, high-throughput Flask backend to serve predictions. Created base64-to-tensor stream pipes with validation filters, serving structured JSON confidence payloads within sub-millisecond response latency.",
        highlights: [
          "Flask REST serving architecture",
          "In-memory image buffer streams",
          "Sub-millisecond model invocation"
        ],
        code: `@app.route('/api/predict', methods=['POST'])
def predict():
    file = request.files['image']
    tensor = preprocess_buffer(file.read())
    with torch.no_grad():
        prob = model(tensor).item()
    return jsonify({
        'status': 'SUCCESS',
        'probability': prob,
        'flag': prob > 0.50
    })`,
        metricLabel: "API Response Latency",
        metricVal: "0.20 ms"
      },
      {
        id: "hm-p4",
        number: "Phase 04",
        title: "Flutter Cross-Platform UI",
        date: "25-04-2026",
        status: "Completed",
        icon: Zap,
        details: "Crafted a gorgeous, lightweight mobile app viewport using Flutter. Integrated camera capturing controls, multi-part request payloads for asynchronous scan transfers, and custom responsive radial gauge displays.",
        highlights: [
          "Dart HTTP multi-part requests",
          "Lightweight asynchronous UI",
          "Mobile viewport camera controllers"
        ],
        code: `Future<void> dispatchScan() async {
  var req = http.MultipartRequest('POST', Uri.parse(apiUri));
  req.files.add(await http.MultipartFile.fromPath('image', filePath));
  var res = await req.send();
  var parsed = jsonDecode(await res.stream.bytesToString());
  setState(() {
    tbProbability = parsed['probability'];
  });
}`,
        metricLabel: "Mobile Viewport Framerate",
        metricVal: "60.0 fps"
      },
      {
        id: "hm-p5",
        number: "Phase 05",
        title: "Hackathon Pitches & 1st Place",
        date: "26-04-2026",
        status: "Completed",
        icon: ShieldCheck,
        details: "Demonstrated live clinical scans at the RotatechX Hackathon on April 26, 2026. Successfully processed borderline and noisy datasets on-stage without failures, earning the 1st Place grand championship trophy and a cash prize of Rupees 10,000.",
        highlights: [
          "Won 1st Place at RotatechX Hackathon",
          "Awarded Rupees 10,000 cash prize",
          "Tested and validated live on-stage"
        ],
        code: `[SYS] EXECUTING LIVE CLINICAL AUDIT DEMO
[SYS] CASE REF: ACUTE_ZONE_UPPER_CAVITY
[SYS] PREDICTED CONFIDENCE: 0.9423
[SUCCESS] LIVE DEMO COMPLETED SECURELY.
[AWARD] ROTATECHX GRAND PRIZE: INR 10,000`,
        metricLabel: "Cash Grand Prize",
        metricVal: "Rupees 10,000"
      }
    ]
  },
  notes: {
    title: "NOTES PLATFORM — SECURE PORTAL",
    subtitle: "Student notes management portal developed in 8 days (19-02-2026 to 27-02-2026)",
    accent: "var(--teal)",
    phases: [
      {
        id: "nt-p1",
        number: "Phase 01",
        title: "Database Schemas & Setup",
        date: "19-02-2026",
        status: "Completed",
        icon: Database,
        details: "Mapped out secure relational database structures inside SQLite in the initial 2 days. Engineered user folders, notes tables, and sharing rules with strict cascading foreign key constraints.",
        highlights: [
          "Optimized relational database",
          "Cascading foreign key controls",
          "Designed clean index routing"
        ],
        code: `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    p_hash TEXT NOT NULL
);
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);`,
        metricLabel: "Query Speed",
        metricVal: "0.12 ms"
      },
      {
        id: "nt-p2",
        number: "Phase 02",
        title: "Bcrypt Hashing & Auth Filters",
        date: "22-02-2026",
        status: "Completed",
        icon: Cpu,
        details: "Configured Flask-Bcrypt framework for robust client password encryption. Implemented stateless cookie-based security sessions, access-token validation rules, and custom request interceptors.",
        highlights: [
          "Stateless session cookie controls",
          "Flask-Bcrypt password salting",
          "Protected request route wrappers"
        ],
        code: `def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return wrap`,
        metricLabel: "Encryption Strength",
        metricVal: "2^12 rounds"
      },
      {
        id: "nt-p3",
        number: "Phase 03",
        title: "Document Vault & Share Release",
        date: "27-02-2026",
        status: "Completed",
        icon: Code,
        details: "Designed secure PDF and TXT file parsers, file extension filters to block malicious script execution, and random share token generation algorithms on the final day of the 8-day sprint.",
        highlights: [
          "Secure unique file renaming",
          "PDF/TXT validation checks",
          "Developed within the 8-day sprint"
        ],
        code: `def secure_upload(file):
    filename = secure_filename(file.filename)
    unique_id = uuid.uuid4().hex
    final_path = os.path.join(UPLOADS, f"{unique_id}_{filename}")
    file.save(final_path)
    return final_path`,
        metricLabel: "Sprint Duration",
        metricVal: "8 Days total"
      }
    ]
  },
  apartment: {
    title: "APARTMENT UTILITY MANAGEMENT SYSTEM",
    subtitle: "Developed during my internship at JE Infonet to manage residents and repair ticket pipelines",
    accent: "#bf5af2",
    phases: [
      {
        id: "ap-p1",
        number: "Phase 01",
        title: "Internship Scope & Wireframing",
        date: "JE Infonet Intern",
        status: "Completed",
        icon: Layers,
        details: "Assessed the key operational pain points of the resident dispatch desk during my internship at JE Infonet. Designed layout schematics to eliminate disorganized spreadsheets and streamline maintenance.",
        highlights: [
          "Identified redundant ticket queues",
          "Created modular wireframes",
          "Developed at JE Infonet Intern"
        ],
        code: `UI DESK LAYOUT SPECS:
- Sidebar: Resident Directory (CRUD)
- Main Board: Maintenance Ticket Grid
- Filter: Low / Medium / Severe Urgent
- Dispatcher Hook: Click to assign technician`,
        metricLabel: "Intern Project Scope",
        metricVal: "JE Infonet"
      },
      {
        id: "ap-p2",
        number: "Phase 02",
        title: "Maintenance Ticket Utility Engine",
        date: "JE Infonet Intern",
        status: "Completed",
        icon: Code,
        details: "Developed the central database pipelines and dispatch controllers during my JE Infonet internship. Residents can easily post repairs, track real-time status bars, and technicians receive direct task allocations.",
        highlights: [
          "CRUD dispatcher controllers",
          "Reduced ticket resolution wait times",
          "Internship production delivery"
        ],
        code: `ticket_status = {
    0: "PENDING_DISPATCH",
    1: "TECHNICIAN_ASSIGNED",
    2: "RESOLVED_CLOSED"
}
def assign_technician(ticket_id, tech_id):
    db.update("tickets", {"status": 1, "tech": tech_id}, "id=?", (ticket_id,))`,
        metricLabel: "Avg Resolution Wait",
        metricVal: "3.5 hrs"
      }
    ]
  }
};

export default function ProjectTimeline() {
  const [activeProjectKey, setActiveProjectKey] = useState("hailmary");
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState(0);
  const trackRef = useRef(null);

  const activeProject = TIMELINE_DATA[activeProjectKey];
  const phases = activeProject.phases;
  const currentPhase = phases[selectedPhaseIdx] || phases[0];

  // Reset phase index when project shifts
  useEffect(() => {
    setSelectedPhaseIdx(0);
  }, [activeProjectKey]);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section id="project-timeline" className="section project-timeline">
      <div className="container">
        
        {/* Header Readout Section */}
        <Reveal>
          <div className="timeline-header">
            <span className="mono text-teal tracking-widest font-bold">Chronicles // SYSTEM_TIMELINE</span>
            <h2 className="section-title">Development Chronology</h2>
            <p className="section-subtitle">
              Visualizing the sequential design, modeling, optimization, and deployment phases that shaped my AI and full-stack projects.
            </p>
          </div>
        </Reveal>

        {/* Project Navigation Switcher */}
        <Reveal delay={0.2}>
          <div className="timeline-switcher-wrapper">
            <div className="timeline-switcher-grid">
              {Object.keys(TIMELINE_DATA).map((key) => {
                const project = TIMELINE_DATA[key];
                const isActive = activeProjectKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveProjectKey(key);
                      toast(`[SYSTEM] Retreiving chronicles for ${project.title}`, "info");
                    }}
                    className={`timeline-tab-btn mono ${isActive ? "active" : ""}`}
                    style={{
                      borderColor: isActive ? project.accent : "var(--border-soft)",
                      boxShadow: isActive ? `0 0 15px rgba(255, 255, 255, 0.02)` : "none"
                    }}
                  >
                    {isActive && (
                      <motion.div 
                        className="tab-active-glow" 
                        layoutId="activeTabGlow"
                        style={{ background: project.accent }}
                      />
                    )}
                    <span className="tab-btn-content">
                      <span className="tab-title-text">{key === "hailmary" ? "HAILMARY AI" : key.toUpperCase()}</span>
                      <span className="tab-meta-text">{project.phases.length} STEPS</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Interactive Stepper Control Row */}
        <div className="timeline-main-grid">
          
          {/* LEFT: Horizontal Track (Gallery of Phases) */}
          <div className="timeline-gallery-column">
            
            <div className="gallery-control-bar">
              <span className="mono text-xs text-mute font-bold">
                SELECT STEP TO ANALYZE // {selectedPhaseIdx + 1} OF {phases.length}
              </span>
              <div className="gallery-scroll-btns">
                <button onClick={scrollLeft} className="scroll-btn" aria-label="Scroll Left">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={scrollRight} className="scroll-btn" aria-label="Scroll Right">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Custom Horizontal Scroll Track */}
            <div className="timeline-horizontal-track-container">
              
              {/* Dynamic Connecting Line across the gallery */}
              <div className="timeline-track-progress-line" style={{ background: `linear-gradient(90deg, ${activeProject.accent} 0%, rgba(255,255,255,0.05) 100%)` }} />

              <div className="timeline-horizontal-track" ref={trackRef}>
                {phases.map((phase, idx) => {
                  const PhaseIcon = phase.icon;
                  const isSelected = selectedPhaseIdx === idx;
                  return (
                    <motion.div
                      key={phase.id}
                      onClick={() => setSelectedPhaseIdx(idx)}
                      className={`timeline-card-item ${isSelected ? "selected" : ""}`}
                      style={{
                        borderColor: isSelected ? activeProject.accent : "var(--border-soft)"
                      }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Active Indicator Pin */}
                      <div className="card-top-pin">
                        <div 
                          className={`pin-dot ${isSelected ? "animate-pulse" : ""}`}
                          style={{ 
                            background: isSelected ? activeProject.accent : "var(--border-soft)",
                            boxShadow: isSelected ? `0 0 10px ${activeProject.accent}` : "none"
                          }}
                        />
                      </div>

                      <div className="card-header-meta">
                        <span className="mono card-number" style={{ color: activeProject.accent }}>{phase.number}</span>
                        <span className="mono card-date">{phase.date}</span>
                      </div>

                      <div className="card-content-block">
                        <div className="card-icon-title-row">
                          <div className="card-icon-container" style={{ background: isSelected ? `rgba(255,255,255,0.02)` : "transparent" }}>
                            <PhaseIcon size={16} style={{ color: isSelected ? activeProject.accent : "var(--text-dim)" }} />
                          </div>
                          <h4 className="card-title">{phase.title}</h4>
                        </div>
                        <p className="card-short-desc text-xs text-mute truncate-2-lines">
                          {phase.details}
                        </p>
                      </div>

                      <div className="card-footer-meta">
                        <div className="mono text-[10px] text-mute flex items-center gap-1">
                          <Clock size={10} />
                          {phase.status}
                        </div>
                        {phase.metricVal && (
                          <div className="mono text-[10px] font-bold" style={{ color: activeProject.accent }}>
                            {phase.metricVal}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* LOWER: Selected Phase Technical Details Card (Interactive inspect panel) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="timeline-inspect-panel"
                style={{
                  borderLeft: `4px solid ${activeProject.accent}`
                }}
              >
                <div className="inspect-header-row">
                  <div className="inspect-header-left">
                    <span className="mono inspect-tag" style={{ color: activeProject.accent }}>
                      STAGE_SPECIFICATION // {currentPhase.number}
                    </span>
                    <h3 className="inspect-title">{currentPhase.title}</h3>
                  </div>
                  <div className="inspect-header-right">
                    <span className="mono inspect-date flex items-center gap-1">
                      <Calendar size={12} />
                      {currentPhase.date}
                    </span>
                  </div>
                </div>

                <div className="inspect-body-grid">
                  
                  {/* Phase Narrative Summary */}
                  <div className="inspect-narrative-col">
                    <h5 className="mono inspect-sublabel">OBJECTIVE & WORKFLOW</h5>
                    <p className="inspect-desc">{currentPhase.details}</p>

                    <h5 className="mono inspect-sublabel mt-5">KEY ACHIEVEMENTS</h5>
                    <ul className="inspect-highlights-list">
                      {currentPhase.highlights.map((h, i) => (
                        <li key={i} className="inspect-highlight-item">
                          <CheckCircle2 size={13} className="text-teal" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Operational KPI Gauge */}
                    <div className="inspect-kpi-footer">
                      <div className="inspect-kpi-block">
                        <span className="mono kpi-label">{currentPhase.metricLabel}</span>
                        <div className="kpi-value-row">
                          <TrendingUp size={16} style={{ color: activeProject.accent }} />
                          <span className="kpi-val" style={{ color: activeProject.accent }}>{currentPhase.metricVal}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase Code Snippet / Shell Logs Simulation */}
                  <div className="inspect-code-col">
                    <div className="code-editor-header">
                      <div className="editor-dots">
                        <span /><span /><span />
                      </div>
                      <span className="mono text-xs text-mute flex items-center gap-1">
                        <Terminal size={12} />
                        {activeProjectKey === "hailmary" ? "pipeline_node.py" : "system_trace.sql"}
                      </span>
                    </div>
                    <pre className="code-editor-body mono">
                      <code>{currentPhase.code}</code>
                    </pre>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>

      <style>{`
        .project-timeline {
          background: #090a0d;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          padding: 100px 0;
          overflow: hidden;
          position: relative;
        }

        .timeline-header {
          margin-bottom: 40px;
        }

        /* Project Selection Switcher Bar */
        .timeline-switcher-wrapper {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 36px;
        }

        .timeline-switcher-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (max-width: 768px) {
          .timeline-switcher-grid {
            grid-template-columns: 1fr;
          }
        }

        .timeline-tab-btn {
          position: relative;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 14px 20px;
          cursor: pointer;
          transition: all 0.25s var(--ease);
          text-align: left;
          overflow: hidden;
        }

        .timeline-tab-btn:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-active-glow {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          z-index: 1;
          pointer-events: none;
        }

        .tab-btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tab-title-text {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: 0.03em;
        }

        .tab-meta-text {
          font-size: 10px;
          color: var(--text-mute);
          font-weight: 600;
        }

        /* Timeline Grid Layout */
        .timeline-main-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .timeline-gallery-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .gallery-control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 4px;
        }

        .gallery-scroll-btns {
          display: flex;
          gap: 8px;
        }

        .scroll-btn {
          background: var(--panel);
          border: 1px solid var(--border-soft);
          color: var(--text-dim);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .scroll-btn:hover {
          background: var(--panel-raised);
          border-color: var(--text-dim);
          color: var(--text);
        }

        /* Horizontal Track System */
        .timeline-horizontal-track-container {
          position: relative;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          padding: 24px 0;
          overflow: hidden;
        }

        .timeline-track-progress-line {
          position: absolute;
          top: 36px;
          left: 40px;
          right: 40px;
          height: 2px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        .timeline-horizontal-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          padding: 12px 24px;
          scroll-behavior: smooth;
          position: relative;
          z-index: 2;
        }

        /* Hide Scrollbar for clean look but preserve scrolling */
        .timeline-horizontal-track::-webkit-scrollbar {
          height: 6px;
        }
        .timeline-horizontal-track::-webkit-scrollbar-track {
          background: transparent;
        }
        .timeline-horizontal-track::-webkit-scrollbar-thumb {
          background: var(--border-soft);
          border-radius: 4px;
        }
        .timeline-horizontal-track::-webkit-scrollbar-thumb:hover {
          background: var(--text-mute);
        }

        /* Card Element */
        .timeline-card-item {
          flex: 0 0 250px;
          background: rgba(14, 16, 20, 0.8);
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          padding: 16px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          transition: all 0.3s var(--ease);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .timeline-card-item:hover {
          background: var(--panel-raised);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4);
        }

        .timeline-card-item.selected {
          background: rgba(255,255,255,0.02);
          box-shadow: inset 0 0 15px rgba(255,255,255,0.01), 0 15px 30px rgba(0,0,0,0.4);
        }

        .card-top-pin {
          position: absolute;
          top: -15px;
          left: 24px;
          z-index: 10;
        }

        .pin-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #000;
        }

        .card-header-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 700;
        }

        .card-date {
          color: var(--text-mute);
        }

        .card-icon-title-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 4px;
        }

        .card-icon-container {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-soft);
        }

        .card-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
        }

        .card-short-desc {
          font-size: 11px;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .card-footer-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 10px;
          margin-top: auto;
        }

        /* Inspect Panel below the track */
        .timeline-inspect-panel {
          background: var(--panel);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          padding: 28px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        .inspect-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-soft);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 600px) {
          .inspect-header-row {
            flex-direction: column;
            gap: 12px;
          }
        }

        .inspect-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
          display: block;
        }

        .inspect-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .inspect-date {
          font-size: 11px;
          color: var(--text-mute);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-soft);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .inspect-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 900px) {
          .inspect-body-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .inspect-sublabel {
          font-size: 10px;
          color: var(--text-mute);
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        .inspect-desc {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .inspect-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inspect-highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-dim);
        }

        .inspect-kpi-footer {
          margin-top: 24px;
          border-top: 1px dashed var(--border-soft);
          padding-top: 16px;
        }

        .inspect-kpi-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .kpi-label {
          font-size: 9px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }

        .kpi-value-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .kpi-val {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        /* Code Column editor mock */
        .inspect-code-col {
          display: flex;
          flex-direction: column;
          background: #060709;
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          overflow: hidden;
          min-height: 240px;
        }

        .code-editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.01);
          border-bottom: 1px solid var(--border-soft);
          padding: 10px 16px;
        }

        .editor-dots {
          display: flex;
          gap: 6px;
        }

        .editor-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-soft);
        }

        .code-editor-body {
          padding: 18px;
          margin: 0;
          font-size: 11.5px;
          line-height: 1.6;
          color: #a3b8cc;
          overflow-x: auto;
          background: #060709;
          flex: 1;
        }

        /* Line clamping helper */
        .truncate-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </section>
  );
}
