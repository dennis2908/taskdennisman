FROM node:16.1.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --save redux
RUN npm i
EXPOSE 8090
COPY . .
CMD ["npm", "run", "serve"]