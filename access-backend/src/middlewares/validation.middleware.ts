import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/response.util';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('🔍 [VALIDATION] Validando dados:', req.body);
      await schema.parseAsync(req.body);
      console.log('✅ [VALIDATION] Dados válidos');
      next();
    } catch (error: any) {
      console.error('❌ [VALIDATION] Erro de validação:', error.errors);
      return errorResponse(res, 'Dados inválidos', 400, error.errors);
    }
  };
};
