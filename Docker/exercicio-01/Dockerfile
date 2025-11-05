# imagem base leve
FROM node:18-alpine

# diretório do trabalho
WORKDIR /usr/src/app

# copiar os arquivos de dependência
COPY package*.json ./

# instalar dependências
RUN npm install

# copiar o restante
COPY . .

# expor porta
EXPOSE 3000

# comando para iniciar aplicação
CMD ["node", "app/server.js"]