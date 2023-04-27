FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --omit dev
COPY . /app
RUN npm run build
FROM nginx
COPY --from=build /app/dist /var/www/html