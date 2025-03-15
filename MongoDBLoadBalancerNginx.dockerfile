FROM nginx:alpine
COPY MongoDBNginx.conf /etc/nginx/nginx.conf
EXPOSE 27017
CMD ["nginx", "-g", "daemon off;"]