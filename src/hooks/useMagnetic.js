import { useRef } from "react";

/**
 * Attach to a button/link ref. On mouse move within the element it
 * nudges the element toward the cursor (magnetic pull), and snaps
 * back on leave. Pure DOM transform — no re-renders.
 */
export function useMagnetic(strength = 18) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const onMouseLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
