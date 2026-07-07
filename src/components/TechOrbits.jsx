import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Cpu,
  Brain,
  Database,
  Smartphone,
  Globe,
  Server,
  Zap,
  Terminal,
  Activity,
  Radio
} from "lucide-react";
import { toast } from "./Toast.jsx";

const ORBIT_ITEMS = [
  // Inner Orbit: Core & Data (Radius ~90px, speed ~15s)
  {
    name: "Python",
    icon: Terminal,
    color: "#3b82f6",
    angle: 0,
    orbit: "inner",
    desc: "AI engines, core scripts, automation utilities",
    status: "98% ACTIVE",
    latency: "0.2ms"
  },
  {
    name: "Flask",
    icon: Server,
    color: "#a3e635",
    angle: 120,
    orbit: "inner",
    desc: "RESTful endpoints & secure session backends",
    status: "100% SECURE",
    latency: "1.4ms"
  },
  {
    name: "SQLite",
    icon: Database,
    color: "#00bcd4",
    angle: 240,
    orbit: "inner",
    desc: "Persistent indexing & classmate database storage",
    status: "OPTIMIZED",
    latency: "0.8ms"
  },
  // Outer Orbit: Frontend, Mobile, AI (Radius ~150px, speed ~25s, counter-clockwise)
  {
    name: "React",
    icon: Globe,
    color: "#61dafb",
    angle: 0,
    orbit: "outer",
    desc: "Interactive UI modules & fluid framer animation rendering",
    status: "STABLE",
    latency: "16.7ms"
  },
  {
    name: "PyTorch",
    icon: Brain,
    color: "#f97316",
    angle: 90,
    orbit: "outer",
    desc: "ResNet-50 radiograph classifier & CNN model training",
    status: "94.2% ACC",
    latency: "42.1ms"
  },
  {
    name: "Flutter",
    icon: Smartphone,
    color: "#38bdf8",
    angle: 180,
    orbit: "outer",
    desc: "Cross-platform mobile application companion port",
    status: "RELEASED",
    latency: "4.5ms"
  },
  {
    name: "C++",
    icon: Cpu,
    color: "#f43f5e",
    angle: 270,
    orbit: "outer",
    desc: "High-performance systems & core algorithm logic",
    status: "COMPILED",
    latency: "0.1ms"
  }
];

