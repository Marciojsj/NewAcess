#!/bin/bash

echo "🧪 TESTANDO API - Access Control Backend"
echo "========================================"
echo ""

echo "1️⃣ Health Check:"
curl -s http://localhost:3000/api/health | jq .
echo -e "\n"

echo "2️⃣ Root Endpoint:"
curl -s http://localhost:3000/ | jq .
echo -e "\n"

echo "3️⃣ Login (SUPERADMIN):"
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exemplo.com","password":"admin123"}' | jq -r '.data.accessToken')

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
  echo "✅ Login bem-sucedido!"
  echo "Token: ${TOKEN:0:50}..."
  echo -e "\n"
  
  echo "4️⃣ Buscar dados do usuário autenticado:"
  curl -s http://localhost:3000/api/auth/me \
    -H "Authorization: Bearer $TOKEN" | jq .
  echo -e "\n"
  
  echo "5️⃣ Listar entidades:"
  curl -s http://localhost:3000/api/entities \
    -H "Authorization: Bearer $TOKEN" | jq .
  echo -e "\n"
  
  echo "6️⃣ Listar visitantes:"
  curl -s http://localhost:3000/api/visitors \
    -H "Authorization: Bearer $TOKEN" | jq '.data[] | {name, cpf, company}'
  echo -e "\n"
else
  echo "❌ Erro no login"
fi

echo "========================================"
echo "✅ Testes concluídos!"
