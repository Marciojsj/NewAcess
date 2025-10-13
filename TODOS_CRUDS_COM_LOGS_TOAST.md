# Todos os CRUDs com Logs e Toast ✅

## 📋 Problema Original

Usuário relatou que ao criar usuário manualmente:
- ✗ Modal não fechava
- ✗ Dados não persistiam no banco
- ✗ Backend validava corretamente mas nada acontecia
- ✗ Mesmo problema que EntidadeScreen tinha antes

## 🔍 Solução Aplicada

Adicionamos **logs detalhados** em toda a cadeia de requisição:
- Backend: Controllers, Services, Response Utils
- Frontend: API clients, Hooks, Components

E integramos **Toast** para feedback visual em todos os CRUDs.

---

## ✅ Arquivos Modificados

### 🔴 Backend - Logs Completos

#### 1. **access-backend/src/utils/response.util.ts**
```typescript
export const successResponse = (res: Response, data: any, message?: string, statusCode = 200) => {
  const responseBody = {
    success: true,
    message: message || 'Success',
    data,
  };
  
  console.log('✅ [RESPONSE] Enviando sucesso. Status:', statusCode);
  console.log('✅ [RESPONSE] Body:', JSON.stringify(responseBody, null, 2));
  
  return res.status(statusCode).json(responseBody);
};
```

**O que faz:**
- Loga TODA resposta de sucesso antes de enviar
- Mostra estrutura completa: `{ success, message, data }`
- Ajuda a identificar se os dados estão no lugar certo

---

#### 2. **access-backend/src/controllers/users.controller.ts**
```typescript
async createUser(req: AuthRequest, res: Response) {
  try {
    console.log('📝 [CONTROLLER] Criando usuário. Body:', req.body);
    const user = await usersService.createUser(req.body);
    console.log('✅ [CONTROLLER] Usuário criado:', user);
    console.log('➡️ [CONTROLLER] Enviando resposta com successResponse');
    return successResponse(res, user, 'Usuário criado com sucesso', 201);
  } catch (error: any) {
    console.error('❌ [CONTROLLER] Erro ao criar usuário:', error);
    return errorResponse(res, error.message, 400);
  }
}
```

**O que faz:**
- Loga dados recebidos da requisição
- Loga usuário criado pelo service
- Loga quando vai enviar resposta
- Loga erros com detalhes

---

#### 3. **access-backend/src/services/users.service.ts**
```typescript
async createUser(data: {...}) {
  try {
    console.log('🔄 [SERVICE] Tentando criar usuário. Dados:', { ...data, password: '***' });
    
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      console.log('❌ [SERVICE] Email já existe:', data.email);
      throw new Error('Email já está em uso');
    }

    console.log('🔐 [SERVICE] Hasheando senha...');
    const hashedPassword = await hashPassword(data.password);

    console.log('💾 [SERVICE] Salvando no banco de dados...');
    const user = await prisma.user.create({...});

    console.log('✅ [SERVICE] Usuário criado com sucesso. ID:', user.id);
    return user;
  } catch (error: any) {
    console.error('❌ [SERVICE] Erro ao criar usuário:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
}
```

**O que faz:**
- Loga cada etapa da criação
- Verifica se email já existe
- Loga hash de senha
- Loga salvamento no banco
- Loga sucesso com ID gerado
- Loga erros com stack trace completo

---

#### 4. **access-backend/src/controllers/visitors.controller.ts**
```typescript
async createVisitor(req: AuthRequest, res: Response) {
  try {
    console.log('📝 [CONTROLLER] Criando visitante. Body:', req.body);
    const visitor = await visitorsService.createVisitor(req.body);
    console.log('✅ [CONTROLLER] Visitante criado:', visitor);
    return successResponse(res, visitor, 'Visitante criado com sucesso', 201);
  } catch (error: any) {
    console.error('❌ [CONTROLLER] Erro ao criar visitante:', error);
    return errorResponse(res, error.message, 400);
  }
}

async updateVisitor(req: AuthRequest, res: Response) {
  try {
    console.log('📝 [CONTROLLER] Atualizando visitante:', req.params.id);
    const { id } = req.params;
    const visitor = await visitorsService.updateVisitor(id, req.body);
    console.log('✅ [CONTROLLER] Visitante atualizado:', visitor);
    return successResponse(res, visitor, 'Visitante atualizado com sucesso');
  } catch (error: any) {
    console.error('❌ [CONTROLLER] Erro ao atualizar visitante:', error);
    return errorResponse(res, error.message, 400);
  }
}
```

---

### 🔵 Frontend - API Clients com Logs

