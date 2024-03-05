from fastapi import APIRouter

from .entities.user import PostUserRequestSchema, UserSchema
from .repositories.user import create as user_create
from .repositories.user import (
    find_first_by_email_or_raise as user_find_first_by_email_or_raise,
)

router = APIRouter(prefix="/v1/user", tags=["/v1/user"])


@router.get("")
async def get_user(email: str) -> UserSchema:
    if user := await user_find_first_by_email_or_raise(email):
        return user


@router.post("")
async def get_user(user_info: PostUserRequestSchema) -> UserSchema:
    if user := await user_create(user_info):
        return user
