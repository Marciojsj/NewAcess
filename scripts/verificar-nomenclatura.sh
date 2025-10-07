#!/bin/bash

# Script de Verificação de Nomenclatura
# Verifica se todos os arquivos seguem as convenções estabelecidas

echo "🔍 Verificando Nomenclatura do Projeto..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Verificar pastas com letra maiúscula em src/
echo "1. Verificando pastas com letra maiúscula indevida..."
UPPERCASE_DIRS=$(find src -type d -name "[A-Z]*" 2>/dev/null)
if [ -z "$UPPERCASE_DIRS" ]; then
    echo -e "${GREEN}✅ Nenhuma pasta com letra maiúscula encontrada${NC}"
else
    echo -e "${RED}❌ Pastas com letra maiúscula encontradas:${NC}"
    echo "$UPPERCASE_DIRS"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Verificar componentes React (.tsx) que não estão em PascalCase
echo "2. Verificando componentes React (.tsx)..."
NON_PASCAL_COMPONENTS=$(find src -name "*.tsx" -type f ! -path "*/node_modules/*" | while read file; do
    filename=$(basename "$file" .tsx)
    # Verifica se não começa com maiúscula ou tem caracteres especiais
    if ! [[ "$filename" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        echo "$file"
    fi
done)
if [ -z "$NON_PASCAL_COMPONENTS" ]; then
    echo -e "${GREEN}✅ Todos os componentes React seguem PascalCase${NC}"
else
    echo -e "${RED}❌ Componentes que não seguem PascalCase:${NC}"
    echo "$NON_PASCAL_COMPONENTS"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Verificar hooks que não começam com 'use'
echo "3. Verificando hooks customizados..."
NON_USE_HOOKS=$(find src/hooks -name "*.ts" -type f 2>/dev/null | while read file; do
    filename=$(basename "$file" .ts)
    if ! [[ "$filename" =~ ^use[A-Z] ]]; then
        echo "$file"
    fi
done)
if [ -z "$NON_USE_HOOKS" ]; then
    echo -e "${GREEN}✅ Todos os hooks começam com 'use'${NC}"
else
    echo -e "${RED}❌ Hooks que não começam com 'use':${NC}"
    echo "$NON_USE_HOOKS"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Verificar arquivos de estilo que não seguem o padrão
echo "4. Verificando arquivos de estilo (.styles.ts)..."
NON_STANDARD_STYLES=$(find src -name "*.styles.ts" -o -name "*.styles.web.ts" -o -name "*.styles.native.ts" 2>/dev/null | while read file; do
    filename=$(basename "$file")
    # Remove extensões
    name=$(echo "$filename" | sed 's/\.styles\..*//' | sed 's/\.styles$//')
    # Verifica se não está em PascalCase
    if ! [[ "$name" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        echo "$file"
    fi
done)
if [ -z "$NON_STANDARD_STYLES" ]; then
    echo -e "${GREEN}✅ Todos os arquivos de estilo seguem o padrão${NC}"
else
    echo -e "${RED}❌ Arquivos de estilo que não seguem o padrão:${NC}"
    echo "$NON_STANDARD_STYLES"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Verificar importações de pastas antigas (Home, Login com maiúscula)
echo "5. Verificando importações de pastas antigas..."
OLD_IMPORTS=$(grep -r "from.*screens/Home\|from.*screens/Login" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "// ")
if [ -z "$OLD_IMPORTS" ]; then
    echo -e "${GREEN}✅ Nenhuma importação de pasta antiga encontrada${NC}"
else
    echo -e "${YELLOW}⚠️  Importações de pastas antigas encontradas:${NC}"
    echo "$OLD_IMPORTS"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Verificar importações de arquivos antigos (entidadeScreen, registrarEntidade)
echo "6. Verificando importações de arquivos antigos..."
OLD_FILE_IMPORTS=$(grep -r "entidadeScreen\|registrarEntidade\.tsx\|registrarEntidade\.styles" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "// " | grep -v "NOMENCLATURA")
if [ -z "$OLD_FILE_IMPORTS" ]; then
    echo -e "${GREEN}✅ Nenhuma importação de arquivo antigo encontrada${NC}"
else
    echo -e "${YELLOW}⚠️  Importações de arquivos antigos encontradas:${NC}"
    echo "$OLD_FILE_IMPORTS"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✨ Verificação completa! Tudo está padronizado.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Foram encontrados $ERRORS problema(s) de nomenclatura.${NC}"
    echo "Por favor, corrija os problemas acima."
    exit 1
fi
