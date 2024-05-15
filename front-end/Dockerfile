# Étape de construction
FROM node:14 as build

WORKDIR /frontend

COPY package*.json ./
RUN npm install
RUN npm install serve

COPY . .
RUN npm run build

# Étape de production
FROM node:14-alpine

WORKDIR /app

COPY --from=build /frontend/build /app
COPY --from=build /frontend/node_modules /app/node_modules

CMD ["./node_modules/.bin/serve", "-s", "."]