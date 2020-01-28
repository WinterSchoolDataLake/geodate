FROM node:10.16-alpine as dependencies

ENV APP_HOME=/app

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY package.json .
COPY src ./

RUN npm i

ENTRYPOINT node index.js