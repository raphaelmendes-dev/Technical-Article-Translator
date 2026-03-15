import { useState, useEffect, useRef } from "react";
import { T, LANGUAGES } from "../../constants/tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rs4Machine · Translatia · LanguageSelector
// Dropdown customizado de seleção de idioma
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function LanguageSelector({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === value);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none", zIndex: 9999 }}>
      <div style={{
        fontSize: "9px", letterSpacing: "0.18em",
        color: T.muted, marginBottom: "5px",
        fontFamily: "monospace", textTransform: "uppercase",
      }}>
        {label}
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 14px",
          background: open ? `${T.cyan}12` : T.card,
          border: `1px solid ${open ? T.cyan : T.border}`,
          borderRadius: "5px",
          color: open ? T.cyan : T.text,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px", letterSpacing: "0.1em",
          cursor: "pointer", minWidth: "130px",
          boxShadow: open ? `0 0 12px ${T.cyan}33` : "none",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: "10px", color: T.cyan, fontWeight: "700", letterSpacing: "0.12em" }}>
          {current?.label}
        </span>
        <span style={{ color: T.muted, fontSize: "11px" }}>{current?.name}</span>
        <span style={{
          marginLeft: "auto", color: T.muted, fontSize: "8px",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s",
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 100,
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: "5px", overflow: "hidden", minWidth: "160px",
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${T.cyan}22`,
          animation: "dropdown-in 0.15s ease-out",
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { onChange(lang.code); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "9px 14px",
                background: lang.code === value ? `${T.cyan}10` : "transparent",
                border: "none",
                borderLeft: lang.code === value ? `2px solid ${T.cyan}` : "2px solid transparent",
                color: lang.code === value ? T.cyan : T.text,
                fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                cursor: "pointer", textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (lang.code !== value) e.currentTarget.style.background = `${T.cyan}08`; }}
              onMouseLeave={e => { if (lang.code !== value) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{
                color: T.cyan, fontWeight: "700", fontSize: "10px",
                letterSpacing: "0.1em", minWidth: "24px",
              }}>{lang.label}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}