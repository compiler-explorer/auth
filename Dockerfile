# Build environment
FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json .
COPY src src
RUN npm run build

# Run environment
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
COPY --from=builder /usr/src/app/out/lib .

EXPOSE 3000

ENV NODE_ENV=production
CMD [ "node", "server.js" ]
