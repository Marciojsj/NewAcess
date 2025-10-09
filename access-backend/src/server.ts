import app from './app';
import { env } from './config/env';
import logger from './utils/logger.util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const startServer = async () => {
  try {
    // Testar conexão com o banco
    await prisma.$connect();
    logger.info('✅ Conectado ao banco de dados');

    // Iniciar servidor
    app.listen(env.PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${env.PORT}`);
      logger.info(`📝 Ambiente: ${env.NODE_ENV}`);
      logger.info(`🔗 API: ${env.BACKEND_URL}/api`);
    });
  } catch (error) {
    logger.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🛑 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🛑 Encerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
