from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from server.libs.prisma_client import lifespan
from server.user import router as user_router
from server.video import router as video_router
from server.youtube import router as youtube_router


class InternalServerErrorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as exc:
            print(exc)
            return JSONResponse(
                status_code=500, content={"detail": "Internal Server Error"}
            )


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://summity.vercel.app"],
    # allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(InternalServerErrorMiddleware)
app.include_router(youtube_router)
app.include_router(user_router)
app.include_router(video_router)


@app.get("/health")
def index():
    return {"message": "healthy"}
