from ..entities.user import PostUserRequestSchema, UserSchema
from ..libs.prisma_client import prisma


async def count_videos_by_user_id(user_id: str) -> int:
    return await prisma.video.count(where={"user_id": user_id})


async def find_first_by_id_or_raise(user_id: str) -> UserSchema:
    return await prisma.user.find_first_or_raise(where={"id": user_id})


async def find_first_by_email_or_raise(email: str) -> UserSchema:
    return await prisma.user.find_first_or_raise(where={"email": email})


async def find_first_by_email(email: str) -> UserSchema | None:
    return await prisma.user.find_first(where={"email": email})


async def create(user_info: PostUserRequestSchema) -> UserSchema:
    return await prisma.user.create(
        data={
            "email": user_info.email,
            "name": user_info.name,
            "image": user_info.image,
        }
    )
