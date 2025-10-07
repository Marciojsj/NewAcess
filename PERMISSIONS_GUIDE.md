# 🔐 Sistema de Permissões - Referência Visual

## Visão Geral

O Access Control System implementa **6 níveis hierárquicos** de permissões, onde cada nível superior herda automaticamente as permissões dos níveis inferiores.

```
     👑 ADMIN (5)           ← Acesso Total
         ↑
     👔 MANAGER (4)         ← Configurações + Alertas
         ↑
    👨‍💼 SUPERVISOR (3)      ← Relatórios + Aprovações
         ↑
    📋 RECEPTIONIST (2)    ← Gestão de Visitantes
         ↑
    🛡️ SECURITY (1)         ← Registro Entrada/Saída
         ↑
     👤 GUEST (0)           ← Acesso Mínimo
```

---

## 📊 Matriz de Permissões Completa

### Legenda
- ✅ = Tem Permissão
- ❌ = Sem Permissão
- 👁️ = Apenas Visualizar
- ➕ = Criar
- ✏️ = Editar
- 🗑️ = Deletar

---

## 🏠 **DASHBOARD & BÁSICO**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Login** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Home/Dashboard** | ❌ | 👁️ | 👁️ | 👁️ | 👁️ | ✅ |
| **Editar Perfil** | ❌ | ✏️ | ✏️ | ✏️ | ✏️ | ✅ |

---

## 🚪 **REGISTRO DE ACESSO**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Registros** | ❌ | 👁️ | 👁️ | 👁️ | 👁️ | ✅ |
| **Registrar Entrada** | ❌ | ➕ | ➕ | ➕ | ➕ | ✅ |
| **Editar Entrada** | ❌ | ❌ | ✏️ | ✏️ | ✏️ | ✅ |
| **Deletar Entrada** | ❌ | ❌ | ❌ | ❌ | 🗑️ | ✅ |
| **Registrar Saída** | ❌ | ➕ | ➕ | ➕ | ➕ | ✅ |
| **Editar Saída** | ❌ | ❌ | ✏️ | ✏️ | ✏️ | ✅ |
| **Deletar Saída** | ❌ | ❌ | ❌ | ❌ | 🗑️ | ✅ |
| **Histórico Completo** | ❌ | 👁️ | 👁️ | 👁️ | 👁️✏️ | ✅ |

---

## 👥 **GESTÃO DE VISITANTES**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Visitantes** | ❌ | ❌ | 👁️ | 👁️ | 👁️ | ✅ |
| **Cadastrar Visitante** | ❌ | ❌ | ➕ | ➕ | ➕ | ✅ |
| **Editar Visitante** | ❌ | ❌ | ✏️ | ✏️ | ✏️ | ✅ |
| **Deletar Visitante** | ❌ | ❌ | ❌ | 🗑️ | 🗑️ | ✅ |
| **Ver Histórico Visitante** | ❌ | ❌ | 👁️ | 👁️ | 👁️ | ✅ |
| **Bloquear Visitante** | ❌ | ❌ | ❌ | ✏️ | ✏️ | ✅ |
| **Upload de Foto** | ❌ | ❌ | ➕ | ➕ | ➕ | ✅ |

---

## 🏢 **GESTÃO DE ENTIDADES**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Entidades** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Criar Entidade** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Editar Entidade** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Deletar Entidade** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 📈 **RELATÓRIOS & ANALYTICS**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Relatórios** | ❌ | ❌ | ❌ | 👁️ | 👁️ | ✅ |
| **Gerar Relatórios** | ❌ | ❌ | ❌ | ➕ | ➕ | ✅ |
| **Exportar PDF** | ❌ | ❌ | ❌ | 📄 | 📄 | ✅ |
| **Exportar Excel** | ❌ | ❌ | ❌ | 📊 | 📊 | ✅ |
| **Relatórios Avançados** | ❌ | ❌ | ❌ | ❌ | 👁️ | ✅ |
| **Dashboard Analytics** | ❌ | ❌ | ❌ | 👁️ | 👁️ | ✅ |
| **Filtros Personalizados** | ❌ | ❌ | ❌ | ⚙️ | ⚙️ | ✅ |

---

## ⚠️ **SISTEMA DE ALERTAS**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Alertas** | ❌ | ❌ | ❌ | 👁️ | 👁️ | ✅ |
| **Criar Alertas** | ❌ | ❌ | ❌ | ❌ | ➕ | ✅ |
| **Editar Alertas** | ❌ | ❌ | ❌ | ❌ | ✏️ | ✅ |
| **Deletar Alertas** | ❌ | ❌ | ❌ | ❌ | 🗑️ | ✅ |
| **Configurar Regras** | ❌ | ❌ | ❌ | ❌ | ⚙️ | ✅ |
| **Notificações Push** | ❌ | ❌ | ❌ | ❌ | 🔔 | ✅ |
| **Resolver Alertas** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |

---

## ⚙️ **CONFIGURAÇÕES**

