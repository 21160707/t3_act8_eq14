# Etapa 1: Construir la aplicación
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir la aplicación
FROM pierrezemb/gostatic

COPY --from=build /app/dist /srv/http

CMD ["-port", "8080", "-https-promote", "-enable-logging"]