#### 5. **src/services/api/usersApi.ts**
```typescript
async create(data: CreateUserData): Promise<User> {
  console.log('📤 [usersApi] Enviando requisição de criação');
  console.log('📤 [usersApi] URL: POST /users');
  console.log('📤 [usersApi] Dados:', { ...data, password: '***' });
  
  const response = await apiClient.post('/users', data);
  
  console.log('📥 [usersApi] Resposta recebida');
  console.log('📥 [usersApi] Status:', response.status);
  console.log('📥 [usersApi] Response completa:', response.data);
  console.log('📥 [usersApi] response.data.data:', response.data.data);
  
  return response.data.data;
}
```

**O que faz:**
- Loga requisição ANTES de enviar
- Loga URL e método HTTP
- Loga dados (com senha mascarada)
- Loga resposta COMPLETA recebida
- Loga especificamente `response.data.data`
- Retorna `response.data.data` (campo correto)

---

#### 6. **src/services/api/visitorsApi.ts**
```typescript
async create(data: CreateVisitorData): Promise<Visitor> {
  console.log('📤 [visitorsApi] Enviando requisição de criação');
  console.log('📤 [visitorsApi] Dados:', data);
  
  const response = await apiClient.post('/visitors', data);
  
  console.log('📥 [visitorsApi] Resposta recebida');
  console.log('📥 [visitorsApi] Status:', response.status);
  console.log('📥 [visitorsApi] Response.data:', response.data);
  
  return response.data.data;
}

async update(id: string, data: UpdateVisitorData): Promise<Visitor> {
  console.log('📤 [visitorsApi] Atualizando visitante:', id);
  console.log('📤 [visitorsApi] Dados:', data);
  
  const response = await apiClient.put(`/visitors/${id}`, data);
  
  console.log('📥 [visitorsApi] Resposta recebida');
  console.log('📥 [visitorsApi] Response.data:', response.data);
  
  return response.data.data;
}
```

---

### 🟢 Frontend - Hooks com Logs

#### 7. **src/hooks/useUsers.ts**
```typescript
const createUser = useCallback(async (userData: UserFormData) => {
  try {
    console.log('🔷 [useUsers] Iniciando criação de usuário');
    console.log('📤 [useUsers] Dados enviados:', {
      ...userData,
      password: '***'
    });
    setLoading(true);
    setError(null);
    
    const newUser = await userService.createUser(userData);
    console.log('📥 [useUsers] Usuário retornado do serviço:', newUser);
    
    setUsers(prev => {
      console.log('🔄 [useUsers] Atualizando lista local. Antes:', prev.length);
      const updated = [...prev, newUser];
      console.log('🔄 [useUsers] Depois:', updated.length);
      return updated;
    });
    
    console.log('✅ [useUsers] Criação concluída com sucesso');
    return newUser;
  } catch (err: any) {
    console.error('❌ [useUsers] Erro na criação:', err);
    setError(err.message || 'Erro ao criar usuário');
    throw err;
  } finally {
    setLoading(false);
  }
}, []);
```

**O que faz:**
- Loga início da operação no hook
- Loga dados enviados ao service
- Loga usuário retornado
- Loga atualização da lista local (antes/depois)
- Loga conclusão com sucesso
- Loga erros completos

---

#### 8. **src/hooks/useVisitors.ts**
```typescript
const createVisitor = async (visitorData: any) => {
  try {
    console.log('🔷 [useVisitors] Iniciando criação de visitante');
    console.log('📤 [useVisitors] Dados enviados:', visitorData);
    setLoading(true);
    setError(null);
    
    const newVisitor = await visitorApi.createVisitor(visitorData);
    console.log('📥 [useVisitors] Visitante retornado:', newVisitor);
    
    setVisitors(prev => {
      console.log('🔄 [useVisitors] Atualizando lista. Antes:', prev.length);
      const updated = [...prev, newVisitor];
      console.log('🔄 [useVisitors] Depois:', updated.length);
      return updated;
    });
    
    console.log('✅ [useVisitors] Criação concluída com sucesso');
    return newVisitor;
  } catch (err: any) {
    console.error('❌ [useVisitors] Erro na criação:', err);
    setError(err.message || 'Erro ao criar visitante');
    throw err;
  } finally {
    setLoading(false);
  }
};

const updateVisitor = async (id: string, visitorData: any) => {
  try {
    console.log('🔷 [useVisitors] Iniciando atualização de visitante:', id);
    console.log('📤 [useVisitors] Dados de atualização:', visitorData);
    setLoading(true);
    setError(null);
    
    const updatedVisitor = await visitorApi.updateVisitor(id, visitorData);
    console.log('📥 [useVisitors] Visitante atualizado retornado:', updatedVisitor);
    
    setVisitors(prev => {
      const updated = prev.map(v => v.id === id ? updatedVisitor : v);
      console.log('🔄 [useVisitors] Lista atualizada');
      return updated;
    });
    
    console.log('✅ [useVisitors] Atualização concluída com sucesso');
    return updatedVisitor;
  } catch (err: any) {
    console.error('❌ [useVisitors] Erro na atualização:', err);
    setError(err.message || 'Erro ao atualizar visitante');
    throw err;
  } finally {
    setLoading(false);
  }
};
```

