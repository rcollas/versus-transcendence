FROM node:19.0.1-alpine3.15 as development

WORKDIR /usr/src/app

COPY --chown=node:node ./package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY --chown=node:node ./.env ./.env

RUN npm run build

RUN mkdir -p /usr/src/app/node_modules/.vite \
    && chown -R node:node /usr/src/app/node_modules/.vite

# USER node

FROM node:19.0.1-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --chown=node:node ./package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --chown=node:node --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]