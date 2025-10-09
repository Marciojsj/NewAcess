#!/bin/bash

##############################################################################
# Script de Inicialização do Expo com Túnel Automático
# Resolve problemas de conexão entre celular e servidor de desenvolvimento
##############################################################################

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          Access Control - Inicialização                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar se é primeira execução
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠ Primeira execução detectada!${NC}"
    echo -e "${BLUE}📝 Criando arquivo .env.local...${NC}"
    
    cat > .env.local << 'EOF'
# Configurações de Desenvolvimento
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
REACT_NATIVE_PACKAGER_HOSTNAME=127.0.0.1
EXPO_USE_TUNNEL=true
EOF
    
    echo -e "${GREEN}✓ Arquivo .env.local criado!${NC}"
    echo ""
fi

# Mostrar opções de conexão
echo -e "${BLUE}🌐 Escolha o modo de conexão:${NC}"
echo ""
echo "  1) 🚇 TÚNEL (Recomendado) - Funciona em qualquer rede"
echo "  2) 📡 LAN - Mesmo WiFi (mais rápido)"
echo "  3) 💻 LOCALHOST - Apenas neste computador"
echo "  4) 🌐 WEB - Abrir no navegador"
echo ""
read -p "Escolha uma opção (1-4) [padrão: 1]: " choice
choice=${choice:-1}

echo ""

case $choice in
    1)
        echo -e "${GREEN}🚇 Iniciando com TÚNEL...${NC}"
        echo -e "${YELLOW}ℹ️  Isso pode levar alguns segundos na primeira vez${NC}"
        echo ""
        npx expo start --tunnel --clear
        ;;
    2)
        echo -e "${GREEN}📡 Iniciando com LAN...${NC}"
        echo -e "${YELLOW}ℹ️  Certifique-se de estar na mesma rede WiFi${NC}"
        echo ""
        npx expo start --lan --clear
        ;;
    3)
        echo -e "${GREEN}💻 Iniciando em LOCALHOST...${NC}"
        echo ""
        npx expo start --localhost --clear
        ;;
    4)
        echo -e "${GREEN}🌐 Abrindo no navegador...${NC}"
        echo ""
        npx expo start --web
        ;;
    *)
        echo -e "${RED}❌ Opção inválida! Usando túnel como padrão.${NC}"
        echo ""
        npx expo start --tunnel --clear
        ;;
esac
