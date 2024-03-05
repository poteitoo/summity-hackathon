from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from server.libs.prisma_client import lifespan
from server.user import router as user_router
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


app = FastAPI(lifespan=lifespan)
app.add_middleware(InternalServerErrorMiddleware)
app.include_router(youtube_router)
app.include_router(user_router)


@app.get("/health")
def index():
    return {"message": "healthy"}
