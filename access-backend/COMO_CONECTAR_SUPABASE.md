# 🔌 Como Conectar ao Supabase PostgreSQL

## ⚠️ Problema Atual

A conexão com o banco de dados está falhando com o erro:
```
FATAL: Tenant or user not found
```

Isso geralmente significa que:
1. A senha está incorreta ou mal formatada
2. O formato da string de conexão está errado
3. As credenciais de usuário estão incorretas

## 📝 Como Obter a String de Conexão Correta

### Passo 1: Acesse o Painel do Supabase
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto: **iaogucaazpxbptziksxi**

### Passo 2: Encontre as Credenciais do Banco
1. Clique em **Settings** (engrenagem no menu lateral)
2. Clique em **Database**
3. Role até a seção **Connection string**

### Passo 3: Copie a String de Conexão

Você verá 3 tipos de conexão:

#### **🔹 Session Mode (Recomendado para Prisma Migrate)**
```
postgresql://postgres.iaogucaazpxbptziksxi:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

#### **🔹 Transaction Mode (Recomendado para Queries)**
```
postgresql://postgres.iaogucaazpxbptziksxi:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

#### **🔹 Direct Connection (Melhor para Migrações)**
```
postgresql://postgres:[YOUR-PASSWORD]@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres
```

### Passo 4: Substitua [YOUR-PASSWORD]

**Sua senha:** `Mar@123`

**⚠️ IMPORTANTE:** O caractere `@` precisa ser codificado para URL!
- `@` deve ser substituído por `%40`
- Senha codificada: `Mar%40123`

### 📋 Strings de Conexão Corretas para Você

Teste estas opções na ordem:

#### **Opção 1: Direct Connection (Preferível para migrações)**
```bash
DATABASE_URL="postgresql://postgres:Mar%40123@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres"
```

#### **Opção 2: Session Mode**
```bash
DATABASE_URL="postgresql://postgres.iaogucaazpxbptziksxi:Mar%40123@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

#### **Opção 3: Transaction Mode**
```bash
DATABASE_URL="postgresql://postgres.iaogucaazpxbptziksxi:Mar%40123@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## 🔧 Como Testar

### Teste 1: Verificar credenciais no Supabase
1. No painel do Supabase, vá em **Database** → **Tables**
2. Se você conseguir ver as tabelas, suas credenciais estão corretas
3. Se pedir senha, use: `Mar@123` (sem encoding)

### Teste 2: Testar com psql (se tiver instalado)
```bash
# Direct connection
psql "postgresql://postgres:Mar%40123@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres"
```

### Teste 3: Testar com Node.js
```bash
cd ~/Documentos/Projeto/accesControl/access-backend
node test-connection.js
```

## 🎯 Ação Necessária

Por favor, faça o seguinte:

1. **Acesse o Supabase Dashboard**
2. **Vá em Settings → Database**
3. **Copie EXATAMENTE a string de conexão** que aparece lá
4. **Verifique se a senha é realmente `Mar@123`**
5. **Me envie a string de conexão completa** (vou ajustar o encoding)

Alternativamente, você pode:
- **Tirar um print** da seção "Connection string" no Supabase
- **Copiar e colar** a connection string do painel
- **Verificar se o usuário é** `postgres` ou `postgres.iaogucaazpxbptziksxi`

## 🔍 Verificação de Host

O host pode ser um destes:
- ✅ `db.iaogucaazpxbptziksxi.supabase.co` (Direct - **melhor para migrações**)
- ✅ `aws-0-us-east-1.pooler.supabase.com` (Pooled)

## 📞 Informações que Preciso

Para resolver, me envie:
1. ✅ A **senha do banco** confirmada (você já enviou: `Mar@123`)
2. ❓ A **string de conexão EXATA** do painel do Supabase
3. ❓ Confirmar se o **usuário** é `postgres` ou tem prefixo
4. ❓ A **região** do seu projeto (provavelmente us-east-1)

---

## 🚀 Após Corrigir a Conexão

Quando a conexão funcionar, vou executar:

```bash
# 1. Gerar Prisma Client
npm run prisma:generate

# 2. Criar as tabelas no banco
npx prisma db push

# 3. Popular com dados iniciais
npm run prisma:seed

# 4. Iniciar o servidor
npm run dev
```

---

## 💡 Dica

Se ainda assim não funcionar, podemos:
1. **Resetar a senha do banco** no painel do Supabase
2. **Criar um novo projeto** no Supabase (se necessário)
3. **Usar outro banco** temporariamente (Railway, Neon, etc.)
