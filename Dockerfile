FROM node:10 as build
EXPOSE 3000

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN npm run-script build

ENTRYPOINT [ "node", "lib/cli.js" ]