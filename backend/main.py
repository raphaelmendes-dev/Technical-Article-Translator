"""
Rs4Machine · Translatia
Backend: FastAPI + uvicorn
Rotas: /translate · /upload-pdf · /health
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from services.translator     import translate_text
from services.pdf_extractor  import extract_text_from_pdf

# ── App ───────────────────────────────────────
app = FastAPI(title="Translatia API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────
class TranslateRequest(BaseModel):
    text:        str
    source_lang: str = "auto"
    target_lang: str = "pt"


class TranslateResponse(BaseModel):
    translated_text: str
    source_lang:     str
    target_lang:     str


class PdfResponse(BaseModel):
    text:      str
    pages:     int
    char_count: int


# ── Rotas ─────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "service": "Translatia", "version": "2.0.0"}


@app.post("/translate", response_model=TranslateResponse)
def translate(body: TranslateRequest):
    if not body.text.strip():
        raise HTTPException(status_code=400, detail="Texto vazio.")

    try:
        result = translate_text(body.text, body.source_lang, body.target_lang)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return TranslateResponse(
        translated_text=result,
        source_lang=body.source_lang,
        target_lang=body.target_lang,
    )


@app.post("/upload-pdf", response_model=PdfResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Apenas arquivos PDF são aceitos.")

    content = await file.read()

    if len(content) > 10 * 1024 * 1024:  # 10 MB
        raise HTTPException(status_code=413, detail="PDF muito grande. Limite: 10 MB.")

    try:
        text = extract_text_from_pdf(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao extrair PDF: {str(e)}")

    if not text.strip():
        raise HTTPException(status_code=422, detail="PDF sem texto extraível (pode ser escaneado).")

    return PdfResponse(
        text=text,
        pages=text.count("\n\n") + 1,
        char_count=len(text),
    )