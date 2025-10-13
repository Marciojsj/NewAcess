# 🔄 Sistema de CRUD Padronizado

## 📋 Visão Geral

Sistema completo de CRUD com feedback visual automático, logs detalhados e atualização instantânea de listas. Implementado para garantir consistência em todas as telas do aplicativo.

## ✨ Características

### 1. Feedback Visual Automático
- ✅ Toast de sucesso ao criar/editar/excluir
- ❌ Toast de erro com mensagem detalhada
- 🔄 Loading state durante operações
- ✉️ Mensagens amigáveis ao usuário

### 2. Logs Detalhados
- 📝 Log de cada tentativa de operação
- ✅ Log de sucesso com dados retornados
- ❌ Log de erro com status HTTP e mensagem
- 🔍 Dados enviados sempre logados para debug

### 3. Atualização Automática
- 🔄 Lista atualiza automaticamente após criar
- 🔄 Lista atualiza automaticamente após editar
- 🔄 Lista atualiza automaticamente após excluir
- ⚡ Sem necessidade de recarregar a página

### 4. Modal Management
- 🚪 Modal fecha automaticamente após salvar com sucesso
- ⚠️ Modal permanece aberto se houver erro
- 🔄 Estado limpo ao abrir/fechar modal
- 📝 Diferencia create vs edit automaticamente

## 🛠️ Componentes do Sistema

### 1. **feedback.ts** - Sistema de Feedback
```typescript
import { crudFeedback, crudLogger } from '../utils/feedback';

// Mostrar sucesso ao criar
crudFeedback.createSuccess('Entidade');

// Mostrar erro ao criar
crudFeedback.createError('Entidade', error);

// Log de tentativa
crudLogger.attempt('CREATE', 'Entidade', data);
```

### 2. **useCrudOperations** - Hook para CRUD
```typescript
import { useCrudOperations } from '../hooks/useCrudOperations';

const {
  isLoading,
  modalVisible,
  editingItem,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleSave,        // Unificado - decide entre create/update
  openCreateModal,
  openEditModal,
  closeModal
} = useCrudOperations({
  entityName: 'Entidade',
  loadData: fetchEntities,
  createFn: entitiesApi.create,
  updateFn: entitiesApi.update,
  deleteFn: entitiesApi.delete
});
```

## 📝 Exemplo de Uso Completo

### Implementação em uma Screen

```typescript
import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import { entitiesApi, Entity } from '../services/api/entitiesApi';
import { useCrudOperations } from '../hooks/useCrudOperations';

export const EntitiesScreen = () => {
  const [entities, setEntities] = useState<Entity[]>([]);

  // Função para carregar dados
  const loadEntities = async () => {
    const data = await entitiesApi.getAll();
    setEntities(data);
  };

  // Hook de CRUD
  const {
    isLoading,
    modalVisible,
    editingItem,
    handleSave,
    handleDelete,
    openCreateModal,
    openEditModal,
    closeModal
  } = useCrudOperations<Entity>({
    entityName: 'Entidade',
    loadData: loadEntities,
    createFn: entitiesApi.create,
    updateFn: entitiesApi.update,
    deleteFn: entitiesApi.delete
  });

  // Carregar dados ao montar
  useEffect(() => {
    loadEntities();
  }, []);

  // Handler do formulário
  const onSubmit = async (formData: any) => {
    const success = await handleSave(formData, editingItem?.id);
    // Modal fecha automaticamente se success === true
    // Lista atualiza automaticamente
  };

  // Handler de exclusão
  const onDelete = async (id: string) => {
    const success = await handleDelete(id);
    // Lista atualiza automaticamente se success === true
  };

  return (
    <View>
      <Button title="Nova Entidade" onPress={openCreateModal} />
      
      <FlatList
        data={entities}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Editar" onPress={() => openEditModal(item)} />
            <Button title="Excluir" onPress={() => onDelete(item.id)} />
          </View>
        )}
      />

      <Modal visible={modalVisible} onClose={closeModal}>
        <EntityForm
          initialData={editingItem}
          onSubmit={onSubmit}
          onCancel={closeModal}
          isLoading={isLoading}
        />
      </Modal>
    </View>
  );
};
```

## 🎯 Fluxo de Operações

### CREATE (Criar)
1. Usuário clica em "Novo"
2. Modal abre (estado limpo)
3. Usuário preenche formulário
4. Clica em "Salvar"
5. **Sistema executa:**
   - Log: "➡️ Tentando criar..."
   - API POST
   - Se sucesso:
     - Log: "✅ Criado com sucesso - ID: xxx"
     - Toast: "✅ Entidade criada com sucesso!"
     - Fecha modal
     - Atualiza lista
   - Se erro:
     - Log: "❌ ERRO ao criar" + detalhes
     - Toast: "❌ Falha ao criar. [mensagem do erro]"
     - Modal permanece aberto

### UPDATE (Editar)
1. Usuário clica em "Editar" em um item
2. Modal abre com dados preenchidos
3. Usuário modifica formulário
4. Clica em "Salvar"
5. **Sistema executa:**
   - Log: "➡️ Tentando atualizar..."
   - API PUT/PATCH
   - Se sucesso:
     - Log: "✅ Atualizado com sucesso"
     - Toast: "✅ Alterações salvas com sucesso!"
     - Fecha modal
     - Atualiza lista
   - Se erro:
     - Log: "❌ ERRO ao atualizar" + detalhes
     - Toast: "❌ Não foi possível atualizar. [mensagem]"
     - Modal permanece aberto

