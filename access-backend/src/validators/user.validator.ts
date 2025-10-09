import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  role: z.enum(['SUPERADMIN', 'ADMIN', 'OPERATOR', 'USER', 'VISITOR']),
  entityId: z.string().uuid().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  role: z.enum(['SUPERADMIN', 'ADMIN', 'OPERATOR', 'USER', 'VISITOR']).optional(),
  isActive: z.boolean().optional(),
});
