#!/bin/bash

echo "🚀 SETUP COMPLETO DO BACKEND - Access Control System"
echo "======================================================"
echo ""

cd ~/Documentos/Projeto/accesControl/access-backend

echo "📦 1/4 - Gerando Prisma Client..."
npm run prisma:generate
if [ $? -ne 0 ]; then
    echo "❌ Erro ao gerar Prisma Client"
    exit 1
fi
echo "✅ Prisma Client gerado"
echo ""

echo "🗄️  2/4 - Sincronizando schema com banco de dados..."
npx prisma db push --accept-data-loss
if [ $? -ne 0 ]; then
    echo "❌ Erro ao sincronizar schema"
    exit 1
fi
echo "✅ Schema sincronizado"
echo ""

echo "🌱 3/4 - Populando banco com dados iniciais..."
npm run prisma:seed
if [ $? -ne 0 ]; then
    echo "❌ Erro ao popular banco"
    exit 1
fi
echo "✅ Banco populado"
echo ""

echo "🎉 SETUP CONCLUÍDO COM SUCESSO!"
echo ""
echo "📝 Credenciais de acesso:"
echo "   SUPERADMIN: admin@exemplo.com / admin123"
echo "   ADMIN: admin.entidade@exemplo.com / admin123"
echo "   OPERATOR: operador@exemplo.com / operator123"
echo ""
echo "🚀 4/4 - Iniciando servidor..."
echo "   Execute: npm run dev"
echo ""
echo "📡 Endpoints disponíveis:"
echo "   Health: http://localhost:3000/api/health"
echo "   Login: http://localhost:3000/api/auth/login"
echo "   Docs: http://localhost:3000/"
echo ""
