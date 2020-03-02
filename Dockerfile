FROM node:12.16.1-stretch


RUN mkdir /app
WORKDIR /app
COPY . /app
RUN yarn
CMD yarn start