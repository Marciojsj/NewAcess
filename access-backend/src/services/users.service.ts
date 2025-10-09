import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../utils/password.util';
import logger from '../utils/logger.util';

const prisma = new PrismaClient();

export const usersService = {
  async getAllUsers(entityId?: string, role?: Role) {
    const where: any = {};
    if (entityId) where.entityId = entityId;
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        role: true,
        entityId: true,
        isActive: true,
        entity: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  },

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        role: true,
        entityId: true,
        isActive: true,
        entity: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  },

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone?: string;
    role: Role;
    entityId?: string;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        role: true,
        entityId: true,
        isActive: true,
      },
    });

    logger.info(`Novo usuário criado: ${user.email}`);
    return user;
  },

  async updateUser(id: string, data: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: Role;
    isActive?: boolean;
  }) {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        role: true,
        entityId: true,
        isActive: true,
      },
    });

    logger.info(`Usuário atualizado: ${user.email}`);
    return user;
  },

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    });
    logger.info(`Usuário deletado: ${id}`);
  },
};
