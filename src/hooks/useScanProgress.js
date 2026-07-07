import { useEffect, useState } from "react";

/**
 * Tracks overall page scroll as a 0–100 "scan" percentage and reports
 * which registered section id is currently under the reading line.
 * Powers the fixed side readout that frames the whole site as a
 * single continuous diagnostic pass over the page.
 */
export function useScanProgress(sectionIds = []) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));

      const viewportCenter = scrollTop + window.innerHeight * 0.4;
      let current = sectionIds[0] ?? null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= viewportCenter) {
          current = id;
        }
      }
      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return { progress, activeId };
}
