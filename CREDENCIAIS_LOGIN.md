# 🔐 CREDENCIAIS DE LOGIN - Sistema de Controle de Acesso

## ⚠️ ERRO 401 (Unauthorized) - SOLUÇÕES

### 📋 **Credenciais Corretas**

Use uma dessas credenciais para fazer login:

#### **1. SUPERADMIN (Acesso Total)**
- **Email**: `admin@exemplo.com`
- **Senha**: `admin123`
- **Permissões**: Acesso total ao sistema

#### **2. ADMIN (Administrador de Entidade)**
- **Email**: `admin.entidade@exemplo.com`
- **Senha**: `admin123`
- **Permissões**: Gerenciar usuários, relatórios, configurações

#### **3. OPERADOR (Acesso Básico)**
- **Email**: `operador@exemplo.com`
- **Senha**: `operator123`
- **Permissões**: Registrar entrada/saída, consultar visitantes

---

## 🔧 **Troubleshooting - Erro 401**

### **Problema 1: Credenciais Incorretas**

**Sintoma**: `Failed to load resource: 401 (Unauthorized)`

**Solução**: Verifique se está usando uma das credenciais acima EXATAMENTE como estão escritas.

✅ **Correto**:
```
Email: admin@exemplo.com
Senha: admin123
```

❌ **Errado**:
```
Email: admin@example.com  (deve ser .exemplo.com)
Email: admin              (falta @exemplo.com)
Senha: Admin123           (deve ser minúscula)
Senha: admin              (falta 123)
```

---

### **Problema 2: Banco de Dados Não Acessível**

**Sintoma**: 
```
Can't reach database server at aws-1-us-east-2.pooler.supabase.com:5432
```

**Causa**: Sem conexão com internet OU banco Supabase pausado/indisponível

**Soluções**:

#### **A) Verificar Conexão com Internet**
```bash
ping google.com
```

#### **B) Verificar Conexão com Supabase**
```bash
ping aws-1-us-east-2.pooler.supabase.com
```

#### **C) Verificar se Backend Está Rodando**
```bash
curl http://localhost:3000/
```

Deve retornar: `{"message":"Access Control API","version":"1.0.0"}`

#### **D) Reativar Projeto no Supabase**
1. Acesse https://supabase.com/dashboard
2. Faça login
3. Verifique se o projeto está ativo
4. Se estiver pausado, clique em "Resume"

---

### **Problema 3: Usuários Não Criados no Banco**

**Sintoma**: Login correto mas ainda dá erro 401

**Solução**: Executar o seed do banco de dados

```bash
cd access-backend
npm run prisma:seed
```

Deve exibir:
```
✅ Entidade criada: Entidade Principal
✅ SUPERADMIN criado: admin@exemplo.com
✅ ADMIN criado: admin.entidade@exemplo.com
✅ OPERATOR criado: operador@exemplo.com
🎉 Seed concluído com sucesso!
```

---

### **Problema 4: Backend Não Está Rodando**

**Sintoma**: `Failed to load resource: net::ERR_CONNECTION_REFUSED`

**Solução**: Iniciar o backend

```bash
# Voltar para raiz do projeto
cd /home/marcio-junior/Documentos/Projeto/accesControl

# Iniciar tudo junto
npm start
```

OU iniciar backend separadamente:

```bash
cd access-backend
npm run dev
```

---

## 🧪 **Como Testar Se Está Funcionando**

### **1. Testar Backend**
```bash
curl http://localhost:3000/
```

**Esperado**: 
```json
{
  "message": "Access Control API",
  "version": "1.0.0"
}
```

### **2. Testar Login Via cURL**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exemplo.com","password":"admin123"}'
```

**Esperado**: 
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": {
    "id": "...",
    "name": "Super Admin",
    "email": "admin@exemplo.com",
    "role": "SUPERADMIN"
  }
}
```

**Se retornar 401**:
```json
{
  "error": "Credenciais inválidas"
}
```
→ Credenciais estão erradas ou usuário não existe no banco

---

## 📊 **Status Atual do Sistema**

### ✅ **Funcionando**
- Backend API (28 endpoints)
- Banco de dados Supabase PostgreSQL
- Autenticação JWT
- CRUD de Entidades
- CRUD de Visitantes
- CRUD de Usuários
- Registro de Entrada/Saída
- Relatórios/Dashboard
- Scanner QR Code

### ⚠️ **Configuração Necessária**
- **Banco de dados deve estar acessível**
- **Backend deve estar rodando**
- **Seed deve ter sido executado**

---

## 🔄 **Reiniciar Sistema Completo**

Se nada funcionar, reinicie tudo:

```bash
# 1. Parar todos os processos
pkill -f "node"
pkill -f "expo"

# 2. Voltar para raiz do projeto
cd /home/marcio-junior/Documentos/Projeto/accesControl

# 3. Limpar cache
rm -rf node_modules/.cache
rm -rf .expo

# 4. Reiniciar
npm start
```

Aguarde até ver:
```
✅ Backend iniciado (PID: xxxxx)
✅ Frontend iniciando...
```

Então abra no navegador: http://localhost:8081

---

## 📞 **Suporte Rápido**

### **Erro Comum #1: "Cannot find module"**
```bash
npm install --legacy-peer-deps
```

### **Erro Comum #2: "Port 8081 already in use"**
```bash
npx expo start --clear --port 8082
```

### **Erro Comum #3: "Database connection failed"**
1. Verifique internet
2. Acesse Supabase Dashboard
3. Reative o projeto se necessário
4. Aguarde 1-2 minutos
5. Tente novamente

---

## 🎯 **TL;DR - Solução Rápida**

1. **Verifique se backend está rodando**: `curl http://localhost:3000/`
2. **Use credenciais corretas**: `admin@exemplo.com` / `admin123`
3. **Verifique conexão internet**
4. **Reative Supabase se necessário**
5. **Execute seed se precisar**: `cd access-backend && npm run prisma:seed`

---

**Data**: 9 de outubro de 2025
**Versão**: 1.0.0
