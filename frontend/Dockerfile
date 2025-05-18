# Build BASE
FROM node:20-alpine AS base
LABEL author="winky"
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:20-alpine AS build
LABEL author="winky"
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
    && yarn build \
    && cd .next/standalone \
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && apk del curl \
    && node-prune

# Production Image
FROM node:20-alpine AS production
LABEL author="winky"
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/next.config.ts ./ 
EXPOSE 3000
CMD ["node", "server.js"]
