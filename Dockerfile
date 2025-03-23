FROM node:21 as builder
WORKDIR /app
COPY . .
RUN npm install @angular/cli -g
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/parthos-web/browser usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
