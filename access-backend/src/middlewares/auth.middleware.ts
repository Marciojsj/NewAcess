import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { errorResponse } from '../utils/response.util';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    entityId?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Token não fornecido', 401);
    }
    
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    
    req.user = payload;
    next();
  } catch (error) {
    return errorResponse(res, 'Token inválido ou expirado', 401);
  }
};
