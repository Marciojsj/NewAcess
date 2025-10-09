#!/bin/bash

##############################################################################
# Script de Migração de Estilos Existentes
# Extrai estilos dos componentes e separa em Web e Native
##############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Migração Automática de Estilos Existentes               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

BASE_DIR="/home/marcio-junior/Documentos/Projeto/accesControl/src/screens"

# Função para extrair estilos de um arquivo
extract_styles() {
    local file=$1
    local screen_name=$2
    
    echo -e "${YELLOW}🔍 Analisando: ${file}${NC}"
    
    # Verificar se arquivo tem StyleSheet.create
    if grep -q "StyleSheet.create" "$file"; then
        echo -e "${GREEN}  ✓ Estilos encontrados!${NC}"
        
        # Extrair bloco de estilos
        awk '/const styles = StyleSheet.create\({/,/}\);/' "$file" > "${BASE_DIR}/${screen_name}/styles/_extracted.tmp"
        
        if [ -s "${BASE_DIR}/${screen_name}/styles/_extracted.tmp" ]; then
            echo -e "${GREEN}  ✓ Estilos extraídos para _extracted.tmp${NC}"
            echo -e "${YELLOW}  ⚠ AÇÃO MANUAL: Revisar e distribuir entre .web e .native${NC}"
        fi
    else
        echo -e "${YELLOW}  ⚠ Nenhum estilo encontrado inline${NC}"
    fi
    echo ""
}

# Função para atualizar imports no componente
update_component_imports() {
    local file=$1
    local screen_name=$2
    
    echo -e "${YELLOW}🔧 Atualizando imports em: ${file}${NC}"
    
    # Backup
    cp "$file" "${file}.backup"
    
    # Remover StyleSheet import se existir apenas para estilos locais
    # Adicionar import do novo sistema
    if grep -q "StyleSheet" "$file"; then
        # Verificar se já tem o novo import
        if ! grep -q "from './styles'" "$file"; then
            # Adicionar novo import após as outras importações
            sed -i "/^import.*from 'react-native';/a import { styles } from './styles';" "$file"
            echo -e "${GREEN}  ✓ Import adicionado${NC}"
        else
            echo -e "${BLUE}  ℹ Import já existe${NC}"
        fi
    fi
    echo ""
}

# Processar screens principais
declare -a MAIN_SCREENS=(
    "home/HomeScreen.tsx"
    "login/LoginScreen.tsx"
    "registrarEntrada/RegistrarEntradaScreen.tsx"
    "registrarSaida/RegistrarSaidaScreen.tsx"
    "visitantes/VisitantesScreen.tsx"
    "visitantes/VisitorDetailsScreen.tsx"
    "relatorios/RelatoriosScreen.tsx"
    "alertas/AlertasScreen.tsx"
    "entidade/EntidadeScreen.tsx"
    "users/UsersScreen.tsx"
    "access/AccessLogsScreen.tsx"
    "configuracoes/SettingsScreen.tsx"
    "configuracoes/ProfileSettingsScreen.tsx"
    "configuracoes/SystemSettingsScreen.tsx"
    "configuracoes/SecuritySettingsScreen.tsx"
    "configuracoes/NotificationSettingsScreen.tsx"
    "configuracoes/AppSettingsScreen.tsx"
    "permissoes/PermissionsScreen.tsx"
)

echo -e "${BLUE}Iniciando migração de estilos...${NC}"
echo ""

for screen_path in "${MAIN_SCREENS[@]}"; do
    full_path="${BASE_DIR}/${screen_path}"
    screen_dir=$(dirname "$screen_path")
    screen_name=$(basename "$screen_dir")
    
    if [ -f "$full_path" ]; then
        # Extrair estilos
        extract_styles "$full_path" "$screen_name"
        
        # Atualizar imports (comentado por segurança - descomente se quiser automático)
        # update_component_imports "$full_path" "$screen_name"
    else
        echo -e "${RED}✗ Arquivo não encontrado: ${full_path}${NC}"
        echo ""
    fi
done

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              ✅ MIGRAÇÃO CONCLUÍDA!                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos passos MANUAIS:${NC}"
echo -e "   1. Revisar arquivos _extracted.tmp em cada screen/styles/"
echo -e "   2. Copiar estilos WEB para .styles.web.ts"
echo -e "   3. Adaptar estilos MOBILE para .styles.native.ts"
echo -e "   4. Deletar blocos de estilos dos componentes .tsx"
echo -e "   5. Trocar 'const styles = StyleSheet.create' por 'import { styles } from ./styles'"
echo -e "   6. Testar em Web e Mobile"
echo ""
echo -e "${BLUE}💡 Dicas de adaptação:${NC}"
echo -e "   • WEB: maxWidth, padding maior, fontSize maior"
echo -e "   • MOBILE: flex, padding menor, fontSize menor"
echo -e "   • WEB: grid com wrap, MOBILE: lista vertical"
echo -e "   • WEB: hover effects, MOBILE: touch feedback"
echo ""
