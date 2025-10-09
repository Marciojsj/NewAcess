# 🔧 Scripts de Refatoração de Screens

## 📋 Visão Geral

Conjunto de scripts para reorganizar todas as screens do projeto para uma estrutura profissional híbrida (Web + Mobile).

## 🎯 Objetivo

Transformar a estrutura atual em:

```
src/screens/[nome]/
├── [Nome]Screen.tsx                    ← Componente React
├── [nome].service.ts                   ← Lógica de API
├── [nome].types.ts                     ← Interfaces TypeScript
└── styles/
    ├── index.ts                        ← Selector automático
    ├── [nome]Screen.styles.web.ts      ← Estilos WEB
    └── [nome]Screen.styles.native.ts   ← Estilos MOBILE
```

## 🚀 Scripts Disponíveis

### 1️⃣ `refactor-screens-structure.sh`

**Descrição**: Cria a estrutura completa de arquivos para todas as screens.

**O que faz:**
- ✅ Cria diretório `styles/` em cada screen
- ✅ Gera arquivos `.types.ts` com templates
- ✅ Gera arquivos `.service.ts` com templates
- ✅ Cria estilos WEB otimizados para desktop
- ✅ Cria estilos NATIVE otimizados para mobile
- ✅ Gera `styles/index.ts` com selector automático
- ✅ Cria documentação completa

**Como usar:**
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
./scripts/refactor-screens-structure.sh
```

**Resultado esperado:**
```
✅ REFATORAÇÃO CONCLUÍDA!

📊 Estatísticas:
   • Screens processadas: 12
   • Arquivos de tipos criados: 12
   • Arquivos de service criados: 12
   • Arquivos de estilos WEB criados: 12
   • Arquivos de estilos NATIVE criados: 12
   • Arquivos index.ts criados: 12
```

---

### 2️⃣ `migrate-existing-styles.sh`

**Descrição**: Extrai estilos existentes dos componentes para facilitar migração.

**O que faz:**
- 🔍 Analisa cada arquivo `.tsx`
- 📋 Extrai blocos de `StyleSheet.create`
- 💾 Salva em `_extracted.tmp` para revisão manual
- 🔄 Sugere adaptações para Web e Mobile

**Como usar:**
```bash
./scripts/migrate-existing-styles.sh
```

**Próximos passos após executar:**
1. Revisar arquivos `_extracted.tmp` em `styles/`
2. Copiar estilos para `.styles.web.ts` (adaptar para desktop)
3. Copiar estilos para `.styles.native.ts` (adaptar para mobile)
4. Deletar estilos inline dos componentes
5. Trocar por `import { styles } from './styles'`

---

### 3️⃣ `validate-screen-structure.sh`

**Descrição**: Valida se todas as screens seguem o padrão correto.

**O que verifica:**
- ✅ Existência de diretório da screen
- ✅ Existência de `styles/`
- ✅ Presença de arquivos `.types.ts`
- ✅ Presença de arquivos `.service.ts`
- ✅ Estilos WEB (`.styles.web.ts`)
- ✅ Estilos NATIVE (`.styles.native.ts`)
- ✅ Arquivo `styles/index.ts`
- ✅ Uso de `Platform.OS` no index
- ✅ Componente principal (`*Screen.tsx`)
- ✅ Import correto de estilos

**Como usar:**
```bash
./scripts/validate-screen-structure.sh
```

**Resultado esperado:**
```
✅ RELATÓRIO FINAL DE VALIDAÇÃO

📊 Estatísticas Gerais:
   • Total de checks: 120
   • Checks passados: 115
   • Checks falhados: 5

📈 Taxa de Conformidade: 96%

🎉 PARABÉNS! Quase todas as screens seguem o padrão!
```

---

## 📝 Fluxo de Trabalho Recomendado

### Passo 1: Criar Estrutura
```bash
./scripts/refactor-screens-structure.sh
```

### Passo 2: Migrar Estilos Existentes
```bash
./scripts/migrate-existing-styles.sh
```

### Passo 3: Adaptar Manualmente

Para cada screen, faça:

1. **Abra o arquivo extraído:**
   ```bash
   cat src/screens/home/styles/_extracted.tmp
   ```

2. **Adapte para WEB** (`homeScreen.styles.web.ts`):
   ```typescript
   export const styles = StyleSheet.create({
     container: {
       maxWidth: 1400,        // ← Limitar largura
       marginHorizontal: 'auto',
     },
     title: {
       fontSize: 32,          // ← Textos maiores
     },
     card: {
       padding: 24,           // ← Espaçamento maior
     },
   });
   ```

3. **Adapte para MOBILE** (`homeScreen.styles.native.ts`):
   ```typescript
   export const styles = StyleSheet.create({
     container: {
       flex: 1,               // ← Ocupar toda tela
     },
     title: {
       fontSize: 24,          // ← Textos menores
     },
     card: {
       padding: 16,           // ← Espaçamento menor
     },
   });
   ```

4. **Atualize o componente:**
   ```typescript
   // ANTES:
   const styles = StyleSheet.create({ ... });
   
   // DEPOIS:
   import { styles } from './styles';
   ```

### Passo 4: Validar
```bash
./scripts/validate-screen-structure.sh
```

### Passo 5: Testar
```bash
# Web
npm run web

