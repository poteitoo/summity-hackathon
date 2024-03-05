from fastapi import APIRouter, BackgroundTasks

from .entities.youtube import PostYoutubeDownloadRequestSchema, YoutubeUpsertSchema
from .functions.youtube import get_youtube_video_info
from .repositories.youtube import find_first as youtube_find_first
from .repositories.youtube import find_first_or_raise as youtube_find_first_or_raise
from .services.youtube import bgt_download_youtube_video_and_register

router = APIRouter(prefix="/v1/youtube", tags=["/v1/youtube"])


@router.get("/{video_id}")
async def get_youtube(video_id: str) -> YoutubeUpsertSchema:
    if video := await youtube_find_first_or_raise(video_id):
        return video


@router.post("")
async def download_youtube(
    params: PostYoutubeDownloadRequestSchema, bgts: BackgroundTasks
):
    if video := await youtube_find_first(params.video_id):
        if video.download_status == "DOWNLOADED":
            return {"status": "already downloaded"}
        elif video.download_status != "FAILED":
            return {"status": "downloading"}

    bgts.add_task(
        bgt_download_youtube_video_and_register, params.video_id, params.user_id
    )
    return {"status": "progressing"}


@router.get("/info/{video_id}")
async def download_youtube(video_id: str):
    video_info = get_youtube_video_info(video_id)
    return video_info
