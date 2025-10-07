#!/bin/bash
# Script para criar estrutura de estilos para todas as screens

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔄 Criando estrutura de estilos para todas as screens...${NC}\n"

# Função para criar index de estilos
create_style_index() {
    local screen_path=$1
    local screen_name=$2
    
    cat > "${screen_path}/styles/${screen_name}.styles.ts" << 'EOF'
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./${screen_name}.styles.web").default,
  default: require("./${screen_name}.styles.native").default,
});

export default styles;
EOF
    
    # Substituir placeholder
    sed -i "s/\${screen_name}/${screen_name}/g" "${screen_path}/styles/${screen_name}.styles.ts"
}

# Screens para processar
declare -A screens=(
    ["alertas"]="AlertasScreen"
    ["registrarEntrada"]="RegistrarEntradaScreen"
    ["registrarSaida"]="RegistrarSaidaScreen"
    ["registrarEntidade"]="RegistrarEntidadeScreen"
    ["relatorios"]="RelatoriosScreen"
    ["visitantes"]="VisitantesScreen"
)

BASE_PATH="src/screens"

for folder in "${!screens[@]}"; do
    screen_name="${screens[$folder]}"
    screen_path="${BASE_PATH}/${folder}"
    
    echo -e "${GREEN}✓ Processando ${screen_name}...${NC}"
    
    # Criar styles/ se não existir
    mkdir -p "${screen_path}/styles"
    
    # Criar index se estiver vazio ou não existir
    if [ ! -s "${screen_path}/styles/${screen_name}.styles.ts" ]; then
        create_style_index "$screen_path" "$screen_name"
        echo "  - Criado ${screen_name}.styles.ts (index)"
    fi
    
    # Verificar se .web.ts e .native.ts precisam ser preenchidos
    if [ ! -s "${screen_path}/styles/${screen_name}.styles.web.ts" ]; then
        echo "  ⚠️  ${screen_name}.styles.web.ts está vazio - precisa ser preenchido"
    fi
    
    if [ ! -s "${screen_path}/styles/${screen_name}.styles.native.ts" ]; then
        echo "  ⚠️  ${screen_name}.styles.native.ts está vazio - precisa ser preenchido"
    fi
    
    echo ""
done

echo -e "${BLUE}✅ Estrutura de estilos criada!${NC}"
echo -e "${BLUE}📝 Próximo passo: Preencher arquivos .web.ts e .native.ts vazios${NC}"
