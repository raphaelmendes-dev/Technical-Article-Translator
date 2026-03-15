import { T } from "../../constants/tokens";
import ScanOverlay from "./ScanOverlay";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TextPanel — painel de texto (original ou traduzido)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function TextPanel({
  title, lang, icon, children,
  accentColor, scanning,
  wordCount, charCount,
}) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: "#0c1219",
      border: `1px solid ${T.border}`,
      borderRadius: "8px", overflow: "hidden",
      position: "relative",
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03)`,
    }}>
      {/* Top accent line */}
      <div style={{
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${accentColor}66, ${accentColor}, ${accentColor}66, transparent)`,
      }} />

      {/* Panel header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 16px",
        borderBottom: `1px solid ${T.border}`,
        background: T.surface,
      }}>
        <span style={{ fontSize: "14px" }}>{icon}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px", letterSpacing: "0.2em",
          color: accentColor, textTransform: "uppercase",
          textShadow: `0 0 8px ${accentColor}66`,
        }}>{title}</span>
        <div style={{
          marginLeft: "8px", padding: "2px 8px",
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}33`,
          borderRadius: "3px",
          fontFamily: "monospace", fontSize: "9px",
          letterSpacing: "0.12em", color: accentColor,
          textTransform: "uppercase",
        }}>{lang}</div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          {[
            { label: "WORDS", value: wordCount },
            { label: "CHARS", value: charCount },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: "8px", color: T.dim, fontFamily: "monospace", letterSpacing: "0.1em" }}>{label}</div>
              <div style={{ fontSize: "11px", color: T.muted, fontFamily: "monospace" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <ScanOverlay active={scanning} />
        <div style={{
          position: "absolute", inset: 0,
          padding: "16px",
          overflowY: "auto",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}