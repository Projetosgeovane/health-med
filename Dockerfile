# Use uma imagem base oficial do Node.js
FROM node:18.20.2

# Defina o diretório de trabalho na imagem Docker
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Regenerate o Prisma Client
RUN npx prisma generate

# Compile a aplicação NestJS
RUN npm run build

# Listar arquivos no diretório de trabalho para depuração
RUN ls -la /usr/src/app
RUN ls -la /usr/src/app/dist
RUN ls -la /usr/src/app/dist/src

# Especifique a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/src/main.js"]
