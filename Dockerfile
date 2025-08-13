FROM node:16.14.2

ENV TZ="Europe/Paris"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "main.js"]
