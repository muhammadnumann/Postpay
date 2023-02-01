FROM node:16-alpine3.14 AS build

ENV NPM_CONFIG_LOGLEVEL notice

WORKDIR /build
ADD package*.json ./
ADD yarn.* ./
RUN yarn

ADD . .
RUN yarn run build


FROM node:16-alpine3.14
WORKDIR /app
COPY --from=postpay/dashboard:build /build .

CMD ["yarn", "start"]
