import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send, Terminal as TermIcon, CheckCircle2, Wifi, RefreshCw, Calendar, ArrowRight } from "lucide-react";
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
  
  // Terminal Contact Form states
  const [activeStep, setActiveStep] = useState("welcome"); // welcome | name | email | type | message | review | transmitting | success
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [signalType, setSignalType] = useState("collab");
  const [message, setMessage] = useState("");
  const [txProgress, setTxProgress] = useState(0);
  const [txLogs, setTxLogs] = useState([]);

  const inputRef = useRef(null);

  // Copy helper
  const handleCopy = (e, id, value) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    toast(`${id.toUpperCase()} copied to clipboard!`, "copy");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Focus utility
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeStep]);

  // Signal transmission sequence
  const startTransmission = () => {
    setActiveStep("transmitting");
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
        setActiveStep("success");
        toast("Signal transmitted successfully!", "success");
      }
    }, 600);
  };

  const resetForm = () => {
    setSenderName("");
    setSenderEmail("");
    setMessage("");
    setSignalType("collab");
    setActiveStep("welcome");
    setTxProgress(0);
    setTxLogs([]);
  };

  const handleNextStep = (e, next) => {
    e?.preventDefault();
    if (activeStep === "name" && !senderName.trim()) {
      toast("Please enter a valid sender name.", "info");
      return;
    }
    if (activeStep === "email" && !senderEmail.trim()) {
      toast("Please enter a valid email address.", "info");
      return;
    }
    if (activeStep === "message" && !message.trim()) {
      toast("Please draft your payload message.", "info");
      return;
    }
    setActiveStep(next);
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

          {/* Column 2: Terminal Contact Form */}
          <Reveal delay={2} className="contact__right">
            <div className="terminal-contact">
              
              {/* Terminal Window Header Bar */}
              <div className="terminal-contact-header mono">
                <div className="terminal-title">
                  <TermIcon size={14} className="terminal-pulse" />
                  <span>sharvesh@svce_contact_node: ~</span>
                </div>
                <div className="terminal-status-badge">CRT_SECURE</div>
              </div>

              {/* Terminal Inner Console */}
              <div className="terminal-contact-body">
                <AnimatePresence mode="wait">
                  
                  {/* STEP: WELCOME */}
                  {activeStep === "welcome" && (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-prompt">guest@svce:~$ ./connect_to_sharvesh.sh</p>
                      <p className="terminal-text text-amber mt-2">
                        [CONNECTING TO TERMINAL ROUTE 3000...]
                      </p>
                      <p className="terminal-text text-mute mt-1">
                        - Host node: Chennai, TN, India
                        <br />
                        - Authentication: GUEST_HANDSHAKE
                        <br />
                        - Status: Ready to receive signal packets
                      </p>
                      <div className="mt-8">
                        <button 
                          onClick={() => setActiveStep("name")} 
                          className="terminal-btn-primary flex items-center gap-2"
                        >
                          <span>INITIATE CONTACT SECURELY</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: NAME */}
                  {activeStep === "name" && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-text text-mute">[STEP 1/4] INITIALIZING SENDER METADATA</p>
                      <p className="terminal-prompt mt-2">guest@svce:~$ set sender_name</p>
                      <label htmlFor="sender-name-input" className="terminal-question mt-2 block">
                        Enter your name / organization:
                      </label>
                      <form onSubmit={(e) => handleNextStep(e, "email")} className="terminal-input-wrapper mt-3">
                        <span className="terminal-cursor-prompt">&gt;&nbsp;</span>
                        <input
                          id="sender-name-input"
                          ref={inputRef}
                          type="text"
                          required
                          placeholder="Type your name..."
                          className="terminal-text-input"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </form>
                      <div className="terminal-step-footer mt-6">
                        <span className="terminal-hint text-mute">Press Enter or click</span>
                        <button onClick={(e) => handleNextStep(e, "email")} className="terminal-btn-small">
                          NEXT
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: EMAIL */}
                  {activeStep === "email" && (
                    <motion.div
                      key="email"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-text text-mute">[STEP 2/4] SPECIFYING RETURN ROUTE</p>
                      <p className="terminal-text text-teal mt-1">[OK] SENDER_NAME set to: "{senderName}"</p>
                      <p className="terminal-prompt mt-2">guest@svce:~$ set reply_path</p>
                      <label htmlFor="reply-path-input" className="terminal-question mt-2 block">
                        Enter your email address / return coordinate:
                      </label>
                      <form onSubmit={(e) => handleNextStep(e, "type")} className="terminal-input-wrapper mt-3">
                        <span className="terminal-cursor-prompt">&gt;&nbsp;</span>
                        <input
                          id="reply-path-input"
                          ref={inputRef}
                          type="email"
                          required
                          placeholder="Type your email address..."
                          className="terminal-text-input"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                        />
                      </form>
                      <div className="terminal-step-footer mt-6">
                        <button onClick={() => setActiveStep("name")} className="terminal-btn-small text-mute">
                          BACK
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="terminal-hint text-mute">Press Enter or click</span>
                          <button onClick={(e) => handleNextStep(e, "type")} className="terminal-btn-small">
                            NEXT
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: TYPE */}
                  {activeStep === "type" && (
                    <motion.div
                      key="type"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-text text-mute">[STEP 3/4] SELECTING SIGNAL TYPE</p>
                      <p className="terminal-text text-teal mt-1">[OK] REPLY_PATH set to: "{senderEmail}"</p>
                      <p className="terminal-prompt mt-2">guest@svce:~$ set signal_type</p>
                      <p className="terminal-question mt-2">Select packet classification:</p>
                      
                      <div className="terminal-options-grid mt-4">
                        {SIGNAL_TYPES.map((t) => {
                          const isSelected = signalType === t.value;
                          return (
                            <button
                              key={t.value}
                              onClick={() => setSignalType(t.value)}
                              className={`terminal-option-card ${isSelected ? "selected" : ""}`}
                            >
                              <span className="option-indicator">{isSelected ? "[●]" : "[ ]"}</span>
                              <span className="option-label">{t.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="terminal-step-footer mt-8">
                        <button onClick={() => setActiveStep("email")} className="terminal-btn-small text-mute">
                          BACK
                        </button>
                        <button onClick={() => setActiveStep("message")} className="terminal-btn-small">
                          NEXT
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: MESSAGE */}
                  {activeStep === "message" && (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-text text-mute">[STEP 4/4] PREPARING PACKET PAYLOAD</p>
                      <p className="terminal-text text-teal mt-1">[OK] SIGNAL_TYPE set to: "{signalType.toUpperCase()}"</p>
                      <p className="terminal-prompt mt-2">guest@svce:~$ edit payload_message</p>
                      <label htmlFor="payload-msg-input" className="terminal-question mt-2 block">
                        Write your message package:
                      </label>
                      <div className="terminal-textarea-wrapper mt-3">
                        <span className="terminal-textarea-prompt">&gt;&nbsp;</span>
                        <textarea
                          id="payload-msg-input"
                          ref={inputRef}
                          required
                          rows={4}
                          placeholder="Write your message details..."
                          className="terminal-textarea-input"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <div className="terminal-step-footer mt-6">
                        <button onClick={() => setActiveStep("type")} className="terminal-btn-small text-mute">
                          BACK
                        </button>
                        <button onClick={(e) => handleNextStep(e, "review")} className="terminal-btn-small">
                          COMCOMPILE
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: REVIEW */}
                  {activeStep === "review" && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="terminal-step mono"
                    >
                      <p className="terminal-prompt">guest@svce:~$ print_manifest</p>
                      <div className="terminal-manifest mt-3">
                        <div className="manifest-header">PACKET TRANSMISSION MANIFEST</div>
                        <div className="manifest-grid mt-2">
                          <div className="manifest-row">
                            <span>SENDER:</span>
                            <span className="text-amber">{senderName}</span>
                          </div>
                          <div className="manifest-row">
                            <span>ROUTE:</span>
                            <span className="text-amber">{senderEmail}</span>
                          </div>
                          <div className="manifest-row">
                            <span>TYPE:</span>
                            <span className="text-amber">{signalType.toUpperCase()}</span>
                          </div>
                          <div className="manifest-row border-none">
                            <span>PAYLOAD:</span>
                            <span className="text-dim truncate-msg">{message}</span>
                          </div>
                        </div>
                      </div>

                      <div className="terminal-step-footer mt-6">
                        <button onClick={() => setActiveStep("message")} className="terminal-btn-small text-mute">
                          EDIT
                        </button>
                        <button onClick={startTransmission} className="terminal-btn-primary flex items-center gap-2">
                          <Send size={12} />
                          <span>TRANSMIT SIGNAL</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: TRANSMITTING */}
                  {activeStep === "transmitting" && (
                    <motion.div
                      key="transmitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="terminal-step mono"
                    >
                      <div className="terminal-loader">
                        <div className="flex justify-between text-xs mb-1">
                          <span>TRANSMITTING PACKETS...</span>
                          <span>{txProgress}%</span>
                        </div>
                        <div className="terminal-progress-bar">
                          <div className="progress-fill" style={{ width: `${txProgress}%` }} />
                        </div>
                      </div>

                      <div className="terminal-logs mt-4">
                        {txLogs.map((log, i) => (
                          <div key={i} className="terminal-log-line">
                            {log}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: SUCCESS */}
                  {activeStep === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="terminal-step mono text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="success-glowing-circle">
                          <CheckCircle2 size={36} className="text-teal" />
                        </div>
                        <h4 className="text-teal font-bold tracking-wider">TRANSMISSION COMPLETED SECURELY</h4>
                      </div>

                      <div className="terminal-receipt mt-6 text-left">
                        <div className="receipt-line"><span>DESTINATION:</span> <span>c.m.sharvesh@svce.in</span></div>
                        <div className="receipt-line"><span>STATUS:</span> <span className="text-teal">DELIVERED (202 ACCEPTED)</span></div>
                        <div className="receipt-line"><span>CHECKSUM:</span> <span>MD5_SHA256_SECURE</span></div>
                      </div>

                      <button onClick={resetForm} className="terminal-btn-secondary flex items-center gap-2 mx-auto mt-8">
                        <RefreshCw size={12} />
                        <span>RESET CONSOLE CONNECTION</span>
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
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

        /* CRT Terminal Contact Box styling */
        .terminal-contact {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--panel);
          overflow: hidden;
          box-shadow: 0 20px 50px -25px rgba(0,0,0,0.6);
        }

        .terminal-contact-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-soft);
          border-bottom: 1px solid var(--border-soft);
          font-size: 11px;
        }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-dim);
          font-weight: 500;
        }

        .terminal-pulse {
          color: var(--amber);
          animation: terminal-blink 1.4s infinite alternate;
        }

        @keyframes terminal-blink {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }

        .terminal-status-badge {
          font-size: 9px;
          background: rgba(255, 176, 0, 0.1);
          color: var(--amber);
          border: 1px solid var(--border-soft);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .terminal-contact-body {
          padding: 28px;
          min-height: 320px;
          background: rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .terminal-prompt {
          color: var(--teal);
          font-weight: bold;
        }

        .terminal-text {
          font-size: 13px;
          line-height: 1.6;
        }

        .terminal-text-input {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: var(--amber) !important;
          font-family: var(--font-mono);
          font-size: 14px;
          flex: 1;
          width: 100%;
          padding: 0;
          caret-color: var(--amber);
        }

        .terminal-input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border-soft);
          padding: 10px 14px;
          border-radius: 4px;
        }

        .terminal-input-wrapper:focus-within {
          border-color: var(--amber-dim);
          box-shadow: 0 0 10px rgba(255, 176, 0, 0.15);
        }

        .terminal-cursor-prompt {
          color: var(--amber);
          font-weight: bold;
          flex-shrink: 0;
        }

        .terminal-question {
          font-size: 13px;
          color: var(--text-dim);
        }

        .terminal-btn-primary {
          background: rgba(255, 176, 0, 0.08);
          border: 1px solid var(--amber-dim);
          color: var(--amber);
          font-family: var(--font-mono);
          padding: 12px 20px;
          font-size: 12px;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .terminal-btn-primary:hover {
          background: var(--amber);
          color: #0b0702;
          box-shadow: 0 0 15px rgba(255, 176, 0, 0.25);
        }

        .terminal-btn-secondary {
          background: transparent;
          border: 1px solid var(--border-soft);
          color: var(--text-mute);
          font-family: var(--font-mono);
          padding: 10px 18px;
          font-size: 11px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .terminal-btn-secondary:hover {
          border-color: var(--border);
          color: var(--text-dim);
          background: rgba(255,255,255,0.02);
        }

        .terminal-btn-small {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-soft);
          color: var(--text-dim);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: bold;
          padding: 6px 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .terminal-btn-small:hover {
          background: rgba(255,255,255,0.06);
          border-color: var(--text-dim);
        }

        .terminal-step-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .terminal-hint {
          font-size: 11px;
        }

        .terminal-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 480px) {
          .terminal-options-grid {
            grid-template-columns: 1fr;
          }
        }

        .terminal-option-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border-soft);
          border-radius: 6px;
          cursor: pointer;
          font-family: var(--font-mono);
          color: var(--text-mute);
          text-align: left;
          transition: all 0.2s ease;
        }

        .terminal-option-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: var(--border);
          color: var(--text-dim);
        }

        .terminal-option-card.selected {
          border-color: var(--teal);
          background: rgba(82, 201, 182, 0.05);
          color: var(--teal);
          box-shadow: 0 0 10px rgba(82, 201, 182, 0.1);
        }

        .terminal-textarea-wrapper {
          display: flex;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border-soft);
          padding: 12px;
          border-radius: 4px;
        }

        .terminal-textarea-wrapper:focus-within {
          border-color: var(--amber-dim);
          box-shadow: 0 0 10px rgba(255, 176, 0, 0.15);
        }

        .terminal-textarea-prompt {
          color: var(--amber);
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .terminal-textarea-input {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: var(--amber) !important;
          font-family: var(--font-mono);
          font-size: 13px;
          flex: 1;
          width: 100%;
          padding: 0;
          resize: none;
          line-height: 1.5;
        }

        .terminal-manifest {
          background: var(--bg-soft);
          border: 1px dashed var(--border-soft);
          border-radius: 4px;
          overflow: hidden;
        }

        .manifest-header {
          background: rgba(255, 255, 255, 0.02);
          padding: 8px 16px;
          border-bottom: 1px dashed var(--border-soft);
          font-size: 11px;
          font-weight: bold;
          color: var(--text-mute);
        }

        .manifest-grid {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .manifest-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.02);
          padding-bottom: 6px;
        }

        .manifest-row span:first-child {
          color: var(--text-mute);
        }

        .truncate-msg {
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .terminal-progress-bar {
          height: 3px;
          background: var(--border-soft);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--amber), var(--teal));
          transition: width 0.4s var(--ease);
          box-shadow: 0 0 6px var(--teal);
        }

        .terminal-logs {
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-soft);
          border-radius: 4px;
          padding: 14px 18px;
          height: 120px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
        }

        .terminal-log-line {
          color: var(--teal);
        }

        .success-glowing-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid var(--teal-dim);
          background: rgba(82, 201, 182, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(82, 201, 182, 0.15);
        }

        .terminal-receipt {
          background: var(--bg-soft);
          border: 1px dashed var(--border);
          border-radius: 4px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 11.5px;
        }

        .receipt-line {
          display: flex;
          justify-content: space-between;
        }

        .receipt-line span:first-child {
          color: var(--text-mute);
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
