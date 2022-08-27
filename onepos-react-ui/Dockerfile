# nodejs 설치하기
FROM node:16.15.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
# RUN npm install --legacy-peer-deps

#FROM node:latest
#WORKDIR /app
#COPY --from=0 /app/ .
COPY ./ .
EXPOSE 3000
COPY .env-dev .env
RUN npm run build

FROM nginx:1.19
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
