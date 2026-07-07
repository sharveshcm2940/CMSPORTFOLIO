import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Shield, Clipboard, CheckCircle, Upload, HelpCircle, 
  Search, Lock, Unlock, Key, FileText, Send, Trash2, HelpCircle as InfoIcon
} from "lucide-react";

// ==========================================
// 1. HAILMARY AI DIAGNOSIS SIMULATOR
// ==========================================
function HailmarySimulator() {
  const SAMPLES = [
    {
      id: "case-01",
      name: "Patient Scan X-71A (Control Sample)",
      type: "Normal",
      prob: 0.04,
      findings: "Clear lung fields bilaterally. Cardiomegraly within normal range. No focal infiltrates or consolidations identified.",
      scandata: "0.041 || 0.021 || 0.038",
      color: "var(--teal)"
    },
    {
      id: "case-02",
      name: "Patient Scan X-84B (Acute Infiltration)",
      type: "Tuberculosis Detected (Flagged)",
      prob: 0.94,
      findings: "Significant patchy consolidation in the right upper zone. Cavitary lesion (3.2cm) visible. Suggestive of active Mycobacterium TB infection.",
      scandata: "0.942 || 0.898 || 0.912",
      color: "var(--amber)"
    },
    {
      id: "case-03",
      name: "Patient Scan X-09C (Borderline Case)",
      type: "Borderline / Inconclusive",
      prob: 0.52,
      findings: "Subtle reticular densities in left apex. No distinct cavity. Recommend further sputum smear test (AFB) and clinical correlation.",
      scandata: "0.524 || 0.491 || 0.510",
      color: "#bf5af2"
    }
  ];

  const [selectedCase, setSelectedCase] = useState(SAMPLES[0]);
  const [scanState, setScanState] = useState("idle"); // idle | scanning | completed
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleScan = () => {
    setScanState("scanning");
    setScanProgress(0);
    setLogs(["[SYS] Fetching patient radiograph tensor...", "[SYS] Resizing input matrix to (224, 224, 3)..."]);

    const steps = [
      { p: 20, l: "[PRE] Applying Z-score image normalization..." },
      { p: 40, l: "[MODEL] Loading PyTorch ResNet-50 weights..." },
      { p: 60, l: "[MODEL] Extracting convolutional feature map (layer 4)..." },
      { p: 80, l: "[MODEL] Computing global average pooling probability..." },
      { p: 95, l: "[SYS] Constructing diagnostic report package..." },
      { p: 100, l: "[SUCCESS] Inference finished. Probability model response: OK." }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        const step = steps[current];
        setScanProgress(step.p);
        setLogs((prev) => [...prev, step.l]);
        current++;
      } else {
        clearInterval(interval);
        setScanState("completed");
      }
    }, 450);
  };

  return (
    <div className="sim-container hailmary-sim">
      <div className="sim-sidebar">
        <h5 className="mono sim-title">1. CHOOSE RADIOGRAPH SAMPLE</h5>
        <div className="case-selectors">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              className={`case-btn mono ${selectedCase.id === s.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCase(s);
                setScanState("idle");
                setScanProgress(0);
                setLogs([]);
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        <button 
          className="scan-trigger-btn mono" 
          onClick={handleScan}
          disabled={scanState === "scanning"}
        >
          <Play size={13} />
          {scanState === "scanning" ? "RUNNING INFERENCE..." : "TRIGGER AI INFERENCE"}
        </button>
      </div>

      <div className="sim-display">
        {/* Visual Lung Simulator */}
        <div className="lung-stage">
          <div className="lung-outline">
            {/* Abstract lung vector simulation using CSS */}
            <div className="lung-lobe lung-lobe--left">
              {selectedCase.id === "case-02" && scanState === "completed" && (
                <div className="lesion-hotspot" />
              )}
            </div>
            <div className="lung-lobe lung-lobe--right">
              {selectedCase.id === "case-03" && scanState === "completed" && (
                <div className="lesion-hotspot lesion-hotspot--weak" />
              )}
            </div>
          </div>

          {/* Grid sweep overlay */}
          <div className="grid-overlay" />

          {/* Scanning line animation */}
          {scanState === "scanning" && (
            <motion.div 
              className="scan-bar" 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {scanState === "idle" && (
            <div className="stage-overlay mono">
              <span>SCANNER ARMED. AWAITING AI INFERENCE.</span>
            </div>
          )}
        </div>

        {/* Real-time Diagnostics Output */}
        <div className="diag-output">
          {scanState === "scanning" && (
            <div className="live-logs mono">
              {logs.map((log, i) => (
                <div key={i} className="log-line">{log}</div>
              ))}
            </div>
          )}

          {scanState === "completed" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inference-report"
            >
              <div className="report-header mono">
                <span>DIAGNOSTIC FINDINGS REPORT</span>
                <span style={{ color: selectedCase.color }}>{selectedCase.type}</span>
              </div>
              
              <div className="metric-panel">
                <div className="metric-row">
                  <span className="mono">CONFIDENCE COEFFICIENT:</span>
                  <span className="mono text-highlight" style={{ color: selectedCase.color }}>
                    {(selectedCase.prob * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${selectedCase.prob * 100}%`, background: selectedCase.color }} 
                  />
                </div>
              </div>

              <p className="findings-txt">{selectedCase.findings}</p>
              <div className="report-footer mono">
                <span>PROB ARRAY: {selectedCase.scandata}</span>
                <span>MODEL VER: R50-v1.4</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. NOTES VAULT CRYPTOGRAPHIC SIMULATOR
