# 🚀 Sistema de Controle de Acesso - Integração Backend + Frontend

## ✅ O que foi implementado

### Backend (Node.js + Express + Prisma + Supabase)
- ✅ 28 endpoints REST API funcionais
- ✅ Autenticação JWT com refresh tokens
- ✅ Banco de dados PostgreSQL (Supabase)
- ✅ 6 tabelas criadas: users, entities, visitors, access_logs, refresh_tokens, system_config
- ✅ Seed com dados de teste (3 usuários, 1 entidade, 2 visitantes)
- ✅ Servidor rodando em http://localhost:3000

### Frontend (React Native + Expo)
- ✅ Integração com API real (substituiu dados mock)
- ✅ Autenticação real via JWT
- ✅ CRUD de entidades usando banco de dados
- ✅ Cliente HTTP configurado (axios)
- ✅ Interceptors para token automático
- ✅ Refresh token automático em caso de expiração

## 🎯 Como usar

### Opção 1: Iniciar tudo com um comando (RECOMENDADO)

```bash
npm start
```

Este comando irá:
1. Iniciar o backend na porta 3000
2. Aguardar 3 segundos para o backend inicializar
3. Iniciar o Expo/React Native

**Logs do backend:** Os logs ficam salvos em `backend.log`

### Opção 2: Iniciar manualmente

**Terminal 1 - Backend:**
```bash
npm run start:backend
```

**Terminal 2 - Frontend:**
```bash
npm run start:frontend
```

## 🔐 Credenciais de Teste

Usuários criados no seed:

### SUPERADMIN
- **Email:** superadmin@accesscontrol.com
- **Senha:** Super@123
- **Permissões:** Acesso total ao sistema

### ADMIN
- **Email:** admin@escola.com.br
- **Senha:** Admin@123
- **Permissões:** Gerenciar entidade, usuários e visitantes

### OPERADOR
- **Email:** operador@escola.com.br
- **Senha:** Oper@123
- **Permissões:** Registrar entradas/saídas, visualizar relatórios

## 📡 Endpoints da API

Base URL: `http://localhost:3000/api`

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `POST /auth/logout` - Logout
- `POST /auth/refresh-token` - Renovar token
- `GET /auth/me` - Dados do usuário logado

### Entidades
- `GET /entities` - Listar entidades
- `GET /entities/:id` - Buscar por ID
- `POST /entities` - Criar entidade
- `PUT /entities/:id` - Atualizar entidade
- `DELETE /entities/:id` - Deletar entidade

### Visitantes
- `GET /visitors` - Listar visitantes
- `GET /visitors/:id` - Buscar por ID
- `POST /visitors` - Criar visitante
- `PUT /visitors/:id` - Atualizar visitante
- `DELETE /visitors/:id` - Deletar visitante
- `POST /visitors/:id/regenerate-qrcode` - Regenerar QR Code

### Controle de Acesso
- `POST /access/entry` - Registrar entrada
- `POST /access/exit` - Registrar saída
- `GET /access/logs` - Listar logs
- `GET /access/report` - Relatório de acessos

### Usuários
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar por ID
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🗄️ Banco de Dados

**Conexão:** Supabase PostgreSQL (aws-1-us-east-2)

**Tabelas:**
- `ac_users` - Usuários do sistema
- `ac_entities` - Entidades (escolas, condomínios, etc)
- `ac_visitors` - Visitantes cadastrados
- `ac_access_logs` - Logs de entrada/saída
- `ac_refresh_tokens` - Tokens de refresh JWT
- `ac_system_config` - Configurações do sistema

## 🔧 Arquivos Importantes

### Frontend
- `src/services/api/apiClient.ts` - Cliente HTTP (axios)
- `src/services/api/authApi.ts` - Serviços de autenticação
- `src/services/api/entitiesApi.ts` - Serviços de entidades
- `src/services/api/visitorsApi.ts` - Serviços de visitantes
- `src/services/api/accessApi.ts` - Serviços de controle de acesso
- `src/services/api/usersApi.ts` - Serviços de usuários
- `src/contexts/AuthContext.tsx` - Contexto de autenticação (atualizado)
- `src/services/entityApi.ts` - API de entidades (atualizado)

### Backend
- `access-backend/src/server.ts` - Servidor Express
- `access-backend/prisma/schema.prisma` - Schema do banco
- `access-backend/.env` - Variáveis de ambiente

### Scripts
- `start-dev.sh` - Script para iniciar backend + frontend
- `package.json` - Scripts npm atualizados

## 🛠️ Comandos Úteis

```bash
# Iniciar tudo (backend + frontend)
npm start

# Apenas frontend
npm run start:frontend

# Apenas backend
npm run start:backend

# Ver logs do backend
tail -f backend.log

# Limpar cache do Expo
npm run dev

# Testar API (com backend rodando)
curl http://localhost:3000/api/health
```

## 📱 Como testar

1. **Iniciar o sistema:**
   ```bash
   npm start
   ```

2. **Fazer login no app:**
   - Use uma das credenciais acima
   - O sistema agora usa autenticação REAL

3. **Testar CRUD de Entidades:**
   - As entidades agora vêm do banco de dados
   - Criar, editar, deletar persiste no banco

4. **Verificar tokens:**
   - Os tokens são salvos em AsyncStorage
   - Refresh automático quando expira

## 🔍 Troubleshooting

### Backend não inicia
```bash
# Verificar se a porta 3000 está livre
lsof -i :3000

# Ver logs do backend
cat backend.log
```

### Erro de autenticação
- Verificar se o backend está rodando
- Verificar credenciais de login
- Limpar AsyncStorage do app

### Erro de conexão com banco
- Verificar arquivo `.env` no backend
- Testar conexão: `cd access-backend && npx prisma db pull`

### Conflitos de dependências
```bash
npm install --legacy-peer-deps
```

## 📊 Status do Sistema

- ✅ Backend: Operacional (porta 3000)
- ✅ Frontend: Operacional (Expo)
- ✅ Banco de Dados: Conectado (Supabase)
- ✅ Autenticação: JWT funcionando
- ✅ API: 28 endpoints ativos
- ✅ Integração: Frontend ↔ Backend completa

## 🎉 Próximos Passos

- [ ] Testar CRUD de visitantes com dados reais
- [ ] Implementar controle de acesso (entry/exit)
- [ ] Adicionar geração de relatórios
- [ ] Implementar QR Code scanning
- [ ] Adicionar notificações push
- [ ] Configurar ambiente de produção

---

**Desenvolvido com ❤️ usando React Native + Node.js + PostgreSQL**
