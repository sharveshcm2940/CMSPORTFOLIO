import { motion } from "framer-motion";
import { Mail, Phone, Code2, Briefcase } from "lucide-react";

const SOCIALS = [
  {
    name: "GitHub",
    icon: Code2,
    url: "https://github.com/sharveshcm2940",
    color: "var(--amber)"
  },
  {
    name: "LinkedIn",
    icon: Briefcase,
    url: "https://linkedin.com/in/c-m-sharvesh-847066332",
    color: "var(--teal)"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:sharveshcm29@gmail.com",
    color: "var(--amber)"
  },
  {
    name: "Phone",
    icon: Phone,
    url: "tel:+916383553774",
    color: "var(--teal)"
  }
];

export default function SocialLinks() {
  return (
    <div className="social-dock-wrapper">
      <div className="social-dock">
        <div className="social-dock__line social-dock__line--top" />
        
        <div className="social-dock__items">
          {SOCIALS.map((soc, i) => {
            const IconComponent = soc.icon;
            return (
              <motion.a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="social-dock__link"
                title={soc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.1 }}
                style={{ "--hover-color": soc.color }}
              >
                <IconComponent size={18} />
                <span className="sr-only">{soc.name}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="social-dock__line social-dock__line--bottom" />
      </div>

      <style>{`
        .social-dock-wrapper {
          position: fixed;
          left: 40px;
          bottom: 0;
          z-index: 40;
          pointer-events: none;
        }

        .social-dock {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          pointer-events: auto;
        }

        .social-dock__items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .social-dock__link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-soft);
          background: rgba(13, 18, 16, 0.8);
          backdrop-filter: blur(8px);
          color: var(--text-mute);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .social-dock__link:hover {
          color: var(--hover-color);
          border-color: var(--hover-color);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        }

        .social-dock__line {
          width: 1px;
          height: 90px;
          background: linear-gradient(to bottom, transparent, var(--border));
        }

        .social-dock__line--bottom {
          background: linear-gradient(to bottom, var(--border), transparent);
          height: 120px;
        }

        .social-dock__line--top {
          display: none;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 1024px) {
          .social-dock-wrapper {
            position: relative;
            left: auto;
            bottom: auto;
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 40px;
            margin-bottom: 20px;
            pointer-events: auto;
          }

          .social-dock {
            flex-direction: row;
            gap: 16px;
          }

          .social-dock__items {
            flex-direction: row;
            gap: 16px;
          }

          .social-dock__line {
            display: none;
          }

          .social-dock__link {
            width: 44px;
            height: 44px;
            background: var(--panel);
          }
        }
      `}</style>
    </div>
  );
}
