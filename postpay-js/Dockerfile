FROM node:14.15.4-alpine AS build

ENV NPM_CONFIG_LOGLEVEL notice

RUN apk add --no-cache python

WORKDIR /build
ADD package*.json ./
RUN yarn

ADD . .
RUN yarn run build


FROM node:14.15.4-alpine
WORKDIR /app
COPY --from=postpay/js:build /build .

CMD ["yarn", "run", "dev"]
