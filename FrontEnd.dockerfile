FROM node:alpine AS build
WORKDIR /app
COPY ./x-clone-frontend/package*.json ./
RUN npm install
COPY ./x-clone-frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
