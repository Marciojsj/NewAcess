import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.util';
import { qrcodeService } from './qrcode.service';

const prisma = new PrismaClient();

export const visitorsService = {
  async getAllVisitors(search?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const visitors = await prisma.visitor.findMany({
      where,
      include: {
        _count: {
          select: {
            accessLogs: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return visitors;
  },

  async getVisitorById(id: string) {
    const visitor = await prisma.visitor.findUnique({
      where: { id },
      include: {
        accessLogs: {
          take: 10,
          orderBy: { timestamp: 'desc' },
          include: {
            entity: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!visitor) {
      throw new Error('Visitante não encontrado');
    }

    return visitor;
  },

  async createVisitor(data: {
    name: string;
    cpf: string;
    phone?: string;
    email?: string;
    company?: string;
    photoUrl?: string;
  }) {
    const { qrCode, qrCodeExpiry } = await qrcodeService.generateVisitorQRCode(data.cpf);

    const visitor = await prisma.visitor.create({
      data: {
        ...data,
        qrCode,
        qrCodeExpiry,
      },
    });

    logger.info(`Novo visitante criado: ${visitor.name}`);
    return visitor;
  },

  async updateVisitor(id: string, data: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    photoUrl?: string;
  }) {
    const visitor = await prisma.visitor.update({
      where: { id },
      data,
    });

    logger.info(`Visitante atualizado: ${visitor.name}`);
    return visitor;
  },

  async deleteVisitor(id: string) {
    await prisma.visitor.delete({
      where: { id },
    });
    logger.info(`Visitante deletado: ${id}`);
  },

  async regenerateQRCode(id: string) {
    const visitor = await prisma.visitor.findUnique({
      where: { id },
    });

    if (!visitor) {
      throw new Error('Visitante não encontrado');
    }

    const { qrCode, qrCodeExpiry } = await qrcodeService.generateVisitorQRCode(visitor.cpf);

    const updatedVisitor = await prisma.visitor.update({
      where: { id },
      data: {
        qrCode,
        qrCodeExpiry,
      },
    });

    logger.info(`QR Code regenerado para visitante: ${updatedVisitor.name}`);
    return updatedVisitor;
  },
};
