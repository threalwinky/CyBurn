FROM nginx:stable-alpine AS production

WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
