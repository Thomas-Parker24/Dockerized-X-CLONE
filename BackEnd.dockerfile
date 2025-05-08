FROM node:20-alpine
WORKDIR /X-CLONE-
COPY ./X-CLONE- .
RUN npm install
EXPOSE 80
CMD ["npm", "run", "dev"]