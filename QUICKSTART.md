# 🚀 Guia de Início Rápido - Access Control System

## ⚡ Começando Agora

### 1. Clone e Instale (5 minutos)

```bash
# Clone o repositório
git clone https://github.com/Marciojsj/NewAcess.git
cd accesControl

# Instale as dependências
npm install

# Instale dependências de teste
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-expo

# Inicie o projeto
npm run dev
```

### 2. Execute os Testes

```bash
# Executar todos os testes
npm test

# Ver cobertura
npm run test:coverage
```

---

## 📚 Documentação Essencial

Leia nesta ordem para entender o projeto:

1. **[README.md](./README.md)** (10 min)
   - Visão geral do projeto
   - Tecnologias utilizadas
   - Como executar

2. **[ROADMAP.md](./ROADMAP.md)** (30 min)
   - Plano completo de desenvolvimento
   - Sistema de permissões
   - Fases de implementação
   - Checklist de qualidade

3. **[TESTING.md](./TESTING.md)** (20 min)
   - Como escrever testes
   - Exemplos práticos
   - Melhores práticas

4. **[CONTRIBUTING.md](./CONTRIBUTING.md)** (15 min)
   - Padrões de código
   - Como contribuir
   - Processo de PR

---

## 🎯 Próximos Passos

### Fase 0: Configuração de Testes (ATUAL) ✅

Esta é a fase que você deve começar AGORA:

```bash
# 1. Verificar se Jest está configurado
npm test

# 2. Se houver erros, limpar cache
npm run test:clear
npm test

# 3. Ver estrutura de testes
tree __tests__/
```

**Tarefas da Fase 0**:
- [x] Instalar dependências de teste
- [x] Configurar Jest (`jest.config.js`)
- [x] Adicionar scripts no `package.json`
- [ ] Criar estrutura de pastas `__tests__/`
- [ ] Escrever testes para código existente
- [ ] Atingir 75% de cobertura mínima

### Fase 1: Sistema de Permissões (PRÓXIMO) 🚧

Após concluir a Fase 0, você começará a implementar:

1. **Context de Permissões**
   ```bash
   # Arquivos a criar:
   src/contexts/PermissionContext.tsx
   src/hooks/usePermission.ts
   src/utils/permissions.ts
   ```

2. **Componentes de Proteção**
   ```bash
   src/components/auth/ProtectedRoute.tsx
   src/components/auth/PermissionGate.tsx
   ```

3. **Tela de Configuração**
   ```bash
   src/screens/settings/PermissionsScreen.tsx
   ```

---

## 🧪 Primeiro Teste

Vamos criar seu primeiro teste para entender o fluxo:

### 1. Criar arquivo de teste

```bash
mkdir -p __tests__/contexts
touch __tests__/contexts/ThemeContext.test.tsx
```

### 2. Escrever o teste

```typescript
// __tests__/contexts/ThemeContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ThemeProvider, useTheme } from '../../src/contexts/ThemeContext';

const wrapper = ({ children }: any) => <ThemeProvider>{children}</ThemeProvider>;

describe('ThemeContext', () => {
  it('should start with dark theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDark).toBe(true);
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDark).toBe(false);
  });
});
```

### 3. Executar o teste

```bash
npm test ThemeContext
```

---

## 📋 Checklist Diário

Use este checklist todos os dias:

### Ao Começar o Dia
- [ ] `git pull origin master` - Atualizar código
- [ ] `npm install` - Atualizar dependências
- [ ] `npm test` - Verificar se tudo está funcionando

### Durante o Desenvolvimento
- [ ] Escrever testes junto com o código
- [ ] Executar `npm test:watch` em outra aba
- [ ] Seguir padrões do [CONTRIBUTING.md](./CONTRIBUTING.md)
- [ ] Manter cobertura > 75%

### Ao Finalizar uma Feature
- [ ] Todos os testes passando (`npm test`)
- [ ] Cobertura adequada (`npm run test:coverage`)
- [ ] Código segue os padrões
- [ ] Commit com mensagem semântica
- [ ] Push para sua branch
- [ ] Abrir Pull Request

---

## 🎨 Padrões Rápidos

### Usar Cores do Tema

```typescript
// ✅ SEMPRE
const { theme } = useTheme();
<View style={{ backgroundColor: theme.background }}>

// ❌ NUNCA
<View style={{ backgroundColor: '#1a1d2e' }}>
```

