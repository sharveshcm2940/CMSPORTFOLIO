import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const node = ref.current;
    if (!node) return;

    let raf;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let curX = x;
    let curY = y;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      curX += (x - curX) * 0.12;
      curY += (y - curY) * 0.12;
      node.style.transform = `translate(${curX - 220}px, ${curY - 220}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 440,
        height: 440,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
        background:
          "radial-gradient(circle, rgba(232,163,61,0.05) 0%, rgba(82,201,182,0.04) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
