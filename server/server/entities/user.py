from datetime import datetime

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: str
    email: str
    name: str | None
    image: str | None
    createdAt: datetime
    updatedAt: datetime


class GetUserResponseSchema(BaseModel):
    id: str
    email: str
    name: str = None
    image: str = None
    createdAt: datetime
    updatedAt: datetime


class PostUserRequestSchema(BaseModel):
    email: str
    name: str | None
    image: str | None
