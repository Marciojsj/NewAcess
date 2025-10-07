# 🎯 PLANO COMPLETO DE REFATORAÇÃO

## 📊 Status Atual de Todas as Telas

### ✅ **CORRETAS** (Padrão Estabelecido)
```
✅ Login/       - Estrutura perfeita, usar como referência
✅ Home/        - Estrutura perfeita, usar como referência
```

### 🔧 **PRECISAM REFATORAÇÃO**

#### 1. **entidade/** ⚠️ PRIORIDADE 1 (Mais complexa)
```
❌ entidadeScreen.tsx
❌ entidadeService.ts (833 linhas - CSS + CRUD + dados misturados!)
⚠️ styles/ (3 arquivos existem mas NÃO usados)
   ├── entidadeScreen.styles.ts (vazio)
   ├── entidadeScreen.styles.web.ts (tem conteúdo)
   └── entidadeScreen.styles.native.ts (tem conteúdo)
```
**Ações:**
- [x] Criar `entidade.types.ts` (interfaces)
- [x] Criar `entidade.data.ts` (dados mock)
- [x] Limpar `entidadeService.ts` (APENAS CRUD)
- [x] Preencher `styles/entidadeScreen.styles.ts` (index Platform.select)
- [x] Mover CSS do service para `styles/*.web.ts` e `*.native.ts`
- [x] Atualizar imports em `entidadeScreen.tsx`
- [x] Testar funcionamento

---

#### 2. **alertas/**
```
✅ AlertasScreen.tsx
⚠️ styles/ (arquivos VAZIOS)
   ├── AlertasScreen.styles.ts (vazio!)
   ├── AlertasScreen.styles.web.ts (vazio!)
   └── AlertasScreen.styles.native.ts (vazio!)
```
**Ações:**
- [ ] Verificar se há CSS inline ou em outro lugar
- [ ] Criar estilos web/native
- [ ] Preencher index styles.ts

---

#### 3. **registrarEntrada/**
```
✅ RegistrarEntradaScreen.tsx
⚠️ styles/ (arquivos VAZIOS)
   ├── RegistrarEntradaScreen.styles.ts (vazio!)
   ├── RegistrarEntradaScreen.styles.web.ts (vazio!)
   └── RegistrarEntradaScreen.styles.native.ts (vazio!)
```
**Ações:**
- [ ] Verificar se há CSS inline
- [ ] Criar estilos web/native
- [ ] Preencher index

---

#### 4. **registrarSaida/**
```
✅ RegistrarSaidaScreen.tsx
⚠️ styles/ (arquivos provavelmente vazios)
```
**Ações:**
- [ ] Verificar estrutura
- [ ] Criar estilos se necessário

---

#### 5. **registrarEntidade/**
```
✅ registrarEntidade.tsx
⚠️ styles/ (arquivos provavelmente vazios)
```
**Ações:**
- [ ] Verificar estrutura
- [ ] Criar estilos se necessário

---

#### 6. **relatorios/**
```
✅ RelatoriosScreen.tsx
⚠️ styles/ (arquivos provavelmente vazios)
```
**Ações:**
- [ ] Verificar estrutura
- [ ] Criar estilos se necessário

---

#### 7. **visitantes/**
```
✅ VisitantesScreen.tsx
⚠️ styles/ (arquivos VAZIOS)
   ├── VisitantesScreen.styles.ts (vazio!)
   ├── VisitantesScreen.styles.web.ts (vazio!)
   └── VisitantesScreen.styles.native.ts (vazio!)
```
**Ações:**
- [ ] Verificar se há CSS inline
- [ ] Criar estilos web/native
- [ ] Preencher index

---

## 🚀 ORDEM DE EXECUÇÃO

### **FASE 1: ENTIDADE (Mais Complexa)** 🔴
```
1. ✅ Criar entidade.types.ts
2. ✅ Criar entidade.data.ts
3. ✅ Extrair CSS do entidadeService.ts
4. ✅ Criar styles/entidadeScreen.styles.web.ts (com CSS)
5. ✅ Criar styles/entidadeScreen.styles.native.ts (com CSS)
6. ✅ Criar styles/entidadeScreen.styles.ts (index)
7. ✅ Limpar entidadeService.ts (só CRUD)
8. ✅ Atualizar entidadeScreen.tsx (imports)
9. ✅ Testar
10. ✅ Commit
```

### **FASE 2: OUTRAS TELAS (Mais Simples)** 🟡
Para cada tela:
```
1. Verificar se há CSS inline ou em service
2. Se tiver, extrair para styles/
3. Criar types.ts se necessário
4. Criar data.ts se tiver dados mock
5. Criar/limpar service.ts se existir
6. Preencher styles/*.web.ts e *.native.ts
7. Preencher styles/*.styles.ts (index)
8. Atualizar imports no componente
9. Testar
10. Commit
```

---

## 📝 TEMPLATE DE ESTRUTURA (Para todas as telas)

```
<NomeTela>/
├── <NomeTela>Screen.tsx          ← Componente principal
├── <nomeTela>.types.ts           ← Interfaces/Types (se necessário)
├── <nomeTela>.data.ts            ← Dados mock (se necessário)
├── <nomeTela>Service.ts          ← Lógica CRUD (se necessário)
└── styles/
    ├── <NomeTela>Screen.styles.ts       ← Index Platform.select
    ├── <NomeTela>Screen.styles.web.ts   ← CSS WEB
    └── <NomeTela>Screen.styles.native.ts ← CSS MOBILE
```

**Exemplo - Alertas:**
```
alertas/
├── AlertasScreen.tsx
├── alertas.types.ts (se necessário)
├── alertas.data.ts (se necessário)
├── alertasService.ts (se necessário)
└── styles/
    ├── AlertasScreen.styles.ts
    ├── AlertasScreen.styles.web.ts
    └── AlertasScreen.styles.native.ts
```

---

## ⚙️ TEMPLATE DO INDEX (styles/*.styles.ts)

```typescript
// src/screens/<tela>/styles/<Tela>Screen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./<Tela>Screen.styles.web").default,
  default: require("./<Tela>Screen.styles.native").default,
});

export default styles;
```

---

## 🎯 COMEÇANDO AGORA

**Iniciando FASE 1: ENTIDADE**

Vou refatorar a tela de entidade seguindo os 10 passos...
