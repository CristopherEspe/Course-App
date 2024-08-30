FROM node:alpine
WORKDIR /app
COPY . /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
CMD [ -d "node_modules" ] && npm run start -- --host 0.0.0.0 --port 80 || npm ci && npm run start -- --host 0.0.0.0 --port 80
