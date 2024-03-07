from fastapi import APIRouter

from .repositories.video import (
    find_first_by_video_id_or_raise as video_find_first_by_video_id_or_raise,
)
from .repositories.video import get_list as video_get_list

router = APIRouter(prefix="/v1/videos", tags=["/v1/videos"])


@router.get("")
async def get_video_list():
    return await video_get_list()


@router.get("/{video_id}")
async def get_video(video_id: str):
    return await video_find_first_by_video_id_or_raise(video_id)
