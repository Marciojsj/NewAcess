# Padronização de Nomenclatura - Projeto AccessControl

## Data da Padronização
7 de outubro de 2025

## Convenções Adotadas

### 📁 Pastas
- **Todas em minúsculas (lowercase)** ou **camelCase** para nomes compostos
- Exemplos:
  - ✅ `src/screens/home/`
  - ✅ `src/screens/login/`
  - ✅ `src/screens/entidade/`
  - ✅ `src/screens/registrarEntrada/`
  - ✅ `src/components/layout/`
  - ✅ `src/components/ui/`

### 📄 Arquivos

#### Componentes React (.tsx)
- **PascalCase** - primeira letra de cada palavra em maiúscula
- Exemplos:
  - ✅ `HomeScreen.tsx`
  - ✅ `LoginScreen.tsx`
  - ✅ `EntidadeScreen.tsx`
  - ✅ `RegistrarEntidadeScreen.tsx`
  - ✅ `MobileNavbar.tsx`
  - ✅ `WebSidebar.tsx`
  - ✅ `LoadingSpinner.tsx`
  - ✅ `AnimatedInput.tsx`

#### Arquivos de Estilo (.styles.ts)
- **PascalCase seguindo o nome do componente**
- Exemplos:
  - ✅ `HomeScreen.styles.ts`
  - ✅ `HomeScreen.styles.web.ts`
  - ✅ `HomeScreen.styles.native.ts`
  - ✅ `EntidadeScreen.styles.ts`
  - ✅ `RegistrarEntidadeScreen.styles.ts`

#### Hooks (.ts)
- **camelCase** iniciando com `use`
- Exemplos:
  - ✅ `useKeyboard.ts`
  - ✅ `useEntities.ts`
  - ✅ `useEntityForm.ts`

#### Contexts (.tsx)
- **PascalCase** terminando com `Context`
- Exemplos:
  - ✅ `AuthContext.tsx`
  - ✅ `ThemeContext.tsx`

#### Services (.ts)
- **camelCase**
- Exemplos:
  - ✅ `entityService.ts`
  - ✅ `entityApi.ts`
  - ✅ `entidadeService.ts`

#### Types/Interfaces (.ts)
- **camelCase**
- Exemplos:
  - ✅ `entity.ts`
  - ✅ `entityTypes.ts`
  - ✅ `entidade.types.ts`
  - ✅ `permissions.ts`

#### Utils (.ts)
- **camelCase**
- Exemplos:
  - ✅ `responsive.ts`
  - ✅ `themeHelpers.ts`
  - ✅ `entityHelpers.ts`

#### Arquivos de Configuração
- **Lowercase com hífens ou pontos**
- Exemplos:
  - ✅ `jest.config.js`
  - ✅ `jest.setup.js`
  - ✅ `metro.config.js`
  - ✅ `tsconfig.json`
  - ✅ `package.json`
  - ✅ `app.json`

## Mudanças Realizadas

### 1. Pastas Renomeadas
- `src/screens/Home/` → `src/screens/home/`
- `src/screens/Login/` → `src/screens/login/`

### 2. Arquivos Renomeados

#### Componentes
- `src/screens/entidade/entidadeScreen.tsx` → `EntidadeScreen.tsx`
- `src/screens/registrarEntidade/registrarEntidade.tsx` → `RegistrarEntidadeScreen.tsx`

#### Estilos
- `src/screens/entidade/styles/entidadeScreen.styles.ts` → `EntidadeScreen.styles.ts`
- `src/screens/entidade/styles/entidadeScreen.styles.web.ts` → `EntidadeScreen.styles.web.ts`
- `src/screens/entidade/styles/entidadeScreen.styles.native.ts` → `EntidadeScreen.styles.native.ts`
- `src/screens/registrarEntidade/styles/registrarEntidade.styles.ts` → `RegistrarEntidadeScreen.styles.ts`
- `src/screens/registrarEntidade/styles/registrarEntidade.styles.web.ts` → `RegistrarEntidadeScreen.styles.web.ts`
- `src/screens/registrarEntidade/styles/registrarEntidade.styles.native.ts` → `RegistrarEntidadeScreen.styles.native.ts`

