#!/bin/bash

# Script para gerar estrutura completa do backend
# Access Control System - Backend Generator

echo "🚀 Gerando estrutura completa do backend..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Instalando dependências...${NC}"
npm install

echo -e "${GREEN}✅ Dependências instaladas!${NC}"

echo -e "${BLUE}📁 Estrutura de diretórios criada!${NC}"

echo -e "${BLUE}⚙️  Configurando package.json scripts...${NC}"
npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only --ignore-watch node_modules src/server.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/server.js"
npm pkg set scripts.prisma:generate="prisma generate"
npm pkg set scripts.prisma:migrate="prisma migrate dev"
npm pkg set scripts.prisma:studio="prisma studio"
npm pkg set scripts.prisma:seed="ts-node prisma/seed.ts"
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage"

echo -e "${GREEN}✅ Scripts configurados!${NC}"

echo -e "${BLUE}📝 Próximos passos:${NC}"
echo "1. Configure o arquivo .env com suas credenciais do Supabase"
echo "2. Execute: npm run prisma:migrate"
echo "3. Execute: npm run prisma:seed (criar SuperAdmin)"
echo "4. Execute: npm run dev (iniciar servidor)"

echo -e "${GREEN}✨ Backend estruturado com sucesso!${NC}"
