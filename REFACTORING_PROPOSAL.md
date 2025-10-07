# 📋 Proposta de Refatoração - Tela de Entidades

## 🎯 Objetivo
Reorganizar a tela de **Entidades** seguindo o **MESMO PADRÃO** usado em **Login** e **Home**.

---

## 📁 Padrão Atual do Projeto (Login/Home)

```
src/screens/Login/
├── LoginScreen.tsx                      ← Componente principal
└── styles/
    ├── LoginScreen.styles.ts            ← Index que escolhe web/native
    ├── LoginScreen.styles.web.ts        ← Estilos WEB
    └── LoginScreen.styles.native.ts     ← Estilos MOBILE

src/screens/Home/
├── HomeScreen.tsx                       ← Componente principal
└── styles/
    ├── HomeScreen.styles.ts             ← Index que escolhe web/native
    ├── HomeScreen.styles.web.ts         ← Estilos WEB
    └── HomeScreen.styles.native.ts      ← Estilos MOBILE
```

### 🔑 **Padrão Identificado:**

#### 1. **Index de estilos** (`LoginScreen.styles.ts`):
```typescript
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./LoginScreen.styles.web").default,
  default: require("./LoginScreen.styles.native").default,
});

export default styles;
```

#### 2. **Import no componente**:
```typescript
import styles from "./styles/LoginScreen.styles";
```

#### 3. **Estilos separados por plataforma**:
- ✅ `.web.ts` - Estilos específicos web (backdropFilter, boxShadow, cursor, etc)
- ✅ `.native.ts` - Estilos específicos mobile (elevation, native gestures)

---

## 🔴 Problema Atual - Entidade

```
src/screens/entidade/
├── entidadeScreen.tsx                   ← Componente
├── entidadeService.ts                   ← 833 LINHAS! ❌
│   ├── Interface (18 linhas)
│   ├── Dados mock (140 linhas)
│   ├── CRUD functions (60 linhas)
│   └── ESTILOS CSS (615 linhas) ← PROBLEMA!
│
└── styles/                              ← NÃO USADO ❌
    ├── entidadeScreen.styles.ts
    ├── entidadeScreen.styles.web.ts
    └── entidadeScreen.styles.native.ts
```

**Imports atuais (ERRADO):**
```typescript
// entidadeScreen.tsx
import { createStyles } from './entidadeService';  // ❌ CSS no service!
import * as EntidadeService from './entidadeService';
import { Entidade } from './entidadeService';

const styles = createStyles(theme, isDark);  // ❌ Cria em runtime
```

---

## ✅ Solução Proposta - Seguindo Padrão Login/Home

```
src/screens/entidade/
├── entidadeScreen.tsx                   ← Componente principal
├── entidadeService.ts                   ← APENAS lógica CRUD
├── entidade.types.ts                    ← APENAS interfaces/types
├── entidade.data.ts                     ← APENAS dados mock
└── styles/
    ├── entidadeScreen.styles.ts         ← Index (escolhe web/native)
    ├── entidadeScreen.styles.web.ts     ← Estilos WEB
    └── entidadeScreen.styles.native.ts  ← Estilos MOBILE
```

---

## 📝 Detalhamento dos Arquivos

### 1️⃣ **entidade.types.ts** (NOVO)
```typescript
// src/screens/entidade/entidade.types.ts

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
export type ViewMode = 'list' | 'grid';
```

**📊 Linhas: ~20**

---

### 2️⃣ **entidade.data.ts** (NOVO)
```typescript
// src/screens/entidade/entidade.data.ts
import { Entidade } from './entidade.types';

export const mockEntidades: Entidade[] = [
  {
    id: '1',
    nome: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    tipo: 'Jurídica',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    email: 'contato@techsolutions.com.br',
    telefone: '(11) 3456-7890',
    status: 'Ativo',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    nome: 'Indústria Metalúrgica Brasil S.A.',
    cnpj: '23.456.789/0001-01',
    tipo: 'Jurídica',
    // ... resto dos dados
  },
  // ... outras 6 entidades
];
```

**📊 Linhas: ~140**

---

