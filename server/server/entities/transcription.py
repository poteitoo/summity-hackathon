from typing import List

from pydantic import BaseModel


class Word(BaseModel):
    end: float
    start: float
    word: str
    probability: float


class Segment(BaseModel):
    avg_logprob: float
    end: float | str
    start: float | str
    text: str
    speaker: str
    words: List[Word]


class ReplicateResponseSchema(BaseModel):
    segments: List[Segment]
    language: str
    num_speakers: int
