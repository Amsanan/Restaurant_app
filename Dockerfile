FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install

FROM base AS build
COPY . .
RUN pnpm -r build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --prod --filter @restaurant/server...
COPY --from=build /app/apps/server /app/apps/server
COPY --from=build /app/apps/web/dist /app/apps/web/dist
WORKDIR /app/apps/server
EXPOSE 3000
CMD ["pnpm", "start"]
