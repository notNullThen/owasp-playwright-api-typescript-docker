FROM mcr.microsoft.com/playwright:v1.57.0-noble
WORKDIR /e2e
COPY . .
COPY .env.example .env
RUN npm i
