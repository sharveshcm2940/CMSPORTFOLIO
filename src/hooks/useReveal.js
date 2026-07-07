import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to any element and a boolean that flips to
 * true once the element is at or near the viewport. Combine with the
 * `.reveal` / `.reveal.is-visible` CSS classes for the clip-path
 * "scan wipe" reveal used throughout the page.
 *
 * Deliberately generous: a negative bottom rootMargin means an
 * element reveals before it reaches the middle of the screen (no
 * dead scroll where the page looks blank), a low threshold means it
 * doesn't need to be mostly on-screen first, and a short fallback
 * timer guarantees content is never permanently stuck at opacity 0
 * even if the observer never fires (e.g. an element already in view
 * on a very tall viewport at load).
 */
export function useReveal(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    const fallback = setTimeout(() => setVisible(true), 2200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return [ref, visible];
}