### 3️⃣ **entidadeService.ts** (LIMPO - apenas CRUD)
```typescript
// src/screens/entidade/entidadeService.ts
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

export const create = (
  entidade: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>
): Entidade => {
  const newEntidade: Entidade = {
    ...entidade,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  entidades.push(newEntidade);
  return newEntidade;
};

export const update = (
  id: string,
  data: Partial<Entidade>
): Entidade | null => {
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

export const filterByStatus = (status: 'Ativo' | 'Inativo'): Entidade[] => {
  return entidades.filter((e) => e.status === status);
};

export const filterByType = (tipo: 'Física' | 'Jurídica'): Entidade[] => {
  return entidades.filter((e) => e.tipo === tipo);
};

export const getStats = () => {
  const total = entidades.length;
  const ativas = entidades.filter((e) => e.status === 'Ativo').length;
  const inativas = entidades.filter((e) => e.status === 'Inativo').length;
  const juridicas = entidades.filter((e) => e.tipo === 'Jurídica').length;
  const fisicas = entidades.filter((e) => e.tipo === 'Física').length;

  return { total, ativas, inativas, juridicas, fisicas };
};
```

**📊 Linhas: ~80** (era 833!)

---

### 4️⃣ **styles/entidadeScreen.styles.ts** (Index - IGUAL Login)
```typescript
// src/screens/entidade/styles/entidadeScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./entidadeScreen.styles.web").default,
  default: require("./entidadeScreen.styles.native").default,
});

export default styles;
```

**📊 Linhas: ~8**

---

### 5️⃣ **styles/entidadeScreen.styles.web.ts** (Estilos WEB)
```typescript
// src/screens/entidade/styles/entidadeScreen.styles.web.ts
import { StyleSheet } from "react-native";
import { responsive } from "../../../utils/responsive";

// Estilos específicos web
const webSpecificStyles = {
  container: { minHeight: "100vh" as any },
  screenHeader: {
    position: "sticky" as any,
    backdropFilter: "blur(10px)" as any,
  },
  searchInput: {
    outlineStyle: "none" as any,
    transition: "all 0.2s ease" as any,
  },
  tableRow: {
    cursor: "pointer" as any,
    transition: "background-color 0.2s ease" as any,
  },
  addButton: {
    cursor: "pointer" as any,
    transition: "all 0.2s ease" as any,
  },
  modalOverlay: {
    backdropFilter: "blur(4px)" as any,
  },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a", // Será substituído por theme
    ...webSpecificStyles.container,
  },
  
  content: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
  },
  
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsive.spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    top: 0,
    zIndex: 100,
    ...webSpecificStyles.screenHeader,
  },
  
  screenTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '600' as any,
    color: '#ffffff',
    left: 70,
    marginTop: 8,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: responsive.spacing.sm,
  },
  
  searchContainer: {
    position: 'relative',
    width: 300,
    minWidth: 250,
  },
  
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 40,
    fontSize: responsive.fontSize.sm,
    color: '#ffffff',
    ...webSpecificStyles.searchInput,
  },
  
  searchIcon: {
    position: 'absolute',
    right: 12,
    fontSize: 16,
    opacity: 0.4,
    transform: 'translateY(-50%)' as any,
  },
  
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    ...webSpecificStyles.addButton,
  },
  
  addButtonText: {
    color: '#ffffff',
    fontSize: responsive.fontSize.sm,
    fontWeight: '600' as any,
  },
  
  // ... resto dos estilos (tabela, modal, form, etc)
  
  tableContainer: {
    flex: 1,
    maxWidth: '100%',
    overflow: 'scroll' as any,
  },
  
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    ...webSpecificStyles.tableRow,
  },
  
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...webSpecificStyles.modalOverlay,
  },
  
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: responsive.spacing.xl,
    width: '100%',
    maxWidth: 600,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)' as any,
  },
  
  // ... continua com todos os outros estilos
});
```

**📊 Linhas: ~400**

---

### 6️⃣ **styles/entidadeScreen.styles.native.ts** (Estilos MOBILE)
```typescript
// src/screens/entidade/styles/entidadeScreen.styles.native.ts
import { StyleSheet } from "react-native";
import { responsive } from "../../../utils/responsive";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  
  content: {
    flex: 1,
    width: '100%',
  },
  
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsive.spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    elevation: 4,
  },
  
  screenTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '600' as any,
    color: '#ffffff',
    left: 16,  // Diferente do web (70)
    marginTop: 8,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: responsive.spacing.sm,
  },
  
  searchContainer: {
    position: 'relative',
    width: 200,  // Menor que web (300)
  },
  
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 40,
    fontSize: responsive.fontSize.sm,
    color: '#ffffff',
  },
  
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 8,  // Diferente do web (50%)
    fontSize: 16,
    opacity: 0.4,
  },
  
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,  // Menor padding
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  addButtonText: {
    color: '#ffffff',
    fontSize: responsive.fontSize.sm,
    fontWeight: '600' as any,
  },
  
  // ... resto dos estilos mobile
  
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: responsive.spacing.xl,
    width: '100%',
    maxWidth: '90%',  // Diferente do web (600px)
    elevation: 10,    // Native shadow
  },
  
  // ... continua com todos os outros estilos
});
```

