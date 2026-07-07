import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send, Terminal as TermIcon, CheckCircle2, Wifi, RefreshCw } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { toast } from "./Toast.jsx";

const CONTACT_ITEMS = [
  {
    id: "email",
    label: "Email",
    value: "sharveshcm29@gmail.com",
    href: "mailto:sharveshcm29@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91 63835 53774",
    href: "tel:+916383553774",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/sharveshcm2940",
    href: "https://github.com/sharveshcm2940",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "c-m-sharvesh-847066332",
    href: "https://linkedin.com/in/c-m-sharvesh-847066332",
  },
];

const SIGNAL_TYPES = [
  { value: "collab", label: "Collab Offer" },
  { value: "internship", label: "Internship" },
  { value: "kaapi", label: "Kaapi Invite" },
  { value: "ping", label: "Telemetry Ping" },
];

export default function Contact() {
  const [copiedId, setCopiedId] = useState(null);
  
  // Signal pinger states
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [signalType, setSignalType] = useState("collab");
  const [txState, setTxState] = useState("idle"); // idle | transmitting | success
  const [txProgress, setTxProgress] = useState(0);
  const [txLogs, setTxLogs] = useState([]);

  // Copy helper
  const handleCopy = (e, id, value) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    toast(`${id.toUpperCase()} copied to clipboard!`, "copy");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Signal transmission sequence
  const startTransmission = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setTxState("transmitting");
    setTxProgress(0);
    setTxLogs(["[SYS] Initiating secure packet construction...", "[SYS] Fetching encryption certificate..."]);

    const stages = [
      { progress: 15, log: "[CERT] Local verification: SVCE.node authentication verified." },
      { progress: 35, log: `[PAYLOAD] Formatted subject: [${signalType.toUpperCase()}] from [${senderName.toUpperCase()}]` },
      { progress: 55, log: "[CIPHER] Message payload encrypted via TLS 1.3 socket layer." },
      { progress: 75, log: "[ROUTE] Directing beam frequency to Chennai network terminal..." },
      { progress: 90, log: "[TRANS] Uploading message bytes... Syncing checksums..." },
      { progress: 100, log: "[SUCCESS] Signal packet successfully routed and delivered! (Status Code: 202)" }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setTxProgress(stage.progress);
        setTxLogs((prev) => [...prev, stage.log]);
        currentStage++;
      } else {
        clearInterval(interval);
        setTxState("success");
        toast("Signal transmitted successfully!", "success");
      }
    }, 600);
  };

  const resetForm = () => {
    setSenderName("");
    setMessage("");
    setSignalType("collab");
    setTxState("idle");
    setTxProgress(0);
    setTxLogs([]);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title contact__title">
            Let's connect, collaborate, or build something robust.
          </h2>
        </Reveal>

        <div className="contact__main-layout">
          {/* Column 1: Contact details + Copy triggers */}
          <Reveal delay={1} className="contact__left">
            <div className="contact__grid">
              {CONTACT_ITEMS.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <a
                    key={item.id}
                    className="contact__item-card"
                    href={item.href}
                    target={item.id === "github" || item.id === "linkedin" ? "_blank" : "_self"}
                    rel="noreferrer"
                  >
                    <div className="contact__item-card-header">
                      <span className="mono contact__card-label">{item.label}</span>
                      <button
                        className={`contact__copy-btn ${isCopied ? "copied" : ""}`}
                        onClick={(e) => handleCopy(e, item.id, item.value)}
                        title={`Copy ${item.label}`}
                        aria-label={`Copy ${item.label} to clipboard`}
                      >
                        <AnimatePresence mode="wait">
                          {isCopied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              className="contact__copy-icon-wrap"
                            >
                              <Check className="contact__icon" size={13} />
                              <span className="mono copy-text">COPIED</span>
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              className="contact__copy-icon-wrap"
                            >
                              <Copy className="contact__icon" size={13} />
                              <span className="mono copy-text">COPY</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                    <span className="contact__card-value">{item.value}</span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Column 2: Signal Transmitter */}
          <Reveal delay={2} className="contact__right">
            <div className="signal-box">
              <div className="signal-box__head mono">
                <div className="signal-box__title">
                  <Wifi className="pulse-signal" size={14} />
                  <span>SIGNAL TRANSMITTER v1.0</span>
                </div>
                <div className="signal-box__badge">ENCRYPTED</div>
              </div>

              <div className="signal-box__body">
                {txState === "idle" && (
                  <form onSubmit={startTransmission} className="signal-form">
                    <div className="signal-form__row">
                      <label className="mono signal-form__label">Signal Type</label>
                      <select
                        className="signal-form__input signal-form__select mono"
                        value={signalType}
                        onChange={(e) => setSignalType(e.target.value)}
                      >
                        {SIGNAL_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="signal-form__row">
                      <label className="mono signal-form__label">Sender Handle</label>
                      <input
                        type="text"
                        required
                        placeholder="your name or organization"
                        className="signal-form__input mono"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                    </div>

                    <div className="signal-form__row">
                      <label className="mono signal-form__label">Payload Message</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="draft your message package..."
                        className="signal-form__input signal-form__textarea mono"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="signal-form__submit mono">
                      <Send size={13} />
                      <span>TRANSMIT PACKETS</span>
                    </button>
                  </form>
                )}

                {txState === "transmitting" && (
                  <div className="signal-tx">
                    <div className="signal-tx__loader">
                      <div className="signal-tx__progress-row mono">
                        <span>TRANSMITTING DATA</span>
                        <span>{txProgress}%</span>
                      </div>
                      <div className="signal-tx__bar-container">
                        <div className="signal-tx__bar" style={{ width: `${txProgress}%` }} />
                      </div>
                    </div>

                    <div className="signal-tx__logs mono">
                      {txLogs.map((log, i) => (
                        <div key={i} className="signal-tx__log-line">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {txState === "success" && (
                  <div className="signal-success">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="signal-success__badge"
                    >
                      <CheckCircle2 className="success-icon" size={32} />
                      <h4 className="mono">TRANSMISSION COMPLETED</h4>
                    </motion.div>

                    <div className="signal-success__receipt mono">
                      <div className="receipt-row"><span>SENDER:</span> <span>{senderName}</span></div>
                      <div className="receipt-row"><span>HEADER:</span> <span>[{signalType.toUpperCase()}]</span></div>
                      <div className="receipt-row"><span>STATUS:</span> <span className="receipt-status">DELIVERED (202)</span></div>
                    </div>

                    <button onClick={resetForm} className="signal-success__reset mono">
                      <RefreshCw size={12} />
                      <span>PING ANOTHER SIGNAL</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="footer mono">
        <div className="container footer__inner">
          <span>C.M. Sharvesh — Chennai, India</span>
          <span>Built with React, Tailwind &amp; Framer Motion</span>
        </div>
      </footer>

      <style>{`
        .contact__title {
          max-width: 700px;
        }
        .contact__main-layout {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: flex-start;
          margin-bottom: 96px;
        }
        @media (max-width: 900px) {
          .contact__main-layout {
            grid-template-columns: 1fr;
            gap: 48px;
            margin-bottom: 64px;
          }
        }
        .contact__left {
          width: 100%;
        }
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid var(--border-soft);
        }
        .contact__item-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px 28px;
          text-decoration: none;
          border-bottom: 1px solid var(--border-soft);
          border-left: 1px solid var(--border-soft);
          border-right: 1px solid var(--border-soft);
          background: rgba(21, 29, 25, 0.2);
          transition: all 0.3s var(--ease);
          position: relative;
        }
        .contact__item-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--teal);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s var(--ease);
        }
        .contact__item-card:hover::before {
          transform: scaleY(1);
        }
        .contact__item-card:hover {
          background: var(--panel);
          padding-left: 36px;
          box-shadow: inset 5px 0 20px rgba(82, 201, 182, 0.03);
        }
        .contact__item-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .contact__card-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-mute);
        }
        .contact__card-value {
          font-size: 16px;
          color: var(--text);
          transition: color 0.3s var(--ease);
          word-break: break-word;
          font-weight: 500;
        }
        .contact__item-card:hover .contact__card-value {
          color: var(--amber);
        }
        
        /* Copy button styling */
        .contact__copy-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-soft);
          padding: 4px 10px;
          border-radius: 4px;
          color: var(--text-mute);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .contact__copy-btn:hover {
          background: rgba(232, 163, 61, 0.1);
          border-color: var(--amber-dim);
          color: var(--amber);
        }
        .contact__copy-btn.copied {
          background: rgba(82, 201, 182, 0.1);
          border-color: var(--teal);
          color: var(--teal);
        }
        .contact__copy-icon-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .copy-text {
          font-size: 9px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        
        /* Signal Transmitter Console Box */
        .signal-box {
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--panel);
          overflow: hidden;
          box-shadow: 0 20px 50px -25px rgba(0,0,0,0.5);
        }
        .signal-box__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          background: var(--bg-soft);
          border-bottom: 1px solid var(--border-soft);
          font-size: 11px;
        }
        .signal-box__title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--teal);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .pulse-signal {
          animation: pulse-op 1.5s ease-in-out infinite alternate;
        }
        @keyframes pulse-op {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .signal-box__badge {
          color: var(--amber);
          font-size: 9px;
          background: rgba(232, 163, 61, 0.15);
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid var(--amber-dim);
        }
        .signal-box__body {
          padding: 24px;
          background: rgba(13, 18, 16, 0.4);
        }
        
        /* Signal Form */
        .signal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .signal-form__row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .signal-form__label {
          font-size: 10px;
          color: var(--text-mute);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .signal-form__input {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 3px;
          color: var(--text);
          padding: 10px 14px;
          font-size: 13px;
          outline: none;
          transition: all 0.2s ease;
        }
        .signal-form__input::placeholder {
          color: var(--text-mute);
          opacity: 0.6;
        }
        .signal-form__input:focus {
          border-color: var(--amber);
          box-shadow: 0 0 8px rgba(232, 163, 61, 0.15);
        }
        .signal-form__select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none' stroke='%23e8a33d'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l4 4 4-4'/></svg>");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 32px;
        }
        .signal-form__textarea {
          resize: none;
        }
        .signal-form__submit {
          margin-top: 8px;
          background: rgba(82, 201, 182, 0.08);
          border: 1px solid var(--teal-dim);
          border-radius: 3px;
          color: var(--teal);
          padding: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.25s ease;
        }
        .signal-form__submit:hover {
          background: var(--teal);
          color: #0d1210;
          border-color: var(--teal);
          transform: translateY(-1px);
        }
        
        /* Transmitting State */
        .signal-tx {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .signal-tx__progress-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.05em;
        }
        .signal-tx__bar-container {
          margin-top: 8px;
          height: 3px;
          background: var(--border-soft);
          border-radius: 999px;
          overflow: hidden;
        }
        .signal-tx__bar {
          height: 100%;
          background: linear-gradient(90deg, var(--amber), var(--teal));
          transition: width 0.4s var(--ease);
          box-shadow: 0 0 6px var(--teal);
        }
        .signal-tx__logs {
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-soft);
          border-radius: 3px;
          padding: 14px 18px;
          height: 120px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
          line-height: 1.6;
        }
        .signal-tx__log-line {
          color: var(--teal);
          word-break: break-all;
        }
        
        /* Success State */
        .signal-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
          padding: 10px 0;
        }
        .signal-success__badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .success-icon {
          color: var(--teal);
        }
        .signal-success__badge h4 {
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--text);
        }
        .signal-success__receipt {
          background: var(--bg-soft);
          border: 1px dashed var(--border);
          border-radius: 3px;
          width: 100%;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
          font-size: 11.5px;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
        }
        .receipt-row span:first-child {
          color: var(--text-mute);
        }
        .receipt-row span:last-child {
          color: var(--text);
        }
        .receipt-status {
          color: var(--teal) !important;
          font-weight: 600;
        }
        .signal-success__reset {
          background: none;
          border: 1px solid var(--border-soft);
          border-radius: 3px;
          color: var(--text-mute);
          padding: 8px 16px;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .signal-success__reset:hover {
          border-color: var(--border);
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.02);
        }
        
        .footer {
          border-top: 1px solid var(--border-soft);
          padding: 26px 0;
        }
        .footer__inner {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 11.5px;
          color: var(--text-mute);
          letter-spacing: 0.04em;
        }
      `}</style>
    </section>
  );
}
