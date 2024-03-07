from pydantic import BaseModel


class YoutubeUpsertSchema(BaseModel):
    user_id: str
    video_id: str
    title: str | None
    duration: int | None
    thumbnail: str | None
    description: str | None
    is_embedable: bool | None
    tags: str | None
    language: str | None
    category: str | None
    is_public: bool | None
    extension: str | None
    download_status: str | None
    num_speakers: int | None
    transcribing_status: str | None


class PostYoutubeDownloadRequestSchema(BaseModel):
    user_id: str
    video_id: str
