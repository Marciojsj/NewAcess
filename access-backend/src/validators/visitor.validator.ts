import { z } from 'zod';

export const createVisitorSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  email: z.string().email('Email inválido').optional(),
  company: z.string().optional(),
  photoUrl: z.string().url('URL inválida').optional(),
});

export const updateVisitorSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  email: z.string().email('Email inválido').optional(),
  company: z.string().optional(),
  photoUrl: z.string().url('URL inválida').optional(),
});

export const registerEntrySchema = z.object({
  visitorId: z.string().uuid('ID do visitante inválido'),
  entityId: z.string().uuid('ID da entidade inválido'),
  purpose: z.string().min(3, 'Motivo deve ter no mínimo 3 caracteres').optional(),
  notes: z.string().optional(),
  temperature: z.number().min(30).max(45).optional(),
  photoUrl: z.string().url('URL inválida').optional(),
});

export const registerExitSchema = z.object({
  accessLogId: z.string().uuid('ID do registro de acesso inválido'),
  notes: z.string().optional(),
});
