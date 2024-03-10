from ..libs.prisma_client import prisma


async def find_first_by_video_id_or_raise(video_id: str):
    videos = await prisma.video.find_first_or_raise(
        where={"video_id": video_id},
        include={
            "segments": {
                "order_by": {"index": "asc"},
            },
        },
    )
    translations = await prisma.translation.find_many(where={"video_id": video_id})
    return {"videos": videos, "translations": translations}


async def get_list():
    return await prisma.video.find_many(order={"createdAt": "desc"})
