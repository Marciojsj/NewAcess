# 🧪 Sistema de Testes CRUD Completos

## 📋 Visão Geral

Sistema automatizado de testes que valida **todas as operações CRUD** (Create, Read, Update, Delete) em **todas as entidades do sistema** com **integração real ao backend**.

### ✅ O que é testado:

- **🏢 Entidades (Entities)**: Escolas, Condomínios, Empresas, Eventos
- **👥 Visitantes (Visitors)**: Cadastro, QR Code, busca
- **👤 Usuários (Users)**: Diferentes roles (Admin, Operador, Usuário)
- **📊 Logs de Acesso (Access)**: Entradas e saídas

---

## 🚀 Como Executar os Testes

### Pré-requisitos

1. **Backend rodando**:
   ```bash
   cd access-backend
   npm run dev
   ```

2. **Banco de dados acessível** (PostgreSQL + Prisma)

### Comandos Disponíveis

```bash
# Executar TODOS os testes CRUD (integração completa)
npm run test:crud

# Executar com watch mode (re-executa ao salvar)
npm run test:crud:watch

# Executar apenas testes unitários (sem integração)
npm run test:unit

# Executar TODOS os testes (unitários + integração)
npm run test:all

# Executar testes com cobertura de código
npm run test:coverage

# Limpar cache do Jest
npm run test:clear
```

---

## 📊 Estrutura dos Testes

### Arquivo Principal
```
__tests__/
└── integration/
    └── crud.integration.test.ts    # Testes CRUD completos
```

### Fluxo de Teste por Entidade

Cada entidade passa por **4 fases**:

#### 1️⃣ **CREATE** - Criação
```typescript
✅ Criar 5-10 registros com dados válidos
✅ Validar campos obrigatórios
✅ Validar formato de dados (CPF, CNPJ, Email, etc.)
✅ Armazenar IDs criados para próximas fases
```

#### 2️⃣ **READ** - Leitura
```typescript
✅ Listar todos os registros
✅ Buscar por ID específico
✅ Buscar com filtros (nome, status, role, etc.)
✅ Validar erro ao buscar registro inexistente
```

#### 3️⃣ **UPDATE** - Atualização
```typescript
✅ Atualizar campos específicos
✅ Validar que outros campos não foram afetados
✅ Atualizar status (ativo/inativo)
✅ Validar timestamp de updatedAt
```

#### 4️⃣ **DELETE** - Deleção
```typescript
✅ Deletar registros específicos
✅ Validar que foram realmente removidos
✅ Validar erro ao deletar registro já deletado
```

---

## 📝 Exemplo de Saída dos Testes

```bash
🔥 CRUD Completo - Entidades
  CREATE - Criar Entidades
    ✓ deve criar 5 entidades de tipos diferentes (2850ms)
    ✓ deve validar campos obrigatórios na criação (150ms)
  READ - Listar e Buscar Entidades
    ✓ deve listar todas as entidades (180ms)
    ✓ deve buscar entidade por ID (120ms)
    ✓ deve buscar entidades por termo de pesquisa (200ms)
    ✓ deve retornar erro ao buscar entidade inexistente (100ms)
  UPDATE - Atualizar Entidades
    ✓ deve atualizar nome e status de entidade (220ms)
    ✓ deve atualizar parcialmente sem afetar outros campos (190ms)
  DELETE - Deletar Entidades
    ✓ deve deletar entidade com sucesso (150ms)
    ✓ deve retornar erro ao tentar deletar entidade já deletada (100ms)

👥 CRUD Completo - Visitantes
  CREATE - Criar Visitantes
    ✓ deve criar 10 visitantes com dados válidos (3200ms)
    ✓ deve validar CPF obrigatório na criação (100ms)
  READ - Listar e Buscar Visitantes
    ✓ deve listar todos os visitantes (150ms)
    ✓ deve buscar visitante por ID (120ms)
    ✓ deve buscar visitantes por nome (180ms)
  UPDATE - Atualizar Visitantes
    ✓ deve atualizar dados do visitante (200ms)
  DELETE - Deletar Visitantes
    ✓ deve deletar 3 visitantes (450ms)
  QR CODE - Regenerar QR Code
    ✓ deve regenerar QR Code do visitante (180ms)

👤 CRUD Completo - Usuários
  CREATE - Criar Usuários
    ✓ deve criar usuários de diferentes roles (1500ms)
  READ - Listar e Buscar Usuários
    ✓ deve listar todos os usuários (150ms)
    ✓ deve filtrar usuários por role (180ms)
    ✓ deve buscar usuário por ID (120ms)
  UPDATE - Atualizar Usuários
    ✓ deve atualizar dados do usuário (200ms)
    ✓ deve desativar usuário (150ms)
  DELETE - Deletar Usuários
    ✓ deve deletar usuário com sucesso (180ms)

====================================================================
📊 RESUMO DOS TESTES CRUD EXECUTADOS
====================================================================
✅ Entidades: CREATE, READ, UPDATE, DELETE
✅ Visitantes: CREATE, READ, UPDATE, DELETE, QR CODE
✅ Usuários: CREATE, READ, UPDATE, DELETE
====================================================================

Tests:       25 passed, 25 total
Time:        12.456s
```

