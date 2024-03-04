from pprint import pprint

from fastapi import APIRouter, BackgroundTasks

from .functions.youtube import download_youtube_video, get_youtube_video_info
from .libs.prisma_client import prisma

router = APIRouter(prefix="/v1/youtube", tags=["v1/youtube"])


@router.get("/{video_id}")
async def get_youtube(video_id: str):
    if video := await prisma.video.find_first_or_raise(where={"video_id": video_id}):
        return video


async def bgt_download_youtube_video_and_register(video_id: str):
    try:
        video_info = download_youtube_video(video_id)
        categories = video_info.get("categories")
        info = {
            "video_id": video_info.get("id"),
            "title": video_info.get("fulltitle"),
            "duration": video_info.get("duration"),
            "thumbnail": video_info.get("thumbnail"),
            "description": video_info.get("description"),
            "is_embedable": video_info.get("playable_in_embed"),
            "tags": video_info.get("tags"),
            "language": video_info.get("language"),
            "category": categories[0] if len(categories) > 0 else None,
            "is_public": video_info.get("availability") == "public",
            "download_status": "DOWNLOADED",
        }

        await prisma.video.upsert(
            data={
                "create": info,
                "update": info,
            },
            where={"video_id": video_id},
        )
    except Exception as e:
        await prisma.video.upsert(
            data={
                "create": {"video_id": video_id, "download_status": "FAILED"},
                "update": {"video_id": video_id, "download_status": "FAILED"},
            },
            where={"video_id": video_id},
        )
        raise ConnectionRefusedError("Failed to download video")


@router.post("/{video_id}")
async def download_youtube(video_id: str, bgts: BackgroundTasks):
    if video := await prisma.video.find_first(where={"video_id": video_id}):
        if video.download_status == "DOWNLOADED":
            return {"status": "already downloaded"}
        elif video.download_status != "FAILED":
            return {"status": "downloading"}

    bgts.add_task(bgt_download_youtube_video_and_register, video_id)
    return {"status": "downloading"}


@router.get("/info/{video_id}")
async def download_youtube(video_id: str):
    video_info = get_youtube_video_info(video_id)
    return video_info
