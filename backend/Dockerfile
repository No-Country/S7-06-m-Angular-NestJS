FROM node:18-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install --only=development
RUN npm ci --omit=dev

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
