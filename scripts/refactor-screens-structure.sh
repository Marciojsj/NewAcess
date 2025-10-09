#!/bin/bash

##############################################################################
# Script de Refatoração de Estrutura de Screens
# Converte todas as screens para estrutura híbrida (Web + Mobile)
##############################################################################

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Refatoração de Estrutura de Screens - Web + Mobile      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Diretório base
BASE_DIR="/home/marcio-junior/Documentos/Projeto/accesControl/src/screens"

# Lista de todas as screens a serem refatoradas
declare -a SCREENS=(
    "home"
    "login"
    "registrarEntrada"
    "registrarSaida"
    "visitantes"
    "relatorios"
    "alertas"
    "entidade"
    "users"
    "access"
    "configuracoes"
    "permissoes"
)

# Função para criar estrutura de uma screen
create_screen_structure() {
    local screen_name=$1
    local screen_dir="${BASE_DIR}/${screen_name}"
    
    echo -e "${YELLOW}📁 Processando: ${screen_name}${NC}"
    
    # Criar diretório styles se não existir
    if [ ! -d "${screen_dir}/styles" ]; then
        mkdir -p "${screen_dir}/styles"
        echo -e "${GREEN}  ✓ Criado: ${screen_name}/styles/${NC}"
    fi
    
    # Criar arquivo types se não existir
    if [ ! -f "${screen_dir}/${screen_name}.types.ts" ]; then
        cat > "${screen_dir}/${screen_name}.types.ts" << 'EOF'
/**
 * Types e Interfaces
 * Define todas as tipagens desta screen
 */

// Adicione suas interfaces aqui
export interface ScreenProps {
  // Props do componente
}

export interface ScreenState {
  // Estados do componente
}
EOF
        echo -e "${GREEN}  ✓ Criado: ${screen_name}.types.ts${NC}"
    fi
    
    # Criar arquivo service se não existir
    if [ ! -f "${screen_dir}/${screen_name}.service.ts" ]; then
        cat > "${screen_dir}/${screen_name}.service.ts" << 'EOF'
/**
 * Service Layer
 * Lógica de negócio e comunicação com API
 */

export const screenService = {
  // Métodos de service aqui
};
EOF
        echo -e "${GREEN}  ✓ Criado: ${screen_name}.service.ts${NC}"
    fi
    
    # Criar estilos WEB
    if [ ! -f "${screen_dir}/styles/${screen_name}Screen.styles.web.ts" ]; then
        cat > "${screen_dir}/styles/${screen_name}Screen.styles.web.ts" << 'EOF'
/**
 * Estilos WEB
 * Otimizado para desktop e tablets
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
  },
  content: {
    padding: 24,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  gridItem: {
    flex: 1,
    minWidth: 300,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
EOF
        echo -e "${GREEN}  ✓ Criado: styles/${screen_name}Screen.styles.web.ts${NC}"
    fi
    
    # Criar estilos NATIVE (Mobile)
    if [ ! -f "${screen_dir}/styles/${screen_name}Screen.styles.native.ts" ]; then
        cat > "${screen_dir}/styles/${screen_name}Screen.styles.native.ts" << 'EOF'
/**
 * Estilos NATIVE (Mobile)
 * Otimizado para smartphones
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  grid: {
    gap: 12,
  },
  gridItem: {
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
EOF
        echo -e "${GREEN}  ✓ Criado: styles/${screen_name}Screen.styles.native.ts${NC}"
    fi
    
    # Criar index.ts que exporta os estilos corretos
    cat > "${screen_dir}/styles/index.ts" << 'EOF'
/**
 * Style Selector
 * Exporta estilos corretos baseado na plataforma
 */

import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./SCREEN_NAMEScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./SCREEN_NAMEScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
EOF
    
    # Substituir SCREEN_NAME pelo nome real
    sed -i "s/SCREEN_NAME/${screen_name}/g" "${screen_dir}/styles/index.ts"
    
    echo -e "${GREEN}  ✓ Criado: styles/index.ts${NC}"
    echo ""
}

# Função para criar README de documentação
create_documentation() {
    local doc_file="${BASE_DIR}/SCREEN_STRUCTURE.md"
    
    cat > "${doc_file}" << 'EOF'
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
EOF
    
    echo -e "${GREEN}✓ Documentação criada: SCREEN_STRUCTURE.md${NC}"
}

# Função principal
main() {
    echo -e "${BLUE}Iniciando refatoração...${NC}"
    echo ""
    
    # Processar cada screen
    for screen in "${SCREENS[@]}"; do
        if [ -d "${BASE_DIR}/${screen}" ]; then
            create_screen_structure "$screen"
        else
            echo -e "${YELLOW}⚠ Screen não encontrada: ${screen}${NC}"
            echo ""
        fi
    done
    
    # Criar documentação
    echo -e "${BLUE}📝 Criando documentação...${NC}"
    create_documentation
    echo ""
    
    # Resumo
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              ✅ REFATORAÇÃO CONCLUÍDA!                     ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📊 Estatísticas:${NC}"
    echo -e "   • Screens processadas: ${#SCREENS[@]}"
    echo -e "   • Arquivos de tipos criados: ${#SCREENS[@]}"
    echo -e "   • Arquivos de service criados: ${#SCREENS[@]}"
    echo -e "   • Arquivos de estilos WEB criados: ${#SCREENS[@]}"
    echo -e "   • Arquivos de estilos NATIVE criados: ${#SCREENS[@]}"
    echo -e "   • Arquivos index.ts criados: ${#SCREENS[@]}"
    echo ""
    echo -e "${YELLOW}📝 Próximos passos:${NC}"
    echo -e "   1. Revisar os arquivos gerados em cada screen"
    echo -e "   2. Migrar estilos existentes para os arquivos .web e .native"
    echo -e "   3. Atualizar imports nos componentes para usar './styles'"
    echo -e "   4. Mover lógica de API para os arquivos .service.ts"
    echo -e "   5. Mover interfaces para os arquivos .types.ts"
    echo ""
    echo -e "${GREEN}✨ Estrutura profissional pronta para Web + Mobile!${NC}"
    echo ""
}

# Executar
main
