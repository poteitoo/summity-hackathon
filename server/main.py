from fastapi import FastAPI
from prisma import Prisma
from contextlib import asynccontextmanager
from functions.youtube import get_youtube_video_info, download_youtube_video
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

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
