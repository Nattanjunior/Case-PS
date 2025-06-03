FROM node:20-alpine

WORKDIR /app

# Instala o netcat para o script de inicialização
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Garante que o script tenha permissão de execução
RUN chmod +x docker-entrypoint.sh && \
    cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

RUN npx prisma generate

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"] 