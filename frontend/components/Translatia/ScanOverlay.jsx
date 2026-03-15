import { T } from "../../constants/tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ScanOverlay — efeito raio-x sobre o TextPanel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function ScanOverlay({ active }) {
  if (!active) return null;

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      borderRadius: "8px", overflow: "hidden",
      pointerEvents: "none",
    }}>
      {/* Linha de scan */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${T.cyan}, ${T.cyan}cc, ${T.cyan}, transparent)`,
        boxShadow: `0 0 20px ${T.cyan}, 0 0 40px ${T.cyan}88`,
        animation: "scan-line 1.4s ease-in-out infinite",
        zIndex: 2,
      }} />
      {/* Glow sweep */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "80px",
        background: `linear-gradient(to bottom, ${T.cyan}18, transparent)`,
        animation: "scan-glow 1.4s ease-in-out infinite",
        zIndex: 1,
      }} />
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(${T.cyan}08 1px, transparent 1px),
          linear-gradient(90deg, ${T.cyan}08 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
        opacity: 0.5,
      }} />
      {/* Corner brackets */}
      {[
        { top: 8,    left: 8,  borderTop: `2px solid ${T.cyan}`,    borderLeft:  `2px solid ${T.cyan}` },
        { top: 8,    right: 8, borderTop: `2px solid ${T.cyan}`,    borderRight: `2px solid ${T.cyan}` },
        { bottom: 8, left: 8,  borderBottom: `2px solid ${T.cyan}`, borderLeft:  `2px solid ${T.cyan}` },
        { bottom: 8, right: 8, borderBottom: `2px solid ${T.cyan}`, borderRight: `2px solid ${T.cyan}` },
      ].map((style, i) => (
        <div key={i} style={{ position: "absolute", width: "20px", height: "20px", ...style }} />
      ))}
    </div>
  );
}