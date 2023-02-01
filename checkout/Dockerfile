FROM node:14.15.4-alpine AS build

ENV NPM_CONFIG_LOGLEVEL notice

WORKDIR /build
ADD package*.json ./
ADD yarn.* ./
RUN yarn

ADD . .
RUN yarn run build:static


FROM node:14.15.4-alpine
WORKDIR /app
COPY --from=postpay/checkout:build /build .

CMD ["yarn", "start"]
