#!/bin/sh

# Espera o banco de dados estar pronto
echo "Aguardando banco de dados..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Banco de dados pronto!"

# Executa as migrações
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Inicia a aplicação
echo "Iniciando aplicação..."
exec "$@" 