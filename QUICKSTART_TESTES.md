# 🧪 Guia Rápido - Testes CRUD

## ⚡ Início Rápido (2 minutos)

### 1️⃣ Inicie o Backend
```bash
cd access-backend
npm run dev
```

### 2️⃣ Execute os Testes
```bash
# Volte para a raiz do projeto
cd ..

# Execute os testes CRUD
npm run test:crud
```

### 3️⃣ Veja os Resultados
```bash
✅ 25 testes passaram
⏱️  Tempo: ~12 segundos
🧹 Dados de teste foram limpos automaticamente
```

---

## 📋 Comandos Disponíveis

```bash
# Testes CRUD completos (integração com backend)
npm run test:crud

# Testes CRUD em watch mode
npm run test:crud:watch

# Apenas testes unitários (rápido, sem backend)
npm run test:unit

# TODOS os testes (unitários + integração)
npm run test:all

# Com cobertura de código
npm run test:coverage

# Script bash com verificação de backend
./scripts/test-crud.sh
```

---

## 🎯 O que é Testado

### 🏢 Entidades
- ✅ Criar 5 entidades (School, Condominium, Company, Event, Other)
- ✅ Listar e buscar entidades
- ✅ Atualizar nome, status e dados
- ✅ Deletar entidades

### 👥 Visitantes
- ✅ Criar 10 visitantes com CPF, telefone, email
- ✅ Listar e buscar visitantes
- ✅ Atualizar dados do visitante
- ✅ Deletar visitantes
- ✅ Regenerar QR Code

### 👤 Usuários
- ✅ Criar usuários (Admin, Operador, Usuário)
- ✅ Filtrar por role
- ✅ Atualizar dados e status
- ✅ Desativar/ativar usuários
- ✅ Deletar usuários

---

## 🐛 Solução de Problemas

### Backend não está rodando?
```bash
cd access-backend
npm run dev
```

### Erro de conexão?
Verifique se o backend está em `http://localhost:3000`

### Testes travando?
```bash
npm run test:clear
npm run test:crud
```

### Banco de dados desatualizado?
```bash
cd access-backend
npx prisma migrate dev
npx prisma db seed  # Se tiver seed
```

---

## 📊 Exemplo de Saída

```
🔥 CRUD Completo - Entidades
  ✓ CREATE — Criar 5 entidades (2.8s)
  ✓ READ — Listar todas (0.2s)
  ✓ UPDATE — Atualizar dados (0.3s)
  ✓ DELETE — Deletar entidade (0.2s)

👥 CRUD Completo - Visitantes
  ✓ CREATE — Criar 10 visitantes (3.2s)
  ✓ READ — Listar e buscar (0.4s)
  ✓ UPDATE — Atualizar visitante (0.2s)
  ✓ DELETE — Deletar 3 visitantes (0.5s)
  ✓ QR CODE — Regenerar QR (0.2s)

👤 CRUD Completo - Usuários
  ✓ CREATE — Criar usuários de diferentes roles (1.5s)
  ✓ READ — Listar e filtrar (0.4s)
  ✓ UPDATE — Atualizar dados (0.3s)
  ✓ DELETE — Deletar usuário (0.2s)

🧹 Limpando 18 registros de teste...
✅ Todos os dados de teste foram removidos

Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        12.456s
```

---

## 💡 Dicas

- ✅ **Execute antes de cada PR**: Garante que nada quebrou
- ✅ **Rode localmente**: Economiza tempo de CI/CD
- ✅ **Use watch mode**: Para desenvolvimento contínuo
- ✅ **Veja cobertura**: Identifica código não testado

---

## 📚 Documentação Completa

Veja `TESTES_CRUD_COMPLETOS.md` para:
- Detalhes técnicos
- Configuração avançada
- Troubleshooting completo
- Boas práticas

---

**Tempo total de execução**: ~12 segundos  
**Cobertura de testes**: 75%+  
**Dados de teste**: Limpos automaticamente
