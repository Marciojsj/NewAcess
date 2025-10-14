# ✅ Solução: Login e Redirecionamento

## 🔍 Diagnóstico

### Problema Relatado:
- Login não redireciona para Home (web e mobile)
- Credenciais: `operador@exemplo.com` / `operator123`

### Erro nos Logs:
```
[FRONTEND]  ERROR  Erro no login: Network Error
```

### Causa Raiz Identificada:
❌ **Banco de dados Supabase inacessível**

```bash
❌ Erro: Can't reach database server at `aws-1-us-east-2.pooler.supabase.com:5432`
```

O backend está funcionando corretamente na porta 3000, mas o **Prisma não consegue conectar ao Supabase PostgreSQL**.

---

## 🎯 Solução

### Passo 1: Reativar Supabase
1. Acesse: https://supabase.com/dashboard
2. Faça login na sua conta
3. Encontre o projeto "accescontrol" (ou nome similar)
4. Clique em **"Resume project"** ou **"Unpause"**
5. Aguarde 2-5 minutos até o banco ficar online

### Passo 2: Verificar Conexão
Após reativar, teste a conexão:

```bash
cd ~/Documentos/Projeto/accesControl/access-backend

# Testar conexão
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => console.log('✅ Conectado ao banco')).catch(e => console.error('❌ Erro:', e.message)).finally(() => prisma.\$disconnect());"
```

**Resultado esperado:**
```
✅ Conectado ao banco
```

### Passo 3: Testar Login via API
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operador@exemplo.com","password":"operator123"}'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "...",
      "name": "Operador",
      "email": "operador@exemplo.com",
      "role": "OPERATOR"
    },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

### Passo 4: Testar Login no Frontend
1. Abra o app (web ou mobile)
2. Use as credenciais:
   - **Email:** `operador@exemplo.com`
   - **Senha:** `operator123`
3. Clique em "Entrar"

**Resultado esperado:**
- ✅ Login bem-sucedido
- ✅ Redirecionamento automático para **HomeScreen (Dashboard)**
- ✅ Sidebar aparece
- ✅ KPIs carregados

---

## 🔧 Por Que o Redirecionamento Funciona Automaticamente?

### Fluxo de Navegação:

1. **LoginScreen** chama `await login(email, password)`

2. **AuthContext** (`login` function):
   ```tsx
   const response = await authApi.login({ email, password });
   setUser(userData); // ← Atualiza estado do usuário
   ```

3. **AppRouter** reage ao estado:
   ```tsx
   const { user, isLoading } = useAuth();
   
   // Se user existe, mostra telas autenticadas
   {user ? (
     <Stack.Screen name="Home" component={HomeScreen} />
     // ...outras telas
   ) : (
     <Stack.Screen name="Login" component={LoginScreen} />
   )}
   ```

4. **React Navigation** detecta mudança e renderiza automaticamente as telas autenticadas

**Não é necessário adicionar `navigation.navigate('Home')` no LoginScreen!**

---

## 🐛 Troubleshooting

### Se o banco continuar inacessível:

#### Verificar porta aberta:
```bash
nc -zv aws-1-us-east-2.pooler.supabase.com 5432
```

#### Verificar .env:
```bash
cd ~/Documentos/Projeto/accesControl/access-backend
cat .env | grep DATABASE_URL
```

#### Regenerar Prisma Client:
```bash
npm run prisma:generate
```

### Se o login falhar com erro 401:

#### Verificar se o seed foi executado:
```bash
npm run prisma:seed
```

#### Verificar usuários no banco:
```bash
npm run prisma:studio
# Abre em http://localhost:5555
# Verificar tabela ac_users
```

### Se o CORS bloquear:

#### Adicionar origem no backend:
Editar `access-backend/src/app.ts`:
```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8081',   // Expo web
  'http://localhost:8082',
  'http://localhost:19000',  // Expo tunnel
  'http://localhost:19001',
  'http://localhost:19006',  // Expo web alternativo
  'exp://192.168.x.x:8081',  // Expo mobile
];
```

### Se Network Error persistir:

#### Mobile (Android Emulador):
Editar `src/config/api.config.ts`:
```typescript
case 'android':
  return API_CONFIG.BACKEND_URL_ANDROID_EMULATOR; // 10.0.2.2:3000
```

#### Mobile (Dispositivo Físico):
1. Descobrir IP da sua máquina:
   ```bash
   hostname -I | awk '{print $1}'
   ```
2. Atualizar em `src/config/api.config.ts`:
   ```typescript
   BACKEND_URL_IP: 'http://SEU_IP_AQUI:3000/api',
   ```

---

## ✅ Checklist de Validação

Após reativar o Supabase, verificar:

- [ ] Banco de dados online e acessível
- [ ] Backend conectado ao banco (sem erros no console)
- [ ] Endpoint `/api/health` retornando `200 OK`
- [ ] Login via curl funcionando
- [ ] Login no frontend web funcionando
- [ ] Login no frontend mobile funcionando
- [ ] Redirecionamento para Home automático
- [ ] Sidebar aparece corretamente
- [ ] Dashboard carrega KPIs
- [ ] Outras telas acessíveis

---

## 📊 Credenciais de Teste

### SUPERADMIN:
- Email: `admin@exemplo.com`
- Senha: `admin123`
- Acesso: Todas as funcionalidades

### ADMIN:
- Email: `admin.entidade@exemplo.com`
- Senha: `admin123`
- Acesso: Gerenciamento de entidade

### OPERATOR:
- Email: `operador@exemplo.com`
- Senha: `operator123`
- Acesso: Registrar entrada/saída, visitantes

---

## 🎉 Status Esperado Final

```
✅ Banco de dados Supabase: ONLINE
✅ Backend rodando: http://localhost:3000
✅ Frontend web rodando: http://localhost:8081
✅ Login funcionando: SIM
✅ Redirecionamento automático: SIM
✅ Sidebar visível: SIM
✅ Dashboard carregando: SIM
```

---

**Data:** 14 de outubro de 2025  
**Problema:** Network Error → Banco de dados inacessível  
**Solução:** Reativar Supabase project  
**Tempo estimado:** 2-5 minutos após reativação
