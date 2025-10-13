#!/bin/bash

##############################################################################
# Script de Limpeza e Organização de Screens
# Remove duplicatas e mantém apenas estrutura correta
##############################################################################

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Limpeza e Organização de Screens                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

BASE_DIR="/home/marcio-junior/Documentos/Projeto/accesControl/src/screens"

# Função para limpar uma screen
clean_screen() {
    local screen_name=$1
    local screen_dir="${BASE_DIR}/${screen_name}"
    
    if [ ! -d "$screen_dir" ]; then
        echo -e "${YELLOW}⚠ Screen não encontrada: ${screen_name}${NC}"
        return
    fi
    
    echo -e "${YELLOW}🔧 Limpando: ${screen_name}${NC}"
    
    # 1. Remover arquivos .data.ts (dados mock não necessários)
    if [ -f "${screen_dir}/${screen_name}.data.ts" ]; then
        rm "${screen_dir}/${screen_name}.data.ts"
        echo -e "${GREEN}  ✓ Removido: ${screen_name}.data.ts (mock data)${NC}"
    fi
    
    # 2. Remover arquivos service duplicados
    if [ -f "${screen_dir}/${screen_name}Service.ts" ] && [ -f "${screen_dir}/${screen_name}.service.ts" ]; then
        # Manter o .service.ts (padrão correto)
        rm "${screen_dir}/${screen_name}Service.ts"
        echo -e "${GREEN}  ✓ Removido: ${screen_name}Service.ts (duplicata)${NC}"
    fi
    
    # 3. Limpar estilos duplicados FORA da pasta styles/
    if [ -d "${screen_dir}/styles" ]; then
        # Procurar arquivos .styles.* na raiz da screen
        find "$screen_dir" -maxdepth 1 -name "*.styles.*" -type f -delete 2>/dev/null && \
            echo -e "${GREEN}  ✓ Removidos estilos duplicados na raiz${NC}"
    fi
    
    # 4. Dentro da pasta styles/, manter apenas:
    #    - index.ts
    #    - [nome]Screen.styles.web.ts
    #    - [nome]Screen.styles.native.ts
    if [ -d "${screen_dir}/styles" ]; then
        cd "${screen_dir}/styles"
        
        # Remover arquivos .styles.ts genéricos (sem .web ou .native)
        find . -maxdepth 1 -name "*.styles.ts" ! -name "*.styles.web.ts" ! -name "*.styles.native.ts" -type f -delete 2>/dev/null && \
            echo -e "${GREEN}  ✓ Removido .styles.ts genérico${NC}"
        
        # Remover duplicatas com capitalização errada
        # Manter PascalCase (ScreenName.styles.web.ts)
        # Remover camelCase (screenName.styles.web.ts)
        
        # Verificar se existe versão PascalCase
        pascal_web="${screen_name^}Screen.styles.web.ts"
        camel_web="${screen_name}Screen.styles.web.ts"
        
        if [ -f "$pascal_web" ] && [ -f "$camel_web" ] && [ "$pascal_web" != "$camel_web" ]; then
            rm "$camel_web"
            echo -e "${GREEN}  ✓ Removido ${camel_web} (mantido PascalCase)${NC}"
        fi
        
        pascal_native="${screen_name^}Screen.styles.native.ts"
        camel_native="${screen_name}Screen.styles.native.ts"
        
        if [ -f "$pascal_native" ] && [ -f "$camel_native" ] && [ "$pascal_native" != "$camel_native" ]; then
            rm "$camel_native"
            echo -e "${GREEN}  ✓ Removido ${camel_native} (mantido PascalCase)${NC}"
        fi
        
        cd - > /dev/null
    fi
    
    echo -e "${GREEN}✅ ${screen_name} limpa!${NC}"
    echo ""
}

# Lista de todas as screens
declare -a SCREENS=(
    "home"
    "login"
    "registrarEntrada"
    "registrarSaida"
    "visitantes"
    "relatorios"
    "alertas"
    "entidade"
    "users"
    "access"
    "configuracoes"
    "permissoes"
)

echo -e "${BLUE}Iniciando limpeza de ${#SCREENS[@]} screens...${NC}"
echo ""

for screen in "${SCREENS[@]}"; do
    clean_screen "$screen"
done

# Resumo final
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              LIMPEZA CONCLUÍDA                             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar estrutura final
echo -e "${YELLOW}📋 Estrutura esperada para cada screen:${NC}"
echo ""
echo "  src/screens/[nome]/"
echo "  ├── [Nome]Screen.tsx           ← Componente principal"
echo "  ├── [nome].types.ts            ← Tipos TypeScript"
echo "  ├── [nome].service.ts          ← Service (API calls)"
echo "  └── styles/"
echo "      ├── index.ts               ← Selector de estilos"
echo "      ├── [Nome]Screen.styles.web.ts     ← Estilos WEB"
echo "      └── [Nome]Screen.styles.native.ts  ← Estilos MOBILE"
echo ""
echo -e "${GREEN}✨ Arquivos .data.ts (mock) removidos (uso de Prisma)${NC}"
echo -e "${GREEN}✨ Duplicatas de estilos removidas${NC}"
echo -e "${GREEN}✨ Estrutura padronizada${NC}"
echo ""
echo -e "${YELLOW}Execute './scripts/validate-screen-structure.sh' para validar${NC}"
