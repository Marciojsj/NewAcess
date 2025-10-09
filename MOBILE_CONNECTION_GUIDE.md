# 📱 Guia de Conexão Mobile - Expo

## 🎯 Problema Resolvido

**Antes:** "Cannot connect to server" ao tentar abrir no celular  
**Agora:** Conexão automática via túnel! 🚀

---

## ✅ O QUE FOI CONFIGURADO

### 1. **app.json** - Túnel Automático
```json
{
  "expo": {
    "packagerOpts": {
      "lanType": "tunnel"
    },
    "ngrok": {
      "connect": true
    }
  }
}
```

### 2. **package.json** - Scripts Atualizados
```json
{
  "scripts": {
    "start": "expo start --tunnel",        // ← Túnel por padrão
    "start:local": "expo start",            // ← Sem túnel
    "start:lan": "expo start --lan",        // ← Mesma rede WiFi
    "android": "expo start --android --tunnel",
    "ios": "expo start --ios --tunnel"
  }
}
```

### 3. **metro.config.js** - CORS e Conectividade
- Headers de CORS configurados
- Acesso de qualquer origem permitido
- Middleware otimizado

### 4. **start.sh** - Script Interativo
- Menu com 4 opções de conexão
- Túnel como padrão
- LAN para redes locais
- Web para navegador

---

## 🚀 COMO USAR

### Opção 1: Túnel Automático (Recomendado)
```bash
npm start
```
- ✅ Funciona em **qualquer rede**
- ✅ Não precisa estar no mesmo WiFi
- ✅ Funciona com 4G/5G
- ⚠️ Um pouco mais lento que LAN
- ⚠️ Requer internet

### Opção 2: Script Interativo
```bash
./start.sh
```
Mostra menu:
```
🌐 Escolha o modo de conexão:

  1) 🚇 TÚNEL (Recomendado) - Funciona em qualquer rede
  2) 📡 LAN - Mesmo WiFi (mais rápido)
  3) 💻 LOCALHOST - Apenas neste computador
  4) 🌐 WEB - Abrir no navegador

Escolha uma opção (1-4) [padrão: 1]:
```

### Opção 3: LAN (Mesma Rede WiFi)
```bash
npm run start:lan
```
- ✅ Mais rápido que túnel
- ✅ Melhor para desenvolvimento
- ❌ Precisa estar no mesmo WiFi

### Opção 4: Localhost (Só este PC)
```bash
npm run start:local
```
- ✅ Mais rápido de todos
- ❌ Só funciona no mesmo computador

---

## 📱 CONECTAR NO CELULAR

### Android (Expo Go)

