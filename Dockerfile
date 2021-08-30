FROM node:12 as build
RUN git clone --depth 1 https://github.com/izderadicka/angular-tutorial-heroes.git
RUN cd angular-tutorial-heroes && \
    npm install && \
    npm run build
FROM nginx:1.21-alpine
COPY --from=build angular-tutorial-heroes/dist/* /usr/share/nginx/html/
