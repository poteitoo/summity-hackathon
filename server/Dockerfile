FROM python:3.11-bullseye as base

RUN apt update && \
    apt install -y --no-install-recommends \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        && rm -rf /var/lib/apt/lists/*
RUN pip install poetry

# Node.js v20のインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

FROM base

WORKDIR /app

COPY . ./
RUN poetry export -f requirements.txt -o requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install -U prisma && npm i -g prisma && prisma generate

EXPOSE 8080
CMD uvicorn main:app --host 0.0.0.0 --port 8080