---

### 🟡 Frontend - Screens com Toast

#### 9. **src/screens/users/UsersScreen.tsx**
✅ **JÁ DOCUMENTADO EM**: `USERS_SCREEN_CORRIGIDA.md`

---

#### 10. **src/screens/visitantes/VisitantesScreen.tsx**

**Imports adicionados:**
```typescript
import { Toast } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
```

**Hook integrado:**
```typescript
const { toast, hideToast, success, error: showError } = useToast();
```

**handleSubmitForm com logs e Toast:**
```typescript
const handleSubmitForm = async (data: any) => {
  try {
    console.log('💾 Iniciando submissão do formulário de visitante');
    console.log('📝 Dados recebidos:', data);
    
    if (selectedVisitor) {
      console.log('➡️ Atualizando visitante existente:', selectedVisitor.id);
      const result = await updateVisitor(selectedVisitor.id, data);
      console.log('✅ Visitante atualizado com sucesso:', result);
      success('Visitante atualizado com sucesso!');
    } else {
      console.log('➡️ Criando novo visitante');
      const result = await createVisitor(data);
      console.log('✅ Visitante criado com sucesso:', result);
      success('Visitante criado com sucesso!');
    }
    
    console.log('🚪 Fechando modal após sucesso');
    setShowForm(false);
    setSelectedVisitor(null);
  } catch (error: any) {
    console.error('❌ Erro ao salvar visitante:', error);
    console.error('Stack trace:', error.stack);
    console.error('Response:', error.response?.data);
    showError(error.message || 'Erro ao salvar visitante');
    // NÃO fecha modal em caso de erro
    throw error;
  }
};
```

**handleDelete com Toast:**
```typescript
const handleDelete = (id: string) => {
  Alert.alert('Confirmar Exclusão', '...', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Excluir',
      onPress: async () => {
        try {
          console.log('🗑️ Tentando excluir visitante:', id);
          await deleteVisitor(id);
          console.log('✅ Visitante excluído com sucesso');
          success('Visitante excluído com sucesso!');
        } catch (error: any) {
          console.error('❌ Erro ao excluir visitante:', error);
          showError(error.message || 'Erro ao excluir visitante');
        }
      },
    },
  ]);
};
```

**handleRegenerateQR com Toast:**
```typescript
const handleRegenerateQR = async () => {
  if (!qrVisitor) return;
  
  try {
    console.log('🔄 Regenerando QR Code para visitante:', qrVisitor.id);
    await regenerateQRCode(qrVisitor.id);
    const updated = visitors.find(v => v.id === qrVisitor.id);
    if (updated) setQRVisitor(updated);
    console.log('✅ QR Code regenerado com sucesso');
    success('QR Code regenerado com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro ao regenerar QR Code:', error);
    showError(error.message || 'Falha ao regenerar QR Code');
  }
};
```

**Componente Toast renderizado:**
```typescript
{/* Toast Component */}
<Toast
  visible={toast.visible}
  message={toast.message}
  type={toast.type}
  onHide={hideToast}
/>
```

---

## 📊 Fluxo Completo de Logs

### Criar Usuário (Exemplo):

```
[FRONTEND - Component]
💾 Iniciando submissão do formulário de usuário
📝 Dados recebidos: {name, email, role, entityId, password: '***'}
➡️ Criando novo usuário

[FRONTEND - Hook]
🔷 [useUsers] Iniciando criação de usuário
📤 [useUsers] Dados enviados: {name, email, role, entityId, password: '***'}

[FRONTEND - API Client]
📤 [usersApi] Enviando requisição de criação
📤 [usersApi] URL: POST /users
📤 [usersApi] Dados: {name, email, role, entityId, password: '***'}

[BACKEND - Middleware]
🔍 [VALIDATION] Validando dados: {name, email, password, cpf, role}
✅ [VALIDATION] Dados válidos

[BACKEND - Controller]
📝 [CONTROLLER] Criando usuário. Body: {name, email, password, cpf, role, entityId}

[BACKEND - Service]
🔄 [SERVICE] Tentando criar usuário. Dados: {name, email, role, entityId, password: '***'}
🔐 [SERVICE] Hasheando senha...
💾 [SERVICE] Salvando no banco de dados...
✅ [SERVICE] Usuário criado com sucesso. ID: abc123

[BACKEND - Controller]
✅ [CONTROLLER] Usuário criado: {id, name, email, role, ...}
➡️ [CONTROLLER] Enviando resposta com successResponse

[BACKEND - Response Util]
✅ [RESPONSE] Enviando sucesso. Status: 201
✅ [RESPONSE] Body: {
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": "abc123",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    ...
  }
}

[FRONTEND - API Client]
📥 [usersApi] Resposta recebida
📥 [usersApi] Status: 201
📥 [usersApi] Response completa: {success: true, message: "...", data: {...}}
📥 [usersApi] response.data.data: {id, name, email, ...}

[FRONTEND - Hook]
📥 [useUsers] Usuário retornado do serviço: {id, name, email, ...}
🔄 [useUsers] Atualizando lista local. Antes: 5
🔄 [useUsers] Depois: 6
✅ [useUsers] Criação concluída com sucesso

[FRONTEND - Component]
✅ Usuário criado com sucesso: {id, name, email, ...}
🚪 Fechando modal após sucesso

[UI]
🟢 Toast Verde: "Usuário criado com sucesso!"
🚪 Modal fecha automaticamente
📋 Usuário aparece na lista
```

