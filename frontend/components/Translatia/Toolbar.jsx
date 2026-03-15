import { T, LANGUAGES } from "../../constants/tokens";
import LanguageSelector from "./LanguageSelector";
import PdfUpload from "./PdfUpload";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rs4Machine · Translatia · Toolbar
// Seletores de idioma + PDF upload + botão traduzir
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Toolbar({
  sourceLang, setSourceLang,
  targetLang, setTargetLang,
  phase, progress,
  activeTerms,
  onTranslate, onReset, onSwap,
  onPdfText,
}) {
  const isProcessing = phase === "scanning" || phase === "translating";

  const btnLabel = {
    scanning:    "⬡  ANALISANDO...",
    translating: "◈  TRADUZINDO...",
    done:        "↺  NOVA TRADUÇÃO",
    idle:        "⟨/⟩  TRADUZIR",
  }[phase];

  const btnColor  = phase === "done" ? T.green : T.cyan;

  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: "16px",
      padding: "16px 24px 12px",
      borderBottom: `1px solid ${T.border}`,
      background: `${T.bgDeep}aa`,
      flexShrink: 0,
      overflow: "visible",
      animation: "stagger-in 0.5s ease-out 0.1s both",
      flexWrap: "wrap",
    }}>
      {/* PDF Upload */}
      <PdfUpload onTextExtracted={onPdfText} />

      {/* Separador */}
      <div style={{ width: "1px", height: "36px", background: T.border, alignSelf: "flex-end" }} />

      {/* Idioma origem */}
      <LanguageSelector value={sourceLang} onChange={setSourceLang} label="Idioma de origem" />

      {/* Swap */}
      <button
        onClick={onSwap}
        title="Inverter idiomas"
        style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "transparent",
          border: `1px solid ${T.border}`,
          color: T.muted, cursor: "pointer", fontSize: "14px",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
          alignSelf: "flex-end",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = T.cyan;
          e.currentTarget.style.color       = T.cyan;
          e.currentTarget.style.boxShadow   = `0 0 10px ${T.cyan}44`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = T.border;
          e.currentTarget.style.color       = T.muted;
          e.currentTarget.style.boxShadow   = "none";
        }}
      >⇄</button>

      {/* Idioma destino */}
      <LanguageSelector value={targetLang} onChange={setTargetLang} label="Idioma de destino" />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Stats (pós-tradução) */}
      {phase === "done" && (
        <div style={{ display: "flex", gap: "16px", alignSelf: "flex-end", animation: "stagger-in 0.4s ease-out both" }}>
          {[
            { label: "TERMOS", value: activeTerms.length.toString() },
            { label: "STATUS", value: "OK" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "16px", color: T.cyan, fontWeight: "700", letterSpacing: "0.05em" }}>{value}</div>
              <div style={{ fontSize: "8px", color: T.dim, letterSpacing: "0.15em" }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Botão Traduzir */}
      <button
        onClick={phase === "done" ? onReset : onTranslate}
        disabled={isProcessing}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 28px",
          background: isProcessing
            ? `${T.cyan}18`
            : phase === "done"
            ? `${T.green}18`
            : `linear-gradient(135deg, ${T.cyan}22, ${T.cyan}0a)`,
          border: `1px solid ${btnColor}`,
          borderRadius: "5px",
          color: btnColor,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px", fontWeight: "700",
          letterSpacing: "0.18em", textTransform: "uppercase",
          cursor: isProcessing ? "not-allowed" : "pointer",
          boxShadow: isProcessing ? "none" : `0 0 16px ${btnColor}44`,
          transition: "all 0.3s ease",
          opacity: isProcessing ? 0.6 : 1,
          alignSelf: "flex-end",
          animation: phase === "idle" ? "pulse-border 2.5s ease-in-out infinite" : "none",
        }}
      >
        {btnLabel}
      </button>
    </div>
  );
}