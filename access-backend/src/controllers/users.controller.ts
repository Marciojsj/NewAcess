import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { usersService } from '../services/users.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const usersController = {
  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const { entityId, role } = req.query;
      const users = await usersService.getAllUsers(
        entityId as string | undefined,
        role as any
      );
      return successResponse(res, users, 'Usuários obtidos com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getUserById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);
      return successResponse(res, user, 'Usuário obtido com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createUser(req: AuthRequest, res: Response) {
    try {
      console.log('📝 [CONTROLLER] Criando usuário. Body:', req.body);
      const user = await usersService.createUser(req.body);
      console.log('✅ [CONTROLLER] Usuário criado:', user);
      console.log('➡️ [CONTROLLER] Enviando resposta com successResponse');
      return successResponse(res, user, 'Usuário criado com sucesso', 201);
    } catch (error: any) {
      console.error('❌ [CONTROLLER] Erro ao criar usuário:', error);
      return errorResponse(res, error.message, 400);
    }
  },

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersService.updateUser(id, req.body);
      return successResponse(res, user, 'Usuário atualizado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);
      return successResponse(res, null, 'Usuário deletado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
