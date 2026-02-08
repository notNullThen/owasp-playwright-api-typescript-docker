FROM mcr.microsoft.com/playwright:v1.58.2-noble
WORKDIR /e2e

COPY package*.json ./
RUN npm ci
RUN npm i -g allure

COPY . .
COPY .env.example .env
