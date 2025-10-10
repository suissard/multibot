FROM node:22.19.0

ENV TZ="Europe/Paris"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "main.js"]
