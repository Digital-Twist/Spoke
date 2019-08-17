# Use latest LTS
FROM node:8.10.0-alpine

WORKDIR /usr/Spoke

# Install Git
RUN apk update && \
  apk upgrade && \
  apk add git

# Cache dependencies
COPY package.json .
RUN yarn install

# Configure build environment
ARG PHONE_NUMBER_COUNTRY=US
ARG COMMITHASH=""
ENV NODE_ENV="production" \
  PORT=3000 \
  OUTPUT_DIR="./build" \
  PUBLIC_DIR="./build/client" \
  ASSETS_DIR="./build/client/assets" \
  ASSETS_MAP_FILE="assets.json" \
  PHONE_NUMBER_COUNTRY=$PHONE_NUMBER_COUNTRY \
  COMMITHASH=$COMMITHASH

# Copy application codebase
COPY . .
RUN yarn run prod-build

# Run the production compiled code
EXPOSE 3000
CMD [ "yarn", "run", "start" ]
