FROM node:22-slim

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000
CMD ["node", "dist/src/server.js"]