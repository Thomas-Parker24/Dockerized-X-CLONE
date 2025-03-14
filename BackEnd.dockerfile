FROM node:alpine
WORKDIR /X-CLONE-
COPY ./X-CLONE- .
RUN npm install
EXPOSE 1234
CMD ["npm", "start"]