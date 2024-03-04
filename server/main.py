from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from functions.youtube import download_youtube_video, get_youtube_video_info
from prisma import Prisma

prisma = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await prisma.connect()
        yield
    finally:
        await prisma.disconnect()


class InternalServerErrorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as exc:

            return JSONResponse(
                status_code=500, content={"detail": "Internal Server Error"}
            )


app = FastAPI(lifespan=lifespan)
app.add_middleware(InternalServerErrorMiddleware)


@app.get("/health")
def index():
    return {"message": "healthy"}


@app.get("/youtube")
async def get_youtube(video_id: str):
    video_info = get_youtube_video_info(video_id)
    return {"video_info": video_info}


@app.post("/youtube")
async def download_youtube(video_id: str):
    status = download_youtube_video(video_id)
    return {status: status}
