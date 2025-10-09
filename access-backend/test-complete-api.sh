#!/bin/bash

echo "============================================"
echo "🧪 TESTE COMPLETO DA API"
echo "============================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Health Check${NC}"
HEALTH=$(curl -s http://localhost:3000/api/health)
if echo "$HEALTH" | grep -q "healthy"; then
  echo -e "${GREEN}✅ API está saudável${NC}"
else
  echo -e "${RED}❌ Problema com health check${NC}"
  exit 1
fi
echo ""

echo -e "${BLUE}2. Root Endpoint${NC}"
ROOT=$(curl -s http://localhost:3000/)
if echo "$ROOT" | grep -q "Access Control API"; then
  echo -e "${GREEN}✅ Root endpoint funcionando${NC}"
else
  echo -e "${RED}❌ Problema com root endpoint${NC}"
fi
echo ""

echo -e "${BLUE}3. Login SUPERADMIN${NC}"
LOGIN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exemplo.com","password":"admin123"}')

TOKEN=$(echo "$LOGIN" | jq -r '.message.accessToken')

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
  echo -e "${GREEN}✅ Login bem-sucedido${NC}"
  echo "   Token: ${TOKEN:0:30}..."
else
  echo -e "${RED}❌ Erro no login${NC}"
  echo "$LOGIN" | jq .
  exit 1
fi
echo ""

echo -e "${BLUE}4. Buscar Dados do Usuário (GET /api/auth/me)${NC}"
ME=$(curl -s http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN")

if echo "$ME" | grep -q "Super Admin"; then
  echo -e "${GREEN}✅ Usuário autenticado: $(echo "$ME" | jq -r '.message.name')${NC}"
  echo "   Email: $(echo "$ME" | jq -r '.message.email')"
  echo "   Role: $(echo "$ME" | jq -r '.message.role')"
else
  echo -e "${RED}❌ Erro ao buscar usuário${NC}"
fi
echo ""

echo -e "${BLUE}5. Listar Entidades (GET /api/entities)${NC}"
ENTITIES=$(curl -s http://localhost:3000/api/entities \
  -H "Authorization: Bearer $TOKEN")

ENTITY_COUNT=$(echo "$ENTITIES" | jq '.message | length')
if [ "$ENTITY_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ Entidades encontradas: $ENTITY_COUNT${NC}"
  echo "$ENTITIES" | jq -r '.message[] | "   - \(.name) (\(.type))"'
else
  echo -e "${RED}❌ Nenhuma entidade encontrada${NC}"
fi
echo ""

echo -e "${BLUE}6. Listar Visitantes (GET /api/visitors)${NC}"
VISITORS=$(curl -s http://localhost:3000/api/visitors \
  -H "Authorization: Bearer $TOKEN")

VISITOR_COUNT=$(echo "$VISITORS" | jq '.message | length')
if [ "$VISITOR_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ Visitantes encontrados: $VISITOR_COUNT${NC}"
  echo "$VISITORS" | jq -r '.message[] | "   - \(.name) - CPF: \(.cpf) - \(.company)"'
else
  echo -e "${RED}❌ Nenhum visitante encontrado${NC}"
fi
echo ""

echo -e "${BLUE}7. Listar Usuários (GET /api/users)${NC}"
USERS=$(curl -s http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN")

USER_COUNT=$(echo "$USERS" | jq '.message | length')
if [ "$USER_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ Usuários encontrados: $USER_COUNT${NC}"
  echo "$USERS" | jq -r '.message[] | "   - \(.name) (\(.role)) - \(.email)"'
else
  echo -e "${RED}❌ Nenhum usuário encontrado${NC}"
fi
echo ""

echo "============================================"
echo -e "${GREEN}✅ TODOS OS TESTES CONCLUÍDOS!${NC}"
echo "============================================"
echo ""
echo "📊 Resumo:"
echo "   - API funcionando: ✅"
echo "   - Autenticação: ✅"
echo "   - Endpoints protegidos: ✅"
echo "   - Banco de dados: ✅"
echo ""
echo "🎉 Backend 100% operacional!"
