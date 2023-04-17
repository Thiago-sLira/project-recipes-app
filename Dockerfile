FROM node:16.19.1-alpine3.17

EXPOSE 3001

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]