FROM node:alpine3.12

WORKDIR /app

COPY package.json ./

RUN npm install -D

COPY . .

ENTRYPOINT ["npm", "start"]