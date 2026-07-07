import { useRef } from "react";
import Reveal from "./Reveal.jsx";

const ITEMS = [
  {
    id: "infosys",
    title: "Infosys Springboard",
    detail: "C, C++, MySQL",
  },
  {
    id: "hackerrank",
    title: "HackerRank",
    detail: "Java (Basic) certified",
  },
  {
    id: "rotatechx",
    title: "RotatechX Hackathon",
    detail: "Winner — HAILMARY",
    featured: true,
  },
];

function Seal({ featured }) {
  return (
    <div className="certification-seal-wrapper">
      <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" className="certification-seal-svg">
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke={featured ? "var(--amber)" : "var(--teal)"}
          strokeWidth="1.4"
        />
        <circle
          cx="24"
          cy="24"
          r="15"
          fill="none"
          stroke={featured ? "var(--amber)" : "var(--teal)"}
          strokeWidth="0.7"
          strokeDasharray="2 3"
        />
        <path
          d="M16 24l5.5 5.5L33 18"
          fill="none"
          stroke={featured ? "var(--amber)" : "var(--teal)"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TiltCard({ item }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(600px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-2px)`;
  };

  const onMouseLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={`certifications__tilt ${item.featured ? "is-featured" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Seal featured={item.featured} />
      <h3>{item.title}</h3>
      <p>{item.detail}</p>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Credentials</p>
          <h2 className="section-title">Verified, not just claimed.</h2>
        </Reveal>

        <div className="certifications__grid">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.id}
              delay={Math.min(i + 1, 4)}
              className="certifications__card"
            >
              <TiltCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .certifications__grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border-soft);
          border: 1px solid var(--border-soft);
        }
        @media (max-width: 780px) {
          .certifications__grid {
            grid-template-columns: 1fr;
          }
        }
        .certifications__tilt {
          background: var(--panel);
          padding: 34px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
          transition: background 0.3s var(--ease), transform 0.15s ease-out;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }
        .certifications__tilt::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.07),
            transparent
          );
          transform: rotate(30deg);
          transition: none;
          pointer-events: none;
        }
        .certifications__tilt:hover::after {
          left: 130%;
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .certifications__tilt:hover {
          background: var(--panel-raised);
          box-shadow: 0 0 20px rgba(82, 201, 182, 0.04);
        }
        .certifications__tilt h3 {
          font-size: 18px;
          color: var(--text);
        }
        .certifications__tilt p {
          font-size: 13.5px;
          color: var(--text-dim);
        }
        .certifications__tilt.is-featured p {
          color: var(--amber);
        }
        .certifications__tilt.is-featured:hover {
          box-shadow: 0 0 20px rgba(232, 163, 61, 0.06);
        }

        .certification-seal-wrapper {
          perspective: 100px;
          width: fit-content;
        }
        .certification-seal-svg {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .certifications__tilt:hover .certification-seal-svg {
          transform: rotateY(360deg) scale(1.1);
        }
      `}</style>
    </section>
  );
}
