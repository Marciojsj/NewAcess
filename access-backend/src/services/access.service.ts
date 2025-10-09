import { PrismaClient } from '@prisma/client';

export enum AccessType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}
import logger from '../utils/logger.util';

const prisma = new PrismaClient();

export const accessService = {
  async registerEntry(data: {
    visitorId: string;
    entityId: string;
    operatorId: string;
    purpose?: string;
    notes?: string;
    temperature?: number;
    photoUrl?: string;
  }) {
    const accessLog = await prisma.accessLog.create({
      data: {
        type: AccessType.ENTRY,
        status: 'APPROVED',
        ...data,
      },
      include: {
        visitor: true,
        entity: true,
        operator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    logger.info(`Entrada registrada: Visitante ${accessLog.visitor.name} na entidade ${accessLog.entity.name}`);
    return accessLog;
  },

  async registerExit(accessLogId: string, operatorId: string, notes?: string) {
    const entryLog = await prisma.accessLog.findUnique({
      where: { id: accessLogId },
    });

    if (!entryLog) {
      throw new Error('Registro de entrada não encontrado');
    }

    if (entryLog.type !== AccessType.ENTRY) {
      throw new Error('Registro não é uma entrada');
    }

    const exitLog = await prisma.accessLog.create({
      data: {
        type: AccessType.EXIT,
        status: 'APPROVED',
        visitorId: entryLog.visitorId,
        entityId: entryLog.entityId,
        operatorId,
        notes,
      },
      include: {
        visitor: true,
        entity: true,
      },
    });

    logger.info(`Saída registrada: Visitante ${exitLog.visitor.name}`);
    return exitLog;
  },

  async getAccessLogs(filters: {
    entityId?: string;
    visitorId?: string;
    type?: AccessType;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (filters.entityId) where.entityId = filters.entityId;
    if (filters.visitorId) where.visitorId = filters.visitorId;
    if (filters.type) where.type = filters.type;
    if (filters.startDate || filters.endDate) {
      where.timestamp = {};
      if (filters.startDate) where.timestamp.gte = filters.startDate;
      if (filters.endDate) where.timestamp.lte = filters.endDate;
    }

    const logs = await prisma.accessLog.findMany({
      where,
      include: {
        visitor: true,
        entity: {
          select: {
            id: true,
            name: true,
          },
        },
        operator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    return logs;
  },

  async getAccessReport(entityId: string, startDate: Date, endDate: Date) {
    const logs = await prisma.accessLog.findMany({
      where: {
        entityId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        visitor: true,
      },
    });

    const totalEntries = logs.filter((log: any) => log.type === AccessType.ENTRY).length;
    const totalExits = logs.filter((log: any) => log.type === AccessType.EXIT).length;
    const uniqueVisitors = new Set(logs.map((log: any) => log.visitorId)).size;

    return {
      totalEntries,
      totalExits,
      uniqueVisitors,
      logs,
    };
  },
};
