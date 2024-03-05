from typing import List

from pydantic import BaseModel


class YoutubeUpsertSchema(BaseModel):
    video_id: str
    title: str | None
    duration: int | None
    thumbnail: str | None
    description: str | None
    is_embedable: bool | None
    tags: List[str] | None
    language: str | None
    category: str | None
    is_public: bool | None
    download_status: str | None