### Responsividade

```typescript
// ✅ SEMPRE
import { responsive } from '../../utils/responsive';
padding: responsive.padding.lg

// ❌ NUNCA
padding: 20
```

### Permissões (após Fase 1)

```typescript
// ✅ SEMPRE verificar
const { hasPermission } = usePermission();
if (!hasPermission('feature-name')) return <NoAccess />;

// ❌ NUNCA esquecer
// código sem verificação de permissão
```

---

## 🐛 Troubleshooting Rápido

### Erro: "Cannot find module"
```bash
npm run test:clear
rm -rf node_modules
npm install
```

### Erro: "Snapshot failed"
```bash
npm test -- -u
```

### Erro: Testes lentos
```bash
npm test -- --maxWorkers=4
```

### Erro: Port já em uso (Web)
```bash
# Matar processo na porta 19006
npx kill-port 19006
npm run web
```

### Erro: Metro Bundler travado
```bash
npm run dev -- --clear
```

---

## 📊 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Iniciar com cache limpo
npm run android         # Android
npm run ios             # iOS
npm run web             # Web

# Testes
npm test                # Todos os testes
npm run test:watch      # Watch mode
npm run test:coverage   # Com cobertura
npm test -- MyTest      # Teste específico

# Qualidade
npm run lint            # Verificar código
npm run type-check      # Verificar tipos

# Limpeza
npm run test:clear      # Limpar cache do Jest
rm -rf node_modules     # Limpar node_modules
npm install             # Reinstalar
```

---

## 🎯 Metas Semanais

### Semana 1: Fase 0 - Testes ✅
- [ ] Configurar ambiente de testes
- [ ] Criar estrutura de pastas
- [ ] Escrever testes para código existente
- [ ] Atingir 75% de cobertura

### Semana 2: Fase 1 - Permissões
- [ ] Implementar PermissionContext
- [ ] Criar componentes de proteção
- [ ] Desenvolver tela de configuração
- [ ] Integrar com navegação
- [ ] Escrever testes (> 80%)

### Semana 3-4: Fase 2 - Registro de Entrada
- [ ] Implementar AccessContext
- [ ] Criar tela de registro
- [ ] Desenvolver busca de entidades
- [ ] Adicionar validações
- [ ] Escrever testes (> 75%)

### Semana 5: Fase 3 - Registro de Saída
- [ ] Implementar lógica de saída
- [ ] Calcular tempo de permanência
- [ ] Criar interface de saída
- [ ] Escrever testes (> 75%)

---

## 💡 Dicas de Produtividade

1. **Use o Watch Mode**
   ```bash
   # Deixe rodando em uma aba
   npm run test:watch
   ```

2. **VS Code Extensions**
   - ESLint
   - Prettier
   - Jest Runner
   - Error Lens

3. **Atalhos Úteis**
   - `Ctrl/Cmd + Shift + P` → Buscar comandos
   - `Ctrl/Cmd + P` → Buscar arquivos
   - `Ctrl/Cmd + B` → Toggle sidebar

4. **Snippets**
   Crie snippets para acelerar:
   - `rfc` → React Functional Component
   - `test` → Test block
   - `desc` → Describe block

---

## 📱 Testando em Dispositivos

### Android
```bash
# Via USB
npm run android

# Via QR Code (Expo Go)
npm start
# Escaneie o QR Code no Expo Go
```

### iOS
```bash
# Simulador (requer Mac)
npm run ios

# Via QR Code (Expo Go)
npm start
# Escaneie o QR Code no Expo Go
```

### Web
```bash
npm run web
# Abre em http://localhost:19006
```

---

## 🔗 Links Rápidos

- **GitHub**: https://github.com/Marciojsj/NewAcess
- **Documentação Expo**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **Testing Library**: https://testing-library.com/

---

## ❓ Precisa de Ajuda?

1. **Leia a documentação**: Sempre comece pelos docs
2. **Veja exemplos**: Confira código existente
3. **Execute testes**: Eles mostram como usar as funções
4. **Pergunte**: Abra uma issue no GitHub

---

## 🎉 Pronto para Começar!

```bash
# 1. Instale tudo
npm install

# 2. Execute o app
npm run dev

# 3. Execute os testes
npm test

# 4. Comece a desenvolver!
code .
```

---

**Boa sorte e bom código!** 🚀

---

**Última Atualização**: 06 de Outubro de 2025
