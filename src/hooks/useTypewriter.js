import { useEffect, useState } from "react";

/**
 * Types out a sequence of strings, holds, deletes, and moves to the
 * next. Used once, sparingly, on the hero's role line — a small nod
 * to a terminal without turning the whole page into one.
 */
export function useTypewriter(words, { typingMs = 55, holdMs = 1600, deletingMs = 30 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingMs);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 10);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingMs);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typingMs, holdMs, deletingMs]);

  return text;
}
