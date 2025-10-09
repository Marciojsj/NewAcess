import { PrismaClient } from '@prisma/client';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  // Add other roles as needed
}
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';
import logger from '../utils/logger.util';

const prisma = new PrismaClient();

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone?: string;
    role?: Role;
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
        role: data.role || Role.USER,
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

    logger.info(`Novo usuário registrado: ${user.email}`);
    return user;
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      entityId: user.entityId,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      entityId: user.entityId,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    logger.info(`Usuário logado: ${user.email}`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        entityId: user.entityId,
      },
      accessToken,
      refreshToken,
    };
  },

  async refreshAccessToken(refreshToken: string) {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new Error('Refresh token inválido ou expirado');
    }

    const accessToken = generateAccessToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
      entityId: storedToken.user.entityId,
    });

    return { accessToken };
  },

  async logout(refreshToken: string) {
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
    logger.info('Usuário deslogado');
  },

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
};
