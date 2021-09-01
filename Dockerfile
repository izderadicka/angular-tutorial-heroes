FROM node:12 as build
COPY . /angular-tutorial-heroes/
RUN cd angular-tutorial-heroes && \
    npm install && \
    npm run build
FROM nginxinc/nginx-unprivileged:stable
COPY --from=build angular-tutorial-heroes/dist/* /usr/share/nginx/html/
COPY data/default.conf /etc/nginx/conf.d/default.conf
