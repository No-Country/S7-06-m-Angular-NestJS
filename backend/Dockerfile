FROM node:18-alpine3.15 AS build

WORKDIR /usr/src/app

COPY package.json ./

# RUN npm install --only=development
RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