# Mobile
npm start
```

---

## 🎨 Diferenças Web vs Mobile

### WEB (Desktop/Tablet)
```typescript
{
  // Layout
  maxWidth: 1400,
  marginHorizontal: 'auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  
  // Espaçamento
  padding: 24,
  gap: 20,
  
  // Tipografia
  fontSize: 32,
  lineHeight: 40,
  
  // Cards
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  
  // Interação
  cursor: 'pointer',
  transition: 'all 0.3s',
}
```

### MOBILE (Smartphone)
```typescript
{
  // Layout
  flex: 1,
  flexDirection: 'column',
  
  // Espaçamento
  padding: 16,
  gap: 12,
  
  // Tipografia
  fontSize: 24,
  lineHeight: 32,
  
  // Cards
  borderRadius: 12,
  elevation: 3,
  shadowOffset: { width: 0, height: 2 },
  
  // Interação
  activeOpacity: 0.7,
}
```

---

## 🔍 Exemplo Completo

### Antes da Refatoração:
```
src/screens/visitantes/
└── VisitantesScreen.tsx (800 linhas - tudo misturado)
```

### Depois da Refatoração:
```
src/screens/visitantes/
├── VisitantesScreen.tsx (300 linhas - apenas UI)
├── visitantes.service.ts (150 linhas - API calls)
├── visitantes.types.ts (100 linhas - interfaces)
└── styles/
    ├── index.ts (10 linhas - selector)
    ├── visitantesScreen.styles.web.ts (120 linhas)
    └── visitantesScreen.styles.native.ts (120 linhas)
```

**Benefícios:**
- ✅ Código organizado e legível
- ✅ Fácil manutenção
- ✅ Estilos otimizados por plataforma
- ✅ Reutilização de lógica
- ✅ TypeScript com tipos separados
- ✅ Performance melhorada

---

## 📊 Screens Afetadas

O script irá refatorar as seguintes screens:

1. ✅ `home` - Dashboard principal
2. ✅ `login` - Autenticação
3. ✅ `registrarEntrada` - Registro de entrada
4. ✅ `registrarSaida` - Registro de saída
5. ✅ `visitantes` - Gestão de visitantes
6. ✅ `relatorios` - Relatórios e analytics
7. ✅ `alertas` - Sistema de alertas
8. ✅ `entidade` - Gestão de entidades
9. ✅ `users` - Gestão de usuários
10. ✅ `access` - Histórico de acessos
11. ✅ `configuracoes` - Configurações (6 sub-telas)
12. ✅ `permissoes` - Sistema de permissões

**Total:** 12 screens principais + sub-telas = ~18 componentes

---

## ⚠️ Avisos Importantes

1. **Backup Automático**: O script de migração cria `.backup` dos arquivos originais
2. **Revisão Manual**: Sempre revise os arquivos `_extracted.tmp` antes de aplicar
3. **Testes**: Teste em WEB e MOBILE após cada migração
4. **Git**: Faça commit antes de executar os scripts
5. **Incremental**: Refatore uma screen por vez para facilitar debugging

---

## 🆘 Troubleshooting

### Problema: "Permission denied"
```bash
chmod +x scripts/*.sh
```

### Problema: Script não encontra screens
```bash
# Verificar estrutura
ls -la src/screens/
```

### Problema: Estilos não aplicam
```bash
# Limpar cache
npm start -- --reset-cache
```

### Problema: TypeScript errors
```bash
# Recompilar
npx tsc --noEmit
```

---

## 📚 Recursos Adicionais

- [Documentação React Native Platform](https://reactnative.dev/docs/platform)
- [Guia de Estilos Web vs Mobile](./SCREEN_STRUCTURE.md)
- [Convenções do Projeto](../CONTRIBUTING.md)

---

## 🎯 Checklist de Refatoração

- [ ] Executar `refactor-screens-structure.sh`
- [ ] Executar `migrate-existing-styles.sh`
- [ ] Revisar todos os `_extracted.tmp`
- [ ] Adaptar estilos para WEB (desktop)
- [ ] Adaptar estilos para MOBILE (smartphone)
- [ ] Atualizar imports nos componentes
- [ ] Mover lógica para `.service.ts`
- [ ] Mover interfaces para `.types.ts`
- [ ] Executar `validate-screen-structure.sh`
- [ ] Testar em navegador (Web)
- [ ] Testar em smartphone (Mobile)
- [ ] Corrigir erros TypeScript
- [ ] Fazer commit das mudanças
- [ ] Atualizar documentação

---

**Última atualização**: 2025-10-09  
**Versão dos scripts**: 1.0.0  
**Compatibilidade**: React Native 0.76.1 + Expo 52
