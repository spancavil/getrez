
FROM node:alpine As development
# First stage run build in development
# Workdir in the container
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

# add .dockerignore at root and ignore node_modules
COPY . . 

RUN pnpm run build

# Second stage copy the built project in the previous stage to this environment and run
FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

# --prod won't install devDependencies
RUN pnpm install --prod 

COPY --from=development /usr/src/app/dist ./dist

# Run server
CMD [ "node", "dist/apps/reservations/main" ]


