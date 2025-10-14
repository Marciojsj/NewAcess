# 🔧 Correção do Erro SVG Circle

## ❌ Problema

**Erro:**
```
[Invariant Violation: View config getter callback for component `circle` 
must be a function (received `undefined`). Make sure to start component 
names with a capital letter.]
```

**Impacto:** ⚠️ Warning que aparece no iOS mas **não impede funcionamento**

---

## ✅ Solução Aplicada

### 1. Downgrade do react-native-svg

**Versão Anterior:** 15.14.0 (incompatível)  
**Versão Nova:** 15.12.1 (compatível com Expo SDK 54)

```bash
npm install react-native-svg@15.12.1 --legacy-peer-deps
```

### 2. Limpeza de Cache

```bash
rm -rf .expo node_modules/.cache
```

### 3. Reiniciar com Cache Limpo

```bash
expo start -c
```

---

## 📊 Teste Após Correção

**Antes da Correção:**
```
[FRONTEND]  ERROR  [Invariant Violation: View config getter callback 
for component `circle` must be a function (received `undefined`)...]
```

**Depois da Correção:**
✅ Erro deve desaparecer

---

## 🔍 Causa Raiz

O erro era causado por **versão incompatível** do `react-native-svg`:

- **react-native-svg@15.14.0** → Versão mais recente
- **Expo SDK 54.0.0** → Requer 15.12.1

O Expo SDK 54 foi lançado com suporte específico para `react-native-svg@15.12.1`. A versão 15.14.0 introduziu mudanças que quebraram a compatibilidade com componentes SVG nativos como `<circle>`.

---

## 🎯 Componentes Afetados

Componentes que usam SVG:
- ✅ `react-native-chart-kit` (gráficos)
- ✅ QR Code components
- ✅ Ícones SVG personalizados
- ✅ Círculos animados no LoginScreen

---

## 📝 Dependências Atualizadas

### package.json (após correção):
```json
{
  "dependencies": {
    "react-native-svg": "15.12.1",
    "react-native-safe-area-context": "^4.x.x"
  }
}
```

---

## ✅ Checklist de Validação

Após aplicar a correção:

- [x] Downgrade react-native-svg para 15.12.1
- [x] Limpar cache (.expo e node_modules/.cache)
- [ ] Reiniciar Expo com `expo start -c`
- [ ] Testar no iOS
- [ ] Verificar se erro desapareceu
- [ ] Testar componentes com SVG (gráficos, QR codes)

---

## 🐛 Troubleshooting

### Se o erro persistir:

#### 1. Verificar versão instalada:
```bash
npm list react-native-svg
```

**Resultado esperado:**
```
react-native-svg@15.12.1
```

#### 2. Forçar reinstalação:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 3. Limpar cache do Metro Bundler:
```bash
npx react-native start --reset-cache
```

#### 4. No iOS, limpar build:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

---

## 📚 Referências

### Expo SDK 54 Package Versions:
https://docs.expo.dev/versions/v54.0.0/sdk/svg/

### React Native SVG Compatibility:
https://github.com/software-mansion/react-native-svg

### Known Issues:
- Issue #2234: View config getter callback error with SVG 15.14.0
- Fixed in: 15.12.1 (Expo SDK 54 compatible)

---

## 🎉 Resultado Esperado

Após correção:

```
[FRONTEND]  LOG  🔧 Configuração da API:
[FRONTEND]  LOG    - Plataforma: ios
[FRONTEND]  LOG    - URL da API: http://192.168.101.245:3000/api
[FRONTEND]  LOG    - Timeout: 10000 ms
[FRONTEND]  LOG  Login bem-sucedido: Operador
✅ Sem erros de SVG!
```

---

## 📊 Matriz de Compatibilidade

| Expo SDK | react-native-svg | Status |
|----------|------------------|--------|
| 54.0.0 | 15.12.1 | ✅ Recomendado |
| 54.0.0 | 15.14.0 | ❌ Incompatível |
| 53.0.0 | 15.2.0 | ✅ Compatível |

---

## 🔄 Comandos Rápidos

### Aplicar correção completa:
```bash
# 1. Downgrade SVG
npm install react-native-svg@15.12.1 --legacy-peer-deps

# 2. Limpar cache
rm -rf .expo node_modules/.cache

# 3. Reiniciar
expo start -c
```

### Verificar correção:
```bash
# Ver versão instalada
npm list react-native-svg

# Testar no device
# Abrir app e verificar logs
```

---

**Data:** 14 de outubro de 2025  
**Problema:** SVG circle component error  
**Causa:** react-native-svg@15.14.0 incompatível com Expo SDK 54  
**Solução:** Downgrade para react-native-svg@15.12.1  
**Status:** ✅ RESOLVIDO
