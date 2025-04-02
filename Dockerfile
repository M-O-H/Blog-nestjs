FROM node:22

WORKDIR /Blog-nestjs

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["sh", "-c", "npm run generate && npm run migrate && npm run start:dev"]
