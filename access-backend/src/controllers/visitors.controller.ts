import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { visitorsService } from '../services/visitors.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const visitorsController = {
  async getAllVisitors(req: AuthRequest, res: Response) {
    try {
      const { search } = req.query;
      const visitors = await visitorsService.getAllVisitors(search as string | undefined);
      return successResponse(res, visitors, 'Visitantes obtidos com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getVisitorById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const visitor = await visitorsService.getVisitorById(id);
      return successResponse(res, visitor, 'Visitante obtido com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createVisitor(req: AuthRequest, res: Response) {
    try {
      console.log('📝 [CONTROLLER] Criando visitante. Body:', req.body);
      const visitor = await visitorsService.createVisitor(req.body);
      console.log('✅ [CONTROLLER] Visitante criado:', visitor);
      return successResponse(res, visitor, 'Visitante criado com sucesso', 201);
    } catch (error: any) {
      console.error('❌ [CONTROLLER] Erro ao criar visitante:', error);
      return errorResponse(res, error.message, 400);
    }
  },

  async updateVisitor(req: AuthRequest, res: Response) {
    try {
      console.log('📝 [CONTROLLER] Atualizando visitante:', req.params.id);
      const { id } = req.params;
      const visitor = await visitorsService.updateVisitor(id, req.body);
      console.log('✅ [CONTROLLER] Visitante atualizado:', visitor);
      return successResponse(res, visitor, 'Visitante atualizado com sucesso');
    } catch (error: any) {
      console.error('❌ [CONTROLLER] Erro ao atualizar visitante:', error);
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteVisitor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await visitorsService.deleteVisitor(id);
      return successResponse(res, null, 'Visitante deletado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async regenerateQRCode(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const visitor = await visitorsService.regenerateQRCode(id);
      return successResponse(res, visitor, 'QR Code regenerado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
