from contextlib import asynccontextmanager

from fastapi import FastAPI

from prisma import Prisma

prisma = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await prisma.connect()
        yield
    finally:
        await prisma.disconnect()
