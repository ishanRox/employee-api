FROM node:14.17.0-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14.17.0-alpine as production

ARG NODE_ENV=production
ARG PORT=3000
ARG MONGODB_PATH='mongodb://localhost/employee-db'
ARG MAX_FILE_SIZE=5000000
ARG DESTINATION_CSV='./upload/csv'
ARG DESTINATION_PROFILE_PIC='./upload/profile-pic'

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]