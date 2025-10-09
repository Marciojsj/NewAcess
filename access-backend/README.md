# Access Control System - Backend API

Backend API desenvolvida com Node.js, Express, TypeScript, Prisma e Supabase PostgreSQL.

## �� Tecnologias

- **Node.js 20+**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **Supabase PostgreSQL**
- **JWT Authentication**
- **Zod Validation**
- **Winston Logger**
- **Jest Testing**

## 📋 Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn
- Conta no Supabase
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
cd access-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (.env já criado):
```bash
# Já configurado com suas credenciais do Supabase
# Você precisa adicionar a senha do banco no DATABASE_URL
# E adicionar o SUPABASE_SERVICE_KEY
```

4. Gere o Prisma Client:
```bash
npm run prisma:generate
```

5. Execute as migrações:
```bash
npm run prisma:migrate
```

6. Popule o banco com dados iniciais:
```bash
npm run prisma:seed
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Prisma Studio (Visualizar banco)
```bash
npm run prisma:studio
```

## 📚 Estrutura do Projeto

```
access-backend/
├── src/
│   ├── config/          # Configurações (env, database, supabase)
│   ├── controllers/     # Controladores das rotas
│   ├── middlewares/     # Middlewares (auth, permissions, validation)
│   ├── routes/          # Definição de rotas
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários (jwt, password, logger)
│   ├── validators/      # Schemas Zod
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Inicialização do servidor
├── prisma/
│   ├── schema.prisma    # Schema do banco de dados
│   └── seed.ts          # Dados iniciais
├── .env                 # Variáveis de ambiente
├── tsconfig.json        # Configuração TypeScript
└── package.json         # Dependências

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

### Login
```bash
POST /api/auth/login
{
  "email": "admin@exemplo.com",
  "password": "admin123"
}
```

### Usando o token
```bash
Authorization: Bearer <seu_token_aqui>
```

## 👥 Níveis de Permissão

1. **SUPERADMIN** - Acesso total ao sistema
2. **ADMIN** - Gerenciamento de entidade
3. **OPERATOR** - Registro de entrada/saída
4. **USER** - Acesso limitado
5. **VISITOR** - Somente leitura

## 📡 Endpoints

### Auth
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário logado

### Users
- `GET /api/users` - Listar usuários (ADMIN+)
- `GET /api/users/:id` - Buscar usuário (OPERATOR+)
- `POST /api/users` - Criar usuário (ADMIN+)
- `PUT /api/users/:id` - Atualizar usuário (ADMIN+)
- `DELETE /api/users/:id` - Deletar usuário (ADMIN+)

### Entities
- `GET /api/entities` - Listar entidades (OPERATOR+)
- `GET /api/entities/:id` - Buscar entidade (OPERATOR+)
- `POST /api/entities` - Criar entidade (SUPERADMIN)
- `PUT /api/entities/:id` - Atualizar entidade (ADMIN+)
- `DELETE /api/entities/:id` - Deletar entidade (SUPERADMIN)

### Visitors
- `GET /api/visitors` - Listar visitantes (OPERATOR+)
- `GET /api/visitors/:id` - Buscar visitante (OPERATOR+)
- `POST /api/visitors` - Criar visitante (OPERATOR+)
- `PUT /api/visitors/:id` - Atualizar visitante (OPERATOR+)
- `DELETE /api/visitors/:id` - Deletar visitante (ADMIN+)
- `POST /api/visitors/:id/regenerate-qrcode` - Regenerar QR Code

### Access
- `POST /api/access/entry` - Registrar entrada (OPERATOR+)
- `POST /api/access/exit` - Registrar saída (OPERATOR+)
- `GET /api/access/logs` - Listar registros (OPERATOR+)
- `GET /api/access/report` - Relatório de acessos (ADMIN+)

### Health
- `GET /api/health` - Status da API

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar com watch mode
npm run test:watch

# Cobertura de código
npm run test:coverage
```

## 🗃️ Banco de Dados

O projeto usa Prisma ORM com PostgreSQL (Supabase).

### Modelos principais:
- **User** - Usuários do sistema
- **Entity** - Entidades (empresas, condomínios, etc)
- **Visitor** - Visitantes
- **AccessLog** - Registro de entrada/saída
- **RefreshToken** - Tokens de refresh
- **SystemConfig** - Configurações do sistema

### Comandos úteis:
```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar migração
npm run prisma:migrate

# Aplicar migrações (produção)
npm run prisma:migrate:prod

# Resetar banco (CUIDADO!)
npm run prisma:reset

# Abrir Prisma Studio
npm run prisma:studio
```

## 🔒 Segurança

- Helmet para headers de segurança
- CORS configurado
- Rate limiting
- Validação de dados com Zod
- Senhas com bcrypt (10 rounds)
- JWT com expiração
- Refresh tokens

## 📝 Credenciais Iniciais

Após executar o seed:

- **SUPERADMIN**: admin@exemplo.com / admin123
- **ADMIN**: admin.entidade@exemplo.com / admin123
- **OPERATOR**: operador@exemplo.com / operator123

⚠️ **IMPORTANTE**: Altere essas senhas em produção!

## 🚀 Deploy

1. Configure as variáveis de ambiente no servidor
2. Execute as migrações: `npm run prisma:migrate:prod`
3. Faça o build: `npm run build`
4. Inicie: `npm start`

## 📄 Licença

MIT
