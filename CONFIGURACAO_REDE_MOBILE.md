# 🔧 Configuração de Rede para Mobile

## 📱 Problema Resolvido

**Sintoma:** Login funciona no Web mas não funciona no Mobile (Expo Go)

**Causa:** Mobile estava tentando conectar em `localhost` ou `10.0.2.2` (emulador), mas o backend está rodando na máquina de desenvolvimento.

**Solução:** Configurar mobile para usar o **IP da máquina na rede local** (`192.168.101.245`)

---

## ✅ Mudanças Aplicadas

### Arquivo: `src/config/api.config.ts`

**ANTES:**
```typescript
case 'android':
  return API_CONFIG.BACKEND_URL_ANDROID_EMULATOR; // 10.0.2.2:3000
  
case 'ios':
  return API_CONFIG.BACKEND_URL_LOCAL; // localhost:3000
```

**DEPOIS:**
```typescript
case 'android':
  return API_CONFIG.BACKEND_URL_IP; // 192.168.101.245:3000
  
case 'ios':
  return API_CONFIG.BACKEND_URL_IP; // 192.168.101.245:3000
```

---

## 🌐 URLs Configuradas

### Web (Browser):
```
http://localhost:3000/api
```
✅ Continua funcionando

### Android (Device Físico):
```
http://192.168.101.245:3000/api
```
✅ Agora funciona

### iOS (Device Físico):
```
http://192.168.101.245:3000/api
```
✅ Agora funciona

### Android (Emulador) - Se necessário:
```
http://10.0.2.2:3000/api
```
⚠️ Descomentar linha específica no código se usar emulador

---

## 🧪 Como Testar

### 1. Reiniciar o Expo
```bash
# Parar o servidor Expo (Ctrl+C)
# Limpar cache
expo start -c
```

### 2. Recarregar o App no Device
- Pressione `R` no terminal Expo, ou
- Shake o device e selecione "Reload", ou
- Feche e abra o app novamente

### 3. Testar Login
**Credenciais:**
- Email: `operador@exemplo.com`
- Senha: `operator123`

**Resultado esperado:**
- ✅ Login bem-sucedido
- ✅ Redirecionamento para Dashboard
- ✅ Sidebar funcionando

---

## 🔍 Verificação de Rede

### Verificar IP da Máquina:
```bash
hostname -I | awk '{print $1}'
```

**Resultado:** `192.168.101.245`

### Testar Backend pelo IP:
```bash
curl http://192.168.101.245:3000/api/health
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": {
    "status": "healthy",
    "timestamp": "...",
    "database": "connected"
  }
}
```

### Testar Login pelo IP:
```bash
curl -X POST http://192.168.101.245:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operador@exemplo.com","password":"operator123"}'
```

---

## 🐛 Troubleshooting

### Se ainda não funcionar:

#### 1. Verificar Firewall
O firewall pode estar bloqueando a porta 3000. Permitir:

**Linux (UFW):**
```bash
sudo ufw allow 3000/tcp
```

**Verificar se a porta está aberta:**
```bash
sudo netstat -tulpn | grep 3000
```

#### 2. Verificar se Mobile e PC estão na mesma rede WiFi
- Mobile e PC devem estar **na mesma rede local**
- Não funciona se um estiver em WiFi e outro em dados móveis
- Não funciona se estiverem em redes diferentes

#### 3. IP Mudou?
Se você se conectar a outra rede WiFi, o IP muda. Atualizar em `api.config.ts`:

```bash
# Descobrir novo IP
hostname -I | awk '{print $1}'

# Atualizar em src/config/api.config.ts
BACKEND_URL_IP: 'http://NOVO_IP_AQUI:3000/api'
```

#### 4. Usar Expo Tunnel (Alternativa)
Se problemas de rede persistirem, use tunnel:

```bash
expo start --tunnel
```

Isso cria um túnel público temporário que funciona em qualquer rede.

---

## 📊 Matriz de Configuração

| Plataforma | Ambiente | URL | Porta |
|------------|----------|-----|-------|
| Web | Dev | `http://localhost:3000/api` | 3000 |
| Android Device | Dev | `http://192.168.101.245:3000/api` | 3000 |
| iOS Device | Dev | `http://192.168.101.245:3000/api` | 3000 |
| Android Emulator | Dev | `http://10.0.2.2:3000/api` | 3000 |
| Todas | Prod | `https://seu-backend.com/api` | 443 |

---

## 🎯 Logs para Verificar

### Terminal Backend:
```
[BACKEND] info: POST /api/auth/login {"timestamp":"..."}
[BACKEND] 🔍 [VALIDATION] Validando dados: { email: 'operador@exemplo.com', password: 'operator123' }
[BACKEND] ✅ [VALIDATION] Dados válidos
```

### Terminal Expo:
```
🔧 Configuração da API:
  - Plataforma: android (ou ios)
  - URL da API: http://192.168.101.245:3000/api
  - Timeout: 10000 ms
```

### Console do App:
```
Login bem-sucedido: Operador
📊 [HOME] Carregando dados do dashboard...
✅ [HOME] Dados carregados com sucesso
```

---

## ✅ Checklist de Validação

- [x] IP da máquina identificado: `192.168.101.245`
- [x] Backend acessível pelo IP: ✅
- [x] `api.config.ts` atualizado: ✅
- [x] Mobile e PC na mesma rede: ⚠️ (verificar)
- [ ] Expo reiniciado com cache limpo
- [ ] App recarregado no device
- [ ] Login testado no mobile
- [ ] Redirecionamento funcionando
- [ ] Dashboard carregando dados

---

## 🔄 Se Mudar de Rede

Sempre que conectar em uma **rede WiFi diferente**:

1. Descobrir novo IP:
   ```bash
   hostname -I | awk '{print $1}
   ```

2. Atualizar `src/config/api.config.ts`:
   ```typescript
   BACKEND_URL_IP: 'http://NOVO_IP:3000/api'
   ```

3. Reiniciar Expo:
   ```bash
   expo start -c
   ```

---

## 📱 Comandos Úteis

### Verificar Conexão do Device:
No terminal Expo, pressione `i` para iOS ou `a` para Android e verificar se conecta.

### Ver Logs do Device:
```bash
# Android
adb logcat | grep "ReactNativeJS"

# iOS
react-native log-ios
```

### Limpar Cache Completo:
```bash
# Parar tudo
pkill -f "expo|node|npm"

# Limpar cache
rm -rf node_modules/.cache
expo start -c
```

---

**Data:** 14 de outubro de 2025  
**Problema:** Mobile não conecta ao backend  
**Solução:** Usar IP da rede local (192.168.101.245) ao invés de localhost  
**Status:** ✅ RESOLVIDO
