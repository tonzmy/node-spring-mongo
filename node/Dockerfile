FROM node:12.19.0-alpine3.10

# ENV NODE_VERSION 12.19.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]