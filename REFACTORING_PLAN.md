# 🔄 Plano de Refatoração - Todas as Screens

## 📋 Status das Telas

### ✅ **JÁ CORRETAS (Padrão Estabelecido)**
```
✅ Login/
   ├── LoginScreen.tsx
   └── styles/
       ├── LoginScreen.styles.ts
       ├── LoginScreen.styles.web.ts
       └── LoginScreen.styles.native.ts

✅ Home/
   ├── HomeScreen.tsx
   └── styles/
       ├── HomeScreen.styles.ts
       ├── HomeScreen.styles.web.ts
       └── HomeScreen.styles.native.ts
```

---

## 🔧 **PRECISAM REFATORAÇÃO**

### 1. **entidade/** ⚠️
**Status Atual:**
```
❌ entidadeScreen.tsx
❌ entidadeService.ts (833 linhas - CSS + CRUD + dados)
❌ styles/ (arquivos existem mas não são usados)
```

**Ações:**
1. Criar `entidade.types.ts`
2. Criar `entidade.data.ts`
3. Limpar `entidadeService.ts` (só CRUD)
4. Mover CSS para `styles/*.web.ts` e `*.native.ts`
5. Criar `styles/entidadeScreen.styles.ts` (index)
6. Atualizar imports em `entidadeScreen.tsx`

---

### 2. **alertas/** 🔍
**Verificar estrutura atual...**

---

### 3. **registrarEntrada/** 🔍
**Verificar estrutura atual...**

---

### 4. **registrarSaida/** 🔍
**Verificar estrutura atual...**

---

### 5. **registrarEntidade/** 🔍
**Verificar estrutura atual...**

---

### 6. **relatorios/** 🔍
**Verificar estrutura atual...**

---

### 7. **visitantes/** 🔍
**Verificar estrutura atual...**

---

## 🎯 Ordem de Execução

1. ✅ **entidade** (já mapeada - começar aqui)
2. 🔍 Verificar outras telas
3. 🔧 Refatorar cada uma seguindo o padrão
4. ✅ Testar cada tela após refatoração
5. 📝 Commit após cada tela completa

---

## 📝 Checklist por Tela

Para cada screen:
- [ ] Verificar estrutura atual
- [ ] Criar `*.types.ts` (se necessário)
- [ ] Criar `*.data.ts` (se tiver dados mock)
- [ ] Criar/Limpar `*Service.ts` (se tiver)
- [ ] Garantir `styles/` com 3 arquivos:
  - [ ] `*.styles.ts` (index)
  - [ ] `*.styles.web.ts`
  - [ ] `*.styles.native.ts`
- [ ] Atualizar imports no componente
- [ ] Testar funcionamento
- [ ] Commit

---

Iniciando análise de todas as telas...
