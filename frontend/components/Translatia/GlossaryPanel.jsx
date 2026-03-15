import { useState } from "react";
import { T } from "../../constants/tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GlossaryPanel — sidebar com termos técnicos detectados
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function GlossaryPanel({ terms, activeTerms }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{
      width: "240px", flexShrink: 0,
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: "8px", overflow: "hidden",
      display: "flex", flexDirection: "column",
      maxHeight: "100%",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px",
        borderBottom: `1px solid ${T.border}`,
        background: T.surface,
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: T.yellow,
          boxShadow: `0 0 8px ${T.yellow}`,
          animation: "dot-blink 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px", letterSpacing: "0.18em",
          color: T.muted, textTransform: "uppercase",
        }}>Glossário Técnico</span>
        <span style={{
          marginLeft: "auto",
          background: `${T.yellow}22`,
          border: `1px solid ${T.yellow}44`,
          borderRadius: "3px",
          padding: "1px 6px",
          fontSize: "9px",
          color: T.yellow,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
        }}>{activeTerms.length} detectados</span>
      </div>

      {/* Lista */}
      <div style={{ overflowY: "auto", flex: 1, padding: "8px" }}>
        {Object.entries(terms).map(([term, def]) => {
          const isActive = activeTerms.includes(term);
          const isOpen   = expanded === term;

          return (
            <div key={term}
              onClick={() => setExpanded(isOpen ? null : term)}
              style={{
                marginBottom: "4px",
                borderRadius: "5px",
                border: `1px solid ${isActive ? T.cyan + "44" : T.border}`,
                background: isActive ? `${T.cyan}08` : "transparent",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.2s ease",
                animation: isActive ? "term-appear 0.3s ease-out" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px" }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "1px",
                  background: isActive ? T.cyan : T.dim,
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 6px ${T.cyan}` : "none",
                  transition: "all 0.3s",
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px", fontWeight: "600",
                  letterSpacing: "0.08em",
                  color: isActive ? T.cyan : T.muted,
                  textShadow: isActive ? `0 0 8px ${T.cyan}66` : "none",
                  transition: "color 0.3s",
                }}>{term}</span>
                <span style={{
                  marginLeft: "auto", fontSize: "9px",
                  color: T.dim,
                  transform: isOpen ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                }}>›</span>
              </div>

              {isOpen && (
                <div style={{
                  padding: "8px 10px 10px 24px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px", lineHeight: "1.6",
                  color: T.muted,
                  borderTop: `1px solid ${T.border}`,
                  animation: "def-expand 0.2s ease-out",
                }}>{def}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}