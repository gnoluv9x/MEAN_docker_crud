FROM node:16.20-alpine

WORKDIR /Backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 7001