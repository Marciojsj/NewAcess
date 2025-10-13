# 🧪 GUIA DE TESTE - CRUD COM FEEDBACK VISUAL

## 🎯 O que foi implementado

### 1. **Toast Component** (`src/components/ui/Toast.tsx`)
- Componente de feedback visual
- Tipos: success (✅), error (❌), warning (⚠️), info (ℹ️)
- Animação de entrada/saída
- Auto-hide após 3 segundos
- Posicionamento: topo da tela (web: centralizado, mobile: full width)

### 2. **useToast Hook** (`src/hooks/useToast.ts`)
- Hook para gerenciar toasts
- Métodos: `success()`, `error()`, `warning()`, `info()`
- Log automático no console

### 3. **Backend - Logs Detalhados**
- Validação middleware com logs
- Service layer com try/catch e logs SQL
- Controller com logs de entrada/saída

### 4. **Validação Relaxada**
- CNPJ, address, city, state, etc agora são opcionais
- Apenas `name`, `type` e `email` são obrigatórios

## 📝 Como Testar

### Teste 1: Criar Entidade com Sucesso

**Passos:**
```bash
1. npm start
2. Abrir http://localhost:8081
3. Fazer login
4. Ir para Entidades
5. Clicar em "+ Nova Entidade"
6. Preencher:
   - Nome: "Empresa Teste CRUD"
   - Tipo: Jurídica
   - Email: "teste@crud.com"
   - CNPJ: "12345678901234" (opcional)
7. Clicar em "Salvar"
```

**Esperado:**
```
✅ Toast verde: "Entidade criada com sucesso!"
✅ Modal fecha automaticamente
✅ Lista atualiza mostrando a nova entidade
```

**Logs no Console do Navegador (F12):**
```
💾 [ENTIDADE] Tentando salvar... { formMode: "create", formData: {...} }
➡️ [ENTIDADE] Criando nova entidade...
📤 [FRONTEND] Enviando dados para criar entidade: {...}
📥 [FRONTEND] Resposta do backend: { success: true, data: {...} }
✅ [ENTIDADE] Entidade criada: {...}
🔄 [ENTIDADE] Recarregando lista...
🔵 [ENTIDADE] Carregadas: X entidades
🚪 [ENTIDADE] Fechando modal...
[TOAST SUCCESS] Entidade criada com sucesso!
```

**Logs no Terminal Backend:**
```
🔍 [VALIDATION] Validando dados: { name: "Empresa Teste CRUD", ... }
✅ [VALIDATION] Dados válidos
📝 [CREATE ENTITY] Dados recebidos: { ... }
🔄 [SERVICE] Tentando criar entidade no banco: { ... }
✅ [SERVICE] Entidade salva no banco com ID: abc-123
✅ [SERVICE] Dados salvos: { id: "abc-123", name: "Empresa Teste CRUD", ... }
✅ [CREATE ENTITY] Entidade criada com sucesso: { ... }
```

### Teste 2: Criar Entidade com Erro (Nome Vazio)

**Passos:**
```bash
1. Clicar em "+ Nova Entidade"
2. Deixar Nome vazio
3. Preencher Email: "teste@erro.com"
4. Clicar em "Salvar"
```

**Esperado:**
```
❌ Toast vermelho: "Nome é obrigatório"
⚠️ Modal permanece aberto
```

**Logs no Console:**
```
💾 [ENTIDADE] Tentando salvar... { formMode: "create", formData: { nome: "", ... } }
❌ [ENTIDADE] Nome obrigatório
[TOAST ERROR] Nome é obrigatório
```

### Teste 3: Criar Entidade com Erro de Validação (Email Inválido)

**Passos:**
```bash
1. Clicar em "+ Nova Entidade"
2. Preencher Nome: "Teste Email"
3. Preencher Email: "email-invalido" (sem @)
4. Clicar em "Salvar"
```

**Esperado:**
```
❌ Toast vermelho: "Dados inválidos" ou "Email inválido"
⚠️ Modal permanece aberto
```

