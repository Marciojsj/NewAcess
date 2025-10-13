#!/bin/bash
# scripts/start-all.sh
# Script para iniciar Backend + Frontend com verificações

set -e  # Parar em caso de erro

echo "🚀 Iniciando sistema completo (Backend + Frontend)..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Verificar se o diretório do backend existe
if [ ! -d "access-backend" ]; then
    echo -e "${RED}❌ Erro: Diretório 'access-backend' não encontrado!${NC}"
    echo ""
    echo "   O backend deve estar em: ./access-backend"
    echo ""
    exit 1
fi

# Verificar se o backend tem package.json
if [ ! -f "access-backend/package.json" ]; then
    echo -e "${RED}❌ Erro: Backend não possui package.json!${NC}"
    exit 1
fi

# Verificar se o backend tem dependências instaladas
if [ ! -d "access-backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Backend sem dependências instaladas.${NC}"
    echo -e "${BLUE}📦 Instalando dependências do backend...${NC}"
    cd access-backend && npm install && cd ..
    echo -e "${GREEN}✅ Dependências do backend instaladas!${NC}"
    echo ""
fi

# Limpar portas em uso (se necessário)
if lsof -i:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Porta 3000 em uso. Liberando...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

if lsof -i:8081 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Porta 8081 em uso. Liberando...${NC}"
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

echo -e "${GREEN}✅ Todas as verificações passaram!${NC}"
echo ""
echo -e "${BLUE}🔵 Iniciando BACKEND na porta 3000...${NC}"
echo -e "${MAGENTA}🟣 Iniciando FRONTEND na porta 8081...${NC}"
echo ""
echo "───────────────────────────────────────────────────────"
echo ""

# Iniciar com concurrently
npm run start:with-backend

echo ""
echo "───────────────────────────────────────────────────────"