export default function TechOrbits() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [radarSweep, setRadarSweep] = useState(0);

  // Springs for smooth 3D tilt effect on mouse move
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Periodic radar sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const valX = (e.clientX - rect.left) / rect.width - 0.5;
    const valY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(valX);
    y.set(valY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredNode(null);
  };

  const handleNodeClick = (node) => {
    toast(`[SECURE TRACE] Connected to ${node.name.toUpperCase()} node clusters successfully.`, "success");
    
    const event = new CustomEvent("orbit-click-shockwave", { detail: { name: node.name } });
    window.dispatchEvent(event);
  };

  return (
    <div 
      className="orbits-card-container"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Header readout bar */}
      <div className="orbits-header">
        <div className="orbits-header__left">
          <Radio size={14} className="text-teal animate-pulse" />
          <span className="mono font-bold tracking-wider">INFRASTRUCTURE // SYSTEM_MAP</span>
        </div>
        <div className="orbits-header__right mono text-xs text-mute">
          SYS_OK // V3.2
        </div>
      </div>

      {/* 3D Tilted Orbits Stage */}
      <motion.div 
        className="orbits-stage-wrapper"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="orbits-viewport">
          {/* Decorative Grid Lines */}
          <div className="orbits-bg-grid" />

          {/* Futuristic Radar Sweep Line */}
          <div
            className="orbits-radar-sweep"
            style={{ transform: `rotate(${radarSweep}deg)` }}
          />

          <div className="orbits-center-core">
            {/* Deep Pulsating Core */}
            <motion.div
              className="core-pulse-ring ring-1"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="core-pulse-ring ring-2"
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="core-node">
              <Zap size={18} className="core-icon text-amber" />
              <span className="mono core-text">SHARVESH_CORE</span>
            </div>
          </div>

          {/* Orbit Rings (SVG Paths) */}
          <svg className="orbits-rings-svg" viewBox="0 0 400 400">
            {/* Inner Ring */}
            <circle
              cx="200"
              cy="200"
              r="90"
              className="orbit-path-line orbit-inner-path"
              strokeDasharray="4 8"
            />
            {/* Outer Ring */}
            <circle
              cx="200"
              cy="200"
              r="150"
              className="orbit-path-line orbit-outer-path"
              strokeDasharray="6 12"
            />
          </svg>

          {/* Inner Orbiting System (Clockwise) */}
          <motion.div
            className="orbit-system-wrapper"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20
            }}
          >
            {/* Synchronously rotating Laser Lines SVG for inner nodes */}
            <svg className="orbits-laser-svg" viewBox="0 0 400 400">
              {ORBIT_ITEMS.filter((item) => item.orbit === "inner").map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const lx = 200 + 90 * Math.cos(rad);
                const ly = 200 + 90 * Math.sin(rad);
                const isHovered = hoveredNode?.name === item.name;

                return (
                  <line
                    key={item.name}
                    x1="200"
                    y1="200"
                    x2={lx}
                    y2={ly}
                    className="orbit-laser-tracer"
                    style={{
                      stroke: item.color,
                      opacity: isHovered ? 0.8 : 0,
                      transition: "opacity 0.2s"
                    }}
                  />
                );
              })}
            </svg>

            {ORBIT_ITEMS.filter((item) => item.orbit === "inner").map((item) => {
              const IconComp = item.icon;
              const rad = (item.angle * Math.PI) / 180;
              const sx = 90 * Math.cos(rad);
              const sy = 90 * Math.sin(rad);

              return (
                <div
                  key={item.name}
                  className="orbiting-satellite"
                  style={{
                    left: `calc(50% + ${sx}px)`,
                    top: `calc(50% + ${sy}px)`
                  }}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(item)}
                >
                  <motion.div
                    className="satellite-node-container"
                    animate={{ rotate: -360 }} // Counter-rotate to keep upright
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 20
                    }}
                  >
                    <motion.div
                      className="satellite-node"
                      style={{
                        borderColor: item.color,
                        boxShadow: hoveredNode?.name === item.name ? `0 0 15px ${item.color}` : "none"
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <IconComp size={14} style={{ color: item.color }} />
                    </motion.div>
                    
                    {/* Embedded Text Label orbiting together with Node */}
                    <span 
                      className="satellite-label mono" 
                      style={{ 
                        borderLeftColor: item.color,
                        opacity: hoveredNode?.name === item.name ? 1 : 0.6
                      }}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Outer Orbiting System (Counter-Clockwise) */}
          <motion.div
            className="orbit-system-wrapper"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30
            }}
          >
            {/* Synchronously rotating Laser Lines SVG for outer nodes */}
            <svg className="orbits-laser-svg" viewBox="0 0 400 400">
              {ORBIT_ITEMS.filter((item) => item.orbit === "outer").map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const lx = 200 + 150 * Math.cos(rad);
                const ly = 200 + 150 * Math.sin(rad);
                const isHovered = hoveredNode?.name === item.name;

                return (
                  <line
                    key={item.name}
                    x1="200"
                    y1="200"
                    x2={lx}
                    y2={ly}
                    className="orbit-laser-tracer"
                    style={{
                      stroke: item.color,
                      opacity: isHovered ? 0.8 : 0,
                      transition: "opacity 0.2s"
                    }}
                  />
                );
              })}
            </svg>

            {ORBIT_ITEMS.filter((item) => item.orbit === "outer").map((item) => {
              const IconComp = item.icon;
              const rad = (item.angle * Math.PI) / 180;
              const sx = 150 * Math.cos(rad);
              const sy = 150 * Math.sin(rad);

              return (
                <div
                  key={item.name}
                  className="orbiting-satellite"
                  style={{
                    left: `calc(50% + ${sx}px)`,
                    top: `calc(50% + ${sy}px)`
                  }}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(item)}
                >
                  <motion.div
                    className="satellite-node-container"
                    animate={{ rotate: 360 }} // Counter-rotate to keep upright
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 30
                    }}
                  >
                    <motion.div
                      className="satellite-node outer-node"
                      style={{
                        borderColor: item.color,
                        boxShadow: hoveredNode?.name === item.name ? `0 0 18px ${item.color}` : "none"
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <IconComp size={15} style={{ color: item.color }} />
                    </motion.div>

                    {/* Embedded Text Label orbiting together with Node */}
                    <span 
                      className="satellite-label mono" 
                      style={{ 
                        borderLeftColor: item.color,
                        opacity: hoveredNode?.name === item.name ? 1 : 0.6
                      }}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Diagnostic HUD Readout Screen (Positioned outside circular bounds, never clipped) */}
      <div className="orbits-hud-readout mono">
        {hoveredNode ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="hud-panel-active"
          >
            <div className="hud-panel-title">
              <span className="hud-pulse" style={{ background: hoveredNode.color }} />
              NODE_TRACE // {hoveredNode.name.toUpperCase()}
            </div>
            <div className="hud-panel-desc">{hoveredNode.desc}</div>
            <div className="hud-panel-meta">
              <span>STATUS: <span style={{ color: hoveredNode.color }}>{hoveredNode.status}</span></span>
              <span>PING: <span className="text-amber">{hoveredNode.latency}</span></span>
            </div>
          </motion.div>
        ) : (
          <div className="hud-panel-idle">
            <div className="hud-panel-title">
              <span className="hud-pulse pulse-idle animate-ping" />
              SYSTEM_READY // STANDBY
            </div>
            <div className="hud-panel-desc">Hover node cluster satellites to trace live stack infrastructure.</div>
            <div className="hud-panel-meta">
              <span>ACTIVE_CORES: <span className="text-teal">3/3</span></span>
              <span>BANDWIDTH: <span className="text-amber">2.4 Gb/s</span></span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .orbits-card-container {
          position: relative;
          width: 440px;
          background: rgba(14, 16, 20, 0.45);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-soft);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
          perspective: 1000px;
          transition: border-color 0.3s;
        }

        .orbits-card-container:hover {
          border-color: rgba(82, 201, 182, 0.25);
        }

        @media (max-width: 900px) {
          .orbits-card-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
        }

        /* Header Bar styling */
        .orbits-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-soft);
        }

        .orbits-header__left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text);
          font-size: 11px;
        }

        /* 3D stage and Viewport */
        .orbits-stage-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          transform-style: preserve-3d;
        }

        .orbits-viewport {
          position: relative;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at center, rgba(82, 201, 182, 0.03) 0%, transparent 70%);
          border: 1px dashed rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 900px) {
          .orbits-viewport {
            width: 320px;
            height: 320px;
          }
        }

        /* Bg Grid overlay styling */
        .orbits-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center;
          pointer-events: none;
        }

        /* Radar Sweep simulation line */
        .orbits-radar-sweep {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 50%;
          background: linear-gradient(90deg, rgba(82, 201, 182, 0.04) 0%, transparent 100%);
          transform-origin: bottom left;
          pointer-events: none;
          z-index: 1;
        }

        /* Center Core */
        .orbits-center-core {
          position: absolute;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .core-pulse-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(232, 163, 61, 0.1);
          pointer-events: none;
        }

        .core-node {
          width: 56px;
          height: 56px;
          background: #0d1013;
          border: 1.5px solid var(--border);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          box-shadow: 0 0 20px rgba(232, 163, 61, 0.1);
          cursor: pointer;
        }

        .core-icon {
          animation: core-icon-glow 3s infinite ease-in-out;
        }

        @keyframes core-icon-glow {
          0%, 100% { filter: drop-shadow(0 0 2px var(--amber)); }
          50% { filter: drop-shadow(0 0 8px var(--amber)); }
        }

        .core-text {
          font-size: 6px;
          color: var(--text-mute);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        /* Rings & Lasers SVG Styling */
        .orbits-rings-svg, .orbits-laser-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .orbit-path-line {
          fill: none;
          stroke: rgba(255, 255, 255, 0.04);
          stroke-width: 1;
          transform-origin: center;
        }

        .orbit-laser-tracer {
          stroke-width: 1.5;
          stroke-dasharray: 4 4;
          opacity: 0.7;
          animation: laser-pulse 0.4s infinite alternate;
        }

        @keyframes laser-pulse {
          from { opacity: 0.3; }
          to { opacity: 0.9; }
        }

        /* Satellite Nodes positioning */
        .orbit-system-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .orbiting-satellite {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: auto;
          cursor: pointer;
          z-index: 6;
        }

        .satellite-node-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .satellite-node {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid;
          background: #090b0d;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s var(--ease);
        }

        .satellite-node.outer-node {
          width: 32px;
          height: 32px;
        }

        /* Embedded Text Label */
        .satellite-label {
          position: absolute;
          bottom: -18px;
          font-size: 8px;
          letter-spacing: 0.05em;
          color: var(--text-dim);
          white-space: nowrap;
          background: rgba(13, 15, 18, 0.95);
          border-left: 2px solid;
          border-radius: 2px;
          padding: 1px 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
        }

        /* HUD Diagnostics Panel */
        .orbits-hud-readout {
          background: rgba(14, 18, 22, 0.9);
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          padding: 12px 16px;
          z-index: 10;
          transition: border-color 0.3s;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.02);
        }

        .hud-panel-active, .hud-panel-idle {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hud-panel-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.05em;
        }

        .hud-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .hud-pulse.pulse-idle {
          background: var(--teal);
        }

        .hud-panel-desc {
          font-size: 11.5px;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .hud-panel-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-mute);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 6px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
