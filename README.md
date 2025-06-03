# Sistema de Gerenciamento de Investimentos

Sistema para gerenciamento de clientes e ativos financeiros, desenvolvido com Next.js, Fastify, Prisma e PostgreSQL.

## 🚀 Tecnologias

### Backend
- Node.js
- Fastify
- Prisma ORM
- PostgreSQL
- TypeScript
- Zod (validação)

### Frontend
- Next.js 14
- React Query
- Axios
- ShadCN/UI
- Tailwind CSS
- TypeScript
- React Hook Form + Zod

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js 18+
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
cd Case-PS
```

### 2. Configuração do Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

Edite o arquivo `.env` com as seguintes variáveis:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/investment_db?schema=public"
PORT=3001
```

### 3. Configuração do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

**Importante:** Certifique-se que o arquivo `.env` do frontend aponta para a porta correta do backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Executando com Docker

```bash
# Na pasta backend
docker-compose up -d
```

Isso irá:
- Iniciar o PostgreSQL na porta 5432
- Iniciar o backend na porta 3001
- Aplicar as migrações do Prisma automaticamente

Para verificar se o backend está rodando corretamente:
```bash
# Verificar logs do backend
docker-compose logs -f backend

# Verificar se a API está respondendo
curl http://localhost:3001/clients
```

Após subir os containers, se houver um script de seed para popular o banco, execute:
```bash
docker-compose exec backend npx prisma db seed
```

### 5. Executando o Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

### 6. Executando o Backend Localmente (Alternativa)

```bash
cd backend

# Instalar dependências (se não fez antes)
npm install

# Rodar migrações do Prisma
npx prisma migrate deploy

# Gerar cliente Prisma
npx prisma generate

# Rodar seed (se existir script)
npx prisma db seed

# Iniciar o servidor
npm run dev
```

### 7. Verificando se tudo está funcionando

1. Backend:
   - Acesse http://localhost:3001/clients
   - Deve retornar uma lista (vazia inicialmente) de clientes

2. Frontend:
   - Acesse http://localhost:3000
   - Deve mostrar a interface do sistema
   - Tente criar um novo cliente para testar

### 8. Solução de Problemas

Se encontrar problemas:

1. Backend não inicia:
   ```bash
   # Verificar logs
   docker-compose logs backend
   
   # Reiniciar containers
   docker-compose down
   docker-compose up -d
   ```

2. Frontend não conecta ao backend:
   - Verifique se o backend está rodando
   - Confirme se a URL no .env do frontend está correta
   - Verifique se não há bloqueio de CORS

3. Banco de dados:
   ```bash
   # Verificar status do banco
   docker-compose ps db
   
   # Verificar logs do banco
   docker-compose logs db
   ```

## 📚 Documentação da API

### Clientes

#### Listar Clientes
```http
GET /clients
```
**Resposta:**
```json
[
  {
    "id": "uuid",
    "name": "Nome do Cliente",
    "email": "cliente@email.com",
    "status": "ACTIVE",
    "createdAt": "2024-03-20T00:00:00.000Z",
    "updatedAt": "2024-03-20T00:00:00.000Z"
  }
]
```

#### Criar Cliente
```http
POST /clients
```
**Body:**
```json
{
  "name": "Nome do Cliente",
  "email": "cliente@email.com",
  "status": "ACTIVE"
}
```

#### Atualizar Cliente
```http
PUT /clients/:id
```
**Body:**
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "status": "INACTIVE"
}
```

#### Excluir Cliente
```http
DELETE /clients/:id
```

### Ativos

#### Listar Ativos
```http
GET /assets
```
**Resposta:**
```json
[
  {
    "id": "uuid",
    "name": "Nome do Ativo",
    "value": 100.50,
    "createdAt": "2024-03-20T00:00:00.000Z",
    "updatedAt": "2024-03-20T00:00:00.000Z"
  }
]
```

### Alocações

#### Listar Alocações por Cliente
```http
GET /clients/:clientId/allocations
```
**Resposta:**
```json
[
  {
    "id": "uuid",
    "clientId": "uuid",
    "assetId": "uuid",
    "quantidade": 10,
    "valorInvestido": 1005.00,
    "asset": {
      "id": "uuid",
      "name": "Nome do Ativo",
      "value": 100.50
    }
  }
]
```

#### Criar Alocação
```http
POST /clients/:clientId/allocations
```
**Body:**
```json
{
  "assetId": "uuid",
  "quantidade": 10
}
```

#### Excluir Alocação
```http
DELETE /clients/:clientId/allocations/:allocationId
```

## 🎯 Funcionalidades

### Clientes
- Cadastro de clientes com nome, email e status
- Listagem de todos os clientes
- Edição de informações do cliente
- Exclusão de clientes (com validação de alocações)
- Visualização de status (ativo/inativo)

### Ativos
- Listagem de ativos financeiros
- Visualização de valores atuais
- Interface somente leitura

### Alocações
- Alocação de ativos para clientes
- Cálculo automático de valores investidos
- Visualização de alocações por cliente
- Exclusão de alocações
- Dashboard com totais investidos

## 🛠️ Estrutura do Projeto

### Backend
```
backend/
├── src/
│   ├── controllers/    # Controladores da API
│   ├── routes/         # Definição de rotas
│   ├── services/       # Lógica de negócio
│   ├── dtos/          # Tipos e validações
│   └── lib/           # Utilitários
├── prisma/
│   └── schema.prisma  # Modelos do banco
└── docker-compose.yml # Configuração Docker
```

### Frontend
```
frontend/
├── src/
│   ├── app/           # Páginas Next.js
│   ├── components/    # Componentes React
│   ├── services/      # Serviços de API
│   ├── lib/          # Utilitários
│   └── types/        # Definições de tipos
└── public/           # Arquivos estáticos
```

## 🔐 Validações

- Email único por cliente
- Validação de formato de email
- Validação de quantidade em alocações
- Proteção contra exclusão de clientes com alocações
- Validação de status do cliente

## 🎨 Interface

- Design moderno com ShadCN/UI
- Tema claro/escuro
- Feedback visual com toasts
- Modais de confirmação
- Tabelas responsivas
- Cards informativos

## 🐛 Debug

Para debugar o backend:
```bash
cd backend
npm run dev:debug
```

Para debugar o frontend:
```bash
cd frontend
npm run dev:debug
```

## 📝 Notas

- O sistema usa PostgreSQL como banco de dados
- Todas as operações são validadas com Zod
- O frontend usa React Query para cache e revalidação
- As requisições são feitas com Axios
- A interface é construída com ShadCN/UI e Tailwind CSS

--- 