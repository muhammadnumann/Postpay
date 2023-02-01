FROM node:12.22-alpine3.12 AS build

# Install python
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python2 \
    make \
    g++ \
    bash

ENV NPM_CONFIG_LOGLEVEL notice

WORKDIR /build
ADD package*.json ./
RUN yarn

ADD . .
ARG NODE_ENV
ENV ENV=$NODE_ENV
RUN yarn run build


FROM node:12.22-alpine3.12
WORKDIR /app
COPY --from=postpay/landing:build /build .

CMD ["yarn", "start"]
