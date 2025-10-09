# 📁 Estrutura do Projeto AccesControl

## 🎯 Organização Atualizada

Todo o projeto agora está centralizado dentro da pasta `accesControl`:

```
accesControl/                           (📦 Pasta principal do projeto)
│
├── access-backend/                     (🔧 Backend - Node.js + Express + Prisma)
│   ├── src/
│   │   ├── config/                     (Configurações)
│   │   │   ├── env.ts
│   │   │   ├── database.ts
│   │   │   └── supabase.ts
│   │   ├── controllers/                (Controladores das rotas)
│   │   │   ├── auth.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── entities.controller.ts
│   │   │   ├── visitors.controller.ts
│   │   │   ├── access.controller.ts
│   │   │   └── health.controller.ts
│   │   ├── middlewares/                (Middlewares)
│   │   │   ├── auth.middleware.ts
│   │   │   ├── permissions.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   ├── errorHandler.middleware.ts
│   │   │   └── rateLimiter.middleware.ts
│   │   ├── routes/                     (Definição de rotas)
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── entities.routes.ts
│   │   │   ├── visitors.routes.ts
│   │   │   ├── access.routes.ts
│   │   │   └── health.routes.ts
│   │   ├── services/                   (Lógica de negócio)
│   │   │   ├── auth.service.ts
│   │   │   ├── users.service.ts
│   │   │   ├── entities.service.ts
│   │   │   ├── visitors.service.ts
│   │   │   ├── access.service.ts
│   │   │   ├── qrcode.service.ts
│   │   │   └── email.service.ts
│   │   ├── utils/                      (Utilitários)
│   │   │   ├── jwt.util.ts
│   │   │   ├── password.util.ts
│   │   │   ├── response.util.ts
│   │   │   └── logger.util.ts
│   │   ├── validators/                 (Schemas Zod)
│   │   │   ├── auth.validator.ts
│   │   │   ├── user.validator.ts
│   │   │   ├── entity.validator.ts
│   │   │   └── visitor.validator.ts
│   │   ├── app.ts                      (Configuração Express)
│   │   └── server.ts                   (Entry point)
│   ├── prisma/
│   │   ├── schema.prisma               (Schema do banco)
│   │   └── seed.ts                     (Dados iniciais)
│   ├── node_modules/                   (727 packages)
│   ├── .env                            (Variáveis de ambiente)
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── README.md
│   └── COMO_CONECTAR_SUPABASE.md
│
├── src/                                (📱 Frontend - React Native + Expo)
│   ├── components/                     (Componentes reutilizáveis)
│   │   ├── layout/
│   │   │   ├── NavBar.tsx
│   │   │   ├── SideMenu.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── contexts/                       (Contextos React)
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                          (Custom hooks)
│   │   ├── useEntities.ts
│   │   ├── useEntityForm.ts
│   │   └── useKeyboard.ts
│   ├── screens/                        (Telas do app)
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── EntidadeScreen.tsx
│   │   ├── RegistrarEntradaScreen.tsx
│   │   ├── RegistrarSaidaScreen.tsx
│   │   ├── VisitantesScreen.tsx
│   │   └── RelatoriosScreen.tsx
│   ├── services/                       (Serviços - Mock Data)
│   │   ├── mockEntidadeService.ts
│   │   └── entityApi.test.ts
│   ├── types/                          (TypeScript types)
│   │   └── index.ts
│   └── utils/                          (Utilitários frontend)
│       ├── responsive.ts
│       ├── themeHelpers.ts
│       └── entityHelpers.ts
│
├── assets/                             (Imagens e recursos)
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
├── android/                            (Build Android)
│   ├── app/
│   ├── gradle/
│   └── build.gradle
│
├── __tests__/                          (Testes do frontend)
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── screens/
│   └── services/
│
├── scripts/                            (Scripts auxiliares)
│   ├── create-styles-structure.sh
│   └── verificar-nomenclatura.sh
│
├── coverage/                           (Cobertura de testes)
│
├── App.tsx                             (Entry point React Native)
├── index.ts
├── app.json                            (Config Expo)
├── package.json                        (Dependências frontend)
├── package-lock.json
├── tsconfig.json                       (Config TypeScript frontend)
├── jest.config.js
├── jest.setup.js
├── metro.config.js
│
└── 📄 Documentação                     (Documentos do projeto)
    ├── README.md
    ├── START.md
    ├── QUICKSTART.md
    ├── ROADMAP.md
    ├── ARCHITECTURE_EXPLANATION.md
    ├── CONTRIBUTING.md
    ├── TESTING.md
    ├── PERMISSIONS_GUIDE.md
    ├── REFACTORING_PLAN.md
    ├── IMPLEMENTATION_PLAN_BACKEND.md
    ├── IMPLEMENTATION_TODO.md
    ├── BACKEND_IMPLEMENTATION_COMPLETE.md
    └── [diversos outros .md]
```