---

## 🧰 Geração de Dados Fake

Os testes usam geradores automáticos de dados válidos:

```typescript
// CPF aleatório válido
generateCPF() → "12345678901"

// CNPJ aleatório válido
generateCNPJ() → "12345678000190"

// Email baseado em nome
generateEmail("João Silva") → "joao.silva@teste.com"

// Telefone brasileiro
generatePhone() → "(11) 987654321"
```

---

## 🧹 Limpeza Automática

Após cada grupo de testes, **todos os dados de teste são deletados automaticamente**:

```typescript
afterAll(async () => {
  console.log(`🧹 Limpando ${createdEntities.length} registros de teste...`);
  for (const id of createdEntities) {
    await api.delete(id);
  }
});
```

Isso garante que o banco não fica poluído com dados de teste.

---

## ⚙️ Configuração

### Variáveis de Ambiente

Os testes usam as configurações do `api.config.ts`:

```typescript
// Web
API_URL = "http://localhost:3000/api"

// Android Emulator
API_URL = "http://10.0.2.2:3000/api"

// Mobile Device
API_URL = "http://192.168.101.245:3000/api"
```

### Timeout dos Testes

Configurado em `jest.setup.js`:

```javascript
jest.setTimeout(10000); // 10 segundos por teste
```

Testes que criam múltiplos registros têm timeout aumentado:

```typescript
it('deve criar 10 visitantes', async () => {
  // ...
}, 30000); // 30 segundos
```

---

## 🐛 Troubleshooting

### Erro: "Network Error" ou "ECONNREFUSED"
**Solução**: Certifique-se que o backend está rodando em `http://localhost:3000`

```bash
cd access-backend
npm run dev
```

### Erro: "Timeout of 10000ms exceeded"
**Solução**: Backend está lento ou banco de dados travado. Verifique logs do backend.

### Erro: "Jest did not exit one second after the test run"
**Solução**: Use o flag `--detectOpenHandles`:

```bash
npm run test:crud
```

### Erro: "Cannot find module" ou "import.meta"
**Solução**: Limpe o cache do Jest:

```bash
npm run test:clear
npm run test:crud
```

### Erro: "Validation failed" ao criar registro
**Solução**: Verifique se o banco tem as constraints corretas. Execute migrations:

```bash
cd access-backend
npx prisma migrate dev
```

---

## 📈 Cobertura de Código

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

Visualizar no navegador:

```bash
open coverage/lcov-report/index.html
```

### Metas de Cobertura (jest.config.js)

```javascript
coverageThreshold: {
  global: {
    branches: 75,
    functions: 75,
    lines: 75,
    statements: 75
  }
}
```

---

## 🎯 Boas Práticas

### ✅ Sempre execute antes de:
- Fazer merge de PRs
- Deploy em produção
- Refatorações grandes

### ✅ Execute localmente:
- Economiza tempo do CI/CD
- Feedback imediato
- Não gasta tokens do Copilot

### ✅ Isole testes:
- Cada teste é independente
- Usa dados únicos (timestamp no nome)
- Limpa tudo no final

### ✅ Mock apenas quando necessário:
- Testes de integração usam backend real
- Testes unitários usam mocks
- Separados em pastas diferentes

---

## 📚 Arquivos Relacionados

```
__tests__/
├── integration/
│   └── crud.integration.test.ts        # Testes CRUD completos
├── services/
│   ├── entidadeService.test.ts         # Testes unitários do service
│   └── entityApi.test.ts               # Testes unitários da API
├── screens/
│   └── entidadeScreen.test.tsx         # Testes de UI
└── utils/
    └── entityHelpers.test.ts           # Testes de helpers

src/services/api/
├── entitiesApi.ts                      # API de Entidades
├── visitorsApi.ts                      # API de Visitantes
├── usersApi.ts                         # API de Usuários
├── accessApi.ts                        # API de Acessos
└── apiClient.ts                        # Cliente HTTP base

jest.config.js                          # Configuração do Jest
jest.setup.js                           # Setup dos testes
package.json                            # Scripts de teste
```

---

## 🚦 Status dos Testes

| Entidade | CREATE | READ | UPDATE | DELETE | QR Code | Extras |
|----------|--------|------|--------|--------|---------|--------|
| 🏢 Entities | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| 👥 Visitors | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| 👤 Users | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| 📊 Access | 🟡 | 🟡 | 🟡 | 🟡 | N/A | - |

**Legenda:**
- ✅ Implementado e testado
- 🟡 Parcialmente implementado
- ❌ Não implementado

---

## 💡 Próximos Passos

1. **Adicionar testes de Access (entrada/saída)**
2. **Testes de permissões** (verificar roles)
3. **Testes de performance** (criar 1000 registros)
4. **Testes de concorrência** (múltiplas requisições simultâneas)
5. **Testes E2E** (com Cypress/Playwright)

---

**Criado em:** 13/10/2025  
**Última atualização:** 13/10/2025  
**Compatibilidade:** Node.js 18+, Jest 29+, Axios 1.12+

