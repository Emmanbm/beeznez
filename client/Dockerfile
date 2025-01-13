# Build pour le développement
FROM node:20 AS dev
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]

# Build pour la production
FROM node:20 AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
# RUN VITE_API_BASE_URL=https://api-gateway-96400611877.europe-west9.run.app/api pnpm run build
ENV VITE_API_BASE_URL=https://backend.beeznez.fr/api
ENV VITE_PAYPAL_CLIENT_ID=AZtP9UjVyhzLQJ1Up_sqkU6MUhu-0cYtV3ixJODmRDp1FlyZZl7XDpTvRjNIQYAoxVGB_bFLzTiw1iDK
RUN pnpm run build

# Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
# Supprimer les fichiers par défaut de Nginx
RUN rm -rf ./*
# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist .
# Copier un fichier de configuration Nginx personnalisé, si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exposer le port 80
EXPOSE 80
# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

# FROM node:20
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN npm install -g pnpm && pnpm install
# COPY . .
# EXPOSE 3000
# CMD [ "pnpm", "run", "dev", "--host" ]