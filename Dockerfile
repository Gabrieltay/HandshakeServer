FROM node:alpine

EXPOSE 8080

WORKDIR /usr/src/app

# Create app directory
RUN mkdir -p /usr/src/app

# Install app dependencies
COPY package.json package.json

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]