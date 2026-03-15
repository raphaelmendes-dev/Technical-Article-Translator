import { T } from "../../constants/tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Header — logo + chips + progress bar + status
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Header({ phase, progress }) {
  const statusLabel = {
    idle:        "PRONTO",
    scanning:    "ANALISANDO...",
    translating: "TRADUZINDO...",
    done:        "CONCLUÍDO",
  }[phase];

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: "20px",
      padding: "0 24px",
      height: "60px",
      borderBottom: `1px solid ${T.border}`,
      background: `${T.surface}cc`,
      backdropFilter: "blur(12px)",
      flexShrink: 0,
      animation: "stagger-in 0.5s ease-out both",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "6px",
          background: `linear-gradient(135deg, ${T.cyan}33, ${T.purple}22)`,
          border: `1px solid ${T.cyan}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px",
        }}>⟨/⟩</div>
        <div>
          <div style={{
            fontSize: "14px", fontWeight: "700", letterSpacing: "0.12em",
            background: `linear-gradient(90deg, ${T.cyan}, #7dd3fc, ${T.cyan})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "logo-shimmer 4s linear infinite",
          }}>TRANSLATIA</div>
          <div style={{ fontSize: "8px", letterSpacing: "0.2em", color: T.dim, marginTop: "-1px" }}>
            Rs4Machine · Technical Translation Engine
          </div>
        </div>
      </div>

      {/* Status chips */}
      <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
        {[
          { label: "ENGINE", value: "v2.0",      color: T.cyan   },
          { label: "MODEL",  value: "Rs4-Trans",  color: T.purple },
          { label: "DOMAIN", value: "Eng+AI",     color: T.green  },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "3px 8px",
            background: `${color}0d`, border: `1px solid ${color}2a`,
            borderRadius: "3px", fontSize: "9px",
          }}>
            <span style={{ color: T.dim, letterSpacing: "0.1em" }}>{label}</span>
            <span style={{ color, letterSpacing: "0.08em", fontWeight: "600" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Progress bar — só durante scanning */}
      {phase === "scanning" && (
        <div style={{ flex: 1, height: "2px", background: T.border, borderRadius: "1px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${T.cyan}, ${T.purple})`,
            boxShadow: `0 0 8px ${T.cyan}`,
            transition: "width 0.036s linear",
          }} />
        </div>
      )}

      {/* Status indicator */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "6px", alignItems: "center" }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: (phase === "idle" || phase === "done") ? T.green : T.yellow,
          animation: "dot-blink 1.5s infinite",
        }} />
        <span style={{ fontSize: "9px", color: T.muted, letterSpacing: "0.12em" }}>
          {statusLabel}
        </span>
      </div>
    </header>
  );
}