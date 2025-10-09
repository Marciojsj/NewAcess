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
      return successResponse(res, 'Usuários obtidos com sucesso', users);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getUserById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);
      return successResponse(res, 'Usuário obtido com sucesso', user);
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createUser(req: AuthRequest, res: Response) {
    try {
      const user = await usersService.createUser(req.body);
      return successResponse(res, 'Usuário criado com sucesso', user, 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersService.updateUser(id, req.body);
      return successResponse(res, 'Usuário atualizado com sucesso', user);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);
      return successResponse(res, 'Usuário deletado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
