# 📘 GUIA DE COMANDOS - Backend e Frontend

## ⚠️ IMPORTANTE: Diferença entre npm start e npm run dev

### 🔧 Modo Desenvolvimento (USE ESTE)

```bash
# BACKEND - Modo desenvolvimento (recarrega automático)
cd access-backend
npm run dev
```

**O que faz:**
- ✅ Executa TypeScript diretamente (sem compilar)
- ✅ Recarrega automático quando você edita código
- ✅ Ideal para desenvolvimento
- ✅ **USE SEMPRE ESTE COMANDO**

---

### 🚀 Modo Produção (NÃO USE EM DESENVOLVIMENTO)

```bash
# BACKEND - Modo produção
cd access-backend
npm run build    # Compila TypeScript para JavaScript
npm start        # Executa o código compilado
```

**O que faz:**
- Compila todo o código TypeScript para JavaScript
- Cria pasta `dist/` com código compilado
- Executa o código JavaScript compilado
- **Mais rápido**, mas não recarrega automático

**⚠️ Você recebeu erro porque tentou usar `npm start` sem compilar antes!**

---

## 🎯 COMANDOS CORRETOS PARA USAR

### 1️⃣ Iniciar Backend (Desenvolvimento)

```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl/access-backend
npm run dev
```

**Você verá:**
```
✅ Conectado ao banco de dados
🚀 Servidor rodando na porta 3000
📝 Ambiente: development
🔗 API: http://localhost:3000/api
```

---

### 2️⃣ Iniciar Frontend

```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
npm start
```

ou

```bash
npx expo start
```

---

### 3️⃣ Iniciar TUDO com um comando (Recomendado)

```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
bash start-dev.sh
```

Este script inicia:
1. Backend em background
2. Frontend no terminal atual

---

## 📋 Outros Comandos Úteis do Backend

### Banco de Dados

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Criar seed (popular banco com dados de teste)
npm run prisma:seed

# Abrir Prisma Studio (interface visual do banco)
npm run prisma:studio

# Criar nova migration
npm run prisma:migrate

# Resetar banco (CUIDADO: apaga tudo!)
npm run prisma:reset
```

### Testes

```bash
# Rodar testes
npm test

# Rodar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Qualidade de Código

```bash
# Verificar erros de lint
npm run lint

# Formatar código
npm run format
```

---

## ✅ STATUS ATUAL

### Backend ✅
- **Rodando em:** http://localhost:3000
- **Comando usado:** `npm run dev`
- **Status:** Conectado ao banco de dados
- **CORS:** Configurado para aceitar localhost:8082

### Frontend
- **Porta:** http://localhost:8081 ou 8082
- **Comando:** `npm start` ou `npx expo start`

---

## 🔍 Verificar se Backend está Rodando

```bash
# Método 1: Testar endpoint de health
curl http://localhost:3000/api/health

# Método 2: Ver processos Node
ps aux | grep ts-node-dev

# Método 3: Ver o que está na porta 3000
lsof -i :3000
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module dist/server.js"
**Solução:** Use `npm run dev` em vez de `npm start`

### Erro: "Port 3000 already in use"
**Solução:**
```bash
# Matar processo na porta 3000
pkill -f ts-node-dev
# ou
lsof -ti:3000 | xargs kill -9
```

### Erro: "Module not found"
**Solução:**
```bash
# Reinstalar dependências
cd access-backend
rm -rf node_modules
npm install
```

---

## 📝 Resumo Rápido

| Tarefa | Comando |
|--------|---------|
| **Iniciar backend (dev)** | `cd access-backend && npm run dev` |
| **Iniciar frontend** | `npm start` |
| **Iniciar tudo** | `bash start-dev.sh` |
| **Seed do banco** | `cd access-backend && npm run prisma:seed` |
| **Ver banco visualmente** | `cd access-backend && npm run prisma:studio` |
| **Parar backend** | `Ctrl + C` ou `pkill -f ts-node-dev` |

---

## ✅ BACKEND ESTÁ RODANDO AGORA!

Use estas credenciais para testar o login:

| Email | Senha | Tipo |
|-------|-------|------|
| `admin@exemplo.com` | `admin123` | SUPERADMIN |
| `admin.entidade@exemplo.com` | `admin123` | ADMIN |
| `operador@exemplo.com` | `operator123` | OPERATOR |

---

**🎉 TUDO FUNCIONANDO! Agora você pode fazer login no app!**
