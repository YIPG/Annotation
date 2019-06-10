FROM node:10.16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "build"]