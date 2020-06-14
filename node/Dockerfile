FROM node:alpine3.12

WORKDIR /app

COPY package.json ./

RUN npm install -D

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]