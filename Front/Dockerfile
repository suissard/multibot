# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Définir l'argument de build
ARG VUE_APP_API_URL=http://localhost:3000

# Copier les fichiers package
COPY app/package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source et config
COPY app .

# Builder l'application avec la variable d'env
RUN VUE_APP_API_URL=$VUE_APP_API_URL npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]