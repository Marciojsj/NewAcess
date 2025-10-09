#!/bin/bash

##############################################################################
# Script de Validação de Estrutura de Screens
# Verifica se todas as screens seguem o padrão correto
##############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║         Validação de Estrutura de Screens                ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

BASE_DIR="/home/marcio-junior/Documentos/Projeto/accesControl/src/screens"

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

total_checks=0
passed_checks=0
failed_checks=0

# Função para verificar estrutura de uma screen
validate_screen() {
    local screen_name=$1
    local screen_dir="${BASE_DIR}/${screen_name}"
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📁 Screen: ${screen_name}${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    local screen_passed=0
    local screen_failed=0
    
    # 1. Verificar se diretório existe
    if [ -d "$screen_dir" ]; then
        echo -e "${GREEN}✓${NC} Diretório existe"
        ((screen_passed++))
    else
        echo -e "${RED}✗${NC} Diretório não encontrado"
        ((screen_failed++))
        return
    fi
    
    # 2. Verificar diretório styles/
    if [ -d "${screen_dir}/styles" ]; then
        echo -e "${GREEN}✓${NC} Diretório styles/ existe"
        ((screen_passed++))
    else
        echo -e "${RED}✗${NC} Diretório styles/ não encontrado"
        ((screen_failed++))
    fi
    
    # 3. Verificar arquivo .types.ts
    types_file=$(find "$screen_dir" -maxdepth 1 -name "*.types.ts" | head -1)
    if [ -n "$types_file" ]; then
        echo -e "${GREEN}✓${NC} Arquivo types encontrado: $(basename "$types_file")"
        ((screen_passed++))
    else
        echo -e "${YELLOW}⚠${NC} Arquivo .types.ts não encontrado (opcional)"
    fi
    
    # 4. Verificar arquivo .service.ts
    service_file=$(find "$screen_dir" -maxdepth 1 -name "*.service.ts" -o -name "*Service.ts" | head -1)
    if [ -n "$service_file" ]; then
        echo -e "${GREEN}✓${NC} Arquivo service encontrado: $(basename "$service_file")"
        ((screen_passed++))
    else
        echo -e "${YELLOW}⚠${NC} Arquivo .service.ts não encontrado (opcional)"
    fi
    
    # 5. Verificar estilos WEB
    if [ -f "${screen_dir}/styles/"*".styles.web.ts" ] || [ -f "${screen_dir}/styles/"*"Screen.styles.web.ts" ]; then
        echo -e "${GREEN}✓${NC} Estilos WEB encontrados"
        ((screen_passed++))
    else
        echo -e "${RED}✗${NC} Estilos WEB não encontrados (.styles.web.ts)"
        ((screen_failed++))
    fi
    
    # 6. Verificar estilos NATIVE
    if [ -f "${screen_dir}/styles/"*".styles.native.ts" ] || [ -f "${screen_dir}/styles/"*"Screen.styles.native.ts" ]; then
        echo -e "${GREEN}✓${NC} Estilos NATIVE encontrados"
        ((screen_passed++))
    else
        echo -e "${RED}✗${NC} Estilos NATIVE não encontrados (.styles.native.ts)"
        ((screen_failed++))
    fi
    
    # 7. Verificar styles/index.ts
    if [ -f "${screen_dir}/styles/index.ts" ]; then
        echo -e "${GREEN}✓${NC} Arquivo styles/index.ts existe"
        ((screen_passed++))
        
        # Verificar se contém Platform.OS
        if grep -q "Platform.OS" "${screen_dir}/styles/index.ts"; then
            echo -e "${GREEN}✓${NC} index.ts usa Platform.OS para seleção"
            ((screen_passed++))
        else
            echo -e "${YELLOW}⚠${NC} index.ts pode não estar usando Platform.OS"
        fi
    else
        echo -e "${RED}✗${NC} Arquivo styles/index.ts não encontrado"
        ((screen_failed++))
    fi
    
    # 8. Verificar componente principal
    component_file=$(find "$screen_dir" -maxdepth 1 -name "*Screen.tsx" | head -1)
    if [ -n "$component_file" ]; then
        echo -e "${GREEN}✓${NC} Componente principal encontrado: $(basename "$component_file")"
        ((screen_passed++))
        
        # Verificar se usa import de styles
        if grep -q "from './styles'" "$component_file" || grep -q 'from "./styles"' "$component_file"; then
            echo -e "${GREEN}✓${NC} Componente importa estilos de ./styles"
            ((screen_passed++))
        else
            echo -e "${YELLOW}⚠${NC} Componente pode não estar usando import de ./styles"
        fi
    else
        echo -e "${RED}✗${NC} Componente principal (*Screen.tsx) não encontrado"
        ((screen_failed++))
    fi
    
    # Resumo da screen
    echo ""
    if [ $screen_failed -eq 0 ]; then
        echo -e "${GREEN}✅ Screen VÁLIDA: ${screen_passed} checks passaram${NC}"
    else
        echo -e "${RED}❌ Screen INVÁLIDA: ${screen_failed} checks falharam, ${screen_passed} passaram${NC}"
    fi
    echo ""
    
    passed_checks=$((passed_checks + screen_passed))
    failed_checks=$((failed_checks + screen_failed))
    total_checks=$((total_checks + screen_passed + screen_failed))
}

# Executar validação
echo -e "${BLUE}Iniciando validação de ${#SCREENS[@]} screens...${NC}"
echo ""

valid_screens=0
invalid_screens=0

for screen in "${SCREENS[@]}"; do
    if [ -d "${BASE_DIR}/${screen}" ]; then
        validate_screen "$screen"
        if [ $? -eq 0 ]; then
            ((valid_screens++))
        else
            ((invalid_screens++))
        fi
    else
        echo -e "${RED}✗ Screen não encontrada: ${screen}${NC}"
        echo ""
        ((invalid_screens++))
    fi
done

# Relatório final
echo -e "${PURPLE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║              RELATÓRIO FINAL DE VALIDAÇÃO                 ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📊 Estatísticas Gerais:${NC}"
echo -e "   • Total de checks: ${total_checks}"
echo -e "   • ${GREEN}Checks passados: ${passed_checks}${NC}"
echo -e "   • ${RED}Checks falhados: ${failed_checks}${NC}"
echo ""

percentage=$((passed_checks * 100 / total_checks))
echo -e "${BLUE}📈 Taxa de Conformidade: ${percentage}%${NC}"
echo ""

if [ $failed_checks -eq 0 ]; then
    echo -e "${GREEN}🎉 PARABÉNS! Todas as screens seguem o padrão!${NC}"
elif [ $percentage -ge 80 ]; then
    echo -e "${YELLOW}⚠ Boa! Mas algumas melhorias são necessárias.${NC}"
elif [ $percentage -ge 50 ]; then
    echo -e "${YELLOW}⚠ Progresso moderado. Continue refatorando!${NC}"
else
    echo -e "${RED}❌ Muitas screens precisam de refatoração.${NC}"
fi
echo ""

# Lista de ações recomendadas
if [ $failed_checks -gt 0 ]; then
    echo -e "${YELLOW}📝 Ações Recomendadas:${NC}"
    echo -e "   1. Execute: ./scripts/refactor-screens-structure.sh"
    echo -e "   2. Migre estilos existentes para .web e .native"
    echo -e "   3. Crie arquivos .types.ts para cada screen"
    echo -e "   4. Crie arquivos .service.ts com lógica de API"
    echo -e "   5. Execute novamente este script para validar"
    echo ""
fi

exit $failed_checks
