import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TermIcon, CheckCircle2, AlertTriangle, Info, Copy } from "lucide-react";

// Utility function to dispatch a Toast from anywhere in the app
export function toast(message, type = "info") {
  const event = new CustomEvent("portfolio-toast", {
    detail: { message, type, id: Math.random().toString(36).substring(2, 9) }
  });
  window.dispatchEvent(event);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastEvent = (e) => {
      const { message, type, id } = e.detail;
      setToasts((prev) => [...prev, { message, type, id }]);

      // Auto-remove after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener("portfolio-toast", handleToastEvent);
    return () => {
      window.removeEventListener("portfolio-toast", handleToastEvent);
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={15} className="toast-icon text-teal" />;
      case "warning":
        return <AlertTriangle size={15} className="toast-icon text-amber" />;
      case "copy":
        return <Copy size={15} className="toast-icon text-amber" />;
      default:
        return <Info size={15} className="toast-icon text-teal" />;
    }
  };

  return (
    <div className="toast-wrapper">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
            className={`toast-item type-${t.type}`}
          >
            <div className="toast-glow" />
            <div className="toast-scanline" />
            <div className="toast-content">
              {getIcon(t.type)}
              <span className="toast-msg mono">{t.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        .toast-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          max-width: 360px;
          width: calc(100% - 60px);
        }

        @media (max-width: 640px) {
          .toast-wrapper {
            bottom: 20px;
            right: 20px;
            width: calc(100% - 40px);
          }
        }

        .toast-item {
          pointer-events: auto;
          position: relative;
          background: rgba(13, 18, 16, 0.92);
          backdrop-filter: blur(12px);
          border: 1.5px solid var(--border-soft);
          border-radius: 4px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(255,255,255,0.01);
        }

        .toast-item.type-success {
          border-color: var(--teal-dim);
        }

        .toast-item.type-warning {
          border-color: var(--amber-dim);
        }

        .toast-item.type-copy {
          border-color: rgba(232, 163, 61, 0.4);
        }

        .toast-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 50%, rgba(82, 201, 182, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .toast-item.type-warning .toast-glow,
        .toast-item.type-copy .toast-glow {
          background: radial-gradient(circle at 10% 50%, rgba(232, 163, 61, 0.08) 0%, transparent 70%);
        }

        .toast-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.01) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .toast-icon {
          flex-shrink: 0;
        }

        .text-teal {
          color: var(--teal);
        }

        .text-amber {
          color: var(--amber);
        }

        .toast-msg {
          font-size: 11.5px;
          color: var(--text-dim);
          line-height: 1.4;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
