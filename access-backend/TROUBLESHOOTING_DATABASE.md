# 🔧 Troubleshooting - Conexão com Banco de Dados Supabase

## ❌ Problema Atual

Todos os testes de conexão falharam com os erros:
- **Pooler:** "Tenant or user not found"
- **Host direto:** "connect ENETUNREACH"

Isso significa que **as credenciais ou configurações do banco estão incorretas**.

---

## ✅ Como Resolver no Painel do Supabase

### 1️⃣ Verificar e Resetar a Senha do Banco

1. Acesse: https://supabase.com/dashboard/project/iaogucaazpxbptziksxi
2. Vá em: **Project Settings** (ícone de engrenagem) → **Database**
3. Role até a seção **Database Settings**
4. Clique em **Reset Database Password**
5. Defina uma nova senha (exemplo: `NovoPass123!`)
6. **COPIE E SALVE** essa senha

### 2️⃣ Obter a String de Conexão Correta

Na mesma página (**Project Settings → Database**), role até **Connection String**.

Você verá várias opções:

#### **Opção A: Connection Pooling (Recomendado para produção)**
```
URI: postgresql://postgres.iaogucaazpxbptziksxi:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### **Opção B: Direct Connection (Recomendado para migrations)**
```
URI: postgresql://postgres:[YOUR-PASSWORD]@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres
```

⚠️ **IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha que você resetou.

### 3️⃣ Codificar Caracteres Especiais na Senha

Se sua senha contém caracteres especiais, você precisa codificá-los:

| Caractere | Código |
|-----------|--------|
| `@`       | `%40`  |
| `!`       | `%21`  |
| `#`       | `%23`  |
| `$`       | `%24`  |
| `%`       | `%25`  |
| `&`       | `%26`  |
| `=`       | `%3D`  |
| `+`       | `%2B`  |
| ` ` (espaço) | `%20` |

**Exemplo:**
- Senha: `NovoPass123!`
- Codificada: `NovoPass123%21`

### 4️⃣ Habilitar Acesso Externo (se necessário)

1. Ainda em **Project Settings → Database**
2. Role até **Connection Pooling**
3. Verifique se **Connection Pooling** está **ENABLED** ✅
4. Se não estiver, clique em **Enable**

---

## 🧪 Testar Nova Conexão

Depois de obter a string correta, atualize o `.env`:

```bash
# Exemplo com Connection Pooling
DATABASE_URL="postgresql://postgres.iaogucaazpxbptziksxi:NovoPass123%21@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# OU com Direct Connection (migrations)
DATABASE_URL="postgresql://postgres:NovoPass123%21@db.iaogucaazpxbptziksxi.supabase.co:5432/postgres"
```

Depois teste:

```bash
cd ~/Documentos/Projeto/accesControl/access-backend
npm run prisma:generate
npx prisma db push
```

---

## 📝 Checklist de Verificação

- [ ] Resetei a senha do banco no Supabase
- [ ] Copiei a string de conexão correta do painel
- [ ] Codifiquei os caracteres especiais da senha
- [ ] Atualizei o arquivo `.env`
- [ ] Connection Pooling está habilitado
- [ ] Testei a conexão com `npx prisma db push`

---

## 🆘 Ainda não funciona?

Se mesmo após seguir todos os passos acima ainda não funcionar:

### Opção 1: Usar SQL Editor do Supabase
1. No painel do Supabase, vá em **SQL Editor**
2. Execute o schema manualmente (vou gerar o SQL para você)
3. Continue o desenvolvimento e depois configura a conexão

### Opção 2: Criar Novo Projeto Supabase
Se o projeto atual está com problemas:
1. Crie um novo projeto no Supabase
2. Copie as novas credenciais
3. Atualize o `.env`

---

## 🎯 Próximos Passos Após Conectar

Quando a conexão funcionar:

```bash
# 1. Sincronizar schema
npx prisma db push

# 2. Gerar Prisma Client
npm run prisma:generate

# 3. Popular banco com dados iniciais
npm run prisma:seed

# 4. Iniciar servidor
npm run dev

# 5. Testar API
curl http://localhost:3000/api/health
```

---

## 📞 Me informe quando conseguir:

1. A nova senha do banco
2. A string de conexão que você copiou do painel
3. Se conseguiu conectar com sucesso

Aí eu continuo com a configuração! 🚀
