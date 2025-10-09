import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  role: z.enum(['SUPERADMIN', 'ADMIN', 'OPERATOR', 'USER', 'VISITOR']).optional(),
  entityId: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
});
