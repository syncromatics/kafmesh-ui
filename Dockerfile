FROM node:12-alpine as base
WORKDIR /build
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY ./ ./

FROM base AS build-kafmesh-ui
RUN yarn build

FROM node:14.2.0-buster AS final-kafmesh-ui
WORKDIR /app
EXPOSE 80

COPY --from=build-kafmesh-ui /build/dist/ ./

CMD ["node", "/app/server.js"]