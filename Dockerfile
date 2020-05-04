FROM node:12-alpine as base
WORKDIR /build
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY ./ ./

FROM base AS build-kafmesh-ui
RUN yarn build

FROM httpd:2-alpine AS final-kafmesh-ui
EXPOSE 80
COPY --from=build-kafmesh-ui /build/ /usr/local/apache2/htdocs
# Force e-tag checks.
RUN echo 'Header set Cache-Control "max-age=0, no-cache, must-revalidate"' >> /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/CustomLog/#CustomLog/g' /usr/local/apache2/conf/httpd.conf
RUN echo 'TraceEnable Off' >> /usr/local/apache2/conf/httpd.conf
