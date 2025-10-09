import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { authService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const authController = {
  async register(req: AuthRequest, res: Response) {
    try {
      const user = await authService.register(req.body);
      return successResponse(res, 'Usuário registrado com sucesso', user, 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return successResponse(res, 'Login realizado com sucesso', result);
    } catch (error: any) {
      return errorResponse(res, error.message, 401);
    }
  },

  async refreshToken(req: AuthRequest, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      return successResponse(res, 'Token atualizado com sucesso', result);
    } catch (error: any) {
      return errorResponse(res, error.message, 401);
    }
  },

  async logout(req: AuthRequest, res: Response) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      return successResponse(res, 'Logout realizado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const user = await authService.getMe(userId);
      return successResponse(res, 'Dados do usuário obtidos com sucesso', user);
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },
};
