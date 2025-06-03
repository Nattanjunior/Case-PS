#!/bin/sh

echo "Aguardando banco de dados..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Banco de dados pronto!"


echo "Executando migrações do Prisma..."
npx prisma migrate deploy

echo "Executando seed do Prisma..."
npx prisma db seed || true 

# Inicia a aplicação
echo "Iniciando aplicação..."
exec "$@" 