| Funcionalidade | GUEST | SECURITY | RECEPTIONIST | SUPERVISOR | MANAGER | ADMIN |
|----------------|-------|----------|--------------|------------|---------|-------|
| **Ver Configurações** | ❌ | ❌ | ❌ | ❌ | 👁️ | ✅ |
| **Config. Sistema** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Config. Segurança** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Gerenciar Usuários** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Atribuir Permissões** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Ver Logs Sistema** | ❌ | ❌ | ❌ | ❌ | 👁️ | ✅ |
| **Backup/Restore** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🎭 Descrição Detalhada dos Níveis

### 👤 **GUEST (Nível 0)**
**Quem**: Visitantes, usuários não autenticados  
**Acesso**: Login apenas  
**Casos de Uso**: 
- Tela de login
- Recuperação de senha (futuro)

---

### 🛡️ **SECURITY (Nível 1)**
**Quem**: Seguranças, porteiros  
**Acesso**: Registro de entrada/saída  
**Pode**:
- ✅ Registrar entrada de pessoas
- ✅ Registrar saída de pessoas
- ✅ Ver lista de acessos do dia
- ✅ Buscar entidades
- ✅ Ver histórico básico

**Não Pode**:
- ❌ Editar registros antigos
- ❌ Deletar registros
- ❌ Gerenciar visitantes
- ❌ Acessar relatórios

**Casos de Uso**:
- Portaria principal
- Controle de acesso básico
- Registro em tempo real

---

### 📋 **RECEPTIONIST (Nível 2)**
**Quem**: Recepcionistas, atendentes  
**Acesso**: Security + Gestão de Visitantes  
**Pode**:
- ✅ Tudo que SECURITY pode
- ✅ Cadastrar novos visitantes
- ✅ Editar informações de visitantes
- ✅ Ver histórico completo de visitantes
- ✅ Upload de fotos de visitantes
- ✅ Editar registros de entrada/saída

**Não Pode**:
- ❌ Deletar visitantes
- ❌ Bloquear visitantes
- ❌ Acessar relatórios
- ❌ Ver alertas

**Casos de Uso**:
- Recepção de empresas
- Cadastro de visitantes
- Gestão de badges temporários

---

### 👨‍💼 **SUPERVISOR (Nível 3)**
**Quem**: Supervisores, coordenadores  
**Acesso**: Receptionist + Relatórios + Aprovações  
**Pode**:
- ✅ Tudo que RECEPTIONIST pode
- ✅ Deletar visitantes
- ✅ Bloquear/desbloquear visitantes
- ✅ Acessar todos os relatórios
- ✅ Exportar relatórios (PDF/Excel)
- ✅ Ver alertas do sistema
- ✅ Aprovar solicitações especiais

**Não Pode**:
- ❌ Criar alertas customizados
- ❌ Configurar regras
- ❌ Alterar configurações do sistema
- ❌ Gerenciar usuários

**Casos de Uso**:
- Supervisão de operações
- Análise de dados
- Tomada de decisões táticas
- Investigações

---

### 👔 **MANAGER (Nível 4)**
**Quem**: Gerentes, gestores  
**Acesso**: Supervisor + Alertas + Configurações Avançadas  
**Pode**:
- ✅ Tudo que SUPERVISOR pode
- ✅ Criar alertas customizados
- ✅ Configurar regras de alertas
- ✅ Editar alertas
- ✅ Resolver alertas críticos
- ✅ Relatórios avançados
- ✅ Configurações gerais do sistema
- ✅ Ver logs de atividades

**Não Pode**:
- ❌ Gerenciar entidades
- ❌ Gerenciar usuários
- ❌ Atribuir permissões
- ❌ Configurações de segurança críticas
- ❌ Backup/Restore

**Casos de Uso**:
- Gestão estratégica
- Configuração de políticas
- Monitoramento proativo
- Otimização de processos

---

### 👑 **ADMIN (Nível 5)**
**Quem**: Administradores do sistema  
**Acesso**: TOTAL E IRRESTRITO  
**Pode**:
- ✅ **TUDO** que todos os níveis podem
- ✅ Gerenciar todas as entidades
- ✅ Criar/editar/deletar usuários
- ✅ Atribuir e alterar permissões
- ✅ Configurações críticas de segurança
- ✅ Backup e restauração
- ✅ Visualizar todos os logs
- ✅ Acesso a APIs e integrações
- ✅ Manutenção do sistema

**Responsabilidades**:
- Garantir segurança do sistema
- Gerenciar acessos
- Manter integridade dos dados
- Suporte técnico avançado

**Casos de Uso**:
- Administração completa
- Configuração inicial
- Manutenção e troubleshooting
- Auditoria e compliance

---

## 🔒 Regras de Segurança

### 1. Herança de Permissões
Cada nível **herda automaticamente** todas as permissões dos níveis inferiores.

```
ADMIN (5) possui:
  ├─ Suas próprias permissões
  ├─ Todas de MANAGER (4)
  ├─ Todas de SUPERVISOR (3)
  ├─ Todas de RECEPTIONIST (2)
  ├─ Todas de SECURITY (1)
  └─ Todas de GUEST (0)
```

