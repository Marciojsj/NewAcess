import { PrismaClient, EntityType } from '@prisma/client';
import logger from '../utils/logger.util';

const prisma = new PrismaClient();

export const entitiesService = {
  async getAllEntities(search?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cnpj: { contains: search } },
      ];
    }

    const entities = await prisma.entity.findMany({
      where,
      include: {
        _count: {
          select: {
            users: true,
            accessLogs: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return entities;
  },

  async getEntityById(id: string) {
    const entity = await prisma.entity.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            accessLogs: true,
          },
        },
      },
    });

    if (!entity) {
      throw new Error('Entidade não encontrada');
    }

    return entity;
  },

  async createEntity(data: {
    name: string;
    type: EntityType;
    cnpj?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
  }) {
    console.log('🔄 [SERVICE] Tentando criar entidade no banco:', data);
    
    try {
      const entity = await prisma.entity.create({
        data,
      });

      console.log('✅ [SERVICE] Entidade salva no banco com ID:', entity.id);
      console.log('✅ [SERVICE] Dados salvos:', {
        id: entity.id,
        name: entity.name,
        type: entity.type,
        isActive: entity.isActive
      });
      logger.info(`Nova entidade criada: ${entity.name}`);
      return entity;
    } catch (err: any) {
      console.error('❌ [SERVICE] ERRO CRÍTICO ao salvar no banco:', err);
      console.error('❌ [SERVICE] SQL Error:', err.message);
      console.error('❌ [SERVICE] Stack:', err.stack);
      throw err;
    }
  },

  async updateEntity(id: string, data: any) {
    const entity = await prisma.entity.update({
      where: { id },
      data,
    });

    logger.info(`Entidade atualizada: ${entity.name}`);
    return entity;
  },

  async deleteEntity(id: string) {
    await prisma.entity.delete({
      where: { id },
    });
    logger.info(`Entidade deletada: ${id}`);
  },
};
