# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.16.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.25.1
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
#CMD ["/bin/sh",  "-c",  "apt-get update && \
#      apt-get -y install gettext-base && \
#      apt-get clean && \
#      envsubst < env.template.js > env.js && \
#      exec nginx -g 'daemon off;'"]

WORKDIR /start
COPY ./start-app.sh .
CMD [ "sh", "start-app.sh" ]
