#!/bin/sh

# Espera o banco de dados estar pronto
echo "Aguardando banco de dados..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Banco de dados pronto!"

# Executa as migrações e gera o cliente Prisma
echo "Executando migrações e gerando cliente Prisma..."
npx prisma migrate deploy --preview-feature --force-generate --skip-seed

# Executa o seed (se houver)
echo "Executando seed do Prisma..."
npx prisma db seed || true # Use || true para não falhar se o seed não existir ou der erro não crítico

# Inicia a aplicação
echo "Iniciando aplicação..."
exec "$@" 