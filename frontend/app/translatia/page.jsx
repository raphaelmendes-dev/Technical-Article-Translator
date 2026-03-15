"use client";

import { useState, useCallback } from "react";
import "../../styles/translatia.css";

import { T, LANGUAGES, GLOSSARY } from "../../constants/tokens";
import { useTypewriter }           from "../../hooks/useTypewriter";
import Header                      from "../../components/Translatia/Header";
import Toolbar                     from "../../components/Translatia/Toolbar";
import TextPanel                   from "../../components/Translatia/TextPanel";
import GlossaryPanel               from "../../components/Translatia/GlossaryPanel";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Translatia — página principal
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function TranslatiaPage() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("pt");
  const [inputText,  setInputText]  = useState("");
  const [phase,      setPhase]      = useState("idle"); // idle | scanning | translating | done
  const [progress,   setProgress]   = useState(0);
  const [apiResult,  setApiResult]  = useState("");

  const { displayed: translatedText, done: typeDone } = useTypewriter(
    apiResult, phase === "translating" || phase === "done", 12
  );

  const wordCount = (text) => text.trim() ? text.trim().split(/\s+/).length : 0;

  const activeTerms = Object.keys(GLOSSARY).filter(term =>
    inputText.toLowerCase().includes(term.toLowerCase())
  );

  // ── Traduzir ──────────────────────────────
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || phase !== "idle") return;

    setPhase("scanning");
    setProgress(0);

    // Fase 1: scan animado (1.8s)
    let p = 0;
    const ticker = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) clearInterval(ticker);
    }, 36);

    setTimeout(async () => {
      setPhase("translating");

      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text:        inputText,
            source_lang: sourceLang,
            target_lang: targetLang,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Erro na tradução");

        setApiResult(data.translated_text);

        // Aguarda typewriter terminar
        const wait = data.translated_text.length * 12 + 300;
        setTimeout(() => setPhase("done"), wait);
      } catch (err) {
        console.error(err);
        setApiResult("Erro ao traduzir. Verifique o backend.");
        setTimeout(() => setPhase("done"), 500);
      }
    }, 1900);
  }, [inputText, sourceLang, targetLang, phase]);

  const handleReset = () => {
    setPhase("idle");
    setProgress(0);
    setApiResult("");
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handlePdfText = (text) => {
    setInputText(text);
    if (phase === "done") handleReset();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, #070a0f 0%, ${T.bgDeep} 50%, #06090d 100%)`,
      fontFamily: "'JetBrains Mono', monospace",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <Header phase={phase} progress={progress} />

      <Toolbar
        phase={phase}
        sourceLang={sourceLang}
        targetLang={targetLang}
        activeTerms={activeTerms}
        onSourceChange={setSourceLang}
        onTargetChange={setTargetLang}
        onSwap={handleSwap}
        onTranslate={handleTranslate}
        onReset={handleReset}
        onPdfText={handlePdfText}
      />

      {/* ── Main content ── */}
      <div style={{
        flex: 1, display: "flex", gap: "12px",
        padding: "12px 24px 20px",
        overflow: "hidden", minHeight: 0,
        animation: "stagger-in 0.5s ease-out 0.2s both",
      }}>
        {/* Painel original */}
        <TextPanel
          title="Texto Original"
          lang={LANGUAGES.find(l => l.code === sourceLang)?.label}
          icon="◻"
          accentColor={T.cyan}
          scanning={phase === "scanning"}
          wordCount={wordCount(inputText)}
          charCount={inputText.length}
        >
          <textarea
            value={inputText}
            onChange={e => { setInputText(e.target.value); if (phase === "done") handleReset(); }}
            placeholder="Cole, digite ou envie um PDF..."
            style={{
              width: "100%", height: "100%", minHeight: "260px",
              background: "transparent", border: "none", resize: "none",
              color: T.text,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px", lineHeight: "1.8",
              letterSpacing: "0.02em",
            }}
          />
        </TextPanel>

        {/* Divisor */}
        <div style={{
          width: "1px", flexShrink: 0,
          background: `linear-gradient(to bottom, transparent, ${T.border}, ${T.cyan}33, ${T.border}, transparent)`,
          alignSelf: "stretch",
        }} />

        {/* Painel traduzido */}
        <TextPanel
          title="Tradução"
          lang={LANGUAGES.find(l => l.code === targetLang)?.label}
          icon="◈"
          accentColor={T.purple}
          scanning={false}
          wordCount={wordCount(translatedText)}
          charCount={translatedText.length}
        >
          {phase === "idle" ? (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "12px",
              opacity: 0.3,
            }}>
              <div style={{ fontSize: "32px" }}>⟨/⟩</div>
              <div style={{ fontSize: "11px", color: T.muted, letterSpacing: "0.15em" }}>
                AGUARDANDO TRADUÇÃO
              </div>
            </div>
          ) : (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px", lineHeight: "1.8",
              color: T.text, letterSpacing: "0.02em",
              whiteSpace: "pre-wrap",
            }}>
              {translatedText}
              {!typeDone && phase === "translating" && (
                <span style={{ color: T.purple, animation: "dot-blink 0.8s step-end infinite" }}>█</span>
              )}
            </div>
          )}
        </TextPanel>

        {/* Glossário */}
        <GlossaryPanel terms={GLOSSARY} activeTerms={activeTerms} />
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", gap: "20px",
        padding: "8px 24px",
        borderTop: `1px solid ${T.border}`,
        background: T.surface,
        flexShrink: 0,
      }}>
        {["Rs4Machine · Translatia v2.0", "FastAPI · Render", "Domain: Engineering + AI"].map((s, i) => (
          <span key={i} style={{ fontSize: "9px", color: T.dim, letterSpacing: "0.15em" }}>
            {i > 0 ? "·  " : ""}{s}
          </span>
        ))}
        <div style={{ marginLeft: "auto", fontSize: "9px", color: T.dim, letterSpacing: "0.1em" }}>
          CEO: Raphael Mendes
        </div>
      </div>
    </div>
  );
}