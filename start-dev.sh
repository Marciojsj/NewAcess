#!/bin/bash

# Script para iniciar backend e frontend juntos
# Uso: bash start-dev.sh

echo "======================================"
echo "🚀 Iniciando Sistema de Controle de Acesso"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "${RED}Encerrando serviços...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Captura Ctrl+C para limpar processos
trap cleanup SIGINT SIGTERM

# Verifica se o diretório do backend existe
if [ ! -d "access-backend" ]; then
    echo "${RED}❌ Erro: Diretório 'access-backend' não encontrado${NC}"
    echo "Por favor, execute este script no diretório raiz do projeto"
    exit 1
fi

# Inicia o backend
echo "${BLUE}📦 Iniciando Backend (Node.js + Express + Prisma)...${NC}"
cd access-backend

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "${BLUE}📥 Instalando dependências do backend...${NC}"
    npm install
fi

# Verifica se o .env existe
if [ ! -f ".env" ]; then
    echo "${RED}❌ Erro: Arquivo .env não encontrado no backend${NC}"
    echo "Por favor, crie o arquivo .env com as configurações do banco de dados"
    exit 1
fi

# Inicia o servidor backend em background
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

echo "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo "   Logs: tail -f backend.log"
echo "   API: http://localhost:3000"
echo ""

# Aguarda 3 segundos para o backend iniciar
echo "⏳ Aguardando backend inicializar..."
sleep 3

# Volta para o diretório raiz
cd ..

# Verifica se o backend está rodando
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "${RED}❌ Erro: Backend falhou ao iniciar${NC}"
    echo "Verifique os logs em backend.log"
    exit 1
fi

# Inicia o frontend
echo "${BLUE}📱 Iniciando Frontend (React Native + Expo)...${NC}"

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "${BLUE}📥 Instalando dependências do frontend...${NC}"
    npm install
fi

echo "${GREEN}✅ Frontend iniciando...${NC}"
echo "   Use 'a' para abrir no Android"
echo "   Use 'i' para abrir no iOS"
echo "   Use 'w' para abrir no navegador"
echo ""
echo "======================================"
echo "💡 Pressione Ctrl+C para encerrar ambos os serviços"
echo "======================================"
echo ""

# Inicia o frontend (não em background para ver os logs)
npx expo start

# Quando o Expo for encerrado, mata o backend também
cleanup