### 2. Princípio do Menor Privilégio
- Usuários devem ter **apenas** as permissões necessárias para suas funções
- Revisão periódica de permissões é obrigatória
- Permissões temporárias devem ter data de expiração

### 3. Segregação de Funções
- Nenhum nível inferior a ADMIN pode gerenciar suas próprias permissões
- Alterações de permissões requerem aprovação de ADMIN
- Logs de alterações são permanentes e imutáveis

### 4. Auditoria
- **Todas** as ações são registradas com:
  - Quem executou
  - O que foi feito
  - Quando foi feito
  - IP de origem
  - Dispositivo usado

### 5. Sessões
- **GUEST**: Sem sessão persistente
- **SECURITY - RECEPTIONIST**: Sessão de 8 horas
- **SUPERVISOR - MANAGER**: Sessão de 12 horas
- **ADMIN**: Sessão de 24 horas (requer reautenticação para ações críticas)

---

## 🎯 Exemplos de Uso

### Cenário 1: Entrada de Funcionário
```
1. SECURITY registra entrada → ✅ Permitido
2. Sistema valida → Entrada registrada
3. SECURITY tenta editar → ❌ Negado (sem permissão)
4. RECEPTIONIST edita → ✅ Permitido
```

### Cenário 2: Novo Visitante
```
1. RECEPTIONIST cadastra → ✅ Permitido
2. Upload de foto → ✅ Permitido
3. RECEPTIONIST tenta deletar → ❌ Negado
4. SUPERVISOR deleta → ✅ Permitido
```

### Cenário 3: Relatório Mensal
```
1. SECURITY tenta acessar → ❌ Negado
2. SUPERVISOR acessa → ✅ Permitido
3. SUPERVISOR exporta PDF → ✅ Permitido
4. MANAGER cria filtro customizado → ✅ Permitido
```

### Cenário 4: Alerta de Segurança
```
1. Sistema detecta tentativa não autorizada
2. Alerta é criado automaticamente
3. SUPERVISOR visualiza → ✅ Permitido
4. SUPERVISOR tenta resolver → ❌ Negado (só visualizar)
5. MANAGER resolve → ✅ Permitido
```

### Cenário 5: Mudança de Permissão
```
1. MANAGER tenta promover SECURITY → ❌ Negado
2. ADMIN revisa solicitação
3. ADMIN aprova e altera → ✅ Permitido
4. Log é registrado permanentemente
5. Usuário é notificado da mudança
```

---

## 🔍 Verificação de Permissões no Código

### No Component
```typescript
import { usePermission } from '../../contexts/PermissionContext';

const MyComponent = () => {
  const { hasPermission, userLevel } = usePermission();
  
  // Verificar feature específica
  if (!hasPermission(Feature.REPORTS)) {
    return <NoPermissionScreen />;
  }
  
  // Verificar nível mínimo
  if (userLevel < PermissionLevel.SUPERVISOR) {
    return <InsufficientPermissionScreen />;
  }
  
  return <MainContent />;
};
```

### Na Navegação
```typescript
<ProtectedRoute 
  name="Reports" 
  component={ReportsScreen}
  requiredLevel={PermissionLevel.SUPERVISOR}
  requiredFeature={Feature.REPORTS}
/>
```

### Em Serviços
```typescript
async function deleteVisitor(id: string) {
  // Verificar permissão antes de executar
  if (!checkPermission(currentUser, Feature.VISITOR_DELETE)) {
    throw new PermissionError('Sem permissão para deletar visitantes');
  }
  
  // Registrar log de auditoria
  await logAction({
    user: currentUser.id,
    action: 'DELETE_VISITOR',
    resource: id,
    timestamp: new Date(),
  });
  
  // Executar ação
  await api.deleteVisitor(id);
}
```

---

## 📋 Checklist de Implementação

### Fase 1: Sistema de Permissões
- [ ] Criar `PermissionContext`
- [ ] Implementar `checkPermission()` helper
- [ ] Criar `ProtectedRoute` component
- [ ] Criar `PermissionGate` component
- [ ] Atualizar `AuthContext` com níveis
- [ ] Implementar verificações em todas as telas
- [ ] Criar tela de configuração de permissões
- [ ] Escrever testes completos (100% da matriz)
- [ ] Documentar uso de permissões
- [ ] Code review de segurança

---

## 🚨 Casos de Exceção

### Situações Especiais

1. **Emergências**: Modo de emergência pode ser ativado por ADMIN, dando acesso temporário de MANAGER a todos.

2. **Manutenção**: Durante manutenção, apenas ADMIN tem acesso.

3. **Auditoria Externa**: Perfil especial READ-ONLY para auditores.

4. **Suporte Técnico**: Acesso temporário e monitorado para suporte.

---

**Este documento é a fonte oficial de verdade para o sistema de permissões.**

**Última Atualização**: 06 de Outubro de 2025
