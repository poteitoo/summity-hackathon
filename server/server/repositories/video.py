from ..libs.prisma_client import prisma


async def find_first_by_video_id_or_raise(video_id: str):
    return await prisma.video.find_first_or_raise(where={"video_id": video_id})


async def get_list():
    return await prisma.video.find_many()