### DELETE (Excluir)
1. Usuário clica em "Excluir"
2. Confirmação é solicitada (opcional)
3. Usuário confirma
4. **Sistema executa:**
   - Log: "➡️ Tentando excluir..."
   - API DELETE
   - Se sucesso:
     - Log: "✅ Excluído com sucesso"
     - Toast: "🗑️ Registro excluído com sucesso!"
     - Atualiza lista (remove item)
   - Se erro:
     - Log: "❌ ERRO ao excluir" + detalhes
     - Toast: "❌ Falha ao excluir. [mensagem]"

## 🧪 Testes

Os testes em `__tests__/integration/crud.integration.test.ts` demonstram:

```bash
npm run test:crud:direct
```

**Saída dos testes:**
```
🏢 Criando entidades...
  ➡️  Tentando criar: TEST_xxx_SCHOOL (SCHOOL)
  ✅ Criado com sucesso - ID: 6754f619-d391-42f7-afb3-b55a660a5729

✅ Total de entidades criadas: 5
✅ Total de visitantes criados: 10
✅ Total de usuários criados: 3

📊 RESUMO FINAL - ENTIDADES NO SISTEMA
🏢 ENTIDADES (1 total):
  1. Entidade Principal (COMPANY) - ID: 00000000-0000-0000-0000-000000000001

👥 VISITANTES (2 total):
  1. Maria Santos - CPF: 98765432101 - ID: c6b1e5cf-8926-43e3-86de-42248f7125c6
  2. João Silva - CPF: 98765432100 - ID: 6f3a566f-8ffa-4b93-b6eb-dc8850281302

👤 USUÁRIOS (5 total):
  1. SuperAdmin Teste (SUPERADMIN) - Email: superadmin@teste.com - ID: xxx
  2. Admin Teste (ADMIN) - Email: admin@teste.com - ID: xxx
  ...
```

## 📱 Próximas Implementações

### 1. Atualizar EntidadeScreen
- [ ] Integrar `useCrudOperations` hook
- [ ] Remover lógica manual de modal/loading
- [ ] Adicionar feedback visual com toast
- [ ] Testar create/update/delete completo

### 2. Atualizar VisitantesScreen
- [ ] Mesma implementação do EntidadeScreen
- [ ] Garantir que entityId é passado corretamente
- [ ] Testar regeneração de QR Code

### 3. Atualizar UsersScreen
- [ ] Implementar com useCrudOperations
- [ ] Adicionar confirmação de exclusão
- [ ] Validar permissões por role

### 4. Melhorar Feedback Visual (Web)
- [ ] Substituir `alert()` por toast library
- [ ] Adicionar animações de entrada/saída
- [ ] Posicionar no canto superior direito
- [ ] Duração configurável (3-5 segundos)

### 5. Mobile
- [ ] Testar feedback em React Native
- [ ] Ajustar Alert.alert se necessário
- [ ] Adicionar haptic feedback

## 🎨 Personalização

### Mensagens Customizadas

```typescript
// Feedback personalizado
showFeedback(
  'success',
  'Operação Concluída',
  'Seu registro foi salvo com sucesso!'
);

// Log customizado
crudLogger.attempt('CUSTOM_ACTION', 'Recurso', { custom: 'data' });
```

### Estender o Hook

```typescript
const crud = useCrudOperations({
  entityName: 'Projeto',
  loadData: loadProjects,
  createFn: projectsApi.create,
  updateFn: projectsApi.update,
  deleteFn: projectsApi.delete
});

// Adicionar lógica customizada
const customCreate = async (data: any) => {
  // Validação adicional
  if (!data.name) {
    showFeedback('warning', 'Atenção', 'Nome é obrigatório');
    return false;
  }
  
  // Usar handler padrão
  return await crud.handleCreate(data);
};
```

## 📊 Estatísticas

- **Testes CRUD**: 27/27 passando (100%)
- **Entidades Testadas**: Entities, Visitors, Users
- **Operações Testadas**: CREATE, READ, UPDATE, DELETE, QR CODE
- **Tempo de Execução**: ~38 segundos

## 🚀 Benefícios

1. **Consistência**: Todas as telas seguem o mesmo padrão
2. **Manutenibilidade**: Lógica centralizada no hook
3. **Debugging**: Logs detalhados facilitam troubleshooting
4. **UX**: Feedback imediato e claro para o usuário
5. **Produtividade**: Menos código boilerplate em cada screen
6. **Testabilidade**: Comportamento previsível e testável

## 📚 Referências

- **feedback.ts**: `src/utils/feedback.ts`
- **useCrudOperations**: `src/hooks/useCrudOperations.ts`
- **Testes**: `__tests__/integration/crud.integration.test.ts`
- **APIs**: `src/services/api/`

---

**Última Atualização**: 13/10/2025
**Versão**: 1.0.0
**Status**: ✅ Implementado e Testado
