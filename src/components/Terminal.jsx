import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { useTheme } from "../hooks/useTheme.js";
import { toast } from "./Toast.jsx";

const BOOT_LINES = [
  "sharvesh@portfolio:~$ boot --profile",
  "loading resume.json ... ok",
  "loading projects/ ... ok",
  "session ready. type 'help' or click suggestions below.",
];

const TERMINAL_SUGGESTIONS = [
  "whoami",
  "projects",
  "github",
  "neofetch",
  "theme amber",
  "clear",
];

function buildResponse(rawCmd, scrollTo) {
  const cmd = rawCmd.trim();
  const lower = cmd.toLowerCase();

  if (lower === "") return [];

  if (lower === "help") {
    return [
      "available commands:",
      "  whoami        who you're looking at",
      "  about         summary + education",
      "  skills        the stack I reach for",
      "  experience    where I've worked",
      "  projects      things I've shipped",
      "  stats         real-time telemetry and project stats",
      "  github        display git logs & telemetry",
      "  neofetch      display portfolio system info",
      "  theme         list available console themes",
      "  theme <name>  change theme (amber, monochrome)",
      "  contact       how to reach me",
      "  clear         clear the screen",
    ];
  }

  if (lower === "github" || lower === "git") {
    scrollTo?.("github-stats");
    return [
      "========================================",
      "        GITHUB SYSTEMS READOUT          ",
      "========================================",
      "  Username     : sharveshcm2940",
      "  Repositories : 12 active modules",
      "  Commits      : 482 system commits",
      "  Languages    : Python (42%), JavaScript (28%)",
      "                 Java/C++ (20%), Flutter (10%)",
      "  Profile      : github.com/sharveshcm2940",
      "========================================",
      "navigating to github telemetry board...",
    ];
  }

  if (lower === "stats") {
    return [
      "========================================",
      "       PROJECT METRICS & TELEMETRY      ",
      "========================================",
      "  • Compiled Build Directory : 3 core projects",
      "  • SVCE Hackathon Victories : 1 (RotatechX '24)",
      "  • ML Dataset Coverage     : 12,000+ radiograph images",
      "  • Main Dev Stack           : React, PyTorch, Flutter, Flask",
      "  • Cumulative Classrooms   : Sri Venkateswara College of Eng.",
      "  • Portf-OS Core Health     : STABLE / 100% operational",
      "========================================",
    ];
  }

  if (lower === "whoami") {
    scrollTo?.("hero");
    return ["C.M. Sharvesh — full-stack + AI developer", "B.Tech Information Technology, Chennai"];
  }

  if (lower === "about" || lower === "education") {
    scrollTo?.("about");
    return [
      "Sri Venkateswara College of Engineering",
      "B.Tech, Information Technology — expected 2028",
      "CGPA: 7.02 / 10",
      "navigating to summary ...",
    ];
  }

  if (lower === "skills" || lower === "stack") {
    scrollTo?.("skills");
    return [
      "languages : C, C++, Java, Python, PHP, JavaScript",
      "web       : HTML, CSS, React, Flask",
      "database  : MySQL, SQLite",
      "ai/mobile : Flutter, PyTorch, REST APIs",
      "navigating to stack ...",
    ];
  }

  if (lower === "experience" || lower === "work") {
    scrollTo?.("experience");
    return ["Web Developer Intern @ JE INFONET — 1 month", "navigating to log ..."];
  }

  if (lower === "projects" || lower === "ls" || lower === "ls projects") {
    scrollTo?.("projects");
    return [
      "HAILMARY                 — AI TB-detection app, RotatechX winner",
      "Notes Sharing Platform   — Flask + SQLite",
      "Apartment Management Sys — resident + maintenance management",
      "navigating to reports ...",
    ];
  }

  if (lower === "contact") {
    scrollTo?.("contact");
    return [
      "email  : sharveshcm29@gmail.com",
      "phone  : +91 63835 53774",
      "github : github.com/sharveshcm2940",
      "navigating to contact ...",
    ];
  }

  if (lower === "neofetch") {
    return [
      "  ______  .___  ___.   _______.",
      " /      | |   \\/   |  /       |",
      "|  ,----' |  \\  /  | |   (----`",
      "|  |      |  |\\/|  |  \\   \\    ",
      "|  `----. |  |  |  |  .---)  | ",
      " \\______| |__|  |__|  |_____/  ",
      "------------------------------------",
      "OS             : Portf-OS v2026.07 (Interactive CLI)",
      "HOST           : Sri Venkateswara College of Eng. (SVCE)",
      "UPTIME         : 100% (Always online)",
      "GPA            : 7.02 / 10",
      "SPECIALIZATION : Full-Stack & AI",
      "FLAGSHIP PROJ  : HAILMARY TB diagnostic (RotatechX Winner)",
      "THEME          : Active (type 'theme' to switch colors)",
    ];
  }

  if (lower === "theme") {
    return [
      "available themes:",
      "  theme amber        - Pure retro monochrome amber CRT",
      "  theme monochrome   - Elegant stark silver & white",
      "usage: 'theme <name>' (e.g. 'theme amber')",
    ];
  }

  if (lower.startsWith("theme ")) {
    const tName = lower.slice(6).trim();
    if (["amber", "monochrome"].includes(tName)) {
      return [`__THEME_CHANGE__:${tName}`];
    }
    return [`unknown theme: '${tName}'. type 'theme' to see options.`];
  }

  if (lower === "sudo" || lower.startsWith("sudo ")) {
    return ["Permission denied: this terminal only grants read access."];
  }

  if (lower === "clear") {
    return "__CLEAR__";
  }

  return [`command not found: ${cmd} — type 'help' for a list.`];
}

