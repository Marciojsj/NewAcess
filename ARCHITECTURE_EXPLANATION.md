# 📚 Explicação: Estrutura de Arquivos de Estilo

## 🤔 Sua Dúvida

Você perguntou sobre a estrutura dos arquivos:
- **O que é o arquivo `entidadeService.ts`?**
- **Por que CSS em um arquivo de "service"?**
- **Os arquivos `.web.ts` e `.native.ts` estão sendo usados?**

---

## 📁 Estrutura Atual

```
src/screens/entidade/
├── entidadeScreen.tsx                    ← Componente principal
├── entidadeService.ts                    ← ⚠️ PROBLEMA AQUI!
└── styles/
    ├── entidadeScreen.styles.ts          ← ❌ NÃO USADO
    ├── entidadeScreen.styles.web.ts      ← ❌ NÃO USADO
    └── entidadeScreen.styles.native.ts   ← ❌ NÃO USADO
```

---

## ⚠️ PROBLEMA IDENTIFICADO

### O arquivo `entidadeService.ts` está **MISTURANDO RESPONSABILIDADES**:

```typescript
// ❌ ERRADO: Tudo no mesmo arquivo!

// 1. Interface de dados
export interface Entidade { ... }

// 2. Dados mockados
let entidades: Entidade[] = [ ... ]

// 3. Funções CRUD (Service)
export const getAll = () => { ... }
export const create = () => { ... }
export const update = () => { ... }
export const delete = () => { ... }

// 4. ESTILOS CSS (???)  ← NÃO DEVERIA ESTAR AQUI!
export const createStyles = (theme, isDark) => StyleSheet.create({
  container: { ... },
  screenHeader: { ... },
  searchInput: { ... },
  // ... 800+ linhas de CSS ...
})
```

### 🔴 Problemas desta abordagem:

1. **Arquivo GIGANTE** (833 linhas)
2. **Responsabilidades misturadas** (dados + lógica + CSS)
3. **Difícil manutenção**
4. **Arquivos `.web.ts` e `.native.ts` NÃO estão sendo usados**
5. **Viola princípios SOLID** (Single Responsibility)

---

## ✅ SOLUÇÃO: Separar Responsabilidades

### 📂 Estrutura CORRETA:

```
src/screens/entidade/
├── entidadeScreen.tsx                    ← Componente
├── entidadeService.ts                    ← APENAS lógica CRUD
├── entidade.types.ts                     ← APENAS interfaces
├── entidade.data.ts                      ← APENAS dados mock
└── styles/
    ├── index.ts                          ← Exporta estilos corretos
    ├── entidadeScreen.styles.web.ts      ← Estilos WEB
    └── entidadeScreen.styles.native.ts   ← Estilos MOBILE
```

---

## 🔧 Como Corrigir

### **PASSO 1: Criar arquivo de tipos**

**`src/screens/entidade/entidade.types.ts`**
```typescript
export interface Entidade {
  id: string;
  nome: string;
  cnpj: string;
  tipo: 'Física' | 'Jurídica';
  endereco?: string;
  cidade?: string;
  estado?: string;
  email: string;
  telefone?: string;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
  updatedAt: string;
}

export type FormMode = 'create' | 'edit' | 'view' | null;
```

---

### **PASSO 2: Criar arquivo de dados mock**

**`src/screens/entidade/entidade.data.ts`**
```typescript
import { Entidade } from './entidade.types';

export const mockEntidades: Entidade[] = [
  {
    id: '1',
    nome: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    tipo: 'Jurídica',
    // ... resto dos dados
  },
  // ... outras entidades
];
```

---

### **PASSO 3: Limpar entidadeService.ts (APENAS lógica)**

**`src/screens/entidade/entidadeService.ts`**
```typescript
import { Entidade } from './entidade.types';
import { mockEntidades } from './entidade.data';

let entidades: Entidade[] = [...mockEntidades];

// ✅ APENAS funções de negócio
export const getAll = (): Entidade[] => {
  return [...entidades];
};

export const getById = (id: string): Entidade | undefined => {
  return entidades.find((e) => e.id === id);
};

export const create = (entidade: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>): Entidade => {
  const newEntidade: Entidade = {
    ...entidade,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  entidades.push(newEntidade);
  return newEntidade;
};

export const update = (id: string, data: Partial<Entidade>): Entidade | null => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return null;

  entidades[index] = {
    ...entidades[index],
    ...data,
    id: entidades[index].id,
    updatedAt: new Date().toISOString(),
  };
  return entidades[index];
};

export const deleteEntidade = (id: string): boolean => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return false;
  entidades.splice(index, 1);
  return true;
};

export const search = (term: string): Entidade[] => {
  const normalized = term.toLowerCase().trim();
  if (!normalized) return [...entidades];

  return entidades.filter(
    (e) =>
      e.nome.toLowerCase().includes(normalized) ||
      e.cnpj.includes(normalized) ||
      e.email.toLowerCase().includes(normalized) ||
      e.cidade?.toLowerCase().includes(normalized) ||
      e.estado?.toLowerCase().includes(normalized)
  );
};

// ... outras funções
```

---

### **PASSO 4: Criar index de estilos responsivos**

