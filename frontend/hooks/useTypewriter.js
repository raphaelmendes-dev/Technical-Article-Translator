import { useState, useEffect, useRef } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useTypewriter — efeito de digitação progressiva
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function useTypewriter(text, active, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      idx.current = 0;
      return;
    }
    setDisplayed("");
    setDone(false);
    idx.current = 0;

    const tick = () => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        setDone(true);
        return;
      }
      timer.current = setTimeout(tick, speed);
    };

    timer.current = setTimeout(tick, speed);
    return () => clearTimeout(timer.current);
  }, [text, active, speed]);

  return { displayed, done };
}