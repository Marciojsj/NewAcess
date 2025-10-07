# 🤝 Guia de Contribuição - Access Control System

## Bem-vindo!

Obrigado por contribuir com o projeto Access Control System! Este guia vai ajudá-lo a entender nossos padrões e processos.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Padrões de Código](#padrões-de-código)
4. [Padrões de Commit](#padrões-de-commit)
5. [Pull Requests](#pull-requests)
6. [Reportando Bugs](#reportando-bugs)

---

## Código de Conduta

### Nossos Valores
- 🤝 Respeito e colaboração
- 💡 Compartilhamento de conhecimento
- 🎯 Foco na qualidade
- 🚀 Melhoria contínua

---

## Como Contribuir

### 1. Fork e Clone

```bash
# Fork no GitHub primeiro, depois:
git clone https://github.com/SEU-USUARIO/accesControl.git
cd accesControl
npm install
```

### 2. Criar Branch

Sempre crie uma branch para suas mudanças:

```bash
# Feature
git checkout -b feature/nome-da-feature

# Bugfix
git checkout -b fix/nome-do-bug

# Refactor
git checkout -b refactor/nome-do-refactor
```

### 3. Fazer Mudanças

Siga os [Padrões de Código](#padrões-de-código) deste documento.

### 4. Testar

```bash
# Executar todos os testes
npm test

# Verificar cobertura
npm run test:coverage

# Executar linter
npm run lint
```

### 5. Commit

Siga os [Padrões de Commit](#padrões-de-commit).

### 6. Push e Pull Request

```bash
git push origin feature/nome-da-feature
```

Depois, abra um Pull Request no GitHub.

---

## Padrões de Código

### Estrutura de Arquivos

```
src/
├── screens/
│   └── FeatureName/
│       ├── FeatureNameScreen.tsx
│       └── styles/
│           ├── FeatureNameScreen.styles.ts
│           ├── FeatureNameScreen.styles.native.ts
│           └── FeatureNameScreen.styles.web.ts
├── components/
│   └── feature/
│       ├── ComponentName.tsx
│       └── ComponentName.styles.ts
├── contexts/
│   └── FeatureContext.tsx
├── hooks/
│   └── useFeature.ts
├── services/
│   └── featureApi.ts
├── types/
│   └── feature.ts
└── utils/
    └── featureHelpers.ts
```

### Nomenclatura

#### Arquivos
```
✅ AccessCard.tsx          (PascalCase - Components)
✅ useAccess.ts            (camelCase - Hooks)
✅ accessApi.ts            (camelCase - Services)
✅ access.ts               (camelCase - Types)
✅ access-card.styles.ts   (kebab-case - Styles)

❌ accesscard.tsx
❌ Use-Access.ts
❌ AccessApi.ts
```

#### Código
```typescript
// ✅ Interfaces e Types
interface AccessRecord { }
type PermissionLevel = 'admin' | 'user';

// ✅ Enums
enum AccessStatus {
  Active = 'active',
  Inactive = 'inactive'
}

// ✅ Funções
function calculateTotal() { }
const handleSubmit = () => { };

// ✅ Componentes
const AccessCard: React.FC<Props> = () => { };

// ✅ Constantes
const MAX_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

### TypeScript

#### Sempre tipar explicitamente

```typescript
// ✅ BOM
interface Props {
  name: string;
  age: number;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({ name, age, onPress }) => {
  return <View>...</View>;
};

// ❌ RUIM
const MyComponent = ({ name, age, onPress }: any) => {
  return <View>...</View>;
};
```

#### Evitar `any`

```typescript
// ✅ BOM
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null {
  // ...
}

// ❌ RUIM
function getUser(id: any): any {
  // ...
}
```

### Componentes React

#### Functional Components

```typescript
// ✅ BOM
import React from 'react';
import { View, Text } from 'react-native';

interface AccessCardProps {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  onPress?: () => void;
}

export const AccessCard: React.FC<AccessCardProps> = ({
  id,
  name,
  status,
  onPress
}) => {
  return (
    <View testID={`access-card-${id}`}>
      <Text>{name}</Text>
      <Text>{status}</Text>
    </View>
  );
};
```

#### Hooks

```typescript
// ✅ BOM - Custom Hook
import { useState, useEffect } from 'react';

interface UseAccessReturn {
  records: AccessRecord[];
  loading: boolean;
  error: string | null;
  loadRecords: () => Promise<void>;
}

export const useAccess = (): UseAccessReturn => {
  const [records, setRecords] = useState<AccessRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await accessApi.getAll();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return { records, loading, error, loadRecords };
};
```

### Estilos

#### Usar sistema de temas

```typescript
// ✅ BOM
import { useTheme } from '../../contexts/ThemeContext';
import { responsive } from '../../utils/responsive';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.background }
    ]}>
      <Text style={[
        styles.title,
        { color: theme.text }
      ]}>
        Title
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive.padding.lg,
  },
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '600',
  },
});

// ❌ RUIM - Cores hardcoded
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1d2e',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
  },
});
```

#### Responsividade

```typescript
// ✅ BOM
import { responsive, deviceType } from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    padding: responsive.padding.lg,
    maxWidth: deviceType.isDesktop ? 1200 : '100%',
  },
  title: {
    fontSize: responsive.fontSize.xl,
    marginBottom: responsive.spacing.md,
  },
});

