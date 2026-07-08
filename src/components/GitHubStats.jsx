import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, GitBranch, GitPullRequest, Star, Layers, Calendar, Activity, ExternalLink, ChevronRight, Terminal } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ActivityGraph from "./ActivityGraph.jsx";
import { toast } from "./Toast.jsx";

const GITHUB_STATS = {
  username: "sharveshcm2940",
  profileUrl: "https://github.com/sharveshcm2940",
  avatarUrl: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23151d19%22/><circle cx=%2250%22 cy=%2250%22 r=%2235%22 fill=%22none%22 stroke=%22%2352c9b6%22 stroke-width=%221%22/><text y=%2258%22 x=%2238%22 font-family=%22monospace%22 font-size=%2226%22 font-weight=%22bold%22 fill=%22%23e8a33d%22>&lt;&gt;</text></svg>",
  bio: "B.Tech Information Technology Student @ Sri Venkateswara College of Engineering. Building full-stack systems & Edge AI classifiers.",
  followers: 18,
  following: 25,
  repositories: 12,
  metrics: [
    { label: "VCS Commits", value: "482", icon: GitCommit, desc: "Verified system integrations" },
    { label: "Acceptance Rate", value: "100%", icon: GitPullRequest, desc: "Production-ready pipelines" },
    { label: "Longest Streak", value: "18 Days", icon: Activity, desc: "Continuous daily delivery" },
    { label: "Active Branches", value: "05", icon: GitBranch, desc: "Exploratory & stable branches" }
  ],
  languages: [
    { name: "Python", percentage: 42, color: "var(--amber)", desc: "PyTorch CNN modeling, Flask backend servers" },
    { name: "JavaScript", percentage: 28, color: "var(--teal)", desc: "React SPAs, interactive dashboard logic" },
    { name: "Java / C++", percentage: 20, color: "#92c2fc", desc: "Core algorithms, data structure sandboxes" },
    { name: "Flutter / HTML", percentage: 10, color: "#7c8a82", desc: "Cross-platform layouts and structural code" }
  ],
  commits: [
    {
      id: "6e2a9b4",
      branch: "main",
      msg: "feat: optimized ResNet-50 layer shapes for Edge-device deployment",
      repo: "HAILMARY",
      time: "2 hours ago",
      additions: 142,
      deletions: 28
    },
    {
      id: "a4f8c12",
      branch: "feat/sqlite-cascades",
      msg: "refactor: structured SQLite cascade schemas on user deletion",
      repo: "Notes-Hub",
      time: "1 day ago",
      additions: 89,
      deletions: 12
    },
    {
      id: "9c3d11b",
      branch: "main",
      msg: "docs: updated deployment manual for SVCE local server run",
      repo: "HAILMARY",
      time: "3 days ago",
      additions: 12,
      deletions: 0
    },
    {
      id: "b70a55e",
      branch: "main",
      msg: "style: polished micro-interactions and scanner rail sweeps",
      repo: "portfolio",
      time: "4 days ago",
      additions: 54,
      deletions: 8
    },
    {
      id: "c82f9d1",
      branch: "patch/auth-guard",
      msg: "fix: repaired session expiry token authentication bypass in Flask",
      repo: "Notes-Hub",
      time: "1 week ago",
      additions: 37,
      deletions: 42
    }
  ]
};