**`src/screens/entidade/styles/index.ts`**
```typescript
import { Platform } from 'react-native';

// Importa estilos específicos
import webStyles from './entidadeScreen.styles.web';
import nativeStyles from './entidadeScreen.styles.native';

// Exporta estilos corretos baseado na plataforma
export const getStyles = () => {
  return Platform.OS === 'web' ? webStyles : nativeStyles;
};

export default getStyles;
```

---

### **PASSO 5: Criar estilos com tema dinâmico**

**`src/screens/entidade/styles/createStyles.ts`**
```typescript
import { StyleSheet, Platform } from 'react-native';
import { Theme } from '../../../contexts/ThemeContext';
import { responsive } from '../../../utils/responsive';

export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    
    screenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      ...Platform.select({
        web: {
          position: 'sticky' as any,
          top: 0,
          zIndex: 100,
        },
      }),
    },
    
    searchContainer: {
      position: 'relative',
      ...Platform.select({
        web: {
          width: 300,
          minWidth: 250,
        },
        default: {
          width: 200,
        },
      }),
    },
    
    // ... resto dos estilos
  });

export default createStyles;
```

---

### **PASSO 6: Atualizar componente**

**`src/screens/entidade/entidadeScreen.tsx`**
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, /* ... */ } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

// ✅ Imports organizados por responsabilidade
import { Entidade, FormMode } from './entidade.types';
import * as EntidadeService from './entidadeService';
import createStyles from './styles/createStyles';

export const EntidadeScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  
  // ✅ Cria estilos dinamicamente baseado no tema
  const styles = createStyles(theme, isDark);

  // ... resto do componente
};
```

---

## 📊 Comparação: Antes vs Depois

### ❌ **ANTES (Atual)**

```
entidadeService.ts (833 linhas)
├── Interface Entidade (18 linhas)
├── Dados mock (140 linhas)
├── Funções CRUD (60 linhas)
└── Estilos CSS (615 linhas)  ← MISTURADO!

styles/
├── entidadeScreen.styles.web.ts       ← NÃO USADO
└── entidadeScreen.styles.native.ts    ← NÃO USADO
```

**Problemas:**
- ❌ Arquivo gigante (833 linhas)
- ❌ Responsabilidades misturadas
- ❌ Arquivos específicos não usados
- ❌ Difícil manutenção

---

### ✅ **DEPOIS (Recomendado)**

```
entidade.types.ts (20 linhas)
├── Interfaces
└── Types

entidade.data.ts (140 linhas)
└── Dados mock

entidadeService.ts (80 linhas)
└── Funções CRUD

styles/
├── createStyles.ts (615 linhas)       ← Estilos com Platform.select
├── index.ts (10 linhas)               ← Exporta estilos
├── entidadeScreen.styles.web.ts       ← Usado se necessário
└── entidadeScreen.styles.native.ts    ← Usado se necessário
```

**Vantagens:**
- ✅ Cada arquivo com responsabilidade única
- ✅ Fácil manutenção
- ✅ Arquivos pequenos e focados
- ✅ Reutilização de código
- ✅ Melhor organização

---

## 🎯 Qual Abordagem Usar?

### **Opção 1: Platform.select (Atual - mas separado)**
```typescript
// createStyles.ts
export const createStyles = (theme, isDark) => StyleSheet.create({
  container: {
    ...Platform.select({
      web: { maxWidth: 1200 },
      default: { width: '100%' }
    })
  }
});
```

**Quando usar:**
- ✅ Mesma estrutura, estilos ligeiramente diferentes
- ✅ Poucos ajustes entre plataformas
- ✅ Manutenção centralizada

---

### **Opção 2: Arquivos Separados (.web.ts / .native.ts)**
```typescript
// styles/index.ts
import { Platform } from 'react-native';
import webStyles from './entidadeScreen.styles.web';
import nativeStyles from './entidadeScreen.styles.native';

export default Platform.OS === 'web' ? webStyles : nativeStyles;
```

**Quando usar:**
- ✅ Layouts completamente diferentes
- ✅ Muitas diferenças entre plataformas
- ✅ Equipes separadas (web/mobile)

---

## 💡 Recomendação Final

### Para o seu caso:

**Use Platform.select MAS organize em arquivos separados:**

```
src/screens/entidade/
├── entidadeScreen.tsx           ← Componente
├── entidadeService.ts           ← APENAS CRUD
├── entidade.types.ts            ← APENAS tipos
├── entidade.data.ts             ← APENAS dados
└── styles/
    └── createStyles.ts          ← APENAS estilos com Platform.select
```

**Por quê?**
1. ✅ Mantém flexibilidade do Platform.select
2. ✅ Separa responsabilidades
3. ✅ Facilita manutenção
4. ✅ Arquivos menores e focados

---

## 🚀 Próximos Passos

Quer que eu refatore o código para seguir esta estrutura correta?

1. Separar tipos em arquivo próprio
2. Separar dados mock
3. Limpar entidadeService (só CRUD)
4. Mover estilos para pasta styles/
5. Manter Platform.select funcionando

**Isso deixará o código muito mais organizado e profissional!** 🎉