1. **Instale o Expo Go:**
   - [Play Store - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Abra o Expo Go**

3. **Escaneie o QR Code:**
   - Use o scanner do Expo Go
   - OU digite a URL manualmente: `exp://[IP]:[PORTA]`

4. **Aguarde o carregamento:**
   - Primeira vez pode demorar 1-2 minutos
   - Bundle sendo construído...

### iOS (Expo Go)

1. **Instale o Expo Go:**
   - [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)

2. **Abra o app Camera (padrão do iOS)**

3. **Escaneie o QR Code:**
   - Aparecerá notificação "Abrir com Expo Go"
   - Toque na notificação

4. **Aguarde o carregamento**

---

## 🔧 TROUBLESHOOTING

### Problema 1: "Cannot connect to Metro"

**Solução A - Use Túnel:**
```bash
npm start
# ou
expo start --tunnel
```

**Solução B - Verifique Firewall:**
```bash
# Linux/Mac - Permitir porta 8081
sudo ufw allow 8081

# Windows - Adicionar regra no Firewall
# Painel de Controle > Firewall > Regras de Entrada > Nova Regra
# Porta: 8081, Protocolo: TCP
```

**Solução C - Reinicie com cache limpo:**
```bash
npm run dev
# ou
expo start --tunnel --clear
```

---

### Problema 2: "Timeout" / "Timed out"

**Causa:** Internet lenta ou firewall

**Solução:**
```bash
# 1. Verificar internet
ping google.com

# 2. Usar LAN se estiver no mesmo WiFi
npm run start:lan

# 3. Aumentar timeout (no celular)
# Configurações do Expo Go > Developer Options > Network timeout: 60000ms
```

---

### Problema 3: QR Code não escaneia

**Solução A - Digite manualmente:**
```bash
# No terminal, copie a URL que aparece:
exp://192.168.x.x:8081

# No Expo Go:
# Abra > Digite manualmente > Cole a URL
```

**Solução B - Use comando direto:**
```bash
# Android conectado via USB
npm run android

# iOS conectado via USB  
npm run ios
```

---

### Problema 4: "Network response timed out"

**Causa:** Celular não consegue acessar o computador

**Solução 1 - Mesmo WiFi:**
```bash
# 1. Conecte celular e PC no MESMO WiFi
# 2. Use LAN
npm run start:lan

# 3. Anote o IP que aparece
# 4. Ping do celular para o PC (use app "Network Utilities")
```

**Solução 2 - Use Túnel:**
```bash
npm start
# Túnel funciona mesmo em redes diferentes!
```

---

### Problema 5: "Something went wrong"

**Solução Completa:**
```bash
# 1. Parar tudo
Ctrl+C

# 2. Limpar cache
npm start -- --reset-cache

# 3. OU limpar tudo
rm -rf node_modules
rm -rf .expo
npm install
npm start
```

---

## 🌐 MODOS DE CONEXÃO EXPLICADOS

### 🚇 TUNNEL (Túnel ngrok)
```
[Celular] <---> [Internet] <---> [ngrok] <---> [Seu PC]
```
- ✅ Funciona em qualquer lugar
- ✅ Diferentes redes
- ✅ 4G/5G
- ⚠️ Requer internet
- ⚠️ +200ms latência

### 📡 LAN (Rede Local)
```
[Celular] <---> [WiFi Router] <---> [Seu PC]
```
- ✅ Muito rápido (~10ms)
- ✅ Não usa internet
- ❌ Precisa mesmo WiFi
- ❌ Firewall pode bloquear

### 💻 LOCALHOST
```
[Navegador] <---> [Seu PC]
```
- ✅ Mais rápido possível
- ✅ Sem rede
- ❌ Só funciona no PC

---

## 🔍 VERIFICAR STATUS

### No Terminal:
```bash
# Após npm start, você verá:

✔ Metro waiting on exp://192.168.x.x:8081
✔ Scan the QR code above
✔ Using Expo Go
```

### Indicadores de Sucesso:
- ✅ QR Code aparece
- ✅ "Metro waiting on..."
- ✅ "Using Expo Go"
- ✅ Porta listada (8081 ou 8082)

### Indicadores de Problema:
- ❌ "Port already in use"
- ❌ "Network error"
- ❌ Sem QR Code
- ❌ "Cannot start server"

---

## 🎯 CHECKLIST DE CONEXÃO

Antes de iniciar:

- [ ] Celular e PC na mesma rede WiFi (se usar LAN)
- [ ] Expo Go instalado no celular
- [ ] Firewall permite porta 8081
- [ ] Internet funcionando (se usar túnel)
- [ ] Node.js e npm atualizados
- [ ] Sem outras instâncias do Expo rodando

Ao iniciar:

- [ ] Comando executou sem erros
- [ ] QR Code apareceu
- [ ] Metro Bundler iniciou
- [ ] Porta correta (8081 ou 8082)

Ao escanear:

- [ ] Expo Go abriu
- [ ] "Building JavaScript bundle..."
- [ ] Aguardar até 100%
- [ ] App carregou

---

## 🚨 COMANDOS DE EMERGÊNCIA

```bash
# 🔥 Resetar TUDO
rm -rf node_modules .expo
npm install
npm start -- --reset-cache

# 🔥 Matar processos do Expo
killall -9 node
killall -9 expo

# 🔥 Limpar cache do Expo
expo start -c

# 🔥 Atualizar dependências
npx expo install --check
npx expo-doctor

# 🔥 Verificar portas em uso
lsof -i :8081
lsof -i :8082
```

---

## 📊 COMPARAÇÃO DE MODOS

| Característica | Túnel | LAN | Localhost |
|----------------|-------|-----|-----------|
| **Velocidade** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Confiabilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Configuração** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Requer WiFi** | ❌ | ✅ | ❌ |
| **Funciona com 4G** | ✅ | ❌ | ❌ |
| **Latência** | ~200ms | ~10ms | ~1ms |
| **Setup** | Zero | Médio | Zero |

---

## 💡 DICAS PRO

### 1. Atalhos do Teclado (no terminal)
```
a  - Abrir no Android
i  - Abrir no iOS
w  - Abrir no navegador
r  - Recarregar app
m  - Toggle menu
j  - Abrir debugger
c  - Limpar console
```

### 2. Modo Desenvolvedor no Expo Go
```
Abrir Expo Go > Configurações > Developer Options:
- Enable Fast Refresh: ON
- Enable Performance Monitor: ON
- Network timeout: 60000ms
```

### 3. Hot Reload
```
# Shake o celular ou Cmd+D (iOS) / Cmd+M (Android)
# Enable Fast Refresh
# Agora mudanças aparecem instantaneamente!
```

### 4. Debug no Celular
```
# Shake o celular
# Debug Remote JS
# Abrir Chrome: http://localhost:19000/debugger-ui
```

---

## 🎉 RESULTADO ESPERADO

Ao executar `npm start`, você verá:

```
✅ CONECTADO COM SUCESSO!

📱 Status:
   • Metro Bundler: Rodando
   • Porta: 8081
   • Modo: Tunnel
   • URL: exp://xx.xxx.xxx.xxx.ngrok.io

📱 No seu celular:
   1. Abra o Expo Go
   2. Escaneie o QR Code
   3. Aguarde 30-60s
   4. App carregado! 🎉
```

---

## 📞 SUPORTE

Se nada funcionar:

1. **Verifique versões:**
```bash
node -v      # >= 18.0.0
npm -v       # >= 8.0.0
expo --version # >= 52.0.0
```

2. **Logs completos:**
```bash
npm start -- --verbose
```

3. **Reinstale Expo Go:**
- Desinstale do celular
- Reinstale da loja
- Tente novamente

4. **Último recurso:**
```bash
npx react-native-clean-project
npm install
npm start
```

---

**Status Atual:** ✅ **CONFIGURADO E PRONTO!**

Execute `npm start` e escaneie o QR Code! 📱✨
