FROM mcr.microsoft.com/playwright:v1.57.0-noble
WORKDIR /e2e

COPY package*.json ./
RUN npm ci

COPY . .
COPY .env.example .env
