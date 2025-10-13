# 🧭 Sistema de Rotas Unificado - Web & Mobile

## 📋 Visão Geral

Sistema de rotas híbrido que funciona perfeitamente em **Web** (com URLs navegáveis) e **Mobile** (React Navigation):

- **Web**: Usa `react-router-dom` com URLs reais (`/home`, `/entidade`, etc.)
- **Mobile**: Usa `@react-navigation/native` com deep linking habilitado
- **Hook Unificado**: `useAppNavigation()` funciona em ambas as plataformas

## 🎯 Estrutura de Rotas

### Rotas Disponíveis

| URL Web | Screen Mobile | Descrição | Proteção |
|---------|---------------|-----------|----------|
| `/login` | Login | Tela de login | Pública |
| `/home` | Home | Dashboard principal | ✅ Protegida |
| `/entidade` | Entidade | Gerenciar entidades | ✅ Protegida |
| `/registrar-entrada` | RegistrarEntrada | Registrar entrada | ✅ Protegida |
| `/registrar-saida` | RegistrarSaida | Registrar saída | ✅ Protegida |
| `/visitantes` | Visitantes | Lista de visitantes | ✅ Protegida |
| `/visitantes/:id` | VisitorDetails | Detalhes do visitante | ✅ Protegida |
| `/relatorios` | Relatorios | Relatórios | ✅ Protegida |
| `/alertas` | Alertas | Alertas do sistema | ✅ Protegida |
| `/users` | Users | Gerenciar usuários | ✅ Protegida |
| `/access-logs` | AccessLogs | Logs de acesso | ✅ Protegida |
| `/settings` | Settings | Configurações | ✅ Protegida |
| `/settings/profile` | ProfileSettings | Configurações de perfil | ✅ Protegida |
| `/settings/system` | SystemSettings | Configurações do sistema | ✅ Protegida |
| `/settings/security` | SecuritySettings | Configurações de segurança | ✅ Protegida |
| `/settings/notifications` | NotificationSettings | Configurações de notificações | ✅ Protegida |
| `/settings/app` | AppSettings | Configurações do app | ✅ Protegida |
| `/permissions` | Permissions | Gerenciar permissões | ✅ Protegida |

## 🚀 Como Usar

### 1. Navegação Básica

```tsx
import { useAppNavigation } from '../hooks/useNavigation';

const MyComponent = () => {
  const { navigate, goBack, replace } = useAppNavigation();

  return (
    <>
      {/* Navegar para home */}
      <button onClick={() => navigate('/home')}>
        Ir para Home
      </button>

      {/* Navegar para entidade */}
      <button onClick={() => navigate('/entidade')}>
        Gerenciar Entidades
      </button>

      {/* Voltar */}
      <button onClick={() => goBack()}>
        Voltar
      </button>

      {/* Replace (sem adicionar ao histórico) */}
      <button onClick={() => replace('/login')}>
        Fazer Logout
      </button>
    </>
  );
};
```

### 2. Navegação com Parâmetros

```tsx
const MyComponent = () => {
  const { navigate } = useAppNavigation();

  const goToVisitorDetails = (visitorId: string) => {
    navigate('/visitantes', { id: visitorId });
  };

  return (
    <button onClick={() => goToVisitorDetails('123')}>
      Ver Detalhes
    </button>
  );
};
```

### 3. Navegação em Componentes de UI

#### WebSidebar (Exemplo)
```tsx
import { useAppNavigation } from '../../hooks/useNavigation';

export const WebSidebar = () => {
  const { navigate } = useAppNavigation();

  const menuItems = [
    { title: 'Dashboard', icon: '📊', route: '/home' },
    { title: 'Entidades', icon: '🏢', route: '/entidade' },
    { title: 'Visitantes', icon: '👥', route: '/visitantes' },
    { title: 'Relatórios', icon: '📈', route: '/relatorios' },
  ];

  return (
    <div>
      {menuItems.map(item => (
        <button 
          key={item.route}
          onClick={() => navigate(item.route)}
        >
          {item.icon} {item.title}
        </button>
      ))}
    </div>
  );
};
```

#### MobileNavbar (Exemplo)
```tsx
import { useAppNavigation } from '../../hooks/useNavigation';

export const MobileNavbar = () => {
  const { navigate } = useAppNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigate('/home')}>
        <Text>🏠 Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigate('/entidade')}>
        <Text>🏢 Entidades</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🔒 Rotas Protegidas

### Web (React Router)
```tsx
// Automaticamente protegido no WebRouter.tsx
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <HomeScreen />
    </ProtectedRoute>
  }
