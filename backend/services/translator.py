# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Rs4Machine · Translatia · Translator Service
# Tradução com glossário técnico + chunking
# Motor: deep-translator (Google Translator)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import re
import time
from deep_translator import GoogleTranslator

CHUNK_SIZE = 4500  # Google Translator limit ~5000

GLOSSARIO = {
    "machine learning":       "machine learning",
    "deep learning":          "deep learning",
    "neural network":         "rede neural",
    "artificial intelligence":"inteligência artificial",
    "LLM":                    "LLM",
    "large language model":   "large language model",
    "RAG":                    "RAG",
    "fine-tuning":            "fine-tuning",
    "prompt engineering":     "prompt engineering",
    "API":                    "API",
    "endpoint":               "endpoint",
    "embedding":              "embedding",
    "inference":              "inferência",
    "pipeline":               "pipeline",
    "token":                  "token",
    "attention":              "atenção",
    "agent":                  "agente",
    "latency":                "latência",
    "context window":         "janela de contexto",
}


def _protect_terms(text: str) -> tuple[str, dict]:
    mapa = {}
    contador = 0
    for termo in sorted(GLOSSARIO.keys(), key=len, reverse=True):
        placeholder = f"__TERM{contador}__"
        pattern = re.compile(re.escape(termo), re.IGNORECASE)
        if pattern.search(text):
            text = pattern.sub(placeholder, text)
            mapa[placeholder] = GLOSSARIO[termo]
            contador += 1
    return text, mapa


def _restore_terms(text: str, mapa: dict) -> str:
    for placeholder, original in mapa.items():
        text = text.replace(placeholder, original)
    return text


def _split_chunks(text: str, size: int) -> list[str]:
    paragraphs = text.split("\n")
    chunks = []
    current = ""
    for para in paragraphs:
        if len(current) + len(para) + 1 <= size:
            current += para + "\n"
        else:
            if current:
                chunks.append(current.strip())
            while len(para) > size:
                chunks.append(para[:size])
                para = para[size:]
            current = para + "\n"
    if current.strip():
        chunks.append(current.strip())
    return chunks


def translate_text(text: str, source_lang: str = "auto", target_lang: str = "pt") -> str:
    if not text.strip():
        return ""

    text, mapa = _protect_terms(text)
    chunks = _split_chunks(text, CHUNK_SIZE)
    translated_chunks = []

    for chunk in chunks:
        if not chunk.strip():
            translated_chunks.append("")
            continue
        try:
            tradutor = GoogleTranslator(source=source_lang, target=target_lang)
            result = tradutor.translate(chunk)
            translated_chunks.append(result)
            time.sleep(0.3)
        except Exception as e:
            raise RuntimeError(f"Erro ao traduzir chunk: {str(e)}")

    full = "\n".join(translated_chunks)
    full = _restore_terms(full, mapa)
    return full