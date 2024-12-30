FROM node:20 AS dev
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]

FROM node:20 AS prod
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]