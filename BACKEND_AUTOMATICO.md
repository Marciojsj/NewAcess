# 🚀 Sistema de Inicialização Automática - Backend + Frontend

## 📋 Visão Geral

O sistema agora **sempre inicia o backend automaticamente** junto com o frontend, independente do comando usado. Isso garante que:

- ✅ Backend está sempre disponível quando o frontend roda
- ✅ Testes de integração funcionam sem configuração manual
- ✅ Não precisa lembrar de iniciar o backend em outro terminal
- ✅ Logs de ambos aparecem no mesmo terminal (coloridos)

---

## 🎯 Comandos Atualizados

### Desenvolvimento Normal

```bash
# Inicia BACKEND + FRONTEND juntos (modo tunnel)
npm start

# Inicia BACKEND + FRONTEND (modo desenvolvimento)
npm run dev

# Inicia BACKEND + FRONTEND (modo local)
npm run start:local

# Inicia BACKEND + FRONTEND (modo LAN)
npm run start:lan
```

### Plataformas Específicas

```bash
# Android (com backend)
npm run android

# iOS (com backend)
npm run ios

# Web (com backend)
npm run web
```

### Modo Manual (quando necessário)

```bash
# Apenas frontend (SEM backend)
npm run start:only-frontend

# Apenas backend (SEM frontend)
npm run start:only-backend

# Backend + Frontend explicitamente
npm run start:with-backend
```

### Testes

```bash
# Testes CRUD (inicia backend automaticamente e aguarda estar pronto)
npm run test:crud

# Testes CRUD direto (assume que backend já está rodando)
npm run test:crud:direct

# Testes CRUD em watch mode
npm run test:crud:watch

# Testes unitários (não precisa de backend)
npm run test:unit
```

---

## 🎨 Visual dos Logs

Quando você roda `npm start`, verá algo assim:

```bash
[BACKEND] 🚀 Backend iniciando na porta 3000...
[FRONTEND] 🎨 Frontend iniciando na porta 8081...
[BACKEND] ✅ Servidor rodando em http://localhost:3000
[BACKEND] 📊 Banco de dados conectado
[FRONTEND] ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
[FRONTEND] █ ▄▄▄▄▄ █▄▀ ▀ █ █▄▀▀▄ █ ▄▄▄▄▄ █
[FRONTEND] › Web is waiting on http://localhost:8081
[BACKEND] 🔄 Watching for changes...
```

**Cores:**
- 🔵 **BACKEND** - Azul
- 🟣 **FRONTEND** - Magenta

---

## ⚙️ Como Funciona

### 1. Concurrently

Usa o pacote `concurrently` para rodar múltiplos processos em paralelo:

```json
"start": "concurrently -n \"BACKEND,FRONTEND\" -c \"bgBlue.bold,bgMagenta.bold\" \"npm run start:backend\" \"expo start --tunnel\""
```

**Parâmetros:**
- `-n`: Nomes dos processos
- `-c`: Cores dos logs
- `-k`: Kill all ao fechar um (usado nos testes)
- `-s first`: Sucesso quando o primeiro termina

### 2. Wait-on (para testes)

Aguarda o backend estar pronto antes de rodar testes:

```json
"test:crud": "concurrently -k -s first ... \"wait-on http://localhost:3000/api && jest ...\""
```

### 3. Pre-hooks

Verifica se o backend existe antes de iniciar:

```json
"prestart": "npm run ensure-backend"
```

---

## 📁 Estrutura Esperada

```
accesControl/
├── access-backend/          ← Backend aqui
│   ├── package.json
│   ├── prisma/
│   ├── src/
│   └── node_modules/
├── src/                     ← Frontend aqui
│   ├── screens/
│   ├── services/
│   └── ...
├── package.json             ← Scripts atualizados
└── scripts/
    ├── start-all.sh         ← Script auxiliar
    └── test-crud.sh
```

---

## 🛠️ Configuração (já feita)

### Pacotes Instalados

```json
{
  "devDependencies": {
    "concurrently": "^9.2.1",
    "wait-on": "^9.0.0"
  }
}
```

### Scripts Modificados

**Antes:**
```json
"start": "expo start --tunnel"
```

**Depois:**
```json
"start": "concurrently -n \"BACKEND,FRONTEND\" ... \"npm run start:backend\" \"expo start --tunnel\""
```

---

## 🔧 Personalização

### Mudar Portas

