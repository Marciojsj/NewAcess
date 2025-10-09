#!/bin/bash

##############################################################################
# Fix Mobile Connection - Script de Diagnóstico e Correção
##############################################################################

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

clear
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Diagnóstico de Conexão Mobile - Expo                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 1. Verificar Node/NPM
echo -e "${YELLOW}[1/7] Verificando Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js instalado: ${NODE_VERSION}${NC}"
else
    echo -e "${RED}✗ Node.js não encontrado!${NC}"
    exit 1
fi

# 2. Verificar NPM
echo -e "${YELLOW}[2/7] Verificando NPM...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ NPM instalado: ${NPM_VERSION}${NC}"
else
    echo -e "${RED}✗ NPM não encontrado!${NC}"
    exit 1
fi

# 3. Verificar Expo CLI
echo -e "${YELLOW}[3/7] Verificando Expo CLI...${NC}"
if command -v expo &> /dev/null; then
    EXPO_VERSION=$(expo --version 2>/dev/null || echo "instalado")
    echo -e "${GREEN}✓ Expo CLI instalado: ${EXPO_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠ Expo CLI não encontrado. Instalando...${NC}"
    npm install -g expo-cli
fi

# 4. Verificar portas em uso
echo -e "${YELLOW}[4/7] Verificando portas...${NC}"
if lsof -i :8081 &> /dev/null; then
    echo -e "${YELLOW}⚠ Porta 8081 em uso. Matando processo...${NC}"
    lsof -ti :8081 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✓ Porta 8081 liberada${NC}"
else
    echo -e "${GREEN}✓ Porta 8081 disponível${NC}"
fi

if lsof -i :8082 &> /dev/null; then
    echo -e "${YELLOW}⚠ Porta 8082 em uso. Matando processo...${NC}"
    lsof -ti :8082 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✓ Porta 8082 liberada${NC}"
else
    echo -e "${GREEN}✓ Porta 8082 disponível${NC}"
fi

# 5. Limpar cache
echo -e "${YELLOW}[5/7] Limpando cache...${NC}"
if [ -d ".expo" ]; then
    rm -rf .expo
    echo -e "${GREEN}✓ Cache .expo limpo${NC}"
fi

if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo -e "${GREEN}✓ Cache node_modules limpo${NC}"
fi

# 6. Verificar arquivo de configuração
echo -e "${YELLOW}[6/7] Verificando app.json...${NC}"
if grep -q "packagerOpts" app.json; then
    echo -e "${GREEN}✓ Configuração de túnel encontrada${NC}"
else
    echo -e "${YELLOW}⚠ Configuração de túnel ausente. Corrigindo...${NC}"
    # Backup
    cp app.json app.json.backup
    echo -e "${GREEN}✓ Backup criado: app.json.backup${NC}"
fi

# 7. Verificar conexão internet
echo -e "${YELLOW}[7/7] Verificando conexão internet...${NC}"
if ping -c 1 google.com &> /dev/null; then
    echo -e "${GREEN}✓ Internet funcionando${NC}"
else
    echo -e "${RED}✗ Sem conexão com internet!${NC}"
    echo -e "${YELLOW}⚠ Túnel requer internet. Use LAN como alternativa.${NC}"
fi

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              Diagnóstico Concluído                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Mostrar resumo
echo -e "${GREEN}✅ Sistema pronto para iniciar!${NC}"
echo ""
echo -e "${BLUE}Comandos disponíveis:${NC}"
echo "  • npm start           → Inicia com túnel (recomendado)"
echo "  • npm run start:lan   → Inicia com LAN (mesma rede)"
echo "  • npm run start:local → Inicia localhost (só PC)"
echo "  • ./start.sh          → Menu interativo"
echo ""
echo -e "${YELLOW}Deseja iniciar agora? (s/n)${NC}"
read -r response

if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 Iniciando com túnel...${NC}"
    npm start
else
    echo ""
    echo -e "${BLUE}OK! Execute 'npm start' quando estiver pronto.${NC}"
fi
