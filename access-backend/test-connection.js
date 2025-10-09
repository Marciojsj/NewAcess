const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco...');
    await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Conexão bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
