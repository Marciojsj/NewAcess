# 🧪 Guia de Testes - Access Control System

## Índice
1. [Configuração](#configuração)
2. [Executando Testes](#executando-testes)
3. [Escrevendo Testes](#escrevendo-testes)
4. [Melhores Práticas](#melhores-práticas)
5. [Exemplos](#exemplos)

---

## Configuração

### 1. Instalar Dependências

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-expo
```

### 2. Configurar Jest

**package.json**:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  },
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": [
      "@testing-library/jest-native/extend-expect"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.styles.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/types/**/*"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 75,
        "functions": 75,
        "lines": 75,
        "statements": 75
      }
    }
  }
}
```

### 3. Criar jest.config.js

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.styles.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

---

## Executando Testes

### Comandos Disponíveis

```bash
# Executar todos os testes
npm test

# Executar em modo watch (detecta mudanças)
npm run test:watch

# Executar com relatório de cobertura
npm run test:coverage

# Executar testes de um arquivo específico
npm test -- AccessCard.test.tsx

# Executar testes que correspondem a um padrão
npm test -- access

# Executar apenas testes que falharam
npm test -- --onlyFailures
```

### Interpretando Resultados

```
PASS  __tests__/components/AccessCard.test.tsx
  AccessCard
    ✓ should render correctly (45ms)
    ✓ should display entity name (12ms)
    ✓ should call onPress when pressed (8ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.456s
```

---

## Escrevendo Testes

### Estrutura de Arquivo de Teste

```typescript
// __tests__/components/ComponentName.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ComponentName } from '../../src/components/ComponentName';

// Mocks
jest.mock('../../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: mockTheme,
    isDark: false,
    toggleTheme: jest.fn(),
  }),
}));

// Mock data
const mockData = {
  id: '1',
  name: 'Test Name',
};

describe('ComponentName', () => {
  // Setup antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cleanup após cada teste
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Testes
  it('should render correctly', () => {
    const { getByText } = render(<ComponentName data={mockData} />);
    expect(getByText('Test Name')).toBeTruthy();
  });

  it('should handle user interaction', async () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ComponentName data={mockData} onPress={onPress} />
    );
    
    fireEvent.press(getByTestId('button'));
    
    await waitFor(() => {
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith(mockData);
    });
  });
});
```

### Tipos de Testes

#### 1. Testes de Renderização

```typescript
it('should render all required elements', () => {
  const { getByText, getByTestId } = render(<AccessCard {...mockAccess} />);
  
  expect(getByText('João Silva')).toBeTruthy();
  expect(getByTestId('access-status')).toBeTruthy();
  expect(getByTestId('access-time')).toBeTruthy();
});
```

#### 2. Testes de Interação

```typescript
it('should call onDelete when delete button is pressed', () => {
  const onDelete = jest.fn();
  const { getByTestId } = render(
    <AccessCard {...mockAccess} onDelete={onDelete} />
  );
  
  fireEvent.press(getByTestId('delete-button'));
  
  expect(onDelete).toHaveBeenCalledWith(mockAccess.id);
});
```

#### 3. Testes de Estado

```typescript
it('should toggle active state', () => {
  const { getByTestId, rerender } = render(<AccessForm />);
  const toggle = getByTestId('active-toggle');
  
  expect(toggle.props.value).toBe(true);
  
  fireEvent(toggle, 'onValueChange', false);
  
  expect(toggle.props.value).toBe(false);
});
```

#### 4. Testes Assíncronos

```typescript
it('should load data on mount', async () => {
  const mockLoadData = jest.fn().mockResolvedValue(mockData);
  
  const { getByText } = render(<AccessList loadData={mockLoadData} />);
  
  await waitFor(() => {
    expect(mockLoadData).toHaveBeenCalled();
    expect(getByText('João Silva')).toBeTruthy();
  });
});
```

#### 5. Testes de Snapshot

```typescript
it('should match snapshot', () => {
  const tree = renderer.create(<AccessCard {...mockAccess} />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

---

## Melhores Práticas

### 1. Nomenclatura

```typescript
// ✅ BOM
it('should display error message when form is invalid', () => {});

// ❌ RUIM
it('test error', () => {});
```

### 2. Arrange-Act-Assert (AAA)

```typescript
it('should calculate total correctly', () => {
  // Arrange (preparar)
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  
  // Act (executar)
  const total = calculateTotal(items);
  
  // Assert (verificar)
  expect(total).toBe(35);
});
```

### 3. Testes Independentes

```typescript
// ✅ BOM - Cada teste é independente
describe('AccessList', () => {
  it('should render empty state', () => {
    render(<AccessList data={[]} />);
    // verificações
  });
  
  it('should render with data', () => {
    render(<AccessList data={mockData} />);
    // verificações
  });
});

// ❌ RUIM - Testes dependem um do outro
describe('AccessList', () => {
  let component;
  
  it('should render', () => {
    component = render(<AccessList />);
  });
  
  it('should display items', () => {
    // depende do teste anterior
    expect(component.getByText('item')).toBeTruthy();
  });
});
```

### 4. Mocks Apropriados

```typescript
// ✅ BOM - Mock específico
jest.mock('../../src/services/accessApi', () => ({
  getAccess: jest.fn().mockResolvedValue(mockAccess),
  createAccess: jest.fn().mockResolvedValue(newMockAccess),
}));

// ❌ RUIM - Mock genérico demais
jest.mock('../../src/services/accessApi');
```

### 5. Test IDs

```typescript
// Componente
<View testID="access-card">
  <Text testID="access-name">{name}</Text>
  <TouchableOpacity testID="access-delete-btn" onPress={onDelete}>
    <Text>Delete</Text>
  </TouchableOpacity>
</View>

// Teste
it('should find elements by testID', () => {
  const { getByTestId } = render(<AccessCard {...props} />);
  
  expect(getByTestId('access-card')).toBeTruthy();
  expect(getByTestId('access-name')).toBeTruthy();
  
  fireEvent.press(getByTestId('access-delete-btn'));
});
```

---

## Exemplos

### Exemplo 1: Testar Context

```typescript
// __tests__/contexts/AccessContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AccessProvider, useAccess } from '../../src/contexts/AccessContext';
import * as accessApi from '../../src/services/accessApi';

jest.mock('../../src/services/accessApi');

const wrapper = ({ children }) => <AccessProvider>{children}</AccessProvider>;

describe('AccessContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load access records', async () => {
    const mockRecords = [
      { id: '1', entityId: '1', type: 'entry' },
      { id: '2', entityId: '2', type: 'exit' },
    ];
    
    (accessApi.getAllAccess as jest.Mock).mockResolvedValue(mockRecords);
    
    const { result, waitForNextUpdate } = renderHook(() => useAccess(), { wrapper });
    
    act(() => {
      result.current.loadAccess();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.records).toEqual(mockRecords);
    expect(result.current.loading).toBe(false);
  });

  it('should create access record', async () => {
    const newRecord = { entityId: '1', type: 'entry', method: 'manual' };
    const createdRecord = { id: '3', ...newRecord };
    
    (accessApi.createAccess as jest.Mock).mockResolvedValue(createdRecord);
    
    const { result } = renderHook(() => useAccess(), { wrapper });
    
    await act(async () => {
      await result.current.createAccess(newRecord);
    });
    
    expect(accessApi.createAccess).toHaveBeenCalledWith(newRecord);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (accessApi.getAllAccess as jest.Mock).mockRejectedValue(error);
    
    const { result, waitForNextUpdate } = renderHook(() => useAccess(), { wrapper });
    
    act(() => {
      result.current.loadAccess();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.error).toBe('Network error');
    expect(result.current.loading).toBe(false);
  });
});
```

### Exemplo 2: Testar Service

```typescript
// __tests__/services/accessApi.test.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { accessApi } from '../../src/services/accessApi';

jest.mock('@react-native-async-storage/async-storage');

describe('accessApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAccess', () => {
    it('should return all access records', async () => {
      const mockData = [
        { id: '1', entityId: '1', type: 'entry' },
        { id: '2', entityId: '2', type: 'exit' },
      ];
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockData)
      );
      
      const result = await accessApi.getAllAccess();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@access_records');
      expect(result).toEqual(mockData);
    });

    it('should return empty array when no data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const result = await accessApi.getAllAccess();
      
      expect(result).toEqual([]);
    });

    it('should throw error on failure', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
        new Error('Storage error')
      );
      
      await expect(accessApi.getAllAccess()).rejects.toThrow(
        'Erro ao buscar registros de acesso'
      );
    });
  });

  describe('createAccess', () => {
    it('should create and return new access record', async () => {
      const newAccess = {
        entityId: '1',
        type: 'entry' as const,
        method: 'manual' as const,
      };
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('[]');
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      
      const result = await accessApi.createAccess(newAccess);
      
      expect(result).toMatchObject({
        ...newAccess,
        id: expect.any(String),
        timestamp: expect.any(String),
      });
      
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
```

### Exemplo 3: Testar Componente com Navegação

```typescript
// __tests__/screens/AccessScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccessScreen from '../../src/screens/access/AccessScreen';

const Stack = createStackNavigator();

const MockedNavigator = ({ component: Component }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Access" component={Component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('AccessScreen', () => {
  it('should navigate to detail screen when card is pressed', async () => {
    const { getByTestId } = render(
      <MockedNavigator component={AccessScreen} />
    );
    
    await waitFor(() => {
      expect(getByTestId('access-list')).toBeTruthy();
    });
    
    const firstCard = getByTestId('access-card-1');
    fireEvent.press(firstCard);
    
    await waitFor(() => {
      // Verificar navegação ou modal de detalhes
      expect(getByTestId('access-detail')).toBeTruthy();
    });
  });
});
```

### Exemplo 4: Testar Permissões

```typescript
// __tests__/permissions/checkPermission.test.ts
import { checkPermission } from '../../src/utils/permissions';
import { PermissionLevel } from '../../src/types/permissions';

describe('checkPermission', () => {
  const testCases = [
    // ADMIN pode tudo
    { level: PermissionLevel.ADMIN, feature: 'any', expected: true },
    
    // SECURITY
    { level: PermissionLevel.SECURITY, feature: 'entry', expected: true },
    { level: PermissionLevel.SECURITY, feature: 'exit', expected: true },
    { level: PermissionLevel.SECURITY, feature: 'visitors', expected: false },
    { level: PermissionLevel.SECURITY, feature: 'reports', expected: false },
    
    // RECEPTIONIST
    { level: PermissionLevel.RECEPTIONIST, feature: 'entry', expected: true },
    { level: PermissionLevel.RECEPTIONIST, feature: 'visitors', expected: true },
    { level: PermissionLevel.RECEPTIONIST, feature: 'reports', expected: false },
    
    // SUPERVISOR
    { level: PermissionLevel.SUPERVISOR, feature: 'reports', expected: true },
    { level: PermissionLevel.SUPERVISOR, feature: 'alerts', expected: false },
    
    // MANAGER
    { level: PermissionLevel.MANAGER, feature: 'alerts', expected: true },
    { level: PermissionLevel.MANAGER, feature: 'settings', expected: false },
    
    // GUEST
    { level: PermissionLevel.GUEST, feature: 'entry', expected: false },
  ];

  testCases.forEach(({ level, feature, expected }) => {
    it(`should ${expected ? 'allow' : 'deny'} ${PermissionLevel[level]} to access ${feature}`, () => {
      const user = { permissionLevel: level };
      expect(checkPermission(user, feature)).toBe(expected);
    });
  });
});
```

---

## Cobertura de Código

### Visualizar Relatório

```bash
npm run test:coverage
```

Isso gerará um relatório em `coverage/lcov-report/index.html`

### Interpretando Cobertura

```
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   85.71 |    83.33 |   87.50 |   85.71 |                   
 AccessCard.tsx     |     100 |      100 |     100 |     100 |                   
 accessApi.ts       |   71.43 |    66.67 |      75 |   71.43 | 23-25,45-47       
--------------------|---------|----------|---------|---------|-------------------
```

- **% Stmts**: Porcentagem de declarações executadas
- **% Branch**: Porcentagem de ramificações (if/else) testadas
- **% Funcs**: Porcentagem de funções executadas
- **% Lines**: Porcentagem de linhas executadas

---

## Troubleshooting

### Erro: Cannot find module

```bash
# Limpar cache do Jest
npm test -- --clearCache

# Reinstalar dependências
rm -rf node_modules
npm install
```

### Erro: Snapshot failed

```bash
# Atualizar snapshots
npm test -- -u
```

### Erro: Timeout

```typescript
// Aumentar timeout para testes assíncronos
it('should load data', async () => {
  // ...
}, 10000); // 10 segundos
```

---

## Recursos Adicionais

- [Testing Library Docs](https://testing-library.com/docs/react-native-testing-library/intro)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)

---

**Última Atualização**: 06 de Outubro de 2025
