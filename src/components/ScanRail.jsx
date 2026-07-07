import { useScanProgress } from "../hooks/useScanProgress.js";

const SECTIONS = [
  { id: "hero", label: "01 START" },
  { id: "about", label: "02 SUMMARY" },
  { id: "terminal", label: "03 CONSOLE" },
  { id: "skills", label: "04 STACK" },
  { id: "experience", label: "05 LOG" },
  { id: "projects", label: "06 REPORTS" },
  { id: "certifications", label: "07 CREDENTIALS" },
  { id: "contact", label: "08 CONTACT" },
];

export default function ScanRail() {
  const { progress, activeId } = useScanProgress(SECTIONS.map((s) => s.id));
  const activeLabel = SECTIONS.find((s) => s.id === activeId)?.label ?? SECTIONS[0].label;

  return (
    <aside className="scan-rail" aria-hidden="true">
      <span className="scan-rail__pct">{Math.round(progress).toString().padStart(2, "0")}</span>
      <div className="scan-rail__track">
        <div
          className="scan-rail__fill"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="scan-rail__label">{activeLabel}</span>
    </aside>
  );
}
