import { z } from 'zod';

export const createEntitySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.enum(['CONDOMINIO', 'EMPRESA', 'ESCOLA', 'HOSPITAL', 'OUTRO']),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ inválido').optional(),
  address: z.string().min(5, 'Endereço inválido').optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
});

export const updateEntitySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  type: z.enum(['CONDOMINIO', 'EMPRESA', 'ESCOLA', 'HOSPITAL', 'OUTRO']).optional(),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ inválido').optional(),
  address: z.string().min(5, 'Endereço inválido').optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  isActive: z.boolean().optional(),
});
