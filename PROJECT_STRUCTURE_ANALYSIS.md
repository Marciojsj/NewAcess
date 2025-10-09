# Análise Completa da Estrutura do Projeto - Access Control

**Data da Análise:** 9 de outubro de 2025  
**Projeto:** Sistema de Controle de Acesso  
**Stack:** React Native + Expo (Cross-platform: Web, iOS, Android)

---

## 📋 ÍNDICE

1. [Visão Geral do Projeto](#visão-geral)
2. [Arquitetura Atual](#arquitetura-atual)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Tecnologias e Dependências](#tecnologias-e-dependências)
5. [Componentes Principais](#componentes-principais)
6. [Fluxo de Dados](#fluxo-de-dados)
7. [Estado Atual do Backend](#estado-atual-do-backend)
8. [Proposta de Integração Backend](#proposta-de-integração-backend)
9. [Roadmap de Implementação](#roadmap-de-implementação)

---

## 🎯 VISÃO GERAL

### Objetivo do Sistema
Sistema de controle de acesso para gerenciamento de entidades, visitantes, entradas e saídas, com suporte para web e mobile.

### Características Principais
- ✅ **Cross-platform:** Web, iOS, Android
- ✅ **Multiplataforma UI:** Interfaces adaptadas para mobile e desktop
- ✅ **Gerenciamento de Entidades:** CRUD completo
- ✅ **Sistema de Temas:** Dark/Light mode
- ✅ **Navegação:** React Navigation
- ✅ **TypeScript:** Tipagem forte
- ⚠️ **Backend:** Atualmente usando dados mockados (local)

---

## 🏗️ ARQUITETURA ATUAL

### Padrão Arquitetural
```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER             │
│  (Screens + Components + Navigation)     │
├─────────────────────────────────────────┤
│          BUSINESS LOGIC LAYER            │
│    (Contexts + Hooks + Services)         │
├─────────────────────────────────────────┤
│            DATA LAYER                    │
│   (Types + Utils + Mock Data)            │
└─────────────────────────────────────────┘
```

### Fluxo Atual de Dados
```
Screen/Component
    ↓
Context (Estado Global)
    ↓
Custom Hooks (Lógica de Negócio)
    ↓
Services (API Mock Local)
    ↓
Mock Data (Dados Simulados)
```

---

## 📁 ESTRUTURA DE DIRETÓRIOS

```
accesControl/
├── 📱 android/                      # Configurações Android nativas
│   ├── app/
│   │   ├── build.gradle            # Build config Android
│   │   └── src/                    # Código fonte Android
│   └── gradle/                     # Gradle wrapper
│
├── 🎨 assets/                       # Recursos estáticos
│   ├── icon.png                    # Ícone do app
│   ├── splash-icon.png             # Splash screen
│   └── adaptive-icon.png           # Ícone adaptativo
│
├── 📝 coverage/                     # Relatórios de cobertura de testes
│
├── 🧪 __tests__/                    # Testes automatizados
│   ├── components/                 # Testes de componentes
│   │   ├── layout/
│   │   └── ui/
│   ├── contexts/                   # Testes de contextos
│   │   ├── AuthContext.test.tsx
│   │   └── ThemeContext.test.tsx
│   ├── hooks/                      # Testes de hooks customizados
│   ├── screens/                    # Testes de telas
│   ├── services/                   # Testes de serviços
│   └── utils/                      # Testes de utilitários
│
├── 🛠️ scripts/                      # Scripts de automação
│   ├── create-styles-structure.sh
│   └── verificar-nomenclatura.sh
│
├── 💻 src/                          # CÓDIGO FONTE PRINCIPAL
│   │
│   ├── 🎭 components/               # Componentes reutilizáveis
│   │   ├── layout/                 # Componentes de layout
│   │   │   ├── WebNavbar.tsx       # Navbar web (topo)
│   │   │   ├── MobileNavbar.tsx    # Navbar mobile (topo)
│   │   │   ├── WebSidebar.tsx      # Sidebar web (lateral)
│   │   │   ├── MobileSidebar.tsx   # Sidebar mobile (drawer)
│   │   │   
│   │   │
│   │   └── ui/                     # Componentes UI genéricos
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   │
│   ├── 🔄 contexts/                 # Contextos React (Estado Global)
│   │   ├── AuthContext.tsx         # Autenticação e usuário
│   │   └── ThemeContext.tsx        # Tema dark/light
│   │
│   ├── 🪝 hooks/                    # Custom Hooks
│   │   ├── useEntities.ts          # Hook para gerenciar entidades
│   │   ├── useEntityForm.ts        # Hook para formulários de entidade
│   │   └── useKeyboard.ts          # Hook para controle de teclado
│   │
│   ├── 📱 screens/                  # Telas da aplicação
│   │   ├── home/
│   │   │   └── HomeScreen.tsx      # Tela inicial/dashboard
│   │   │
│   │   ├── entidade/               # Módulo de Entidades
│   │   │   ├── EntidadeScreen.tsx  # Tela principal de entidades
│   │   │   ├── entidade.types.ts   # Tipos TypeScript
│   │   │   ├── entidade.data.ts    # 📊 DADOS MOCK
│   │   │   ├── entidadeService.ts  # 🔌 SERVICE LAYER (MOCK)
│   │   │   └── styles/             # Estilos específicos
│   │   │       ├── EntidadeScreen.styles.ts
│   │   │       ├── EntidadeScreen.styles.web.ts
│   │   │       └── EntidadeScreen.styles.native.ts
│   │   │
│   │   ├── auth/                   # Módulo de Autenticação
│   │   │   └── LoginScreen.tsx
│   │   │
│   │   ├── visitantes/             # Módulo de Visitantes
│   │   │   └── VisitantesScreen.tsx
│   │   │
│   │   ├── entrada/                # Módulo de Registro de Entrada
│   │   │   └── RegistrarEntradaScreen.tsx
│   │   │
│   │   ├── saida/                  # Módulo de Registro de Saída
│   │   │   └── RegistrarSaidaScreen.tsx
│   │   │
│   │   └── relatorios/             # Módulo de Relatórios
│   │       └── RelatoriosScreen.tsx
│   │
│   ├── 🔌 services/                 # Camada de Serviços (API)
│   │   ├── entidadeService.ts      # ⚠️ Service com dados MOCK
│   │   └── entityApi.test.ts       # Testes de API
│   │
│   ├── 📘 types/                    # Definições de tipos TypeScript
│   │   ├── entities.ts
│   │   ├── navigation.ts
│   │   └── user.ts
│   │
│   └── 🛠️ utils/                    # Utilitários e helpers
│       ├── entityHelpers.ts
│       ├── responsive.ts           # Detecção de dispositivo
│       └── themeHelpers.ts
│
├── 📄 Arquivos de Configuração Raiz
│   ├── App.tsx                     # 🚀 Entrada principal do app
│   ├── index.ts                    # Entry point
│   ├── app.json                    # Configuração Expo
│   ├── package.json                # Dependências npm
│   ├── tsconfig.json               # Configuração TypeScript
│   ├── jest.config.js              # Configuração de testes
│   ├── metro.config.js             # Bundler config
│   └── babel.config.js             # Transpilador
│
└── 📚 Documentação
    ├── README.md
    ├── QUICKSTART.md
    ├── ROADMAP.md
    ├── ARCHITECTURE_EXPLANATION.md
    ├── PERMISSIONS_GUIDE.md
    ├── TESTING.md
    └── [Vários arquivos de resumo de mudanças]
```

---

## 🔧 TECNOLOGIAS E DEPENDÊNCIAS

### Core Framework
```json
{
  "expo": "~52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.1",
  "typescript": "~5.3.3"
}
```

### Navegação
```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "react-native-screens": "^3.x",
  "react-native-safe-area-context": "^4.x"
}
```

### Estado e Contextos
- **React Context API:** Para gerenciamento de estado global
  - `AuthContext`: Autenticação e dados do usuário
  - `ThemeContext`: Tema dark/light mode

### UI/Styling
- **StyleSheet (React Native):** Estilização nativa
- **Platform-specific styles:** `.web.ts` e `.native.ts`
- **Responsive Design:** Utilitários de detecção de dispositivo

### Testes
```json
{
  "jest": "^29.x",
  "@testing-library/react-native": "^12.x",
  "@testing-library/jest-native": "^5.x"
}
```

### Desenvolvimento
```json
{
  "@expo/metro-runtime": "~4.0.0",
  "@expo/vector-icons": "^14.0.4"
}
```

---

## 🧩 COMPONENTES PRINCIPAIS

### 1. Layout Components

#### **WebNavbar** (`src/components/layout/WebNavbar.tsx`)
```typescript
// Barra de navegação superior para web
Props:
  - screenName: string
  - searchText: string
  - onSearchChange: (text: string) => void
  - onAddPress: () => void
  - searchPlaceholder?: string

Layout:
  - Título centralizado
  - Input de busca (30% largura, lado direito)
  - Responsivo para desktop
```

#### **MobileNavbar** (`src/components/layout/MobileNavbar.tsx`)
```typescript
// Barra de navegação superior para mobile
Props:
  - title: string
  - searchValue: string
  - onSearchChange: (text: string) => void
  - onAddPress: () => void

Layout:
  - Linha 1: Título centralizado
  - Linha 2: Busca + Botão adicionar
  - Position: absolute, zIndex: 100
```

#### **WebSidebar** (`src/components/layout/WebSidebar.tsx`)
```typescript
// Sidebar lateral para navegação web
Props:
  - isOpen: boolean
  - onToggle: () => void
  - theme: 'dark' | 'light'
  - onThemeChange: () => void
  - onLogout: () => void

Features:
  - Animação slide (translateX: -320 to 0)
  - Toggle button (canto superior esquerdo)
  - Busca integrada
  - Lista de ações/navegação
  - Theme toggle
  - Logout
```

#### **MobileSidebar** (`src/components/layout/MobileSidebar.tsx`)
```typescript
// Drawer lateral para mobile
Props:
  - visible: boolean
  - onMenuToggle: (isOpen: boolean) => void
  - onThemeChange: () => void
  - onLogout: () => void

Features:
  - Drawer animado
  - Menu de navegação
  - Configurações
```

### 2. Screen Components

#### **EntidadeScreen** (`src/screens/entidade/EntidadeScreen.tsx`)
```typescript
// Tela principal de gerenciamento de entidades

Features:
  ✅ CRUD completo (Create, Read, Update, Delete)
  ✅ Busca/filtro de entidades
  ✅ Modal de formulário (create/edit/view)
  ✅ Cards responsivos (mobile: FlatList, web: CSS Grid)
  ✅ Floating Action Button (web only)
  ✅ Dropdown menu de ações
  ✅ Status badge (ativo/inativo)

Layout Web:
  - WebNavbar (topo)
  - WebSidebar (lateral, toggleável)
  - Grid de cards (CSS Grid, 3 colunas responsivas)
  - FAB (bottom-right, fixed)

Layout Mobile:
  - MobileNavbar (topo, position absolute)
  - FlatList (scroll com paddingTop: 165)
  - Cards em coluna única
  - MobileSidebar (drawer)

Estado:
  - entidades: Entidade[]
  - filteredEntidades: Entidade[]
  - searchText: string
  - modalVisible: boolean
  - formMode: 'create' | 'edit' | 'view'
  - formData: Entidade
```

#### **HomeScreen** (`src/screens/home/HomeScreen.tsx`)
```typescript
// Dashboard/Tela inicial

Features:
  - Sidebar web/mobile
  - Conteúdo animado
  - Status bar adaptativo

Estado:
  - sidebarOpen: boolean
  - contentAnim: Animated.Value
```

---

## 🔄 FLUXO DE DADOS

### Arquitetura de Dados Atual (MOCK)

```typescript
┌─────────────────────────────────────────────────┐
│                 PRESENTATION                     │
│              (EntidadeScreen.tsx)                │
│  - Renderiza UI                                  │
│  - Gerencia estado local                         │
│  - Chama hooks/services                          │
└─────────────────┬───────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────┐
│              CUSTOM HOOKS (Opcional)             │
│           (useEntities, useEntityForm)           │
│  - Lógica de negócio reutilizável               │
│  - Validações                                    │
└─────────────────┬───────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────┐
│                SERVICE LAYER                     │
│             (entidadeService.ts)                 │
│  - Funções: getAll, getById, create,            │
│             update, delete                       │
│  - ⚠️ MOCK: Retorna Promise.resolve(mockData)   │
└─────────────────┬───────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────┐
│                 DATA SOURCE                      │
│              (entidade.data.ts)                  │
│  - 📊 Array de dados mockados                   │
│  - Estrutura: Entidade[]                         │
└─────────────────────────────────────────────────┘
```

### Exemplo de Service Atual (MOCK)

```typescript
// src/screens/entidade/entidadeService.ts

import { mockEntidades } from './entidade.data';
import { Entidade } from './entidade.types';

// ⚠️ SIMULAÇÃO - Não há requisições HTTP reais
export const entidadeService = {
  // Buscar todas
  getAll: async (): Promise<Entidade[]> => {
    return Promise.resolve(mockEntidades);
  },

  // Buscar por ID
  getById: async (id: string): Promise<Entidade | undefined> => {
    return Promise.resolve(
      mockEntidades.find((e) => e.id === id)
    );
  },

  // Criar nova
  create: async (entidade: Omit<Entidade, 'id'>): Promise<Entidade> => {
    const newEntidade = {
      ...entidade,
      id: Date.now().toString(),
    };
    mockEntidades.push(newEntidade);
    return Promise.resolve(newEntidade);
  },

  // Atualizar
  update: async (id: string, data: Partial<Entidade>): Promise<Entidade> => {
    const index = mockEntidades.findIndex((e) => e.id === id);
    if (index !== -1) {
      mockEntidades[index] = { ...mockEntidades[index], ...data };
      return Promise.resolve(mockEntidades[index]);
    }
    throw new Error('Entidade não encontrada');
  },

  // Deletar
  delete: async (id: string): Promise<void> => {
    const index = mockEntidades.findIndex((e) => e.id === id);
    if (index !== -1) {
      mockEntidades.splice(index, 1);
    }
    return Promise.resolve();
  },
};
```

### Tipos de Dados

```typescript
// src/screens/entidade/entidade.types.ts

export interface Entidade {
  id: string;
  nome: string;
  cnpj: string;
  tipo: 'Física' | 'Jurídica';
  telefone: string;
  email: string;
  endereco: string;
  status: 'Ativo' | 'Inativo';
  dataCadastro: string;
}

export type EntidadeFormData = Omit<Entidade, 'id' | 'dataCadastro'>;
```

---

## 🔌 ESTADO ATUAL DO BACKEND

### ❌ Não Implementado

**Status:** O projeto atualmente **NÃO possui backend real**.

**Características atuais:**
1. ✅ **Dados Mockados:** Arrays locais simulando banco de dados
2. ✅ **Services com Promises:** Simulam chamadas assíncronas
3. ✅ **CRUD Funcional:** Mas apenas em memória (dados perdidos ao recarregar)
4. ❌ **Sem Persistência:** Dados não salvos em banco
5. ❌ **Sem API REST:** Nenhuma requisição HTTP real
6. ❌ **Sem Autenticação Real:** Login apenas mock
7. ❌ **Sem Validação Server-side:** Validações apenas no frontend

### Limitações Críticas

```typescript
// ⚠️ PROBLEMA: Dados perdidos ao recarregar o app
mockEntidades.push(newEntidade); // Só existe na memória

// ⚠️ PROBLEMA: Sem autenticação real
const handleLogin = () => {
  setUser({ name: 'User Mock' }); // Não valida credenciais
};

// ⚠️ PROBLEMA: Sem sincronização entre dispositivos
// Cada dispositivo tem sua própria cópia local
```

---

## 🚀 PROPOSTA DE INTEGRAÇÃO BACKEND

### Opções de Stack Backend

#### **Opção 1: Node.js + Express + MongoDB** (Recomendado para MVP)
```
Vantagens:
  ✅ JavaScript/TypeScript full-stack
  ✅ Rápido desenvolvimento
  ✅ MongoDB flexível (NoSQL)
  ✅ Ecossistema maduro
  ✅ Deploy fácil (Heroku, Railway, Render)

Stack:
  - Runtime: Node.js 18+
  - Framework: Express.js
  - Database: MongoDB + Mongoose
  - Auth: JWT (jsonwebtoken)
  - Validation: Joi ou Zod
```

#### **Opção 2: Firebase (Backend as a Service)**
```
Vantagens:
  ✅ Sem servidor para gerenciar
  ✅ Real-time database
  ✅ Auth pronto
  ✅ Deploy zero config
  ✅ Grátis até certo limite

Serviços:
  - Firestore: Banco de dados NoSQL
  - Firebase Auth: Autenticação
  - Cloud Functions: Lógica backend
  - Firebase Storage: Upload de arquivos
```

#### **Opção 3: Supabase (Open Source Firebase)**
```
Vantagens:
  ✅ PostgreSQL (SQL)
  ✅ Auth integrado
  ✅ Real-time subscriptions
  ✅ REST API auto-gerada
  ✅ Open source
  ✅ Self-host possível

Serviços:
  - PostgreSQL Database
  - Auth (JWT)
  - Storage
  - Edge Functions
```

#### **Opção 4: NestJS + PostgreSQL** (Enterprise Grade)
```
Vantagens:
  ✅ Arquitetura robusta
  ✅ TypeScript nativo
  ✅ Dependency Injection
  ✅ Microservices ready
  ✅ Documentação automática (Swagger)

Stack:
  - Framework: NestJS
  - Database: PostgreSQL + TypeORM
  - Auth: Passport.js + JWT
  - Validation: class-validator
```

---

## 🎯 ARQUITETURA PROPOSTA COM BACKEND

### Arquitetura Completa

```
┌─────────────────────────────────────────────────────────┐
│                    MOBILE/WEB CLIENT                     │
│                 (React Native + Expo)                    │
│                                                          │
│  Screens → Contexts → Hooks → Services (HTTP Client)    │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS/REST API
                         ↓
┌─────────────────────────────────────────────────────────┐
│                      API GATEWAY                         │
│                    (Load Balancer)                       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                        │
│              (Node.js/Express ou NestJS)                 │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │           AUTHENTICATION LAYER                    │   │
│  │  - JWT Validation                                 │   │
│  │  - Role-based Access Control (RBAC)              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              API ROUTES/CONTROLLERS               │   │
│  │                                                   │   │
│  │  /api/auth                                        │   │
│  │    POST /login                                    │   │
│  │    POST /register                                 │   │
│  │    POST /logout                                   │   │
│  │    GET  /me                                       │   │
│  │                                                   │   │
│  │  /api/entidades                                   │   │
│  │    GET    /                (list all)            │   │
│  │    GET    /:id             (get by id)           │   │
│  │    POST   /                (create)              │   │
│  │    PUT    /:id             (update)              │   │
│  │    DELETE /:id             (delete)              │   │
│  │    GET    /search?q=...    (search)              │   │
│  │                                                   │   │
│  │  /api/visitantes                                  │   │
│  │  /api/registros                                   │   │
│  │  /api/relatorios                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │            BUSINESS LOGIC LAYER                   │   │
│  │  - Services                                       │   │
│  │  - Validators                                     │   │
│  │  - Business Rules                                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │            DATA ACCESS LAYER (ORM)                │   │
│  │  - Mongoose/TypeORM/Prisma                        │   │
│  │  - Models/Entities                                │   │
│  │  - Repositories                                   │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────┐
│                      DATABASE                            │
│            (MongoDB/PostgreSQL/MySQL)                    │
│                                                          │
│  Collections/Tables:                                     │
│    - users                                               │
│    - entidades                                           │
│    - visitantes                                          │
│    - registros_entrada                                   │
│    - registros_saida                                     │
│    - logs                                                │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 ESTRUTURA PROPOSTA DO BACKEND

### Estrutura de Diretórios (Node.js + Express)

```
backend/
├── src/
│   ├── config/                    # Configurações
│   │   ├── database.ts            # Config do banco
│   │   ├── jwt.ts                 # Config JWT
│   │   └── env.ts                 # Variáveis de ambiente
│   │
│   ├── models/                    # Modelos de dados (Mongoose/TypeORM)
│   │   ├── User.ts
│   │   ├── Entidade.ts
│   │   ├── Visitante.ts
│   │   └── Registro.ts
│   │
│   ├── controllers/               # Controladores (handlers de rotas)
│   │   ├── authController.ts
│   │   ├── entidadeController.ts
│   │   ├── visitanteController.ts
│   │   └── registroController.ts
│   │
│   ├── services/                  # Lógica de negócio
│   │   ├── authService.ts
│   │   ├── entidadeService.ts
│   │   ├── visitanteService.ts
│   │   └── registroService.ts
│   │
│   ├── middlewares/               # Middlewares
│   │   ├── auth.ts                # Verificação JWT
│   │   ├── validation.ts          # Validação de dados
│   │   ├── errorHandler.ts        # Tratamento de erros
│   │   └── logger.ts              # Logging
│   │
│   ├── routes/                    # Definição de rotas
│   │   ├── authRoutes.ts
│   │   ├── entidadeRoutes.ts
│   │   ├── visitanteRoutes.ts
│   │   └── registroRoutes.ts
│   │
│   ├── validators/                # Schemas de validação (Joi/Zod)
│   │   ├── entidadeValidator.ts
│   │   ├── visitanteValidator.ts
│   │   └── authValidator.ts
│   │
│   ├── utils/                     # Utilitários
│   │   ├── jwt.ts                 # Funções JWT
│   │   ├── password.ts            # Hash de senha (bcrypt)
│   │   └── response.ts            # Padronização de respostas
│   │
│   ├── types/                     # Tipos TypeScript
│   │   └── index.ts
│   │
│   ├── app.ts                     # Configuração do Express
│   └── server.ts                  # Entry point
│
├── tests/                         # Testes
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example                   # Exemplo de variáveis de ambiente
├── .env                           # Variáveis de ambiente (não commitar)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔄 MODIFICAÇÕES NECESSÁRIAS NO FRONTEND

### 1. Criar Cliente HTTP (Axios/Fetch)

```typescript
// src/services/api/apiClient.ts

import axios from 'axios';
import { getToken } from '../auth/tokenStorage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      // navegação para login
    }
    return Promise.reject(error);
  }
);
```

### 2. Refatorar Services para usar HTTP

```typescript
// src/services/entidadeService.ts (NOVO - com backend)

import { apiClient } from './api/apiClient';
import { Entidade, EntidadeFormData } from '../types/entities';

export const entidadeService = {
  // Buscar todas
  getAll: async (): Promise<Entidade[]> => {
    const response = await apiClient.get<Entidade[]>('/entidades');
    return response.data;
  },

  // Buscar por ID
  getById: async (id: string): Promise<Entidade> => {
    const response = await apiClient.get<Entidade>(`/entidades/${id}`);
    return response.data;
  },

  // Criar nova
  create: async (data: EntidadeFormData): Promise<Entidade> => {
    const response = await apiClient.post<Entidade>('/entidades', data);
    return response.data;
  },

  // Atualizar
  update: async (id: string, data: Partial<EntidadeFormData>): Promise<Entidade> => {
    const response = await apiClient.put<Entidade>(`/entidades/${id}`, data);
    return response.data;
  },

  // Deletar
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/entidades/${id}`);
  },

  // Buscar/Filtrar
  search: async (query: string): Promise<Entidade[]> => {
    const response = await apiClient.get<Entidade[]>('/entidades/search', {
      params: { q: query },
    });
    return response.data;
  },
};
```

### 3. Gerenciamento de Estado com Cache (React Query)

```typescript
// src/hooks/useEntidades.ts (com React Query)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entidadeService } from '../services/entidadeService';

export const useEntidades = () => {
  const queryClient = useQueryClient();

  // Buscar todas
  const { data: entidades, isLoading, error } = useQuery({
    queryKey: ['entidades'],
    queryFn: entidadeService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Criar
  const createMutation = useMutation({
    mutationFn: entidadeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entidades'] });
    },
  });

  // Atualizar
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Entidade> }) =>
      entidadeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entidades'] });
    },
  });

  // Deletar
  const deleteMutation = useMutation({
    mutationFn: entidadeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entidades'] });
    },
  });

  return {
    entidades: entidades || [],
    isLoading,
    error,
    createEntidade: createMutation.mutate,
    updateEntidade: updateMutation.mutate,
    deleteEntidade: deleteMutation.mutate,
  };
};
```

### 4. Autenticação Real

```typescript
// src/contexts/AuthContext.tsx (com backend)

