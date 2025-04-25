# Development image
FROM node:18 as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production build image
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

# Production image
FROM node:18 as production

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

COPY package*.json ./

CMD [ "node", "dist/main.js" ]
