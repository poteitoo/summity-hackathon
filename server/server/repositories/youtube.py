from ..entities.youtube import YoutubeUpsertSchema
from ..libs.prisma_client import prisma


async def find_first_or_raise(video_id: str):
    return await prisma.video.find_first_or_raise(where={"video_id": video_id})


async def find_first(video_id: str):
    return await prisma.video.find_first(where={"video_id": video_id})


async def upsert(video_info: YoutubeUpsertSchema):
    return await prisma.video.upsert(
        data={
            "create": video_info,
            "update": video_info,
        },
        where={"video_id": video_info["video_id"]},
    )