## 📊 Resumo da Estrutura

### 🔧 Backend (`access-backend/`)
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Banco:** Supabase PostgreSQL
- **Porta:** 3000
- **Arquivos:** 47 arquivos TypeScript
- **Linhas de código:** ~2.000

### 📱 Frontend (`src/`)
- **Framework:** React Native 0.76.1
- **Runtime:** Expo ~52.0.0
- **Linguagem:** TypeScript
- **Porta:** 8081
- **Estado:** ✅ **Intacto** (zero alterações)

## 🚀 Como Executar

### Backend
```bash
cd ~/Documentos/Projeto/accesControl/access-backend

# Instalar dependências (já feito)
npm install

# Gerar Prisma Client
npm run prisma:generate

# Criar tabelas no banco
npx prisma db push

# Popular banco com dados iniciais
npm run prisma:seed

# Iniciar servidor em modo desenvolvimento
npm run dev
```

### Frontend
```bash
cd ~/Documentos/Projeto/accesControl

# Instalar dependências (já feito)
npm install

# Iniciar Expo
npx expo start
```

## 🔗 Integração Backend ↔️ Frontend

### Fase 1: Backend Standalone (Atual)
```
Backend rodando em: http://localhost:3000/api
Frontend ainda usando mock data
```

### Fase 2: Integração via Adapters (Próxima)
```typescript
// src/adapters/ApiAdapter.ts
const USE_REAL_API = true;

export const entidadeService = USE_REAL_API 
  ? realEntidadeService    // Chama backend real
  : mockEntidadeService;   // Usa mock data
```

### Fase 3: Migração Completa
```
Frontend → Adapter → Backend API → Supabase PostgreSQL
```

## 🎯 Benefícios desta Estrutura

### ✅ Separação de Responsabilidades
- **Backend:** Lógica de negócio, banco de dados, autenticação
- **Frontend:** Interface, experiência do usuário

### ✅ Desenvolvimento Independente
- Backend e frontend podem ser desenvolvidos separadamente
- Equipes diferentes podem trabalhar simultaneamente

### ✅ Escalabilidade
- Backend pode servir múltiplos frontends (web, mobile, desktop)
- Fácil adicionar novas features sem quebrar código existente

### ✅ Testabilidade
- Testes de backend isolados
- Testes de frontend com mock data
- Testes de integração E2E

### ✅ Deploy Flexível
- Backend pode ser deployado em: Vercel, Railway, Render, AWS
- Frontend pode ser deployado em: Expo, Vercel, Netlify
- Banco de dados: Supabase (gerenciado)

## 📝 Próximos Passos

1. ✅ **Backend criado** (47 arquivos)
2. ✅ **Backend movido** para `accesControl/access-backend/`
3. ⏳ **Conectar ao banco** (aguardando string de conexão correta)
4. ⏳ **Executar migrações** (criar tabelas)
5. ⏳ **Popular banco** (seed data)
6. ⏳ **Testar API** (Postman/Insomnia)
7. ⏳ **Criar adapters** no frontend
8. ⏳ **Integrar frontend** com backend
9. ⏳ **Testes E2E**
10. ⏳ **Deploy**

## 🔧 Comandos Úteis

### Navegar no Projeto
```bash
# Ir para a raiz do projeto
cd ~/Documentos/Projeto/accesControl

# Ir para o backend
cd access-backend

# Voltar para a raiz
cd ..
```

### Backend
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Prisma Studio (visualizar banco)
npm run prisma:studio

# Ver logs
tail -f logs/app.log
```

### Frontend
```bash
# Iniciar Expo
npx expo start

# Limpar cache
npx expo start --clear

# Build Android
npx expo run:android

# Testes
npm test
```

## 📚 Documentação

- **Backend README:** `access-backend/README.md`
- **Frontend README:** `README.md`
- **Conexão Supabase:** `access-backend/COMO_CONECTAR_SUPABASE.md`
- **Implementação Completa:** `BACKEND_IMPLEMENTATION_COMPLETE.md`
- **TODO List:** `IMPLEMENTATION_TODO.md`

---

**Estrutura atualizada em:** 9 de outubro de 2025  
**Status:** ✅ Backend completo | ⏳ Aguardando conexão com banco
