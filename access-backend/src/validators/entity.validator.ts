import { z } from 'zod';

export const createEntitySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.enum(['SCHOOL', 'CONDOMINIUM', 'COMPANY', 'EVENT', 'OTHER']),
  cnpj: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email('Email inválido').optional().nullable(),
});

export const updateEntitySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  type: z.enum(['SCHOOL', 'CONDOMINIUM', 'COMPANY', 'EVENT', 'OTHER']).optional(),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ inválido').optional(),
  address: z.string().min(5, 'Endereço inválido').optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  isActive: z.boolean().optional(),
});