**Backend:** Edite `access-backend/.env` ou `access-backend/src/index.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

**Frontend:** Expo usa porta 8081 por padrão (automaticamente)

### Desativar Backend Automático

Se precisar rodar só o frontend temporariamente:

```bash
npm run start:only-frontend
```

### Adicionar Mais Serviços

Edite `package.json` e adicione ao comando concurrently:

```json
"start": "concurrently -n \"BACKEND,FRONTEND,DATABASE\" -c \"bgBlue,bgMagenta,bgGreen\" \"npm run start:backend\" \"expo start\" \"npm run start:db\""
```

---

## 🐛 Troubleshooting

### Backend não inicia

**Problema:** Porta 3000 em uso

**Solução:**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou rodar o script que faz isso automaticamente
./scripts/start-all.sh
```

### Frontend não inicia

**Problema:** Porta 8081 em uso

**Solução:**
```bash
# Matar processo na porta 8081
lsof -ti:8081 | xargs kill -9
```

### Logs confusos

**Solução 1:** Use terminais separados:
```bash
# Terminal 1
npm run start:only-backend

# Terminal 2
npm run start:only-frontend
```

**Solução 2:** Filtre os logs:
```bash
npm start | grep BACKEND
npm start | grep FRONTEND
```

### Backend não tem dependências

**Solução automática:** O script verifica e instala:
```bash
./scripts/start-all.sh
```

**Solução manual:**
```bash
cd access-backend
npm install
cd ..
npm start
```

### Testes falham com "Network Error"

**Causa:** Backend não iniciou a tempo

**Solução 1:** Use `npm run test:crud` (aguarda backend)

**Solução 2:** Inicie backend manualmente primeiro:
```bash
# Terminal 1
npm run start:only-backend

# Terminal 2 (após backend estar pronto)
npm run test:crud:direct
```

---

## 🎯 Casos de Uso

### Desenvolvimento Normal
```bash
npm start
# Backend + Frontend iniciam juntos
# Abra http://localhost:8081 no navegador
```

### Rodar Testes
```bash
npm run test:crud
# Backend inicia automaticamente
# Aguarda estar pronto
# Roda testes
# Para backend ao terminar
```

### Deploy/Build
```bash
# Build do frontend (backend não precisa estar rodando)
npm run build
```

### Debug do Backend
```bash
# Rodar só o backend para ver logs detalhados
npm run start:only-backend
```

### Debug do Frontend
```bash
# Assumindo que backend já está rodando em outro lugar
npm run start:only-frontend
```

---

## 📊 Monitoramento

### Ver status das portas

```bash
# Verificar porta 3000 (backend)
lsof -i:3000

# Verificar porta 8081 (frontend)
lsof -i:8081
```

### Testar backend manualmente

```bash
# Health check
curl http://localhost:3000/api

# Listar entidades
curl http://localhost:3000/api/entities

# Com autenticação
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/entities
```

---

## 📚 Scripts Disponíveis

| Comando | Descrição | Backend | Frontend |
|---------|-----------|---------|----------|
| `npm start` | Iniciar desenvolvimento | ✅ | ✅ |
| `npm run dev` | Desenvolvimento com cache limpo | ✅ | ✅ |
| `npm run start:local` | Modo local | ✅ | ✅ |
| `npm run start:lan` | Modo LAN | ✅ | ✅ |
| `npm run android` | Android | ✅ | ✅ |
| `npm run ios` | iOS | ✅ | ✅ |
| `npm run web` | Web | ✅ | ✅ |
| `npm run start:only-frontend` | Apenas frontend | ❌ | ✅ |
| `npm run start:only-backend` | Apenas backend | ✅ | ❌ |
| `npm run test:crud` | Testes CRUD completos | ✅ | ❌ |
| `npm run test:unit` | Testes unitários | ❌ | ❌ |

---

## ✅ Checklist de Verificação

Antes de iniciar o desenvolvimento:

- [ ] Diretório `access-backend` existe
- [ ] Backend tem `package.json`
- [ ] Dependências do backend instaladas (`access-backend/node_modules`)
- [ ] Banco de dados configurado (Prisma + PostgreSQL)
- [ ] Portas 3000 e 8081 livres
- [ ] Variáveis de ambiente configuradas (`.env`)

---

## 🔄 Migração do Sistema Antigo

**Antes (manual):**
```bash
# Terminal 1
cd access-backend
npm run dev

# Terminal 2
npm start
```

**Depois (automático):**
```bash
# Um único comando
npm start
```

---

## 💡 Benefícios

1. **Produtividade**: Não precisa gerenciar múltiplos terminais
2. **Consistência**: Sempre o mesmo ambiente
3. **Onboarding**: Novos devs não precisam saber da arquitetura
4. **CI/CD**: Scripts funcionam em ambientes automatizados
5. **Testes**: Integração funciona sem configuração manual

---

**Criado em:** 13/10/2025  
**Autor:** Sistema de Build Automatizado  
**Compatibilidade:** Node.js 18+, npm 9+, Expo 52+

