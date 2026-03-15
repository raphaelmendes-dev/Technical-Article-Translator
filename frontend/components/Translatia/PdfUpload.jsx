import { useRef, useState } from "react";
import { T } from "../../constants/tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PdfUpload — drag-and-drop ou clique para upload de PDF
// Chama onTextExtracted(text) após sucesso no backend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function PdfUpload({ onTextExtracted, disabled }) {
  const inputRef     = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    setFileName(file.name);
    setStatus("loading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-pdf`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Erro no servidor");

      onTextExtracted(data.text);
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    processFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (disabled) return;
    processFile(e.target.files[0]);
  };

  const borderColor = dragOver
    ? T.cyan
    : status === "error"
    ? T.red
    : T.border;

  const label =
    status === "loading" ? "⬡  Extraindo texto..."  :
    status === "error"   ? "✕  Apenas arquivos PDF" :
    fileName             ? `✓  ${fileName}`          :
                           "PDF  Arraste ou clique";

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "7px 14px",
        border: `1px dashed ${borderColor}`,
        borderRadius: "5px",
        background: dragOver ? `${T.cyan}08` : "transparent",
        color: status === "error" ? T.red : status === "loading" ? T.yellow : fileName ? T.green : T.muted,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px", letterSpacing: "0.14em",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        animation: "pdf-pulse 3s ease-in-out infinite",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        minWidth: "180px",
      }}
    >
      {label}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}