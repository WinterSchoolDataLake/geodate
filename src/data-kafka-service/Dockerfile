FROM node:10.16-alpine as dependencies

ENV APP_HOME=/app

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY ./package.json ${APP_HOME}
RUN mkdir -p src

COPY index.js ${APP_HOME}
COPY src ${APP_HOME}/src

RUN npm i
RUN npm install kafka-node --no-optional

ENTRYPOINT ["node", "index.js"]