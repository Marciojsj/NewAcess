# 📁 Estrutura Padrão de Screens

## 🎯 Objetivo
Estrutura organizada e escalável para desenvolvimento híbrido (Web + Mobile)

## 📂 Estrutura de Diretórios

```
src/screens/[nome-screen]/
├── [nome]Screen.tsx                    ← Componente React principal
├── [nome].service.ts                   ← Lógica de negócio e API calls
├── [nome].types.ts                     ← Interfaces e types TypeScript
└── styles/
    ├── index.ts                        ← Selector automático de estilos
    ├── [nome]Screen.styles.web.ts      ← Estilos otimizados para WEB
    └── [nome]Screen.styles.native.ts   ← Estilos otimizados para MOBILE
```

## 🔧 Como Usar

### 1. No componente principal:

```tsx
// homeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'; // ← Importa estilos corretos automaticamente
import { ScreenProps } from './home.types';
import { screenService } from './home.service';

export const HomeScreen: React.FC<ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Título</Text>
      </View>
      <View style={styles.content}>
        {/* Conteúdo */}
      </View>
    </View>
  );
};
```

### 2. Nos estilos:

**Web (Desktop/Tablet):**
```tsx
// styles/homeScreen.styles.web.ts
export const styles = StyleSheet.create({
  container: {
    maxWidth: 1400,  // Limita largura em desktop
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,  // Textos maiores
  },
  card: {
    padding: 24,  // Padding maior
  },
});
```

**Native (Mobile):**
```tsx
// styles/homeScreen.styles.native.ts
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,  // Textos menores
  },
  card: {
    padding: 16,  // Padding menor
  },
});
```

### 3. No service:

```tsx
// home.service.ts
import { api } from '../../services/api';

export const homeService = {
  async getData() {
    const response = await api.get('/endpoint');
    return response.data;
  },
  
  async postData(data: any) {
    return await api.post('/endpoint', data);
  },
};
```

### 4. Nos types:

```tsx
// home.types.ts
export interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export interface HomeData {
  id: string;
  name: string;
  // ...
}
```

## ✅ Benefícios

1. **🎨 Separação de Responsabilidades**: Cada arquivo tem um propósito único
2. **📱 Otimização por Plataforma**: Estilos específicos para Web e Mobile
3. **🔄 Manutenibilidade**: Fácil localizar e modificar código
4. **📊 Escalabilidade**: Estrutura suporta crescimento do projeto
5. **🤝 Trabalho em Equipe**: Padrão claro para todos os desenvolvedores
6. **🚀 Performance**: Carrega apenas estilos da plataforma atual

## 🎯 Convenções de Nomenclatura

- **Componentes**: PascalCase + "Screen" (ex: `HomeScreen.tsx`)
- **Services**: camelCase + ".service.ts" (ex: `home.service.ts`)
- **Types**: camelCase + ".types.ts" (ex: `home.types.ts`)
- **Estilos Web**: camelCase + "Screen.styles.web.ts"
- **Estilos Native**: camelCase + "Screen.styles.native.ts"

## 🔍 Exemplo Completo

```
src/screens/visitantes/
├── VisitantesScreen.tsx           ← Componente principal
├── visitantes.service.ts          ← API calls (getVisitors, createVisitor)
├── visitantes.types.ts            ← Visitor interface, Props, State
└── styles/
    ├── index.ts                   ← Exporta estilos corretos
    ├── visitantesScreen.styles.web.ts    ← Grid 3 colunas, cards grandes
    └── visitantesScreen.styles.native.ts ← Lista 1 coluna, cards compactos
```

## 📝 Notas

- O `styles/index.ts` detecta automaticamente a plataforma via `Platform.OS`
- Em desenvolvimento, ambos os arquivos de estilo são compilados
- Em produção, apenas o necessário é incluído no bundle
- Use `Platform.select()` para lógicas específicas de plataforma no componente

## 🚀 Comandos Úteis

```bash
# Criar nova screen com estrutura completa
npm run create-screen nome-da-screen

# Validar estrutura de todas as screens
npm run validate-screens

# Gerar documentação de types
npm run generate-docs
```

---

**Última atualização**: 2025-10-09
**Versão da estrutura**: 2.0
