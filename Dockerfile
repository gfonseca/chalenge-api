FROM node:12.16.1-stretch

WORKDIR /app

COPY package.json .
RUN yarn install
CMD yarn dev
CMD yarn seed