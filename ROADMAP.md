# 🗺️ ROADMAP - Sistema de Controle de Acesso

**Projeto**: Access Control System  
**Versão**: 1.0.0  
**Data**: 06 de Outubro de 2025  
**Status**: Em Desenvolvimento

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Sistema de Permissões](#sistema-de-permissões)
3. [Fases de Desenvolvimento](#fases-de-desenvolvimento)
4. [Estratégia de Testes](#estratégia-de-testes)
5. [Padrões e Guidelines](#padrões-e-guidelines)
6. [Checklist de Implementação](#checklist-de-implementação)

---

## 🎯 VISÃO GERAL

### Objetivo
Desenvolver um sistema completo de controle de acesso com 6 níveis de permissões, testes automatizados, e interface responsiva para web e mobile.

### Progresso Atual
- ✅ **40% Concluído**: Autenticação, Temas, Layout Responsivo, CRUD de Entidades
- 🚧 **60% Pendente**: Registro de Acesso, Visitantes, Relatórios, Alertas, Permissões

### Stack Tecnológica
- React Native 0.81.4 + Expo ~54.0.9
- TypeScript 5.9.2
- React Navigation 7.x
- AsyncStorage (Local) → Backend (Futuro)
- Jest + Testing Library (Testes)

---

## 🔐 SISTEMA DE PERMISSÕES (6 NÍVEIS)

### Estrutura de Permissões

```typescript
enum PermissionLevel {
  GUEST = 0,           // Visitante - Acesso mínimo
  SECURITY = 1,        // Segurança - Registro de entrada/saída
  RECEPTIONIST = 2,    // Recepcionista - Gestão de visitantes
  SUPERVISOR = 3,      // Supervisor - Relatórios e aprovações
  MANAGER = 4,         // Gerente - Configurações e alertas
  ADMIN = 5            // Administrador - Acesso total
}
```

### Matriz de Permissões

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Login** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Home/Dashboard** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Registrar Entrada** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Registrar Saída** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ver Visitantes** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Cadastrar Visitantes** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Ver Relatórios** | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Exportar Relatórios** | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Ver Alertas** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Configurar Alertas** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Gerenciar Entidades** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Gerenciar Usuários** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Configurações Sistema** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Gerenciar Permissões** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🚀 FASES DE DESENVOLVIMENTO

---

## **FASE 0: PREPARAÇÃO E TESTES** ⚙️
**Duração**: 3-5 dias  
**Objetivo**: Configurar ambiente de testes e documentação

### 📦 Tarefas

#### 0.1 - Configuração de Testes
- [ ] Instalar dependências de teste
  ```bash
  npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-expo
  ```
- [ ] Configurar Jest no `package.json`
- [ ] Criar arquivo `jest.config.js`
- [ ] Criar pasta `__tests__/` na raiz
- [ ] Configurar scripts de teste
  ```json
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
  ```

#### 0.2 - Estrutura de Testes
- [ ] Criar estrutura de pastas
  ```
  __tests__/
  ├── components/
  │   ├── entity/
  │   ├── layout/
  │   └── ui/
  ├── contexts/
  ├── hooks/
  ├── screens/
  ├── services/
  └── utils/
  ```

#### 0.3 - Testes Existentes
- [ ] Testar `AuthContext`
- [ ] Testar `ThemeContext`
- [ ] Testar `useEntities` hook
- [ ] Testar `entityApi` service
- [ ] Testar `EntityForm` component
- [ ] Testar `responsive` utils

#### 0.4 - Documentação
- [ ] Criar `TESTING.md` com guia de testes
- [ ] Criar `CONTRIBUTING.md` com padrões
- [ ] Atualizar `README.md`

### ✅ Critérios de Aceite
- ✓ Todos os testes existentes passando
- ✓ Cobertura de código > 70%
- ✓ CI/CD configurado (opcional)

---

## **FASE 1: SISTEMA DE PERMISSÕES** 🔐
**Duração**: 1 semana  
**Objetivo**: Implementar sistema completo de permissões

### 📦 Tarefas

#### 1.1 - Tipos e Interfaces
- [ ] Criar `src/types/permissions.ts`
  ```typescript
  export enum PermissionLevel {
    GUEST = 0,
    SECURITY = 1,
    RECEPTIONIST = 2,
    SUPERVISOR = 3,
    MANAGER = 4,
    ADMIN = 5
  }

  export interface Permission {
    id: string;
    name: string;
    level: PermissionLevel;
    description: string;
    features: FeaturePermission[];
  }

  export interface FeaturePermission {
    feature: string;
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }
  ```

#### 1.2 - Context de Permissões
- [ ] Criar `src/contexts/PermissionContext.tsx`
- [ ] Implementar `usePermission` hook
- [ ] Criar helper `checkPermission()`
- [ ] Integrar com `AuthContext`

#### 1.3 - Componente de Proteção
- [ ] Criar `src/components/auth/ProtectedRoute.tsx`
- [ ] Criar `src/components/auth/PermissionGate.tsx`
- [ ] Implementar redirecionamentos automáticos

#### 1.4 - Tela de Configuração de Permissões
- [ ] Criar `src/screens/settings/PermissionsScreen.tsx`
- [ ] Implementar tabela de permissões
- [ ] Adicionar editor de permissões (apenas ADMIN)
- [ ] Criar formulário de edição de nível

#### 1.5 - Atualizar Navegação
- [ ] Proteger rotas com `ProtectedRoute`
- [ ] Adicionar verificação em `App.tsx`
- [ ] Implementar fallback para sem permissão

#### 1.6 - Testes de Permissões
- [ ] Testar `PermissionContext`
- [ ] Testar `checkPermission()` helper
- [ ] Testar `ProtectedRoute` component
- [ ] Testar navegação com diferentes níveis
- [ ] Testar cenários de negação de acesso

### ✅ Critérios de Aceite
- ✓ Sistema de 6 níveis implementado
- ✓ Matriz de permissões funcionando
- ✓ Rotas protegidas adequadamente
- ✓ Testes de permissões > 80% cobertura
- ✓ UI segue paleta de cores existente

---

## **FASE 2: REGISTRO DE ENTRADA** 🚪
**Duração**: 1-2 semanas  
**Objetivo**: Implementar sistema completo de registro de entrada

### 📦 Tarefas

#### 2.1 - Tipos e Interfaces
- [ ] Criar `src/types/access.ts`
  ```typescript
  export interface AccessRecord {
    id: string;
    entityId: string;
    visitorId?: string;
    type: 'entry' | 'exit';
    method: 'qrcode' | 'manual' | 'card' | 'facial';
    timestamp: string;
    location: string;
    photo?: string;
    temperature?: number;
    observations?: string;
    authorizedBy: string;
    status: 'approved' | 'pending' | 'denied';
  }
  ```

#### 2.2 - Service de Acesso
- [ ] Criar `src/services/accessApi.ts`
- [ ] Implementar métodos CRUD
- [ ] Criar mock data para testes
- [ ] Implementar validações de negócio

#### 2.3 - Context de Acesso
- [ ] Criar `src/contexts/AccessContext.tsx`
- [ ] Implementar `useAccess` hook
- [ ] Gerenciar estado de registros ativos

#### 2.4 - Tela de Registro de Entrada
- [ ] Criar `src/screens/registrarEntrada/RegistrarEntradaScreen.tsx`
- [ ] Implementar busca por entidade (CPF/RG/Nome)
- [ ] Criar formulário de entrada manual
- [ ] Adicionar campo de observações
- [ ] Implementar captura de foto (opcional)
- [ ] Adicionar medição de temperatura (opcional)
- [ ] Mostrar lista de entradas do dia
- [ ] Adicionar filtros (por status, horário)

#### 2.5 - Componentes de Entrada
- [ ] Criar `src/components/access/AccessForm.tsx`
- [ ] Criar `src/components/access/AccessCard.tsx`
- [ ] Criar `src/components/access/AccessList.tsx`
- [ ] Criar `src/components/access/EntitySearchModal.tsx`

#### 2.6 - Scanner QR Code (Futuro)
- [ ] Criar placeholder para scanner
- [ ] Documentar integração futura
- [ ] Criar interface mockada

#### 2.7 - Estilos Responsivos
- [ ] Criar `RegistrarEntradaScreen.styles.native.ts`
- [ ] Criar `RegistrarEntradaScreen.styles.web.ts`
- [ ] Seguir paleta de cores do tema
- [ ] Garantir responsividade mobile/desktop

#### 2.8 - Testes de Registro de Entrada
- [ ] Testar `accessApi` service
- [ ] Testar `AccessContext`
- [ ] Testar `AccessForm` component
- [ ] Testar validações de entrada
- [ ] Testar busca de entidades
- [ ] Testar permissões (SECURITY+)
- [ ] Testar responsividade

### ✅ Critérios de Aceite
- ✓ Registro de entrada funcionando
- ✓ Busca de entidade implementada
- ✓ Validações de negócio corretas
- ✓ Lista de entradas do dia exibida
- ✓ Permissões respeitadas (SECURITY+)
- ✓ Testes > 75% cobertura
- ✓ UI responsiva e seguindo padrões

---

## **FASE 3: REGISTRO DE SAÍDA** 🏃‍♂️
**Duração**: 1 semana  
**Objetivo**: Implementar sistema de registro de saída

### 📦 Tarefas

#### 3.1 - Atualizar Types
- [ ] Adicionar campos específicos de saída em `access.ts`
- [ ] Criar interface `ExitSummary`

#### 3.2 - Atualizar Service
- [ ] Adicionar método `getActiveEntries()`
- [ ] Adicionar método `registerExit()`
- [ ] Calcular tempo de permanência
- [ ] Validar saída (entrada deve existir)

#### 3.3 - Tela de Registro de Saída
- [ ] Criar estrutura da tela
- [ ] Implementar busca de entradas ativas
- [ ] Mostrar informações da entrada
- [ ] Calcular e exibir tempo de permanência
- [ ] Campo de observações de saída
- [ ] Confirmar saída com modal
- [ ] Lista de saídas do dia

#### 3.4 - Componentes de Saída
- [ ] Criar `src/components/access/ExitForm.tsx`
- [ ] Criar `src/components/access/ActiveEntryCard.tsx`
- [ ] Criar `src/components/access/StayDurationDisplay.tsx`

#### 3.5 - Estilos Responsivos
- [ ] Criar estilos para native
- [ ] Criar estilos para web
- [ ] Seguir paleta de cores

#### 3.6 - Testes de Registro de Saída
- [ ] Testar busca de entradas ativas
- [ ] Testar cálculo de tempo
- [ ] Testar validações de saída
- [ ] Testar componentes
- [ ] Testar permissões

### ✅ Critérios de Aceite
- ✓ Registro de saída funcionando
- ✓ Cálculo de tempo correto
- ✓ Validações implementadas
- ✓ Permissões respeitadas
- ✓ Testes > 75% cobertura
- ✓ UI consistente com entrada

---

## **FASE 4: GESTÃO DE VISITANTES** 👥
**Duração**: 1-2 semanas  
**Objetivo**: Sistema completo de gestão de visitantes

### 📦 Tarefas

#### 4.1 - Tipos e Interfaces
- [ ] Criar `src/types/visitor.ts`
  ```typescript
  export interface Visitor {
    id: string;
    name: string;
    cpf: string;
    rg: string;
    email?: string;
    phone?: string;
    photo?: string;
    company?: string;
    department?: string;
    visitPurpose: string;
    hostName: string;
    hostId: string;
    badge?: string;
    validFrom: string;
    validUntil: string;
    status: 'active' | 'expired' | 'blocked';
    accessHistory: AccessRecord[];
    createdAt: string;
    createdBy: string;
  }
  ```

#### 4.2 - Service de Visitantes
- [ ] Criar `src/services/visitorApi.ts`
- [ ] Implementar CRUD completo
- [ ] Método para validar status
- [ ] Método para buscar histórico
- [ ] Mock data para testes

#### 4.3 - Context de Visitantes
- [ ] Criar `src/contexts/VisitorContext.tsx`
- [ ] Implementar `useVisitors` hook
- [ ] Gerenciar estado de visitantes

#### 4.4 - Tela Principal de Visitantes
- [ ] Atualizar `VisitantesScreen.tsx`
- [ ] Implementar lista de visitantes
- [ ] Adicionar cards com informações
- [ ] Implementar busca e filtros
- [ ] Adicionar botão de novo visitante
- [ ] Mostrar estatísticas (total, ativos, expirados)

#### 4.5 - Formulário de Visitante
- [ ] Criar `src/screens/visitantes/VisitorFormScreen.tsx`
- [ ] Formulário completo de cadastro
- [ ] Upload de foto (opcional)
- [ ] Validação de CPF/RG
- [ ] Seleção de período de validade
- [ ] Campo de propósito da visita

#### 4.6 - Detalhes do Visitante
- [ ] Criar `src/screens/visitantes/VisitorDetailScreen.tsx`
- [ ] Exibir todas as informações
- [ ] Mostrar histórico de acessos
- [ ] Gráfico de visitas
- [ ] Botões de editar/bloquear/excluir

#### 4.7 - Componentes de Visitantes
- [ ] Criar `src/components/visitor/VisitorCard.tsx`
- [ ] Criar `src/components/visitor/VisitorForm.tsx`
- [ ] Criar `src/components/visitor/VisitorList.tsx`
- [ ] Criar `src/components/visitor/VisitorStats.tsx`
- [ ] Criar `src/components/visitor/VisitorHistory.tsx`

#### 4.8 - Estilos Responsivos
- [ ] Estilos para todas as telas
- [ ] Seguir paleta de cores
- [ ] Layout grid para cards

#### 4.9 - Testes de Visitantes
- [ ] Testar `visitorApi` service
- [ ] Testar `VisitorContext`
- [ ] Testar todos os componentes
- [ ] Testar validações de formulário
- [ ] Testar filtros e buscas
- [ ] Testar permissões (RECEPTIONIST+)

### ✅ Critérios de Aceite
- ✓ CRUD de visitantes completo
- ✓ Validações funcionando
- ✓ Histórico de acessos exibido
- ✓ Filtros e buscas funcionais
- ✓ Permissões respeitadas
- ✓ Testes > 80% cobertura
- ✓ UI profissional e responsiva

---

## **FASE 5: RELATÓRIOS E ANALYTICS** 📈
**Duração**: 1-2 semanas  
**Objetivo**: Dashboard com gráficos e relatórios

### 📦 Tarefas

#### 5.1 - Dependências
- [ ] Instalar `victory-native` para gráficos
- [ ] Instalar `react-native-svg`
- [ ] Instalar `date-fns` para manipulação de datas

#### 5.2 - Tipos de Relatórios
- [ ] Criar `src/types/report.ts`
  ```typescript
  export interface Report {
    id: string;
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    period: { start: string; end: string };
    stats: ReportStats;
    generatedAt: string;
    generatedBy: string;
  }

  export interface ReportStats {
    totalEntries: number;
    totalExits: number;
    activeVisitors: number;
    averageStayTime: number;
    peakHours: { hour: number; count: number }[];
    topVisitors: { visitorId: string; count: number }[];
    departmentStats: { department: string; count: number }[];
  }
  ```

#### 5.3 - Service de Relatórios
- [ ] Criar `src/services/reportApi.ts`
- [ ] Método para gerar relatórios
- [ ] Calcular estatísticas
- [ ] Agrupar dados por período
- [ ] Mock data para testes

#### 5.4 - Context de Relatórios
- [ ] Criar `src/contexts/ReportContext.tsx`
- [ ] Implementar `useReports` hook

#### 5.5 - Tela de Relatórios
- [ ] Atualizar `RelatoriosScreen.tsx`
- [ ] Dashboard com cards de estatísticas
- [ ] Seletor de período (hoje, semana, mês, custom)
- [ ] Gráfico de entradas/saídas por hora
- [ ] Gráfico de top visitantes
- [ ] Gráfico de departamentos
- [ ] Tabela de dados detalhados

#### 5.6 - Componentes de Gráficos
- [ ] Criar `src/components/charts/LineChart.tsx`
- [ ] Criar `src/components/charts/BarChart.tsx`
- [ ] Criar `src/components/charts/PieChart.tsx`
- [ ] Criar `src/components/charts/StatCard.tsx`

#### 5.7 - Filtros de Relatório
- [ ] Criar `src/components/reports/ReportFilters.tsx`
- [ ] Filtro por data
- [ ] Filtro por tipo
- [ ] Filtro por departamento
- [ ] Filtro por status

#### 5.8 - Exportação (Futuro)
- [ ] Criar placeholder para exportar PDF
- [ ] Criar placeholder para exportar Excel
- [ ] Documentar integração futura

#### 5.9 - Estilos Responsivos
- [ ] Estilos para tela de relatórios
- [ ] Grid responsivo para gráficos
- [ ] Seguir paleta de cores

#### 5.10 - Testes de Relatórios
- [ ] Testar `reportApi` service
- [ ] Testar cálculos de estatísticas
- [ ] Testar geração de relatórios
- [ ] Testar filtros
- [ ] Testar componentes de gráficos
- [ ] Testar permissões (SUPERVISOR+)

### ✅ Critérios de Aceite
- ✓ Dashboard funcional
- ✓ Gráficos renderizando corretamente
- ✓ Estatísticas calculadas corretamente
- ✓ Filtros funcionando
- ✓ Permissões respeitadas
- ✓ Testes > 75% cobertura
- ✓ UI moderna e informativa

---

## **FASE 6: SISTEMA DE ALERTAS** ⚠️
**Duração**: 1 semana  
**Objetivo**: Sistema de notificações e alertas

### 📦 Tarefas

#### 6.1 - Tipos de Alertas
- [ ] Criar `src/types/alert.ts`
  ```typescript
  export interface Alert {
    id: string;
    type: 'unauthorized' | 'expired' | 'suspicious' | 'system' | 'custom';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    timestamp: string;
    entityId?: string;
    visitorId?: string;
    accessId?: string;
    read: boolean;
    resolved: boolean;
    resolvedBy?: string;
    resolvedAt?: string;
    notes?: string;
  }

  export interface AlertRule {
    id: string;
    name: string;
    description: string;
    type: Alert['type'];
    severity: Alert['severity'];
    conditions: AlertCondition[];
    active: boolean;
    notifyUsers: string[];
  }
  ```

#### 6.2 - Service de Alertas
- [ ] Criar `src/services/alertApi.ts`
- [ ] CRUD de alertas
- [ ] CRUD de regras de alertas
- [ ] Método para verificar regras
- [ ] Método para disparar alerta

#### 6.3 - Context de Alertas
- [ ] Criar `src/contexts/AlertContext.tsx`
- [ ] Implementar `useAlerts` hook
- [ ] Polling de novos alertas (opcional)
- [ ] Badge de alertas não lidos

#### 6.4 - Tela de Alertas
- [ ] Descomentrar `AlertasScreen` no App.tsx
- [ ] Implementar `src/screens/alertas/AlertasScreen.tsx`
- [ ] Lista de alertas com filtros
- [ ] Badge de não lidos
- [ ] Ações rápidas (marcar como lido, resolver)
- [ ] Detalhes do alerta

#### 6.5 - Tela de Configuração de Alertas
- [ ] Criar `src/screens/alertas/AlertSettingsScreen.tsx`
- [ ] Lista de regras ativas
- [ ] Formulário de nova regra
- [ ] Editor de regras existentes
- [ ] Toggle ativar/desativar regra

#### 6.6 - Componentes de Alertas
- [ ] Criar `src/components/alert/AlertCard.tsx`
- [ ] Criar `src/components/alert/AlertList.tsx`
- [ ] Criar `src/components/alert/AlertBadge.tsx`
- [ ] Criar `src/components/alert/AlertRuleForm.tsx`
- [ ] Criar `src/components/alert/AlertModal.tsx`

#### 6.7 - Integração com Sistema
- [ ] Verificar alertas ao registrar entrada
- [ ] Verificar alertas ao registrar saída
- [ ] Alertar sobre visitantes expirados
- [ ] Alertar sobre tentativas não autorizadas

#### 6.8 - Estilos Responsivos
- [ ] Estilos para telas de alertas
- [ ] Cores por severidade
- [ ] Animações de novos alertas

#### 6.9 - Testes de Alertas
- [ ] Testar `alertApi` service
- [ ] Testar `AlertContext`
- [ ] Testar componentes
- [ ] Testar regras de alerta
- [ ] Testar disparos automáticos
- [ ] Testar permissões (MANAGER+)

### ✅ Critérios de Aceite
- ✓ Sistema de alertas funcionando
- ✓ Regras configuráveis
- ✓ Alertas disparando automaticamente
- ✓ UI de alertas clara e intuitiva
- ✓ Permissões respeitadas
- ✓ Testes > 75% cobertura

---

## **FASE 7: TELA DE CONFIGURAÇÕES** ⚙️
**Duração**: 1 semana  
**Objetivo**: Centralizar configurações do sistema

### 📦 Tarefas

#### 7.1 - Estrutura de Configurações
- [ ] Criar `src/types/settings.ts`
- [ ] Criar `src/services/settingsApi.ts`
- [ ] Criar `src/contexts/SettingsContext.tsx`

#### 7.2 - Tela Principal de Configurações
- [ ] Criar `src/screens/settings/SettingsScreen.tsx`
- [ ] Seções: Perfil, Sistema, Permissões, Segurança
- [ ] Cards de navegação para sub-telas

#### 7.3 - Configurações de Perfil
- [ ] Criar `src/screens/settings/ProfileSettingsScreen.tsx`
- [ ] Editar informações do usuário
- [ ] Trocar senha
- [ ] Upload de foto de perfil

#### 7.4 - Configurações de Sistema
- [ ] Criar `src/screens/settings/SystemSettingsScreen.tsx`
- [ ] Configurar nome da empresa
- [ ] Configurar logo
- [ ] Configurar horário de funcionamento
- [ ] Configurar timezone

#### 7.5 - Configurações de Segurança
- [ ] Criar `src/screens/settings/SecuritySettingsScreen.tsx`
- [ ] Configurar timeout de sessão
- [ ] Configurar política de senhas
- [ ] Log de atividades

#### 7.6 - Gerenciamento de Usuários (ADMIN)
- [ ] Criar `src/screens/settings/UsersScreen.tsx`
- [ ] Lista de usuários do sistema
- [ ] CRUD de usuários
- [ ] Atribuir permissões
- [ ] Ativar/desativar usuários

#### 7.7 - Componentes de Configurações
- [ ] Criar `src/components/settings/SettingCard.tsx`
- [ ] Criar `src/components/settings/SettingToggle.tsx`
- [ ] Criar `src/components/settings/SettingInput.tsx`
- [ ] Criar `src/components/settings/UserCard.tsx`

#### 7.8 - Estilos Responsivos
- [ ] Estilos para todas as telas
- [ ] Layout grid para cards
- [ ] Seguir paleta de cores

#### 7.9 - Testes de Configurações
- [ ] Testar todos os serviços
- [ ] Testar componentes
- [ ] Testar validações
- [ ] Testar permissões (apenas ADMIN)

### ✅ Critérios de Aceite
- ✓ Todas as configurações funcionando
- ✓ Validações corretas
- ✓ Apenas ADMIN pode acessar
- ✓ Testes > 80% cobertura

---

## **FASE 8: INTEGRAÇÃO E REFINAMENTO** 🔄
**Duração**: 1-2 semanas  
**Objetivo**: Integrar todas as funcionalidades e refinar

### 📦 Tarefas

#### 8.1 - Integração Backend (Preparação)
- [ ] Documentar endpoints necessários
- [ ] Criar arquivo `API_SPEC.md`
- [ ] Preparar camada de abstração
- [ ] Configurar Axios/Fetch
- [ ] Criar interceptors para autenticação

#### 8.2 - Otimizações de Performance
- [ ] Implementar lazy loading de telas
- [ ] Otimizar re-renders desnecessários
- [ ] Implementar cache de dados
- [ ] Otimizar imagens e assets

#### 8.3 - Melhorias de UX
- [ ] Adicionar loading states em todas as ações
- [ ] Adicionar feedback visual (toasts/snackbars)
- [ ] Melhorar mensagens de erro
- [ ] Adicionar animações suaves
- [ ] Implementar skeleton screens

#### 8.4 - Acessibilidade
- [ ] Adicionar labels de acessibilidade
- [ ] Testar com screen readers
- [ ] Garantir contraste adequado
- [ ] Adicionar suporte a teclado (web)

#### 8.5 - Documentação Final
- [ ] Atualizar README.md completo
- [ ] Criar DEPLOYMENT.md
- [ ] Criar USER_GUIDE.md
- [ ] Documentar arquitetura
- [ ] Documentar APIs internas

#### 8.6 - Testes de Integração
- [ ] Testar fluxos completos
- [ ] Testar todos os níveis de permissão
- [ ] Testar em múltiplos dispositivos
- [ ] Testar em diferentes navegadores (web)

#### 8.7 - Revisão de Código
- [ ] Code review completo
- [ ] Refatorar código duplicado
- [ ] Aplicar padrões consistentes
- [ ] Remover código comentado/não usado

### ✅ Critérios de Aceite
- ✓ Todas as funcionalidades integradas
- ✓ Performance otimizada
- ✓ UX refinada
- ✓ Documentação completa
- ✓ Testes de integração passando
- ✓ Código limpo e consistente

---

## 🧪 ESTRATÉGIA DE TESTES

### Tipos de Testes

#### 1. Testes Unitários
**Objetivo**: Testar funções e componentes isoladamente  
**Ferramenta**: Jest + Testing Library  
**Cobertura Mínima**: 75%

```typescript
// Exemplo de teste unitário
describe('checkPermission', () => {
  it('should return true for admin accessing any feature', () => {
    const user = { permissionLevel: PermissionLevel.ADMIN };
    expect(checkPermission(user, 'any-feature')).toBe(true);
  });

  it('should return false for security accessing reports', () => {
    const user = { permissionLevel: PermissionLevel.SECURITY };
    expect(checkPermission(user, 'reports')).toBe(false);
  });
});
```

#### 2. Testes de Integração
**Objetivo**: Testar fluxos completos  
**Ferramenta**: Testing Library  
**Foco**: Jornadas do usuário

```typescript
// Exemplo de teste de integração
describe('Access Registration Flow', () => {
  it('should register entry successfully', async () => {
    // 1. Login como SECURITY
    // 2. Navegar para Registrar Entrada
    // 3. Buscar entidade
    // 4. Preencher formulário
    // 5. Confirmar entrada
    // 6. Verificar registro criado
  });
});
```

#### 3. Testes de Snapshot
**Objetivo**: Garantir que UI não mude inesperadamente  
**Ferramenta**: Jest Snapshots

```typescript
it('should match snapshot', () => {
  const tree = renderer.create(<AccessCard {...mockData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

#### 4. Testes de Permissões
**Objetivo**: Garantir segurança do sistema  
**Crítico**: Todos os níveis devem ser testados

```typescript
describe('Permission Security', () => {
  const testCases = [
    { level: PermissionLevel.GUEST, feature: 'reports', expected: false },
    { level: PermissionLevel.SECURITY, feature: 'entry', expected: true },
    // ... todos os casos da matriz
  ];

  testCases.forEach(({ level, feature, expected }) => {
    it(`should ${expected ? 'allow' : 'deny'} ${PermissionLevel[level]} to access ${feature}`, () => {
      expect(checkPermission({ permissionLevel: level }, feature)).toBe(expected);
    });
  });
});
```

### Estrutura de Teste Padrão

```typescript
// __tests__/components/ComponentName.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ComponentName } from '../../../src/components/ComponentName';

// Mock de dependências
jest.mock('../../../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: mockTheme,
    isDark: false,
    toggleTheme: jest.fn(),
  }),
}));

describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Reset mocks
  });

  // Teardown
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testes
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('should handle user interaction', async () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<ComponentName onPress={onPress} />);
    
    fireEvent.press(getByTestId('button'));
    
    await waitFor(() => {
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Checklist de Testes por Fase

Cada fase deve incluir:
- [ ] Testes unitários de services
- [ ] Testes unitários de hooks
- [ ] Testes de componentes
- [ ] Testes de navegação
- [ ] Testes de permissões
- [ ] Testes de validação
- [ ] Testes de responsividade
- [ ] Testes de acessibilidade

---

## 🎨 PADRÕES E GUIDELINES

### 1. Estrutura de Arquivos

```
src/screens/NomeFeature/
├── NomeFeatureScreen.tsx           # Componente principal
├── SubScreen.tsx                   # Sub-telas (se houver)
└── styles/
    ├── NomeFeatureScreen.styles.ts      # Estilos base
    ├── NomeFeatureScreen.styles.native.ts # Estilos mobile
    └── NomeFeatureScreen.styles.web.ts   # Estilos web
```

### 2. Nomenclatura

#### Arquivos
- **Componentes**: PascalCase - `AccessCard.tsx`
- **Hooks**: camelCase com prefixo use - `useAccess.ts`
- **Utils**: camelCase - `formatDate.ts`
- **Types**: camelCase - `access.ts`
- **Styles**: kebab-case - `access-card.styles.ts`

#### Código
- **Interfaces**: PascalCase com prefixo I (opcional) - `interface AccessRecord`
- **Types**: PascalCase - `type PermissionLevel`
- **Enums**: PascalCase - `enum AccessStatus`
- **Funções**: camelCase - `registerEntry()`
- **Constantes**: UPPER_SNAKE_CASE - `MAX_ENTRIES_PER_DAY`

### 3. Paleta de Cores

**Sempre usar cores do tema:**

```typescript
// ✅ CORRETO
<View style={{ backgroundColor: theme.background }}>
  <Text style={{ color: theme.text }}>Texto</Text>
</View>

// ❌ INCORRETO
<View style={{ backgroundColor: '#1a1d2e' }}>
  <Text style={{ color: '#ffffff' }}>Texto</Text>
</View>
```

**Cores Disponíveis:**
- `theme.background` - Fundo principal
- `theme.backgroundSecondary` - Fundo secundário
- `theme.backgroundCard` - Cards
- `theme.text` - Texto principal
- `theme.textSecondary` - Texto secundário
- `theme.primary` - Cor primária (azul/roxo)
- `theme.success` - Verde (sucesso)
- `theme.warning` - Amarelo (aviso)
- `theme.error` - Vermelho (erro)
- `theme.border` - Bordas

### 4. Responsividade

**Sempre usar sistema responsivo:**

```typescript
// ✅ CORRETO
import { responsive, deviceType } from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    padding: responsive.padding.lg,
    maxWidth: deviceType.isDesktop ? 1200 : '100%',
  },
  title: {
    fontSize: responsive.fontSize.xl,
  },
});

// ❌ INCORRETO
const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 1200,
  },
  title: {
    fontSize: 24,
  },
});
```

### 5. Tratamento de Erros

```typescript
// ✅ CORRETO
try {
  const result = await api.registerEntry(data);
  Alert.alert('Sucesso', 'Entrada registrada com sucesso');
  navigation.goBack();
} catch (error) {
  console.error('Error registering entry:', error);
  Alert.alert(
    'Erro',
    error instanceof Error ? error.message : 'Erro ao registrar entrada'
  );
}

// ❌ INCORRETO
try {
  await api.registerEntry(data);
  Alert.alert('Sucesso', 'Entrada registrada');
} catch (error) {
  Alert.alert('Erro', 'Deu erro');
}
```

### 6. Loading States

```typescript
// ✅ CORRETO
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submit(data);
  } finally {
    setLoading(false);
  }
};

return (
  <TouchableOpacity disabled={loading} onPress={handleSubmit}>
    {loading ? <ActivityIndicator /> : <Text>Enviar</Text>}
  </TouchableOpacity>
);
```

### 7. Permissões

**Sempre verificar permissões:**

```typescript
// ✅ CORRETO - Em componente
import { usePermission } from '../../contexts/PermissionContext';

const MyScreen = () => {
  const { hasPermission } = usePermission();
  
  if (!hasPermission('feature-name')) {
    return <NoPermissionScreen />;
  }
  
  return <MainContent />;
};

// ✅ CORRETO - Em navegação
<ProtectedRoute 
  name="Reports" 
  component={ReportsScreen}
  requiredLevel={PermissionLevel.SUPERVISOR}
/>
```

### 8. Comentários e Documentação

```typescript
/**
 * Registra uma nova entrada no sistema
 * 
 * @param data - Dados da entrada
 * @param data.entityId - ID da entidade
 * @param data.method - Método de registro (qrcode | manual | card)
 * @returns Promise com o registro criado
 * @throws Error se a entidade não for encontrada
 * 
 * @example
 * const entry = await registerEntry({
 *   entityId: '123',
 *   method: 'manual',
 *   observations: 'Visitante autorizado'
 * });
 */
export async function registerEntry(data: EntryData): Promise<AccessRecord> {
  // Implementação
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Para Cada Fase

Antes de considerar uma fase concluída, verificar:

#### Código
- [ ] Todos os arquivos criados conforme estrutura
- [ ] Nomenclatura consistente
- [ ] Imports organizados
- [ ] Sem código comentado/não usado
- [ ] Sem console.logs de debug

#### Funcionalidade
- [ ] Todas as tarefas da fase concluídas
- [ ] Validações implementadas
- [ ] Tratamento de erros adequado
- [ ] Loading states implementados
- [ ] Feedback ao usuário funcionando

#### UI/UX
- [ ] Segue paleta de cores do tema
- [ ] Responsivo (mobile + desktop)
- [ ] Animações suaves
- [ ] Elementos alinhados
- [ ] Espaçamentos consistentes
- [ ] Fontes do sistema responsivo

#### Permissões
- [ ] Verificação de permissões implementada
- [ ] Apenas níveis corretos têm acesso
- [ ] Redirecionamento para telas permitidas
- [ ] Mensagens de "sem permissão" adequadas

#### Testes
- [ ] Testes unitários escritos
- [ ] Testes de componentes escritos
- [ ] Testes de permissões escritos
- [ ] Todos os testes passando
- [ ] Cobertura mínima atingida (75%)

#### Documentação
- [ ] Comentários JSDoc em funções públicas
- [ ] README da feature atualizado (se aplicável)
- [ ] Tipos TypeScript documentados
- [ ] Exemplos de uso fornecidos

#### Code Review
- [ ] Código revisado por outro desenvolvedor
- [ ] Feedback aplicado
- [ ] Padrões do projeto seguidos
- [ ] Performance verificada

---

## 📊 MÉTRICAS DE QUALIDADE

### Cobertura de Testes
- **Mínimo Aceitável**: 70%
- **Objetivo**: 80%
- **Ideal**: 90%+

### Performance
- **Tempo de Carregamento**: < 3s
- **Tempo de Resposta**: < 500ms
- **FPS**: 60fps constantes

### Acessibilidade
- **Contraste**: WCAG AA mínimo
- **Screen Readers**: 100% compatível
- **Navegação por Teclado**: Funcional

### Code Quality
- **Complexidade Ciclomática**: < 10
- **Funções**: < 50 linhas
- **Componentes**: < 300 linhas

---

## 🎯 DEFINIÇÃO DE PRONTO (DoD)

Uma fase está **PRONTA** quando:

1. ✅ Todos os itens do checklist verificados
2. ✅ Critérios de aceite atingidos
3. ✅ Testes passando (> 75% cobertura)
4. ✅ Code review aprovado
5. ✅ Funcionalidade testada em:
   - [ ] Web (Chrome)
   - [ ] Android
   - [ ] iOS (se disponível)
6. ✅ Documentação atualizada
7. ✅ Sem bugs conhecidos críticos
8. ✅ Performance adequada
9. ✅ Merge na branch principal realizado

---

## 📝 NOTAS IMPORTANTES

### Prioridades
1. **Segurança**: Sistema de permissões é crítico
2. **Qualidade**: Testes não são opcionais
3. **UX**: Interface deve ser intuitiva
4. **Performance**: Sistema deve ser rápido

### Flexibilidade
- Prazos são estimativas e podem ser ajustados
- Funcionalidades podem ser priorizadas diferentemente
- Testes devem ser escritos junto com o código, não depois

### Comunicação
- Daily updates sobre progresso
- Bloqueios devem ser comunicados imediatamente
- Decisões técnicas devem ser documentadas

---

## 🚀 PRÓXIMOS PASSOS

1. **Revisar este roadmap** com o time
2. **Configurar ambiente de testes** (Fase 0)
3. **Iniciar Fase 1** - Sistema de Permissões
4. **Agendar reviews** semanais de progresso

---

**Última Atualização**: 06 de Outubro de 2025  
**Versão do Documento**: 1.0  
**Status**: Pronto para Início  

---

