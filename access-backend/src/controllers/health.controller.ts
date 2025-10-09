import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { successResponse, errorResponse } from '../utils/response.util';

const prisma = new PrismaClient();

export const healthController = {
  async checkHealth(req: Request, res: Response) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      
      return successResponse(res, 'Sistema operacional', {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error: any) {
      return errorResponse(res, 'Erro ao verificar saúde do sistema', 500, {
        status: 'unhealthy',
        database: 'disconnected',
      });
    }
  },
};
