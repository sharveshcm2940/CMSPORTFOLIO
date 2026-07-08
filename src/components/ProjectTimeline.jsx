import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Cpu, 
  Database, 
  Code, 
  CheckCircle2, 
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
        icon: Database,
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

  const activeProject = TIMELINE_DATA[activeProjectKey];
  const phases = activeProject.phases;

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
                      toast(`[SYSTEM] Retrieving chronicles for ${project.title}`, "info");
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

        {/* Vertical Timeline Container */}
        <div className="vertical-timeline">
          {/* Central Line - styled dynamically based on active project's accent */}
          <div className="vertical-timeline-line" style={{ background: `linear-gradient(180deg, ${activeProject.accent} 0%, var(--border-soft) 100%)` }} />

          <div className="vertical-timeline-items">
            {phases.map((phase, idx) => {
              const PhaseIcon = phase.icon;
              return (
                <div key={phase.id} className="vertical-timeline-item">
                  
                  {/* Glowing Marker Dot with Icon */}
                  <div className="vertical-timeline-node-container">
                    <div 
                      className="vertical-timeline-node" 
                      style={{ 
                        borderColor: activeProject.accent,
                        boxShadow: `0 0 12px ${activeProject.accent}40`,
                        background: 'var(--panel)'
                      }}
                    >
                      <PhaseIcon size={14} style={{ color: activeProject.accent }} />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="vertical-timeline-card-wrapper">
                    <motion.div 
                      className="vertical-timeline-card"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      style={{ borderLeft: `3px solid ${activeProject.accent}` }}
                    >
                      {/* Card Header */}
                      <div className="timeline-card-header">
                        <div className="header-meta">
                          <span className="mono phase-number" style={{ color: activeProject.accent }}>
                            {phase.number}
                          </span>
                          <span className="mono phase-date flex items-center gap-1">
                            <Calendar size={11} />
                            {phase.date}
                          </span>
                        </div>
                        <h3 className="phase-title">{phase.title}</h3>
                        <div className="phase-status-badge mono">
                          <Clock size={11} />
                          <span>{phase.status}</span>
                        </div>
                      </div>

                      {/* Card Body Columns */}
                      <div className="timeline-card-body">
                        
                        {/* Narrative Text & Deliverables */}
                        <div className="narrative-section">
                          <p className="phase-details">{phase.details}</p>
                          
                          <div className="achievements-block">
                            <span className="mono deliverables-title">KEY ACHIEVEMENTS</span>
                            <ul className="highlights-list">
                              {phase.highlights.map((h, i) => (
                                <li key={i} className="highlight-item">
                                  <CheckCircle2 size={12} style={{ color: activeProject.accent }} />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Metric Badge */}
                          <div className="metric-badge-box">
                            <span className="mono metric-label">{phase.metricLabel}:</span>
                            <span className="mono metric-val" style={{ color: activeProject.accent }}>{phase.metricVal}</span>
                          </div>
                        </div>

                        {/* Code Simulator Box */}
                        <div className="code-simulator-section">
                          <div className="code-header">
                            <div className="editor-dots">
                              <span /><span /><span />
                            </div>
                            <span className="mono file-name flex items-center gap-1 text-mute text-xs">
                              <Terminal size={11} />
                              {activeProjectKey === "hailmary" ? "pipeline_node.py" : "system_trace.sql"}
                            </span>
                          </div>
                          <pre className="code-content mono">
                            <code>{phase.code}</code>
                          </pre>
                        </div>

                      </div>

                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .project-timeline {
          background: #090a0d;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          padding: 100px 0;
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
          margin-bottom: 56px;
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

        /* Vertical Timeline CSS */
        .vertical-timeline {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding-left: 40px; /* Space for the vertical line on mobile/all views */
        }

        @media (min-width: 1024px) {
          .vertical-timeline {
            padding-left: 60px;
          }
        }

        .vertical-timeline-line {
          position: absolute;
          left: 14px;
          top: 0;
          bottom: 0;
          width: 2px;
          opacity: 0.35;
          z-index: 1;
        }

        @media (min-width: 1024px) {
          .vertical-timeline-line {
            left: 24px;
          }
        }

        .vertical-timeline-items {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .vertical-timeline-item {
          position: relative;
          display: flex;
          width: 100%;
        }

        .vertical-timeline-node-container {
          position: absolute;
          left: -40px;
          top: 24px;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .vertical-timeline-node-container {
            left: -60px;
          }
        }

        .vertical-timeline-node {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--panel) !important;
          margin-left: 0;
          position: relative;
          transform: translateX(0);
        }

        @media (min-width: 1024px) {
          .vertical-timeline-node {
            width: 36px;
            height: 36px;
            margin-left: 6px;
          }
        }

        .vertical-timeline-card-wrapper {
          width: 100%;
        }

        .vertical-timeline-card {
          background: var(--panel);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }

        .vertical-timeline-card:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          border-color: rgba(255, 255, 255, 0.08) !important;
        }

        .timeline-card-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--border-soft);
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        @media (min-width: 768px) {
          .timeline-card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .phase-number {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .phase-date {
          font-size: 11px;
          color: var(--text-mute);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-soft);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .phase-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          margin: 4px 0 0;
        }

        @media (min-width: 768px) {
          .phase-title {
            margin: 0;
            flex: 1;
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        .phase-status-badge {
          font-size: 10px;
          color: var(--text-mute);
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid var(--border-soft);
          padding: 2px 8px;
          border-radius: 4px;
          width: fit-content;
        }

        .timeline-card-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 1024px) {
          .timeline-card-body {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        .narrative-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .phase-details {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.65;
        }

        .achievements-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .deliverables-title {
          font-size: 9px;
          color: var(--text-mute);
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .highlight-item svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .metric-badge-box {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed var(--border-soft);
          padding: 8px 12px;
          border-radius: 6px;
          width: fit-content;
          font-size: 11.5px;
        }

        .metric-label {
          color: var(--text-mute);
        }

        .metric-val {
          font-weight: 700;
        }

        /* Code Simulator Column */
        .code-simulator-section {
          background: #060709;
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 200px;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.01);
          border-bottom: 1px solid var(--border-soft);
          padding: 8px 16px;
        }

        .editor-dots {
          display: flex;
          gap: 5px;
        }

        .editor-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--border-soft);
        }

        .code-content {
          padding: 16px;
          margin: 0;
          font-size: 11px;
          line-height: 1.55;
          color: #a3b8cc;
          overflow-x: auto;
          background: #060709;
          flex: 1;
        }
      `}</style>

    </section>
  );
}