import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '../services/api/apiClient';
import { saveToken, getToken, deleteToken } from '../services/auth/tokenStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há token salvo ao iniciar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await getToken();
      if (token) {
        const response = await apiClient.get<User>('/auth/me');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      await deleteToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      await saveToken(token);
      setUser(user);
    } catch (error) {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      await deleteToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 5. Storage de Token (AsyncStorage)

```typescript
// src/services/auth/tokenStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@AccessControl:token';

export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const deleteToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
```

---

## 📋 ROADMAP DE IMPLEMENTAÇÃO

### FASE 1: Preparação do Backend (2-3 semanas)

#### Semana 1: Setup e Infraestrutura
- [ ] Escolher stack backend (Node.js + Express + MongoDB)
- [ ] Criar repositório backend
- [ ] Setup inicial do projeto
  - [ ] TypeScript
  - [ ] Express
  - [ ] MongoDB connection
  - [ ] Variáveis de ambiente
- [ ] Estrutura de diretórios
- [ ] Setup de desenvolvimento (nodemon, ts-node)

#### Semana 2: Autenticação e Usuários
- [ ] Modelo User
- [ ] Rotas de autenticação
  - [ ] POST /api/auth/register
  - [ ] POST /api/auth/login
  - [ ] GET /api/auth/me
  - [ ] POST /api/auth/logout
- [ ] Middleware de autenticação (JWT)
- [ ] Hash de senhas (bcrypt)
- [ ] Testes de autenticação

#### Semana 3: CRUD de Entidades
- [ ] Modelo Entidade
- [ ] Rotas de entidades
  - [ ] GET /api/entidades
  - [ ] GET /api/entidades/:id
  - [ ] POST /api/entidades
  - [ ] PUT /api/entidades/:id
  - [ ] DELETE /api/entidades/:id
  - [ ] GET /api/entidades/search?q=...
- [ ] Validações (Joi ou Zod)
- [ ] Testes unitários e de integração

### FASE 2: Integração Frontend (2 semanas)

#### Semana 4: Cliente HTTP e Services
- [ ] Instalar dependências
  - [ ] axios
  - [ ] @react-native-async-storage/async-storage
  - [ ] @tanstack/react-query (opcional)
- [ ] Criar API client (axios configurado)
- [ ] Interceptors (token, errors)
- [ ] Refatorar entidadeService para usar HTTP
- [ ] Storage de tokens (AsyncStorage)

#### Semana 5: Autenticação e Estado Global
- [ ] Refatorar AuthContext
  - [ ] Login real com API
  - [ ] Logout com token cleanup
  - [ ] Verificação de token ao iniciar app
- [ ] Tela de Login funcional
- [ ] Proteção de rotas (PrivateRoute)
- [ ] Loading states
- [ ] Error handling

### FASE 3: Módulos Adicionais (3-4 semanas)

#### Semana 6-7: Visitantes e Registros
- [ ] Backend
  - [ ] Modelo Visitante
  - [ ] Modelo Registro (entrada/saída)
  - [ ] Rotas e controllers
  - [ ] Relacionamentos (Entidade ↔ Visitante ↔ Registro)
- [ ] Frontend
  - [ ] Services para visitantes
  - [ ] Services para registros
  - [ ] Telas de CRUD
  - [ ] Integração completa

#### Semana 8-9: Relatórios e Dashboard
- [ ] Backend
  - [ ] Endpoints de relatórios
  - [ ] Agregações (registros por período, etc)
  - [ ] Exportação (CSV, PDF)
- [ ] Frontend
  - [ ] Tela de relatórios
  - [ ] Gráficos (react-native-chart-kit)
  - [ ] Filtros avançados

### FASE 4: Melhorias e Deploy (2 semanas)

#### Semana 10: Otimizações
- [ ] Cache com React Query
- [ ] Offline-first (opcional)
- [ ] Upload de imagens (perfil, documentos)
- [ ] Push notifications
- [ ] Logs e monitoramento

#### Semana 11: Deploy e Produção
- [ ] Deploy backend
  - [ ] Railway/Render/Heroku
  - [ ] MongoDB Atlas
  - [ ] Variáveis de ambiente
  - [ ] HTTPS/SSL
- [ ] Deploy frontend
  - [ ] EAS Build (Expo)
  - [ ] App Store / Play Store (se aplicável)
  - [ ] Web hosting (Vercel/Netlify)
- [ ] Documentação API (Swagger)
- [ ] Testes E2E

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

### Decisões a Tomar
1. **Escolher stack backend:**
   - Recomendo: Node.js + Express + MongoDB (mais simples para MVP)
   - Alternativa: Firebase (se quiser zero config de servidor)

2. **Definir prioridades:**
   - Começar com Entidades (CRUD completo)?
   - Ou focar em Autenticação primeiro?

3. **Ambiente de desenvolvimento:**
   - Rodar backend local (localhost:3000)?
   - Ou usar serviço cloud desde o início?

### Checklist Pré-Implementação
- [ ] Definir stack backend
- [ ] Criar repositório backend (GitHub)
- [ ] Setup ambiente de desenvolvimento
- [ ] Definir schema do banco de dados
- [ ] Criar documentação de API (endpoints)
- [ ] Instalar dependências no frontend (axios, async-storage)

---

## 📚 RECURSOS E REFERÊNCIAS

### Tutoriais Recomendados
- [Node.js + Express + MongoDB Tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial)
- [JWT Authentication](https://jwt.io/introduction)
- [React Query with React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [Expo + Backend Integration](https://docs.expo.dev/guides/using-firebase/)

### Ferramentas Úteis
- **Postman:** Testar APIs
- **MongoDB Compass:** GUI para MongoDB
- **Insomnia:** Alternativa ao Postman
- **React Native Debugger:** Debug do frontend

---

## ✅ CONCLUSÃO

O projeto está **bem estruturado no frontend**, com:
- ✅ Arquitetura limpa e organizada
- ✅ Componentes reutilizáveis
- ✅ Cross-platform (web + mobile)
- ✅ TypeScript com tipagem forte
- ✅ Testes implementados

**Próximo grande passo:** Implementar backend real para:
- 🎯 Persistência de dados
- 🎯 Autenticação segura
- 🎯 Sincronização entre dispositivos
- 🎯 Escalabilidade

**Recomendação:** Começar com Node.js + Express + MongoDB para ter um MVP funcional em 4-6 semanas.

---

**Documento criado em:** 9 de outubro de 2025  
**Autor:** Análise Técnica do Projeto Access Control  
**Versão:** 1.0