export default function Terminal() {
  const [lines, setLines] = useState(() => BOOT_LINES.map((text) => ({ text, type: "system" })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { theme, changeTheme } = useTheme();
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const scrollTo = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const promptLine = { text: `sharvesh@portfolio:~$ ${trimmed}`, type: "prompt" };
    const result = buildResponse(trimmed, scrollTo);

    if (result === "__CLEAR__") {
      setLines([]);
      toast("Terminal output cleared", "info");
      return;
    }

    if (Array.isArray(result) && result.length === 1 && result[0].startsWith("__THEME_CHANGE__:")) {
      const themeName = result[0].split(":")[1];
      changeTheme(themeName);
      setLines((prev) => [
        ...prev,
        promptLine,
        { text: `Theme successfully changed to '${themeName}'!`, type: "output" },
      ]);
      toast(`Terminal theme changed to ${themeName.toUpperCase()}`, "success");
      return;
    }

    setLines((prev) => [
      ...prev,
      promptLine,
      ...result.map((text) => ({ text, type: "output" })),
    ]);
    toast(`Executed: '${trimmed.substring(0, 15)}${trimmed.length > 15 ? "..." : ""}'`, "success");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setHistory((h) => [...h, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  const themeStyles = {
    amber: {
      "--term-bg": "#0f0902",
      "--term-text": "#ffb000",
      "--term-prompt": "#ffb000",
      "--term-cursor": "#ffb000",
      "--term-output": "#cca000",
      "--term-border": "#4c2c00",
      "--term-header": "#191004",
    },
    monochrome: {
      "--term-bg": "#0d0d0d",
      "--term-text": "#ffffff",
      "--term-prompt": "#888888",
      "--term-cursor": "#ffffff",
      "--term-output": "#aaaaaa",
      "--term-border": "#222222",
      "--term-header": "#151515",
    },
  }[theme];

  return (
    <section id="terminal" className="section terminal-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Console</p>
          <h2 className="section-title">Or just ask the terminal.</h2>
          <p className="section-sub">
            Type a command or click one of our quick action commands below. Try <span className="mono">neofetch</span> or <span className="mono">theme amber</span>.
          </p>
        </Reveal>

        <Reveal delay={1} className="terminal" style={themeStyles} onClick={() => inputRef.current?.focus()}>
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--r" />
            <span className="terminal__dot terminal__dot--y" />
            <span className="terminal__dot terminal__dot--g" />
            <span className="terminal__title mono">sharvesh@portfolio — {theme} console</span>
          </div>

          <div className="terminal__body mono" ref={bodyRef}>
            {lines.map((line, i) => (
              <p key={i} className={`terminal__line terminal__line--${line.type}`}>
                {line.text}
              </p>
            ))}

            <form className="terminal__inputRow" onSubmit={onSubmit}>
              <span className="terminal__prompt">sharvesh@portfolio:~$</span>
              <input
                ref={inputRef}
                className="terminal__input mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal command input"
              />
              <span className="terminal__cursor">▌</span>
            </form>
          </div>

          {/* Quick-click suggestion bar */}
          <div className="terminal__suggestions-bar">
            <span className="terminal__suggestions-title mono">Quick Run:</span>
            <div className="terminal__pills">
              {TERMINAL_SUGGESTIONS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    runCommand(cmd);
                  }}
                  className="terminal__pill mono"
                  title={`Run command: ${cmd}`}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .terminal-section .section-sub .mono {
          color: var(--amber);
        }
        .terminal {
          margin-top: 56px;
          border: 1px solid var(--term-border);
          border-radius: 6px;
          overflow: hidden;
          background: var(--term-bg);
          box-shadow: 0 30px 80px -40px rgba(0,0,0,0.6);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .terminal__bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: var(--term-header);
          border-bottom: 1px solid var(--term-border);
        }
        .terminal__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .terminal__dot--r { background: #d9694f; }
        .terminal__dot--y { background: var(--amber); }
        .terminal__dot--g { background: var(--teal); }
        .terminal__title {
          margin-left: 12px;
          font-size: 11px;
          color: var(--term-output);
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .terminal__body {
          height: 320px;
          overflow-y: auto;
          padding: 20px 24px;
          font-size: 13px;
          line-height: 1.9;
          cursor: text;
        }
        .terminal__line {
          white-space: pre-wrap;
          word-break: break-word;
        }
        .terminal__line--system {
          color: var(--term-output);
          opacity: 0.7;
        }
        .terminal__line--prompt {
          color: var(--term-prompt);
        }
        .terminal__line--output {
          color: var(--term-text);
        }
        .terminal__inputRow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .terminal__prompt {
          color: var(--term-prompt);
          white-space: nowrap;
        }
        .terminal__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--term-text);
          font-size: 13px;
          caret-color: transparent;
        }
        .terminal__cursor {
          color: var(--term-cursor);
          animation: term-blink 1s steps(1) infinite;
        }
        .terminal__suggestions-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: var(--term-header);
          border-top: 1px solid var(--term-border);
          flex-wrap: wrap;
        }
        .terminal__suggestions-title {
          font-size: 11px;
          color: var(--term-output);
          opacity: 0.6;
        }
        .terminal__pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .terminal__pill {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--term-border);
          border-radius: 4px;
          color: var(--term-text);
          font-size: 11.5px;
          padding: 4px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .terminal__pill:hover {
          background: var(--term-prompt);
          border-color: var(--term-prompt);
          color: #0d1210;
          transform: translateY(-1px);
        }
        @keyframes term-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