---

## 🎯 Benefícios dos Logs

1. **Rastreabilidade Completa**: Vemos a requisição do início ao fim
2. **Identificação Rápida de Erros**: Sabemos exatamente onde falha
3. **Validação de Dados**: Vemos se os dados estão corretos em cada etapa
4. **Debug Facilitado**: Não precisamos adivinhar, os logs mostram tudo
5. **Estrutura da Resposta**: Confirmamos que `response.data.data` é o campo certo

---

## ✅ CRUDs Atualizados

### 1. **Users** (Usuários)
- ✅ Backend: Controller + Service com logs
- ✅ Frontend: API + Hook + Screen com logs e Toast
- ✅ Documentação: `USERS_SCREEN_CORRIGIDA.md`

### 2. **Visitors** (Visitantes)
- ✅ Backend: Controller com logs
- ✅ Frontend: API + Hook + Screen com logs e Toast
- ✅ Create, Update, Delete, RegenerateQR - todos com Toast

### 3. **Entities** (Entidades)
- ✅ Backend: Controller + Service + Validator com logs
- ✅ Frontend: API + Screen com logs e Toast
- ✅ Documentação: `BUG_ENTIDADES_NAO_SALVAVAM.md`

---

## 🧪 Como Testar Agora

### 1. Reinicie o servidor:
```bash
npm start
```

### 2. Teste Users:
```
1. Vá para UsersScreen
2. Clique em "+ Novo Usuário"
3. Preencha: Nome, Email, Senha, Perfil, Entidade
4. Clique em "Salvar"
5. ABRA O CONSOLE e veja os logs completos
6. Deve aparecer Toast verde e modal fechar
```

### 3. Teste Visitors:
```
1. Vá para VisitantesScreen
2. Clique em "+ Novo Visitante"
3. Preencha os dados
4. Clique em "Salvar"
5. ABRA O CONSOLE e veja os logs completos
6. Deve aparecer Toast verde e modal fechar
```

### 4. Teste Entities:
```
1. Vá para EntidadeScreen
2. Clique em "Nova Entidade"
3. Preencha os dados
4. Clique em "Salvar"
5. ABRA O CONSOLE e veja os logs completos
6. Deve aparecer Toast verde e modal fechar
```

---

## 📝 Legenda de Emojis nos Logs

- 💾 = Salvando/Tentando salvar
- 📝 = Dados recebidos/processados
- ➡️ = Enviando/Redirecionando
- ✅ = Sucesso
- ❌ = Erro
- 🔄 = Atualizando/Processando
- 🚪 = Fechando modal
- 📤 = Enviando requisição (frontend → backend)
- 📥 = Recebendo resposta (backend → frontend)
- 🔷 = Operação no Hook
- 🔍 = Validação
- 🔐 = Segurança (hash de senha)
- 🗑️ = Deletando
- 🟢 = Toast de sucesso (verde)
- 🔴 = Toast de erro (vermelho)

---

## 🔗 Documentos Relacionados

1. **BUG_ENTIDADES_NAO_SALVAVAM.md** - Bug original descoberto
2. **USERS_SCREEN_CORRIGIDA.md** - Correção do UsersScreen
3. **GUIA_TESTE_CRUD_FEEDBACK.md** - Guia de teste com Toast
4. **Toast.tsx** - Componente de feedback visual
5. **useToast.ts** - Hook para gerenciar Toast

---

**Status**: ✅ TODOS OS LOGS E TOAST IMPLEMENTADOS
**Data**: 13 de outubro de 2025
**Próximo passo**: Testar criação de usuário e ver os logs completos no console
