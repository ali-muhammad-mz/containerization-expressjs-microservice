FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# server.js is inside src/
CMD ["node", "src/server.js"]
