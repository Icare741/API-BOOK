# Étape de build
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

# Installer les dépendances, y compris les outils de build
RUN apt-get update && apt-get install -y python3 make g++

# Installer les dépendances npm
RUN npm ci

COPY . .

RUN npm run build

# Étape de production
FROM node:18-alpine

WORKDIR /usr/src/app

# Installer les dépendances nécessaires pour bcrypt
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]