// ❌ RUIM
const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 1200,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
```

### Tratamento de Erros

```typescript
// ✅ BOM
try {
  const result = await api.submitData(data);
  Alert.alert('Sucesso', 'Dados salvos com sucesso');
  navigation.goBack();
} catch (error) {
  console.error('Error submitting data:', error);
  Alert.alert(
    'Erro',
    error instanceof Error 
      ? error.message 
      : 'Erro ao salvar dados. Tente novamente.'
  );
}

// ❌ RUIM
try {
  await api.submitData(data);
  Alert.alert('Sucesso', 'OK');
} catch (error) {
  Alert.alert('Erro', 'Deu erro');
}
```

### Comentários e Documentação

```typescript
/**
 * Registra uma nova entrada no sistema
 * 
 * @param data - Dados da entrada
 * @param data.entityId - ID da entidade que está entrando
 * @param data.method - Método de registro utilizado
 * @returns Promise com o registro criado
 * @throws {Error} Se a entidade não for encontrada
 * 
 * @example
 * ```typescript
 * const entry = await registerEntry({
 *   entityId: '123',
 *   method: 'manual',
 *   observations: 'Visitante autorizado'
 * });
 * ```
 */
export async function registerEntry(
  data: EntryData
): Promise<AccessRecord> {
  // Validar entidade
  const entity = await entityApi.getById(data.entityId);
  if (!entity) {
    throw new Error('Entidade não encontrada');
  }

  // Criar registro
  const record: AccessRecord = {
    id: generateId(),
    ...data,
    timestamp: new Date().toISOString(),
    status: 'approved',
  };

  // Salvar no storage
  await saveRecord(record);

  return record;
}
```

### Imports

```typescript
// ✅ BOM - Organizados e agrupados
// React
import React, { useState, useEffect } from 'react';

// React Native
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Contexts
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

// Components
import { AccessCard } from '../../components/access/AccessCard';

// Utils
import { responsive } from '../../utils/responsive';

// Types
import { AccessRecord } from '../../types/access';

// ❌ RUIM - Desorganizados
import { AccessCard } from '../../components/access/AccessCard';
import React, { useState } from 'react';
import { responsive } from '../../utils/responsive';
import { View, Text } from 'react-native';
```

---

## Padrões de Commit

### Conventional Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/).

### Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (não afeta código)
- **refactor**: Refatoração
- **test**: Adicionar/corrigir testes
- **chore**: Tarefas de manutenção
- **perf**: Melhorias de performance

### Exemplos

```bash
# Feature
git commit -m "feat(access): adicionar registro de entrada"

# Fix
git commit -m "fix(auth): corrigir validação de senha"

# Docs
git commit -m "docs(readme): atualizar instruções de instalação"

# Refactor
git commit -m "refactor(components): simplificar AccessCard"

# Test
git commit -m "test(access): adicionar testes para AccessContext"

# Breaking Change
git commit -m "feat(api)!: alterar estrutura de retorno da API

BREAKING CHANGE: A API agora retorna { data, meta } ao invés de apenas data"
```

### Mensagens em Português

Escrevemos mensagens de commit em português para manter consistência com o projeto.

---

## Pull Requests

### Checklist

Antes de abrir um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Todos os testes passam (`npm test`)
- [ ] Cobertura de testes mantida ou aumentada
- [ ] Documentação atualizada (se necessário)
- [ ] Sem console.logs de debug
- [ ] Sem código comentado
- [ ] Commits seguem o padrão
- [ ] Branch atualizada com main/master

### Template de PR

```markdown
## Descrição
[Descreva as mudanças realizadas]

## Tipo de Mudança
- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Refatoração (refactor)
- [ ] Documentação (docs)
- [ ] Testes (test)

## Como Testar
1. [Passo 1]
2. [Passo 2]
3. [Resultado esperado]

## Screenshots
[Se aplicável, adicione screenshots]

## Checklist
- [ ] Código testado localmente
- [ ] Testes unitários adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem warnings do linter
- [ ] Código segue os padrões do projeto

## Issues Relacionadas
Closes #[número da issue]
```

### Processo de Review

1. **Automático**: CI/CD verifica testes e linter
2. **Manual**: Revisor verifica código
3. **Aprovação**: PR aprovado e merged
4. **Deploy**: Mudanças vão para produção

---

## Reportando Bugs

### Template de Issue

```markdown
## Descrição do Bug
[Descrição clara e concisa do bug]

## Para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Screenshots
[Se aplicável, adicione screenshots]

## Ambiente
- **Dispositivo**: [iPhone 12, Android Samsung S21, etc]
- **OS**: [iOS 15, Android 12, etc]
- **Versão do App**: [1.0.0]
- **Navegador**: [Chrome, Safari] (se web)

## Informações Adicionais
[Qualquer outra informação relevante]
```

### Prioridades

- **🔴 Crítico**: Sistema não funciona, perda de dados
- **🟠 Alto**: Funcionalidade principal quebrada
- **🟡 Médio**: Funcionalidade secundária afetada
- **🟢 Baixo**: Problema estético ou menor

---

## Dúvidas?

- 📧 Email: [contato@projeto.com]
- 💬 Slack: [#access-control]
- 📚 Wiki: [link para wiki]

---

**Obrigado por contribuir!** 🎉

---

**Última Atualização**: 06 de Outubro de 2025
