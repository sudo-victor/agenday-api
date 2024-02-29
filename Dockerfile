FROM node:20-alpine

WORKDIR /usr/src/api

RUN apk add --no-cache libc6-compat openssl-dev

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]