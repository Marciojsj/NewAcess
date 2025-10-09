# 📋 PLANO DE IMPLEMENTAÇÃO - Próximas Funcionalidades

## ✅ JÁ IMPLEMENTADO

### Backend
- ✅ Autenticação JWT completa
- ✅ CRUD de Entidades
- ✅ CRUD de Usuários
- ✅ CRUD de Visitantes
- ✅ API de Controle de Acesso (entry/exit)
- ✅ Sistema de relatórios
- ✅ Banco de dados configurado

### Frontend
- ✅ Integração com API real
- ✅ Context de autenticação
- ✅ Tela de Login funcionando
- ✅ CRUD de Entidades com dados reais
- ✅ Configuração centralizada da API
- ✅ Interceptors HTTP (token, refresh)

---

## 🎯 PRÓXIMAS IMPLEMENTAÇÕES

### 1️⃣ CRUD de Visitantes com Dados Reais (PRIORIDADE ALTA)

**Status:** ⏳ Backend pronto, Frontend precisa integrar

**Tarefas:**
- [ ] Criar `visitorsApi.ts` wrapper (similar ao entityApi.ts)
- [ ] Atualizar tela de Visitantes para usar API real
- [ ] Implementar busca de visitantes
- [ ] Implementar upload de foto (se houver)
- [ ] Testar criação, edição e exclusão

**Arquivos a modificar:**
- `src/services/visitorsApi.ts` (criar)
- `src/screens/VisitantesScreen.tsx`
- `src/hooks/useVisitors.ts` (se existir)

---

### 2️⃣ Controle de Acesso - Registrar Entrada/Saída (PRIORIDADE ALTA)

**Status:** ⏳ Backend pronto, Frontend precisa implementar

**Tarefas:**
- [ ] Criar telas de registro de entrada
- [ ] Criar telas de registro de saída
- [ ] Implementar scanner de QR Code
- [ ] Validar visitante antes de registrar
- [ ] Mostrar histórico de acessos
- [ ] Adicionar validações (temperatura, autorização, etc)

**Arquivos a criar:**
- `src/screens/RegistrarEntradaScreen.tsx` (já existe?)
- `src/screens/RegistrarSaidaScreen.tsx` (já existe?)
- `src/services/accessApi.ts` (criar wrapper)
- `src/components/QRCodeScanner.tsx`

---

### 3️⃣ Relatórios e Dashboard (PRIORIDADE MÉDIA)

**Status:** ⏳ Backend pronto, Frontend precisa criar UI

**Tarefas:**
- [ ] Criar tela de relatórios
- [ ] Gráficos de acessos por período
- [ ] Lista de visitantes mais frequentes
- [ ] Exportar relatórios (PDF/Excel)
- [ ] Filtros avançados (data, entidade, visitante)

**Arquivos a criar:**
- `src/screens/RelatoriosScreen.tsx` (já existe?)
- `src/components/reports/` (componentes de gráficos)
- `src/services/reportsApi.ts`

---

### 4️⃣ Scanner de QR Code (PRIORIDADE MÉDIA)

**Status:** 🆕 Precisa implementar do zero

**Tarefas:**
- [ ] Instalar biblioteca de QR Code (`expo-barcode-scanner`)
- [ ] Criar componente de scanner
- [ ] Implementar permissões de câmera
- [ ] Validar QR Code escaneado
- [ ] Registrar acesso após scan

**Dependências:**
```bash
npx expo install expo-barcode-scanner expo-camera
```

**Arquivos a criar:**
- `src/components/QRCodeScanner.tsx`
- `src/hooks/useQRScanner.ts`
- `src/utils/qrCodeValidator.ts`

---

### 5️⃣ Gerenciamento de Usuários (PRIORIDADE MÉDIA)

**Status:** ⏳ Backend pronto, Frontend precisa criar UI

**Tarefas:**
- [ ] Criar tela de listagem de usuários
- [ ] Criar formulário de cadastro de usuário
- [ ] Implementar edição de usuário
- [ ] Implementar desativação de usuário
- [ ] Controle de permissões (só ADMIN+)

**Arquivos a criar:**
- `src/screens/UsuariosScreen.tsx`
- `src/components/users/UserForm.tsx`
- `src/components/users/UserList.tsx`
- `src/services/usersApi.ts` (wrapper já existe)

---

### 6️⃣ Notificações Push (PRIORIDADE BAIXA)

**Status:** 🆕 Precisa implementar

**Tarefas:**
- [ ] Configurar Expo Notifications
- [ ] Backend: Enviar notificações
- [ ] Frontend: Receber e exibir
- [ ] Notificar em eventos (entrada, saída, alerta)

**Dependências:**
```bash
npx expo install expo-notifications
```

---

### 7️⃣ Melhorias de UX/UI (PRIORIDADE BAIXA)

**Tarefas:**
- [ ] Animações de transição
- [ ] Loading states em todas as telas
- [ ] Mensagens de erro amigáveis
- [ ] Modo offline (cache local)
- [ ] Temas claro/escuro

---

### 8️⃣ Testes (PRIORIDADE MÉDIA)

**Tarefas:**
- [ ] Testes unitários dos serviços
- [ ] Testes de integração da API
- [ ] Testes E2E das telas principais
- [ ] Cobertura mínima de 70%

---

## 🚀 ORDEM DE IMPLEMENTAÇÃO SUGERIDA

### Sprint 1 (Esta semana)
1. ✅ ~~Integração Backend + Frontend~~ (FEITO!)
2. ⏳ **CRUD de Visitantes com dados reais** (PRÓXIMO)
3. ⏳ **Controle de Acesso - Registrar Entrada/Saída**

### Sprint 2 (Próxima semana)
4. Scanner de QR Code
5. Relatórios e Dashboard
6. Gerenciamento de Usuários

### Sprint 3 (Semana seguinte)
7. Notificações Push
8. Melhorias de UX/UI
9. Testes

---

## 📝 POR ONDE COMEÇAR AGORA?

### Opção A: CRUD de Visitantes ⭐ RECOMENDADO

**Por quê?**
- Backend já está pronto
- Similar ao CRUD de Entidades (já funciona)
- Fundação para o controle de acesso

**Comando para iniciar:**
```bash
# Verificar se já existe visitorsApi
ls -la src/services/visitorsApi.ts

# Se não existir, copiar do entityApi como template
```

---

### Opção B: Controle de Acesso

**Por quê?**
- Funcionalidade core do sistema
- Depende de visitantes funcionando
- Mais complexo (QR Code, validações)

---

### Opção C: Gerenciamento de Usuários

**Por quê?**
- Útil para administração
- Backend já pronto
- Interface simples

---

## ❓ QUAL VOCÊ QUER IMPLEMENTAR PRIMEIRO?

1. **CRUD de Visitantes** (mais fácil, fundação)
2. **Controle de Acesso** (core do sistema)
3. **Gerenciamento de Usuários** (útil para admin)
4. **Scanner QR Code** (mais legal visualmente)
5. **Relatórios** (análise de dados)

**Me diga qual prefere e vamos implementar juntos!** 🚀
