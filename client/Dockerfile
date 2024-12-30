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
