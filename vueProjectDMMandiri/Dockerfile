FROM node:16.13-alpine
WORKDIR /app
COPY package.json ./
EXPOSE 8090
RUN npm install --save redux
RUN npm i
COPY . .
CMD ["npm", "run", "serve"]