// ==========================================
function NotesVaultSimulator() {
  const INITIAL_NOTES = [
    {
      id: "note-01",
      subject: "B.Tech IT — Database Systems",
      title: "SQL Normalization Rules",
      content: "1NF: Eliminate repeating groups. 2NF: No partial dependency on primary key. 3NF: No transitive dependencies.",
      hash: "7f8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c",
      encrypted: false,
    },
    {
      id: "note-02",
      subject: "Academic — Computer Networks",
      title: "TCP Three-way Handshake",
      content: "1. Client sends SYN. 2. Server replies SYN-ACK. 3. Client transmits ACK. Session successfully initiated.",
      hash: "a1b2c3d4e5f67f8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c3d4e5f6a7b8c9d0a1b2c",
      encrypted: true,
    }
  ];

  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("B.Tech IT — Operating Systems");
  const [content, setContent] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [unlockedNoteId, setUnlockedNoteId] = useState(null);
  const [decryptKey, setDecryptKey] = useState("");
  const [activeTab, setActiveTab] = useState("vault"); // vault | create
  const [sysStatus, setSysStatus] = useState("Ready");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setSysStatus("Encrypting & Uploading...");
    
    setTimeout(() => {
      // Generate realistic simulated mock hash
      const hex = "0123456789abcdef";
      let mockHash = "";
      for (let i = 0; i < 64; i++) {
        mockHash += hex[Math.floor(Math.random() * 16)];
      }

      const newNote = {
        id: `note-${Date.now()}`,
        subject,
        title,
        content,
        hash: mockHash,
        encrypted: isEncrypted
      };

      setNotes((prev) => [newNote, ...prev]);
      setTitle("");
      setContent("");
      setIsEncrypted(false);
      setActiveTab("vault");
      setSysStatus("Note Uploaded securely to SQLite db.");
    }, 800);
  };

  const handleUnlock = (id) => {
    if (decryptKey === "sharvesh2026") {
      setUnlockedNoteId(id);
      setDecryptKey("");
      setSysStatus("Vault item unlocked successfully.");
    } else {
      setSysStatus("ERROR: Invalid master security key!");
    }
  };

  return (
    <div className="sim-container vault-sim">
      <div className="vault-tabs">
        <button 
          className={`vault-tab mono ${activeTab === "vault" ? "active" : ""}`}
          onClick={() => setActiveTab("vault")}
        >
          <Lock size={12} /> SECURED VAULT ({notes.length})
        </button>
        <button 
          className={`vault-tab mono ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          <FileText size={12} /> ENCRYPT NEW NOTE
        </button>
      </div>

      <div className="vault-body">
        {activeTab === "vault" && (
          <div className="vault-list-container">
            <div className="vault-header-row mono">
              <span>SQL DATABASE RECORDS</span>
              <span className="status-badge">{sysStatus}</span>
            </div>

            <div className="vault-list">
              {notes.map((note) => {
                const isLocked = note.encrypted && unlockedNoteId !== note.id;
                return (
                  <div key={note.id} className="vault-item">
                    <div className="vault-item-head">
                      <div>
                        <span className="mono note-subject">{note.subject}</span>
                        <h6 className="note-title">{note.title}</h6>
                      </div>
                      <span className={`mono lock-status ${note.encrypted ? "secure" : "public"}`}>
                        {note.encrypted ? "ENCRYPTED" : "PUBLIC"}
                      </span>
                    </div>

                    <div className="vault-item-content">
                      {isLocked ? (
                        <div className="lock-overlay">
                          <Lock size={20} className="lock-icon" />
                          <span className="mono">RECORD CIPHER-LOCKED</span>
                          <div className="unlock-input-row">
                            <input
                              type="password"
                              placeholder="Master Key (sharvesh2026)"
                              className="mono unlock-input"
                              value={decryptKey}
                              onChange={(e) => setDecryptKey(e.target.value)}
                            />
                            <button 
                              onClick={() => handleUnlock(note.id)}
                              className="unlock-btn mono"
                            >
                              DECRYPT
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="note-text">
                          {note.content}
                          {!isLocked && note.encrypted && (
                            <span className="decrypted-tag mono"> [DECRYPTED VALUE]</span>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="vault-item-foot mono">
                      <span>HASH: {note.hash.substring(0, 24)}...</span>
                      {note.encrypted && !isLocked && (
                        <button 
                          className="lock-again" 
                          onClick={() => setUnlockedNoteId(null)}
                        >
                          Lock Record
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <form onSubmit={handleCreate} className="vault-form">
            <div className="form-grid">
              <div className="form-col">
                <label className="mono">COURSE VERTICAL</label>
                <select 
                  className="mono"
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option>B.Tech IT — Operating Systems</option>
                  <option>B.Tech IT — Database Systems</option>
                  <option>B.Tech IT — Computer Networks</option>
                  <option>Self-Study — Machine Learning</option>
                </select>
              </div>

              <div className="form-col">
                <label className="mono">NOTE TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dijkstra's Routing Algorithm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="form-col textarea-col">
              <label className="mono">NOTE CONTENT</label>
              <textarea
                required
                rows={3}
                placeholder="Write note summary content..."
                className="mono"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-container mono">
                <input
                  type="checkbox"
                  checked={isEncrypted}
                  onChange={(e) => setIsEncrypted(e.target.checked)}
                />
                <span className="checkmark" />
                APPLY AES-256 CRYPTO PACKET ROUTING
              </label>
            </div>

            <button type="submit" className="submit-note-btn mono">
              <Shield size={13} />
              SECURE TO LOCAL SQL SANDBOX
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. APARTMENT TICKET MANAGER SIMULATOR
// ==========================================
function ApartmentSimulator() {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-102",
      block: "Block B, Suite 402",
      category: "Plumbing",
      issue: "Corrosion in main water inlet pipe causing steady dripping.",
      status: "RESOLVED",
      dispatched: "Maintenance Team Alpha",
      timestamp: "10 mins ago"
    },
    {
      id: "TKT-103",
      block: "Block C, Lift Lobby 2",
      category: "Elevator Calibration",
      issue: "Floor realignment displacement off by 2 inches. Speed limit alert triggered.",
      status: "IN PROGRESS",
      dispatched: "Calibration Techs",
      timestamp: "Just Now"
    },
    {
      id: "TKT-104",
      block: "Block A, Door 105",
      category: "Electrical",
      issue: "Flickering breaker switch during peaks. Probable heavy voltage drop.",
      status: "PENDING",
      dispatched: "Awaiting Dispatch",
      timestamp: "Received"
    }
  ]);

  const [block, setBlock] = useState("Block A");
  const [door, setDoor] = useState("Suite 101");
  const [category, setCategory] = useState("Plumbing");
  const [issue, setIssue] = useState("");
  const [logStatus, setLogStatus] = useState("Database standing by.");

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!issue) return;

    const newTkt = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      block: `${block}, ${door}`,
      category,
      issue,
      status: "PENDING",
      dispatched: "Awaiting Dispatch",
      timestamp: "Just Now"
    };

    setTickets((prev) => [newTkt, ...prev]);
    setIssue("");
    setLogStatus(`Filed ticket ${newTkt.id} into central AMS pipeline.`);
  };

  const handleDispatch = (id, teamName) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "IN PROGRESS", dispatched: teamName } : t
      )
    );
    setLogStatus(`Dispatched ${teamName} to handle Ticket ${id}.`);
  };

  const handleResolve = (id) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "RESOLVED" } : t))
    );
    setLogStatus(`Marked Ticket ${id} as RESOLVED.`);
  };

  const getStatusColor = (status) => {
    if (status === "RESOLVED") return "var(--teal)";
    if (status === "IN PROGRESS") return "var(--amber)";
    return "#ff453a";
  };

  return (
    <div className="sim-container ams-sim">
      <div className="sim-sidebar ams-sidebar">
        <h5 className="mono sim-title">NEW MAINTENANCE TICKET</h5>
        <form onSubmit={handleAddTicket} className="ams-form">
          <div className="ams-form__row">
            <label className="mono">BLOCK</label>
            <select className="mono" value={block} onChange={(e) => setBlock(e.target.value)}>
              <option>Block A</option>
              <option>Block B</option>
              <option>Block C</option>
            </select>
          </div>

          <div className="ams-form__row">
            <label className="mono">ROOM/DOOR</label>
            <input 
              type="text" 
              required
              className="mono" 
              value={door} 
              onChange={(e) => setDoor(e.target.value)} 
            />
          </div>

          <div className="ams-form__row">
            <label className="mono">CATEGORY</label>
            <select className="mono" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Elevator Calibration</option>
              <option>Security/Gate Access</option>
            </select>
          </div>

          <div className="ams-form__row">
            <label className="mono">ISSUE STATEMENT</label>
            <textarea
              required
              rows={2}
              placeholder="e.g., Leak in boiler drainage valves."
              className="mono"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>

          <button type="submit" className="ams-submit-btn mono">
            <Send size={12} />
            <span>FILE RESIDENT REQUEST</span>
          </button>
        </form>
      </div>

      <div className="sim-display ams-display">
        <div className="ams-header mono">
          <span>TICKET MANAGEMENT CENTRAL ROUTER</span>
          <span className="ams-log-status">{logStatus}</span>
        </div>

        <div className="ams-queue">
          <AnimatePresence initial={false}>
            {tickets.map((t) => (
              <motion.div 
                key={t.id} 
                className="tkt-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <div className="tkt-card-head mono">
                  <span className="tkt-id">{t.id}</span>
                  <span className="tkt-badge mono" style={{ color: getStatusColor(t.status), borderColor: getStatusColor(t.status) }}>
                    {t.status}
                  </span>
                </div>

                <div className="tkt-info">
                  <div className="tkt-detail-row">
                    <span className="mono label">LOCATION:</span>
                    <span className="val">{t.block}</span>
                  </div>
                  <div className="tkt-detail-row">
                    <span className="mono label">CATEGORY:</span>
                    <span className="val">{t.category}</span>
                  </div>
                  <p className="tkt-issue">{t.issue}</p>
                </div>

                <div className="tkt-actions">
                  <div className="tkt-dispatched mono">
                    <span>TEAM:</span>
                    <span className="team-val">{t.dispatched}</span>
                  </div>

                  <div className="tkt-btn-group">
                    {t.status === "PENDING" && (
                      <button 
                        className="tkt-act-btn mono dispatch"
                        onClick={() => handleDispatch(t.id, "Emergency Squad Bravo")}
                      >
                        DISPATCH ENGINE
                      </button>
                    )}
                    {t.status === "IN PROGRESS" && (
                      <button 
                        className="tkt-act-btn mono resolve"
                        onClick={() => handleResolve(t.id)}
                      >
                        RESOLVE TICKET
                      </button>
                    )}
                    {t.status === "RESOLVED" && (
                      <span className="tkt-closed-badge mono">
                        <CheckCircle size={12} /> CLOSED
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CORE PROJECT SIMULATOR MANAGER
// ==========================================
export default function ProjectSimulator({ projectId }) {
  return (
    <div className="project-simulator-wrapper">
      {projectId === "hailmary" && <HailmarySimulator />}
      {projectId === "notes" && <NotesVaultSimulator />}
      {projectId === "apartment" && <ApartmentSimulator />}

      <style>{`
        .project-simulator-wrapper {
          margin-top: 24px;
          border: 1px solid var(--border-soft);
          background: rgba(10, 15, 12, 0.4);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.4);
        }
        
        .sim-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 380px;
        }
        
        @media (max-width: 820px) {
          .sim-container {
            grid-template-columns: 1fr;
          }
        }
        
        .sim-sidebar {
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid var(--border-soft);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        @media (max-width: 820px) {
          .sim-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border-soft);
          }
        }
        
        .sim-title {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .sim-display {
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.15);
        }
        
        /* 1. HAILMARY INFERENCE CSS */
        .case-selectors {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .case-btn {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          padding: 10px 12px;
          text-align: left;
          color: var(--text-dim);
          font-size: 11.5px;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        
        .case-btn:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: var(--border);
        }
        
        .case-btn.active {
          border-color: var(--amber);
          background: rgba(232, 163, 61, 0.05);
          color: var(--text);
        }
        
        .scan-trigger-btn {
          margin-top: auto;
          background: rgba(82, 201, 182, 0.08);
          border: 1px solid var(--teal-dim);
          color: var(--teal);
          padding: 12px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }
        
        .scan-trigger-btn:hover:not(:disabled) {
          background: var(--teal);
          color: var(--bg);
          border-color: var(--teal);
          box-shadow: 0 0 12px var(--teal-dim);
        }
        
        .scan-trigger-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .lung-stage {
          position: relative;
          height: 200px;
          background: #040806;
          border-bottom: 1px solid var(--border-soft);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lung-outline {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          justify-content: space-between;
          opacity: 0.85;
        }
        
        .lung-lobe {
          width: 60px;
          height: 120px;
          border: 1.5px solid rgba(82, 201, 182, 0.3);
          border-radius: 30px 10px 40px 15px;
          position: relative;
          background: rgba(82, 201, 182, 0.03);
        }
        
        .lung-lobe--right {
          border-radius: 10px 30px 15px 40px;
        }
        
        .lesion-hotspot {
          position: absolute;
          top: 35px;
          left: 15px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--amber) 20%, transparent 70%);
          filter: blur(2px);
          animation: hotspot-pulse 1.2s infinite alternate ease-in-out;
        }
        
        .lesion-hotspot--weak {
          top: 45px;
          left: 10px;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #bf5af2 30%, transparent 75%);
          animation: hotspot-pulse 1.8s infinite alternate ease-in-out;
        }
        
        @keyframes hotspot-pulse {
          0% { transform: scale(0.85); opacity: 0.4; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(82, 201, 182, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(82, 201, 182, 0.05) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
        }
        
        .scan-bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--amber);
          box-shadow: 0 0 10px var(--amber);
          opacity: 0.85;
          pointer-events: none;
        }
        
        .stage-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.65);
          font-size: 11px;
          color: var(--text-mute);
          letter-spacing: 0.1em;
          font-weight: 500;
        }
        
        .diag-output {
          padding: 16px;
          flex-grow: 1;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
        }
        
        .live-logs {
          font-size: 11px;
          color: var(--teal);
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .log-line {
          animation: log-fade 0.3s ease forwards;
        }
        
        @keyframes log-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .inference-report {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .report-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          border-bottom: 1px dashed var(--border-soft);
          padding-bottom: 8px;
        }
        
        .metric-panel {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          padding: 12px;
          border-radius: 3px;
        }
        
        .metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 8px;
        }
        
        .progress-track {
          height: 4px;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .findings-txt {
          font-size: 13.5px;
          color: var(--text-dim);
          line-height: 1.5;
        }
        
        .report-footer {
          display: flex;
          justify-content: space-between;
          font-size: 9.5px;
          color: var(--text-mute);
          border-top: 1px dashed var(--border-soft);
          padding-top: 8px;
          margin-top: auto;
        }
        
        /* 2. CRYPTO VAULT CSS */
        .vault-sim {
          display: flex;
          flex-direction: column;
          min-height: 380px;
        }
        
        .vault-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid var(--border-soft);
        }
        
        .vault-tab {
          background: none;
          border: none;
          padding: 14px 20px;
          font-size: 11px;
          color: var(--text-mute);
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          border-right: 1px solid var(--border-soft);
        }
        
        .vault-tab:hover {
          color: var(--text-dim);
          background: rgba(255,255,255,0.01);
        }
        
        .vault-tab.active {
          color: var(--amber);
          background: var(--bg-soft);
          box-shadow: inset 0 2px 0 var(--amber);
        }
        
        .vault-body {
          flex-grow: 1;
          padding: 20px;
          background: rgba(0, 0, 0, 0.1);
        }
        
        .vault-list-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        
        .vault-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--text-mute);
          border-bottom: 1px solid var(--border-soft);
          padding-bottom: 10px;
        }
        
        .status-badge {
          color: var(--teal);
          font-weight: 500;
        }
        
        .vault-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-height: 270px;
          overflow-y: auto;
        }
        
        .vault-item {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 14px 16px;
          transition: border-color 0.2s ease;
          position: relative;
        }
        
        .vault-item:hover {
          border-color: var(--border);
        }
        
        .vault-item-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .note-subject {
          font-size: 10px;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        
        .note-title {
          font-size: 14.5px;
          font-family: var(--font-body);
          font-weight: 500;
          color: var(--text);
          margin-top: 2px;
        }
        
        .lock-status {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid;
        }
        
        .lock-status.secure {
          color: var(--amber);
          border-color: var(--amber-dim);
          background: rgba(232, 163, 61, 0.05);
        }
        
        .lock-status.public {
          color: var(--teal);
          border-color: var(--teal-dim);
          background: rgba(82, 201, 182, 0.05);
        }
        
        .vault-item-content {
          padding: 4px 0 10px;
          position: relative;
        }
        
        .note-text {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.55;
        }
        
        .decrypted-tag {
          font-size: 10px;
          color: var(--teal);
          font-weight: bold;
        }
        
        .lock-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          border-radius: 3px;
          padding: 16px;
          text-align: center;
          border: 1px dashed var(--border-soft);
        }
        
        .lock-icon {
          color: var(--amber);
          margin-bottom: 6px;
        }
        
        .unlock-input-row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          width: 100%;
          max-width: 280px;
        }
        
        .unlock-input {
          flex-grow: 1;
          background: var(--bg);
          border: 1px solid var(--border-soft);
          color: var(--text);
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 3px;
          outline: none;
        }
        
        .unlock-input:focus {
          border-color: var(--amber);
        }
        
        .unlock-btn {
          background: var(--amber);
          color: var(--bg);
          border: none;
          padding: 6px 12px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .unlock-btn:hover {
          opacity: 0.9;
        }
        
        .vault-item-foot {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-mute);
          border-top: 1px solid rgba(255,255,255,0.03);
          padding-top: 8px;
        }
        
        .lock-again {
          background: none;
          border: none;
          color: var(--amber);
          cursor: pointer;
          font-size: 10px;
          padding: 0;
        }
        
        .lock-again:hover {
          text-decoration: underline;
        }
        
        .vault-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        
        @media (max-width: 580px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .form-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .form-col label {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }
        
        .form-col select, .form-col input, .form-col textarea {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          color: var(--text);
          padding: 10px 12px;
          border-radius: 3px;
          font-size: 12.5px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        
        .form-col select:focus, .form-col input:focus, .form-col textarea:focus {
          border-color: var(--amber);
        }
        
        .form-checkbox-row {
          margin: 4px 0;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          color: var(--text-dim);
          cursor: pointer;
          user-select: none;
        }
        
        .submit-note-btn {
          background: rgba(232, 163, 61, 0.08);
          border: 1px solid var(--amber-dim);
          color: var(--amber);
          padding: 12px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        
        .submit-note-btn:hover {
          background: var(--amber);
          color: var(--bg);
          border-color: var(--amber);
        }
        
        /* 3. AMS MAINTENANCE CSS */
        .ams-sim {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 400px;
        }
        
        .ams-sidebar {
          padding: 16px;
        }
        
        .ams-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .ams-form__row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .ams-form__row label {
          font-size: 9.5px;
          color: var(--text-mute);
          letter-spacing: 0.05em;
        }
        
        .ams-form__row select, .ams-form__row input, .ams-form__row textarea {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          color: var(--text);
          font-size: 11.5px;
          padding: 8px 10px;
          border-radius: 3px;
          outline: none;
          width: 100%;
        }
        
        .ams-form__row select:focus, .ams-form__row input:focus, .ams-form__row textarea:focus {
          border-color: var(--amber);
        }
        
        .ams-submit-btn {
          margin-top: 6px;
          background: rgba(82, 201, 182, 0.08);
          border: 1px solid var(--teal-dim);
          color: var(--teal);
          padding: 10px;
          font-size: 10.5px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .ams-submit-btn:hover {
          background: var(--teal);
          color: var(--bg);
          border-color: var(--teal);
        }
        
        .ams-display {
          padding: 16px;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .ams-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10.5px;
          color: var(--text-mute);
          border-bottom: 1px solid var(--border-soft);
          padding-bottom: 8px;
        }
        
        .ams-log-status {
          color: var(--amber);
        }
        
        .ams-queue {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 310px;
          overflow-y: auto;
          padding-right: 4px;
        }
        
        .tkt-card {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 12px 14px;
        }
        
        .tkt-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .tkt-id {
          font-size: 11px;
          font-weight: 600;
          color: var(--text);
        }
        
        .tkt-badge {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid;
          letter-spacing: 0.05em;
        }
        
        .tkt-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
        }
        
        .tkt-detail-row {
          display: flex;
          gap: 8px;
          font-size: 11px;
        }
        
        .tkt-detail-row .label {
          color: var(--text-mute);
          width: 80px;
        }
        
        .tkt-detail-row .val {
          color: var(--text-dim);
        }
        
        .tkt-issue {
          font-size: 12.5px;
          color: var(--text-dim);
          line-height: 1.45;
          margin-top: 4px;
          border-left: 2px solid var(--border);
          padding-left: 8px;
        }
        
        .tkt-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.03);
          padding-top: 8px;
        }
        
        .tkt-dispatched {
          display: flex;
          gap: 6px;
          font-size: 10px;
          color: var(--text-mute);
        }
        
        .team-val {
          color: var(--text-dim);
        }
        
        .tkt-btn-group {
          display: flex;
          gap: 6px;
        }
        
        .tkt-act-btn {
          padding: 5px 10px;
          font-size: 9.5px;
          font-weight: 600;
          border-radius: 3px;
          cursor: pointer;
          border: none;
        }
        
        .tkt-act-btn.dispatch {
          background: var(--amber);
          color: var(--bg);
        }
        
        .tkt-act-btn.resolve {
          background: var(--teal);
          color: var(--bg);
        }
        
        .tkt-act-btn:hover {
          opacity: 0.9;
        }
        
        .tkt-closed-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--teal);
          font-size: 10px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

