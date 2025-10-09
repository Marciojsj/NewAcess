# 🚀 GUIA COMPLETO - INICIAR BACKEND + FRONTEND JUNTOS

## ⚡ MÉTODO 1: Comando Único (MAIS FÁCIL)

### Passo a Passo:

1. **Abra um terminal**

2. **Execute:**
   ```bash
   cd /home/marcio-junior/Documentos/Projeto/accesControl
   npm start
   ```

3. **Aguarde a mensagem:**
   ```
   ✅ Backend iniciado
   ✅ Frontend iniciando...
   ```

4. **Abra o app:**
   - Browser: `http://localhost:8081`
   - QR Code: Escaneie com Expo Go

5. **Para parar:** `Ctrl + C`

---

## 📋 MÉTODO 2: Script Direto

```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
bash start-dev.sh
```

**Mesma coisa que o Método 1!**

---

## 🖥️ MÉTODO 3: Dois Terminais (Manual)

### Terminal 1 - Backend:
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl/access-backend
npm run dev
```

**Aguarde ver:**
```
✅ Conectado ao banco de dados
🚀 Servidor rodando na porta 3000
```

### Terminal 2 - Frontend:
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
npx expo start
```

**Aguarde o QR Code aparecer**

---

## 🎯 TESTANDO AGORA - COPIE E COLE

### Opção A: Tudo de uma vez
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl && npm start
```

### Opção B: Passo a passo
```bash
# 1. Ir para o diretório
cd /home/marcio-junior/Documentos/Projeto/accesControl

# 2. Iniciar tudo
npm start
```

---

## ✅ VERIFICAÇÃO

Após executar, você deve ver:

### 1. Backend iniciou:
```
📦 Iniciando Backend (Node.js + Express + Prisma)...
✅ Backend iniciado (PID: 12345)
   API: http://localhost:3000
```

### 2. Frontend iniciou:
```
📱 Iniciando Frontend (React Native + Expo)...
✅ Frontend iniciando...
   Use 'a' para abrir no Android
   Use 'i' para abrir no iOS
   Use 'w' para abrir no navegador
```

### 3. QR Code aparece:
```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▀ ▀ █ █▄▀▀▄ █
█ █   █ █   █▀ ██ ▀▄▀█
...
```

---

## 🔍 COMO VERIFICAR SE ESTÁ FUNCIONANDO

### Teste 1: Backend
```bash
curl http://localhost:3000/api/health
```

**Esperado:**
```json
{"success":true,"message":"Server is running"}
```

### Teste 2: Frontend
- Abra: `http://localhost:8081` no browser
- Deve carregar a tela de login

### Teste 3: Fazer Login
- Email: `admin@exemplo.com`
- Senha: `admin123`
- Deve autenticar com sucesso! ✅

---

## 📊 STATUS DOS SERVIÇOS

### Backend
- **Porta:** 3000
- **URL:** http://localhost:3000/api
- **Status:** Verificar com `curl http://localhost:3000/api/health`

### Frontend
- **Porta:** 8081 ou 8082
- **URL Web:** http://localhost:8081
- **Expo:** QR Code para celular

---

## 🛑 COMO PARAR TUDO

### Método 1: Com o script rodando
```
Pressione: Ctrl + C
```

Isso encerra backend E frontend automaticamente!

### Método 2: Matar processos manualmente
```bash
# Parar backend
pkill -f ts-node-dev

# Parar frontend
pkill -f expo
```

### Método 3: Parar tudo de Node
```bash
pkill -f node
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Port 3000 already in use"

**Solução:**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou matar todos os processos do backend
pkill -f ts-node-dev
```

### Erro: "Cannot connect to backend"

**Verificar se backend está rodando:**
```bash
ps aux | grep ts-node-dev
```

**Se não aparecer nada, inicie o backend:**
```bash
cd access-backend && npm run dev
```

### Erro: "Expo command not found"

**Solução:**
```bash
npm install -g expo-cli
# ou use: npx expo start
```

---

## 📝 RESUMO DOS COMANDOS

| Ação | Comando |
|------|---------|
| **Iniciar tudo** | `npm start` |
| **Iniciar tudo (alternativo)** | `bash start-dev.sh` |
| **Só backend** | `cd access-backend && npm run dev` |
| **Só frontend** | `npx expo start` |
| **Parar tudo** | `Ctrl + C` |
| **Verificar backend** | `curl http://localhost:3000/api/health` |
| **Ver logs do backend** | `tail -f backend.log` |

---

## 🎉 PRONTO PARA USAR!

### Execute agora:
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
npm start
```

### Depois abra:
- Browser: `http://localhost:8081`
- Login: `admin@exemplo.com` / `admin123`

**Tudo deve funcionar! 🚀**

---

## 💡 DICA PRO

Para ver os logs do backend enquanto o frontend roda:

**Terminal 1:**
```bash
cd /home/marcio-junior/Documentos/Projeto/accesControl
npm start
```

**Terminal 2 (em paralelo):**
```bash
tail -f backend.log
```

Assim você vê os logs do backend em tempo real! 📊
