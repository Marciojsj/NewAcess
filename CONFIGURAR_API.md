# ⚙️ CONFIGURAÇÃO DA API - COMO RESOLVER PROBLEMA DE LOGIN

## 📍 Arquivo de Configuração Centralizado

**Localização:** `src/config/api.config.ts`

Este arquivo contém TODAS as configurações da API em um só lugar!

---

## 🔧 Como Configurar

### 1️⃣ Abra o arquivo de configuração:

```
src/config/api.config.ts
```

### 2️⃣ Encontre esta seção:

```typescript
export const API_CONFIG = {
  // URLs do backend
  BACKEND_URL_LOCAL: 'http://localhost:3000/api',
  BACKEND_URL_IP: 'http://192.168.101.245:3000/api', // ← IP da sua máquina
  BACKEND_URL_ANDROID_EMULATOR: 'http://10.0.2.2:3000/api',
  BACKEND_URL_PRODUCTION: 'https://seu-backend-producao.com/api',
  
  // ... outras configurações
}
```

---

## 🎯 Qual URL usar em cada caso?

### ✅ Rodando no NAVEGADOR (Web)
**Usa:** `BACKEND_URL_LOCAL` → `http://localhost:3000/api`

✅ Já está configurado corretamente!

---

### 📱 Rodando no CELULAR (Device Físico via Expo)
**Problema:** `localhost` não funciona no celular!

**Solução:** Use o IP da sua máquina

1. Seu IP atual: `192.168.101.245`
2. Já está configurado em: `BACKEND_URL_IP`

**Para ativar:**

Abra `src/config/api.config.ts` e na função `getApiUrl()`, encontre:

```typescript
case 'android':
  // Android emulador usa 10.0.2.2
  // Para device físico, mude para BACKEND_URL_IP
  return API_CONFIG.BACKEND_URL_ANDROID_EMULATOR;
```

**Mude para:**

```typescript
case 'android':
  // Para device físico Android
  return API_CONFIG.BACKEND_URL_IP;
```

---

### 🖥️ Rodando no EMULADOR Android
**Usa:** `BACKEND_URL_ANDROID_EMULATOR` → `http://10.0.2.2:3000/api`

✅ Já está configurado!

---

### 📱 Rodando no iOS (Simulador ou Device)
**Usa:** `BACKEND_URL_LOCAL` → `http://localhost:3000/api`

✅ Já está configurado!

---

## 🔍 Como Verificar qual URL está sendo usada

Quando você iniciar o app, verá no console:

```
🔧 Configuração da API:
  - Plataforma: web
  - URL da API: http://localhost:3000/api
  - Timeout: 10000 ms
```

---

## ✅ CHECKLIST de Solução de Problemas

### Problema: "Network Error" ou "Failed to fetch"

1. **Backend está rodando?**
   ```bash
   curl http://localhost:3000/api/health
   ```
   Deve retornar: `{"success":true,"message":"Server is running"}`

2. **Firewall bloqueando?**
   ```bash
   # Linux: Permitir porta 3000
   sudo ufw allow 3000
   ```

3. **URL correta para sua plataforma?**
   - Web → `localhost` ✅
   - Android Device → IP da máquina (192.168.101.245)
   - Android Emulator → `10.0.2.2`

4. **IP da máquina mudou?**
   ```bash
   # Obter IP atual
   hostname -I | awk '{print $1}'
   
   # Atualizar em: src/config/api.config.ts
   BACKEND_URL_IP: 'http://SEU_IP_AQUI:3000/api'
   ```

---

## 🚀 TESTANDO O LOGIN AGORA

### 1. Certifique-se que o backend está rodando:

```bash
cd access-backend
npm run dev
```

Deve ver:
```
✅ Conectado ao banco de dados
🚀 Servidor rodando na porta 3000
```

### 2. Inicie o frontend:

```bash
npm start
```

### 3. Abra no navegador (mais fácil para testar):

```
http://localhost:8081
```

ou

```
http://localhost:8082
```

### 4. Use as credenciais:

| Email | Senha |
|-------|-------|
| `admin@exemplo.com` | `admin123` |

### 5. O que deve acontecer:

✅ Você verá no console:
```
🔧 Configuração da API:
  - Plataforma: web
  - URL da API: http://localhost:3000/api
```

✅ O login deve funcionar!

---

## 📝 Resumo de Arquivos Modificados

| Arquivo | O que faz |
|---------|-----------|
| `src/config/api.config.ts` | ⭐ **ARQUIVO PRINCIPAL** - Configurações centralizadas |
| `src/services/api/apiClient.ts` | Usa as configurações do arquivo acima |

---

## 🎯 Quando Usar Cada URL

| Cenário | URL a usar | Como configurar |
|---------|------------|-----------------|
| **Teste no browser** | `localhost:3000` | ✅ Já configurado |
| **Teste no celular** | IP da máquina | Mude `getApiUrl()` case 'android' |
| **Emulador Android** | `10.0.2.2:3000` | ✅ Já configurado |
| **Produção** | URL real | Mude `BACKEND_URL_PRODUCTION` |

---

## ⚡ AÇÃO RÁPIDA PARA TESTAR AGORA

```bash
# Terminal 1: Backend
cd access-backend && npm run dev

# Terminal 2: Frontend
npm start

# Abra no browser: http://localhost:8081
# Login: admin@exemplo.com / admin123
```

**Deve funcionar! 🎉**

---

## 🐛 Se ainda não funcionar

1. **Veja o console do browser** (F12 → Console)
2. **Veja os logs do backend** em `/tmp/backend-logs.txt`
3. **Verifique a URL** sendo usada no console do app
4. **Teste o backend diretamente:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@exemplo.com","password":"admin123"}'
   ```

---

**✅ Tudo configurado! Agora teste o login! 🚀**
