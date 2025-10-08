# 🚀 Como Iniciar o Projeto

## ✅ Método Recomendado (SEMPRE use este)

```bash
npm start
```

Este comando **sempre** inicia o Expo com **tunnel mode**, garantindo que você consiga conectar do celular sem problemas de rede.

## 📱 Conectar no Celular

1. Abra o **Expo Go** no seu celular
2. Escaneie o **QR Code** que aparece no terminal
3. Aguarde o app carregar

## 🔧 Outros Comandos Disponíveis

```bash
# Iniciar com cache limpo
npm run dev

# Iniciar sem tunnel (modo local - pode dar erro de conexão)
npm run start:local

# Rodar testes
npm test

# Ver cobertura de testes
npm run test:coverage
```

## ⚠️ IMPORTANTE

**SEMPRE use `npm start`** para evitar o erro "could not connect to server"

O modo tunnel garante que o servidor do Expo seja acessível de qualquer rede, sem precisar estar na mesma WiFi.

## 🐛 Se der erro

1. Pare todos os processos: `pkill -f "expo start"`
2. Limpe o cache: `npm run dev`
3. Escaneie o QR code novamente

## 📝 Logs em Tempo Real

Quando você interagir com o app no celular, os logs aparecerão automaticamente no terminal onde você rodou `npm start`.

- 🔵 = Carregamento de dados
- 🟢 = Abrir formulário
- 🔴 = Excluir
- ✏️ = Editar
- 👆 = Tocar em card
