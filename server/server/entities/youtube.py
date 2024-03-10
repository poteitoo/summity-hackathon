from typing import Optional

from pydantic import BaseModel


class YoutubeUpsertSchema(BaseModel):
    user_id: str
    video_id: str
    title: Optional[str]
    duration: Optional[int]
    thumbnail: Optional[str]
    description: Optional[str]
    is_embedable: Optional[bool]
    tags: Optional[str]
    language: Optional[str]
    category: Optional[str]
    is_public: Optional[bool]
    extension: Optional[str]
    download_status: Optional[str]
    num_speakers: Optional[int]
    transcribing_status: Optional[str]


class PostYoutubeDownloadRequestSchema(BaseModel):
    user_id: str
    video_id: str