### 3. Importações Atualizadas

#### App.tsx
```typescript
// ANTES
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import { EntidadeScreen } from './src/screens/entidade/entidadeScreen';

// DEPOIS
import HomeScreen from './src/screens/home/HomeScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import { EntidadeScreen } from './src/screens/entidade/EntidadeScreen';
```

#### src/screens/entidade/index.ts
```typescript
// ANTES
export { EntidadeScreen } from './entidadeScreen';

// DEPOIS
export { EntidadeScreen } from './EntidadeScreen';
```

#### src/screens/entidade/EntidadeScreen.tsx
```typescript
// ANTES
import styles from './styles/entidadeScreen.styles';

// DEPOIS
import styles from './styles/EntidadeScreen.styles';
```

#### src/screens/entidade/styles/EntidadeScreen.styles.ts
```typescript
// ANTES
const styles = Platform.select({
  web: require('./entidadeScreen.styles.web').default,
  default: require('./entidadeScreen.styles.native').default,
});

// DEPOIS
const styles = Platform.select({
  web: require('./EntidadeScreen.styles.web').default,
  default: require('./EntidadeScreen.styles.native').default,
});
```

#### Testes
- `__tests__/screens/HomeScreen.test.tsx` → Importação atualizada
- `__tests__/screens/LoginScreen.test.tsx` → Importação atualizada
- `__tests__/screens/entidadeScreen.test.tsx` → Importação atualizada

## Estrutura Final Padronizada