**Logs no Terminal Backend:**
```
🔍 [VALIDATION] Validando dados: { name: "Teste Email", email: "email-invalido" }
❌ [VALIDATION] Erro de validação: [{ path: ["email"], message: "Email inválido" }]
```

### Teste 4: Editar Entidade

**Passos:**
```bash
1. Clicar em "Editar" em uma entidade existente
2. Modificar o Nome: "Nome Editado"
3. Clicar em "Salvar"
```

**Esperado:**
```
✅ Toast verde: "Entidade atualizada com sucesso!"
✅ Modal fecha
✅ Lista atualiza mostrando o nome editado
```

### Teste 5: Excluir Entidade

**Passos:**
```bash
1. Clicar em "Excluir" em uma entidade
2. Confirmar a exclusão
```

**Esperado:**
```
✅ Toast verde: "Entidade excluída com sucesso!"
✅ Entidade desaparece da lista
```

### Teste 6: Verificar Persistência no Banco

**Opção 1 - Testes Automatizados:**
```bash
npm run test:crud:direct
```

**Esperado:**
```
✅ 27/27 testes passando
📊 Resumo final mostra entidades no banco
```

**Opção 2 - Query Direta (Supabase):**
```sql
SELECT * FROM "Entity" ORDER BY "createdAt" DESC LIMIT 10;
```

**Esperado:**
- Ver todas as entidades criadas manualmente
- Confirmar que `name`, `type`, `email` estão corretos
- Confirmar que `isActive = true`

## 🐛 Troubleshooting

### Problema 1: Toast não aparece

**Solução:**
```bash
# Verificar se o componente Toast está renderizado
# No EntidadeScreen.tsx deve ter:
<Toast
  visible={toast.visible}
  message={toast.message}
  type={toast.type}
  onHide={hideToast}
/>
```

### Problema 2: Modal não fecha

**Causas possíveis:**
1. Erro no try/catch não está sendo tratado
2. `handleCloseForm()` não está sendo chamado
3. Erro de conexão com backend

**Debug:**
```javascript
// Verificar se o console mostra:
🚪 [ENTIDADE] Fechando modal...
```

### Problema 3: Dados não persistem no banco

**Causas possíveis:**
1. Erro de validação (verificar logs do backend)
2. Erro SQL (verificar logs do Prisma)
3. Problema de conexão com Supabase

**Debug:**
```bash
# No terminal backend, procurar por:
❌ [SERVICE] ERRO CRÍTICO ao salvar no banco:
❌ [VALIDATION] Erro de validação:
```

### Problema 4: Lista não atualiza

**Causas possíveis:**
1. `loadEntidades()` não está sendo chamado
2. Erro ao fazer GET após POST/PUT/DELETE

**Debug:**
```javascript
// Verificar se o console mostra:
🔄 [ENTIDADE] Recarregando lista...
🔵 [ENTIDADE] Carregadas: X entidades
```

## ✅ Checklist de Validação

- [ ] Toast de sucesso aparece ao criar
- [ ] Toast de sucesso aparece ao editar
- [ ] Toast de sucesso aparece ao excluir
- [ ] Toast de erro aparece em validações
- [ ] Modal fecha após salvar com sucesso
- [ ] Modal permanece aberto em caso de erro
- [ ] Lista atualiza automaticamente após CRUD
- [ ] Dados persistem no banco (verificar query SQL)
- [ ] Logs aparecem no console do navegador
- [ ] Logs aparecem no terminal do backend
- [ ] Testes automatizados passam (27/27)

## 📚 Arquivos Modificados

### Backend
- ✅ `access-backend/src/middlewares/validation.middleware.ts` - Logs de validação
- ✅ `access-backend/src/services/entities.service.ts` - Try/catch com logs SQL
- ✅ `access-backend/src/validators/entity.validator.ts` - Validação relaxada

### Frontend
- ✅ `src/components/ui/Toast.tsx` - Componente de toast
- ✅ `src/hooks/useToast.ts` - Hook de toast
- ✅ `src/screens/entidade/EntidadeScreen.tsx` - Integração com toast

---

**Data**: 13/10/2025  
**Status**: ✅ Implementado  
**Próximo Passo**: Testar manualmente e corrigir bugs encontrados
