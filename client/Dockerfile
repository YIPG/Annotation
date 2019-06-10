FROM node:alpine as bundler
WORKDIR "/app"
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=bundler /app/build /usr/share/nginx/html