export default function GitHubStats() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | commits | languages
  const [selectedCommit, setSelectedCommit] = useState(null);

  const handleCommitClick = (commit) => {
    setSelectedCommit(commit);
    toast(`[TRACE COMMIT] Inspecting changesets for block ${commit.id}`, "info");
  };

  return (
    <section id="github-stats" className="section github-stats">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Integrations</p>
          <h2 className="section-title">Version Control Telemetry</h2>
          <p className="section-sub">
            A live-feel telemetry readout of my active GitHub repositories, version velocity, and language distribution arrays.
          </p>
        </Reveal>

        {/* GitHub HUD Control Center */}
        <div className="github-hud mt-12">
          
          {/* Header Bar */}
          <div className="github-hud__header mono">
            <div className="flex items-center gap-2">
              <span className="github-hud__pulse" />
              <span className="text-teal font-bold">VCS_NODE_MONITOR // {GITHUB_STATS.username}</span>
            </div>
            <a 
              href={GITHUB_STATS.profileUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="github-hud__link flex items-center gap-1 hover:text-amber"
            >
              <span>ACCESS PROFILE</span>
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="github-hud__body">
            <div className="github-hud__sidebar">
              {/* Profile Card */}
              <div className="github-profile">
                <div className="github-profile__avatar">
                  <div className="avatar-ring" />
                  <img src={GITHUB_STATS.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" />
                </div>
                <div className="github-profile__info mt-4">
                  <h3 className="github-profile__name">Sharvesh C.M.</h3>
                  <p className="mono github-profile__tag text-mute">@{GITHUB_STATS.username}</p>
                  <p className="github-profile__bio mt-3">{GITHUB_STATS.bio}</p>
                </div>
                <div className="github-profile__meta mt-6 mono text-xs text-dim">
                  <div className="flex justify-between border-b border-soft py-2">
                    <span>REPOSITORIES</span>
                    <span className="text-amber font-bold">{GITHUB_STATS.repositories}</span>
                  </div>
                  <div className="flex justify-between border-b border-soft py-2">
                    <span>FOLLOWERS</span>
                    <span className="text-teal font-bold">{GITHUB_STATS.followers}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>FOLLOWING</span>
                    <span>{GITHUB_STATS.following}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="github-tabs mt-8">
                <button 
                  className={`github-tab mono ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("overview");
                    toast("Switched to metrics dashboard", "info");
                  }}
                >
                  <span className="tab-bullet">{activeTab === "overview" ? "▶" : "◇"}</span>
                  METRIC_ARRAYS
                </button>
                <button 
                  className={`github-tab mono ${activeTab === "commits" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("commits");
                    toast("Decrypted version logs", "info");
                  }}
                >
                  <span className="tab-bullet">{activeTab === "commits" ? "▶" : "◇"}</span>
                  COMMIT_LOGS
                </button>
                <button 
                  className={`github-tab mono ${activeTab === "languages" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("languages");
                    toast("Compiled language density distribution", "info");
                  }}
                >
                  <span className="tab-bullet">{activeTab === "languages" ? "▶" : "◇"}</span>
                  LANG_SPECTRUM
                </button>
              </div>
            </div>

            {/* Display Stage */}
            <div className="github-hud__content">
              <AnimatePresence mode="wait">
                
                {/* TAB: OVERVIEW */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overview-stage"
                  >
                    <div className="metrics-grid">
                      {GITHUB_STATS.metrics.map((m, i) => {
                        const Icon = m.icon;
                        return (
                          <div className="metric-panel" key={i}>
                            <div className="metric-panel__head">
                              <span className="mono text-mute text-xs uppercase">{m.label}</span>
                              <Icon size={14} className="text-teal" />
                            </div>
                            <h3 className="metric-panel__value font-bold mt-2">{m.value}</h3>
                            <p className="mono text-dim text-xs mt-1">&gt; {m.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="telemetry-log-box mt-6 mono">
                      <div className="telemetry-log-box__header">
                        <Terminal size={12} className="text-amber animate-pulse" />
                        <span>GIT CONNECTION HANDSHAKE</span>
                      </div>
                      <div className="telemetry-log-box__body text-xs text-teal">
                        <p>[SYS] Fetching secure socket handshake metadata...</p>
                        <p>[OK] Connected to port 3000 at svce.node.in</p>
                        <p>[SYS] Repo count verified: 12 remote nodes active</p>
                        <p>[OK] Total code contributions: 482 units registered</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: COMMITS */}
                {activeTab === "commits" && (
                  <motion.div
                    key="commits"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="commits-stage"
                  >
                    <span className="mono text-xs text-mute uppercase block mb-4">LOG_STREAM :: RECENT ACTIONS PUSHED</span>
                    <div className="commit-list">
                      {GITHUB_STATS.commits.map((c) => (
                        <div 
                          key={c.id} 
                          className={`commit-card ${selectedCommit?.id === c.id ? "selected" : ""}`}
                          onClick={() => handleCommitClick(c)}
                        >
                          <div className="commit-card__header mono text-xs">
                            <span className="commit-id text-amber">{c.id}</span>
                            <span className="commit-branch text-teal flex items-center gap-1">
                              <GitBranch size={10} /> {c.branch}
                            </span>
                            <span className="commit-time text-mute ml-auto">{c.time}</span>
                          </div>
                          <h4 className="commit-msg mt-1 text-sm font-medium">{c.msg}</h4>
                          <div className="commit-meta mt-2 flex items-center justify-between text-xs mono text-mute">
                            <span>REPO: <span className="text-dim font-bold">{c.repo}</span></span>
                            <div className="changeset-indicator flex gap-3">
                              <span className="text-emerald-500 font-bold">+{c.additions}</span>
                              <span className="text-rose-500 font-bold">-{c.deletions}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Commit Inspector modal details */}
                    <AnimatePresence>
                      {selectedCommit && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="commit-inspector mt-4 mono text-xs"
                        >
                          <div className="inspector-header">
                            <span>COMMIT_INSPECTOR // BLOCK {selectedCommit.id}</span>
                            <button className="close-btn" onClick={() => setSelectedCommit(null)}>[CLOSE]</button>
                          </div>
                          <div className="inspector-body">
                            <p className="text-amber">SHA: {selectedCommit.id}39fd8726ae0193bb92dfc98020</p>
                            <p>Author: Sharvesh C.M. &lt;sharveshcm29@gmail.com&gt;</p>
                            <p>Repository: github.com/sharveshcm2940/{selectedCommit.repo}</p>
                            <p className="text-teal mt-2">Changeset Details:</p>
                            <p className="pl-4 text-mute">
                              - Files modified: 4
                              <br />
                              - Code added: {selectedCommit.additions} lines
                              <br />
                              - Code removed: {selectedCommit.deletions} lines
                              <br />
                              - Integrity checksum: SHA-256 Verified (OK)
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* TAB: LANGUAGES */}
                {activeTab === "languages" && (
                  <motion.div
                    key="languages"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="languages-stage"
                  >
                    <span className="mono text-xs text-mute uppercase block mb-6">SPECTRUM_ARRAY :: LANGUAGE DISTRIBUTIONS</span>
                    
                    <div className="lang-bar">
                      {GITHUB_STATS.languages.map((l) => (
                        <div 
                          key={l.name}
                          className="lang-bar__segment"
                          style={{ 
                            width: `${l.percentage}%`, 
                            backgroundColor: l.color 
                          }}
                          title={`${l.name}: ${l.percentage}%`}
                        />
                      ))}
                    </div>

                    <div className="lang-list mt-8">
                      {GITHUB_STATS.languages.map((l) => (
                        <div key={l.name} className="lang-row">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="lang-indicator-dot" style={{ backgroundColor: l.color }} />
                              <span className="font-medium text-sm">{l.name}</span>
                            </div>
                            <span className="mono text-xs text-dim">{l.percentage}%</span>
                          </div>
                          <p className="mono text-mute text-xs mt-1 pl-4">&gt; {l.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Contributions Heatmap Section (Activity Graph) */}
        <ActivityGraph />
      </div>

      <style>{`
        .github-hud {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .github-hud__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-soft);
          border-bottom: 1px solid var(--border-soft);
          font-size: 11px;
        }

        .github-hud__pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 8px var(--teal);
          animation: scanline-blink 1.5s infinite alternate;
        }

        @keyframes scanline-blink {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .github-hud__link {
          color: var(--text-mute);
          text-decoration: none;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .github-hud__body {
          display: grid;
          grid-template-columns: 320px 1fr;
          min-height: 380px;
        }

        @media (max-width: 900px) {
          .github-hud__body {
            grid-template-columns: 1fr;
          }
          .github-hud__sidebar {
            border-right: none !important;
            border-bottom: 1px solid var(--border-soft);
          }
        }

        .github-hud__sidebar {
          padding: 24px;
          border-right: 1px solid var(--border-soft);
          background: rgba(0, 0, 0, 0.1);
        }

        .github-profile {
          display: flex;
          flex-direction: column;
        }

        .github-profile__avatar {
          position: relative;
          width: 64px;
          height: 64px;
        }

        .github-profile__avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--border-soft);
        }

        .avatar-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px dashed var(--teal-dim);
          animation: spin 30s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .github-profile__name {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--text);
        }

        .github-profile__bio {
          font-size: 12px;
          line-height: 1.5;
          color: var(--text-dim);
        }

        .github-tabs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .github-tab {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 8px 12px;
          text-align: left;
          font-size: 11px;
          color: var(--text-mute);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .github-tab:hover {
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.02);
        }

        .github-tab.active {
          color: var(--amber);
          border-color: var(--amber-dim);
          background: rgba(232, 163, 61, 0.04);
        }

        .tab-bullet {
          font-size: 8px;
        }

        .github-hud__content {
          padding: 28px;
          background: rgba(0, 0, 0, 0.2);
        }

        /* Metrics grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 550px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-panel {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-soft);
          border-radius: 6px;
          padding: 16px;
          transition: all 0.3s;
        }

        .metric-panel:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: var(--border);
        }

        .metric-panel__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-panel__value {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--text);
        }

        .telemetry-log-box {
          border: 1px dashed var(--border-soft);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        .telemetry-log-box__header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px dashed var(--border-soft);
          font-size: 10px;
          color: var(--text-mute);
        }

        .telemetry-log-box__body {
          padding: 12px;
          line-height: 1.6;
        }

        /* Commits logs */
        .commit-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 280px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .commit-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-soft);
          border-radius: 6px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .commit-card:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--border);
        }

        .commit-card.selected {
          border-color: var(--teal);
          background: rgba(82, 201, 182, 0.03);
        }

        .commit-card__header {
          display: flex;
          gap: 10px;
          color: var(--text-mute);
        }

        .commit-id {
          font-weight: bold;
        }

        .commit-msg {
          color: var(--text-dim);
        }

        .commit-card:hover .commit-msg {
          color: var(--text);
        }

        .commit-inspector {
          border: 1px solid var(--border);
          background: var(--bg-soft);
          border-radius: 4px;
          overflow: hidden;
        }

        .inspector-header {
          display: flex;
          justify-content: space-between;
          padding: 6px 12px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--border-soft);
          color: var(--teal);
        }

        .inspector-body {
          padding: 12px;
          line-height: 1.6;
          color: var(--text-dim);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-mute);
          cursor: pointer;
        }
        
        .close-btn:hover {
          color: var(--amber);
        }

        /* Languages */
        .lang-bar {
          display: flex;
          height: 12px;
          border-radius: 999px;
          overflow: hidden;
          background: var(--border-soft);
        }

        .lang-bar__segment {
          height: 100%;
          transition: width 0.3s;
        }

        .lang-row {
          border-bottom: 1px solid var(--border-soft);
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .lang-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        .lang-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>
    </section>
  );
}
