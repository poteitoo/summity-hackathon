from pydantic import BaseModel


class TranslationSchema(BaseModel):
    id: str
    index: int
    text: str
    language: str
    transcription_segment_id: str


class TranslationSchema(BaseModel):
    index: int
    text: str
    language: str
    transcription_segment_id: str
