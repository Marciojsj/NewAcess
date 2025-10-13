#!/bin/bash
# scripts/test-crud.sh
# Script para executar testes CRUD com backend rodando

echo "🚀 Iniciando sistema de testes CRUD completos..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se o backend está rodando
echo "🔍 Verificando se o backend está rodando..."
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend está rodando!${NC}"
else
    echo -e "${YELLOW}⚠️  Backend não está rodando.${NC}"
    echo -e "${YELLOW}📝 Por favor, inicie o backend primeiro:${NC}"
    echo ""
    echo "   cd access-backend"
    echo "   npm run dev"
    echo ""
    exit 1
fi

echo ""
echo "🧪 Executando testes CRUD..."
echo ""

# Executar testes
npm run test:crud

# Capturar código de saída
EXIT_CODE=$?

echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Todos os testes passaram com sucesso!${NC}"
else
    echo -e "${RED}❌ Alguns testes falharam. Verifique os logs acima.${NC}"
fi

exit $EXIT_CODE