```
src/
├── components/          (lowercase)
│   ├── entity/         (lowercase)
│   ├── layout/         (lowercase)
│   │   ├── MobileNavbar.tsx        (PascalCase)
│   │   ├── MobileSidebar.tsx       (PascalCase)
│   │   ├── MobileFooter.tsx        (PascalCase)
│   │   ├── WebNavbar.tsx           (PascalCase)
│   │   ├── WebSidebar.tsx          (PascalCase)
│   │   └── ResponsiveContainer.tsx (PascalCase)
│   └── ui/             (lowercase)
│       ├── AnimatedBackground.tsx  (PascalCase)
│       ├── AnimatedInput.tsx       (PascalCase)
│       ├── LoadingSpinner.tsx      (PascalCase)
│       ├── SearchModal.tsx         (PascalCase)
│       └── ThemeToggle.tsx         (PascalCase)
│
├── contexts/           (lowercase)
│   ├── AuthContext.tsx        (PascalCase)
│   └── ThemeContext.tsx       (PascalCase)
│
├── hooks/             (lowercase)
│   ├── useEntities.ts        (camelCase)
│   ├── useEntityForm.ts      (camelCase)
│   └── useKeyboard.ts        (camelCase)
│
├── screens/           (lowercase)
│   ├── alertas/      (lowercase)
│   │   ├── AlertasScreen.tsx                      (PascalCase)
│   │   └── styles/
│   │       ├── AlertasScreen.styles.ts           (PascalCase)
│   │       ├── AlertasScreen.styles.web.ts       (PascalCase)
│   │       └── AlertasScreen.styles.native.ts    (PascalCase)
│   │
│   ├── entidade/     (lowercase)
│   │   ├── EntidadeScreen.tsx                     (PascalCase)
│   │   ├── entidade.data.ts                       (camelCase)
│   │   ├── entidade.types.ts                      (camelCase)
│   │   ├── entidadeService.ts                     (camelCase)
│   │   ├── index.ts                               (lowercase)
│   │   └── styles/
│   │       ├── EntidadeScreen.styles.ts          (PascalCase)
│   │       ├── EntidadeScreen.styles.web.ts      (PascalCase)
│   │       └── EntidadeScreen.styles.native.ts   (PascalCase)
│   │
│   ├── home/         (lowercase)
│   │   ├── HomeScreen.tsx                         (PascalCase)
│   │   └── styles/
│   │       ├── HomeScreen.styles.ts              (PascalCase)
│   │       ├── HomeScreen.styles.web.ts          (PascalCase)
│   │       └── HomeScreen.styles.native.ts       (PascalCase)
│   │
│   ├── login/        (lowercase)
│   │   ├── LoginScreen.tsx                        (PascalCase)
│   │   └── styles/
│   │       ├── LoginScreen.styles.ts             (PascalCase)
│   │       ├── LoginScreen.styles.web.ts         (PascalCase)
│   │       └── LoginScreen.styles.native.ts      (PascalCase)
│   │
│   ├── registrarEntrada/  (camelCase)
│   │   ├── RegistrarEntradaScreen.tsx             (PascalCase)
│   │   └── styles/
│   │       ├── RegistrarEntradaScreen.styles.ts  (PascalCase)
│   │       ├── RegistrarEntradaScreen.styles.web.ts    (PascalCase)
│   │       └── RegistrarEntradaScreen.styles.native.ts (PascalCase)
│   │
│   ├── registrarEntidade/ (camelCase)
│   │   ├── RegistrarEntidadeScreen.tsx            (PascalCase)
│   │   └── styles/
│   │       ├── RegistrarEntidadeScreen.styles.ts (PascalCase)
│   │       ├── RegistrarEntidadeScreen.styles.web.ts   (PascalCase)
│   │       └── RegistrarEntidadeScreen.styles.native.ts (PascalCase)
│   │
│   ├── registrarSaida/    (camelCase)
│   │   ├── RegistrarSaidaScreen.tsx               (PascalCase)
│   │   └── styles/
│   │       ├── RegistrarSaidaScreen.styles.ts    (PascalCase)
│   │       ├── RegistrarSaidaScreen.styles.web.ts      (PascalCase)
│   │       └── RegistrarSaidaScreen.styles.native.ts   (PascalCase)
│   │
│   ├── relatorios/   (lowercase)
│   │   ├── RelatoriosScreen.tsx                   (PascalCase)
│   │   └── styles/
│   │       ├── RelatoriosScreen.styles.ts        (PascalCase)
│   │       ├── RelatoriosScreen.styles.web.ts    (PascalCase)
│   │       └── RelatoriosScreen.styles.native.ts (PascalCase)
│   │
│   └── visitantes/   (lowercase)
│       ├── VisitantesScreen.tsx                   (PascalCase)
│       └── styles/
│           ├── VisitantesScreen.styles.ts        (PascalCase)
│           ├── VisitantesScreen.styles.web.ts    (PascalCase)
│           └── VisitantesScreen.styles.native.ts (PascalCase)
│
├── services/          (lowercase)
│   ├── entityApi.ts          (camelCase)
│   └── entityService.ts      (camelCase)
│
├── types/             (lowercase)
│   ├── entity.ts            (camelCase)
│   ├── entityTypes.ts       (camelCase)
│   └── permissions.ts       (camelCase)
│
└── utils/             (lowercase)
    ├── entityHelpers.ts     (camelCase)
    ├── responsive.ts        (camelCase)
    └── themeHelpers.ts      (camelCase)
```

## Benefícios da Padronização

1. **Consistência**: Todo o código segue o mesmo padrão
2. **Legibilidade**: Fácil identificar o tipo de arquivo pela nomenclatura
3. **Manutenibilidade**: Facilita encontrar e modificar arquivos
4. **Colaboração**: Novos desenvolvedores seguem o padrão facilmente
5. **Boas Práticas**: Alinhado com convenções da comunidade React/TypeScript

## Regras para Novos Arquivos

1. **Componentes React**: Sempre PascalCase
2. **Hooks personalizados**: Sempre camelCase iniciando com `use`
3. **Arquivos de serviço/utils**: Sempre camelCase
4. **Pastas**: Sempre lowercase ou camelCase (nunca PascalCase)
5. **Arquivos de estilo**: Seguir o nome do componente com sufixo `.styles`

## Verificação

Para verificar se todos os arquivos seguem o padrão, você pode usar:

```bash
# Verificar componentes (devem estar em PascalCase)
find src -name "*.tsx" -not -path "*/node_modules/*"

# Verificar hooks (devem começar com 'use')
find src/hooks -name "*.ts"

# Verificar se há pastas com letra maiúscula indevida
find src -type d -name "[A-Z]*"
```

## Status
✅ **Padronização Completa** - Todos os arquivos e pastas foram renomeados e as importações atualizadas.