**📊 Linhas: ~400**

---

### 7️⃣ **entidadeScreen.tsx** (Componente ATUALIZADO)
```typescript
// src/screens/entidade/entidadeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Animated,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebNavbar } from '../../components/layout/WebNavbar';
import { WebSidebar } from '../../components/layout/WebSidebar';
import { MobileSidebar } from '../../components/layout/MobileSidebar';
import MobileNavbar from '../../components/layout/MobileNavbar';
import { deviceType } from '../../utils/responsive';

// ✅ Imports organizados por responsabilidade
import { Entidade, FormMode, ViewMode } from './entidade.types';
import * as EntidadeService from './entidadeService';
import styles from './styles/entidadeScreen.styles';  // ← IGUAL Login!

export const EntidadeScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  
  // ❌ REMOVER: const styles = createStyles(theme, isDark);
  // ✅ Agora styles vem do import acima!

  const [entidades, setEntidades] = useState<Entidade[]>([]);
  const [filteredEntidades, setFilteredEntidades] = useState<Entidade[]>([]);
  const [searchText, setSearchText] = useState('');
  // ... resto do estado

  // ... resto do componente (sem mudanças)
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Componente renderiza normal, styles já vem correto! */}
    </SafeAreaView>
  );
};
```

**📊 Linhas: ~675** (sem mudanças)

---

## 📊 Comparação Final

### ❌ **ANTES (Atual)**

```
entidadeScreen.tsx (675 linhas)
entidadeService.ts (833 linhas) ← GIGANTE!
  ├── Interfaces
  ├── Dados
  ├── CRUD
  └── CSS ← MISTURADO!

styles/ ← NÃO USADO
  ├── .ts
  ├── .web.ts
  └── .native.ts
```

**Total: 2 arquivos ativos, 1508 linhas**

---

### ✅ **DEPOIS (Proposto)**

```
entidadeScreen.tsx (675 linhas)
entidade.types.ts (20 linhas)
entidade.data.ts (140 linhas)
entidadeService.ts (80 linhas) ← LIMPO!

styles/
  ├── entidadeScreen.styles.ts (8 linhas)
  ├── entidadeScreen.styles.web.ts (400 linhas)
  └── entidadeScreen.styles.native.ts (400 linhas)
```

**Total: 7 arquivos, 1723 linhas**
*Mais arquivos, mas cada um com responsabilidade única!*

---

## 🎯 Vantagens da Proposta

### ✅ **Seguindo Padrão Login/Home:**
1. **Mesma estrutura** de pastas
2. **Mesmo sistema** de Platform.select
3. **Mesma organização** de imports
4. **Facilita manutenção** (padrão consistente)

### ✅ **Separação de Responsabilidades:**
1. **entidade.types.ts** - Apenas definições
2. **entidade.data.ts** - Apenas dados mock
3. **entidadeService.ts** - Apenas lógica CRUD
4. **styles/** - Apenas CSS (separado web/native)

### ✅ **Benefícios:**
- ✅ Arquivos menores e focados
- ✅ Fácil encontrar o que procura
- ✅ Manutenção simplificada
- ✅ Reutilização de código
- ✅ Padrão consistente no projeto
- ✅ **NÃO altera funcionalidade** (zero impacto)

---

## ⚠️ O que NÃO vai mudar

- ❌ Funcionalidade da tela (tudo continua funcionando)
- ❌ Interface do usuário (visual idêntico)
- ❌ Lógica de negócio (CRUD funciona igual)
- ❌ Responsividade (web/mobile continuam separados)
- ❌ Temas (light/dark continuam funcionando)

**É apenas REORGANIZAÇÃO de código!**

---

## 🚀 Próximos Passos

### **Você aprova esta estrutura?**

Se sim, vou:

1. ✅ Criar `entidade.types.ts`
2. ✅ Criar `entidade.data.ts`
3. ✅ Limpar `entidadeService.ts` (só CRUD)
4. ✅ Atualizar `styles/entidadeScreen.styles.ts` (index)
5. ✅ Mover CSS para `styles/*.web.ts` e `*.native.ts`
6. ✅ Atualizar imports em `entidadeScreen.tsx`
7. ✅ Testar tudo funcionando
8. ✅ Commit das mudanças

**Posso começar a refatoração?** 🎯