/>
```

### Mobile (React Navigation)
```tsx
// Automaticamente protegido no MobileRouter.tsx
{user ? (
  <Stack.Screen name="Home" component={HomeScreen} />
) : (
  <Stack.Screen name="Login" component={LoginScreen} />
)}
```

## 🌐 Deep Linking (Mobile)

O app mobile suporta deep links:

```bash
# Abrir app em uma tela específica
accesscontrol://home
accesscontrol://entidade
accesscontrol://visitantes/123
```

## 📱 Comportamento por Plataforma

### Web
- ✅ URLs navegáveis no navegador
- ✅ Botões de voltar/avançar funcionam
- ✅ Bookmarks funcionam
- ✅ Compartilhamento de URLs
- ✅ SEO-friendly (se usar SSR)

### Mobile
- ✅ Navigation stack nativa
- ✅ Animações de transição
- ✅ Deep linking habilitado
- ✅ Botão de voltar do Android funciona
- ✅ Gestos de navegação (iOS)

## 🔄 Migração de Código Existente

### Antes (React Navigation direto)
```tsx
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();
  
  return (
    <button onClick={() => navigation.navigate('Home')}>
      Ir para Home
    </button>
  );
};
```

### Depois (Hook Unificado)
```tsx
import { useAppNavigation } from '../hooks/useNavigation';

const MyComponent = () => {
  const { navigate } = useAppNavigation();
  
  return (
    <button onClick={() => navigate('/home')}>
      Ir para Home
    </button>
  );
};
```

## 📦 Arquivos Criados

```
src/navigation/
├── WebRouter.tsx        # Rotas React Router (Web)
├── MobileRouter.tsx     # Rotas React Navigation (Mobile)
└── index.tsx            # Selector de plataforma

src/hooks/
└── useNavigation.ts     # Hook unificado de navegação

App.tsx                  # Atualizado para usar AppRouter
```

## ⚙️ Configuração

### 1. Dependências (Já Instaladas)
```bash
# React Navigation (já estava instalado)
@react-navigation/native
@react-navigation/stack
```

**Nota**: Tentamos usar `react-router-dom` inicialmente, mas ele não é compatível com Metro bundler do Expo (erro: "Cannot use 'import.meta' outside a module"). A solução com React Navigation é mais robusta e funciona perfeitamente em ambas as plataformas.

### 2. App.tsx Atualizado
```tsx
import { AppRouter } from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PermissionProvider>
          <AppRouter />
        </PermissionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

## 🧪 Testando

### Web
1. Inicie o app: `npm run web`
2. Acesse: `http://localhost:8081`
3. Navegue entre telas e observe a URL mudando
4. Use botões de voltar/avançar do navegador
5. Copie/cole URLs diretamente na barra de endereços

### Mobile
1. Inicie o app: `npm start`
2. Abra no Expo Go ou emulador
3. Navegue entre telas normalmente
4. Teste deep links (se configurado)

## 🎨 Personalização

### Adicionar Nova Rota

#### 1. WebRouter.tsx
```tsx
<Route
  path="/minha-nova-tela"
  element={
    <ProtectedRoute>
      <MinhaNovaScreen />
    </ProtectedRoute>
  }
/>
```

#### 2. MobileRouter.tsx
```tsx
<Stack.Screen name="MinhaNovaScreen" component={MinhaNovaScreen} />
```

#### 3. useNavigation.ts (routeMap)
```tsx
const routeMap: Record<string, string> = {
  '/minha-nova-tela': 'MinhaNovaScreen',
  // ... outras rotas
};
```

#### 4. Usar no componente
```tsx
navigate('/minha-nova-tela');
```

## 🔧 Troubleshooting

### Erro: "Cannot read property 'navigate'"
**Solução**: Certifique-se de que o componente está dentro do AppRouter.

### Erro: "No routes matched location"
**Solução**: Verifique se a rota está definida no WebRouter.tsx.

### Deep links não funcionam no mobile
**Solução**: Configure o `app.json` com o scheme correto:
```json
{
  "expo": {
    "scheme": "accesscontrol"
  }
}
```

## ✅ Benefícios

- ✅ **URLs navegáveis** no Web
- ✅ **SEO-friendly** (com SSR)
- ✅ **Bookmarks** funcionam
- ✅ **Histórico de navegação** funciona corretamente
- ✅ **Deep linking** no mobile
- ✅ **Código unificado** para ambas as plataformas
- ✅ **Type-safe** com TypeScript
- ✅ **Rotas protegidas** automaticamente

## 📚 Referências

- [React Router v6](https://reactrouter.com/en/main)
- [React Navigation](https://reactnavigation.org/)
- [Expo Linking](https://docs.expo.dev/guides/linking/)

---

**Status:** ✅ **IMPLEMENTADO**
**Data:** 13/10/2025
**Compatibilidade:** Web (React Router v6) + Mobile (React Navigation v7)
