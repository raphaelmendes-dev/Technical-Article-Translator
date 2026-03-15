"""
Rs4Machine · Translatia
Serviço: extração de texto de PDF
"""

import io
import pypdf


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extrai texto de um PDF enviado como bytes."""
    reader = pypdf.PdfReader(io.BytesIO(file_bytes))
    pages  = [page.extract_text() or "" for page in reader.pages]
    text   = "\n\n".join(p.strip() for p in pages if p.strip())
    return text