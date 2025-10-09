import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { errorResponse } from '../utils/response.util';

export const permit = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return errorResponse(res, 'Usuário não autenticado', 401);
    }
    
    if (!allowedRoles.includes(userRole)) {
      return errorResponse(res, 'Você não tem permissão para acessar este recurso', 403);
    }
    
    next();
  };
};

export const belongsToEntity = (entityIdParam: string = 'entityId') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    const userEntityId = req.user?.entityId;
    const requestedEntityId = req.params[entityIdParam] || req.body.entityId;
    
    if (userRole === 'SUPERADMIN') {
      return next();
    }
    
    if (userEntityId !== requestedEntityId) {
      return errorResponse(res, 'Você não tem acesso a esta entidade', 403);
    }
    
    next();
  };
};
