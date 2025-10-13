# ⚡ Guia Rápido - Backend Automático

## 🎯 Agora é Simples

### Antes (2 terminais)
```bash
# Terminal 1
cd access-backend && npm run dev

# Terminal 2  
npm start
```

### Agora (1 terminal)
```bash
npm start
```

**Pronto!** Backend + Frontend iniciam juntos automaticamente! 🎉

---

## 📋 Comandos Essenciais

```bash
# Desenvolvimento normal
npm start              # Backend + Frontend juntos

# Rodar testes
npm run test:crud      # Inicia backend, aguarda, roda testes

# Apenas um deles (se necessário)
npm run start:only-backend
npm run start:only-frontend
```

---

## 🎨 Como Fica

```
[BACKEND] 🚀 Servidor rodando em http://localhost:3000
[FRONTEND] 📱 App disponível em http://localhost:8081
[BACKEND] 📊 Banco conectado
[FRONTEND] › Scan the QR code with Expo Go
```

---

## 🐛 Problemas?

### Porta em uso?
```bash
# Matar processos nas portas
lsof -ti:3000 | xargs kill -9
lsof -ti:8081 | xargs kill -9

# Ou usar o script
./scripts/start-all.sh
```

### Backend não inicia?
```bash
# Instalar dependências do backend
cd access-backend
npm install
cd ..
npm start
```

---

## 📚 Mais Detalhes

Veja `BACKEND_AUTOMATICO.md` para:
- Todos os comandos disponíveis
- Personalização avançada
- Troubleshooting completo

---

**Tempo economizado:** 🚀 100% automático!
