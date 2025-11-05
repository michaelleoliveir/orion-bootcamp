# imagem base leve
FROM node:18-alpine

# diretório de trabalho
WORKDIR /usr/src/app

# copiar dependências
COPY package*.json ./
RUN npm install --production

# expor porta
EXPOSE 3000

# comando para rodar a aplicação
CMD ["node", "src/index.js"]
