// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rs4Machine — Design DNA Tokens
// Projeto: Translatia
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const T = {
  bgDeep:   "#05080d",
  bgBase:   "#0d1117",
  surface:  "#161b22",
  card:     "#141c26",
  border:   "#1e2835",
  borderHi: "#2a3a50",
  text:     "#d4e0ec",
  muted:    "#6b7f96",
  dim:      "#3a4a5c",
  cyan:     "#00f0ff",
  cyanDim:  "#006a80",
  purple:   "#8a2be2",
  green:    "#00ff9c",
  blue:     "#3b82f6",
  yellow:   "#f59e0b",
  red:      "#ff3b3b",
};

export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "es", label: "ES", name: "Español" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "zh", label: "ZH", name: "中文" },
  { code: "ja", label: "JA", name: "日本語" },
];

export const GLOSSARY = {
  "LLM":         "Large Language Model — modelo de linguagem treinado em larga escala.",
  "Token":       "Unidade mínima de texto processada pelo modelo (palavra ou subpalavra).",
  "Pipeline":    "Sequência encadeada de etapas de processamento de dados ou agentes.",
  "Embedding":   "Representação vetorial densa de texto em espaço de alta dimensão.",
  "Inference":   "Execução do modelo para gerar predições a partir de inputs.",
  "Fine-tuning": "Ajuste fino de um modelo pré-treinado em dados específicos do domínio.",
  "RAG":         "Retrieval-Augmented Generation — geração aumentada por recuperação de contexto.",
  "Latency":     "Tempo de resposta do sistema desde o input até o output.",
  "Context":     "Janela de tokens disponíveis para o modelo processar de uma vez.",
  "Prompt":      "Instrução ou entrada textual enviada ao modelo de linguagem.",
  "Agent":       "Sistema autônomo que usa LLMs para planejar e executar tarefas.",
  "Attention":   "Mecanismo que pondera a relevância de cada token em relação aos outros.",
};