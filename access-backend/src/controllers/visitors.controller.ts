import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { visitorsService } from '../services/visitors.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const visitorsController = {
  async getAllVisitors(req: AuthRequest, res: Response) {
    try {
      const { search } = req.query;
      const visitors = await visitorsService.getAllVisitors(search as string | undefined);
      return successResponse(res, 'Visitantes obtidos com sucesso', visitors);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getVisitorById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const visitor = await visitorsService.getVisitorById(id);
      return successResponse(res, 'Visitante obtido com sucesso', visitor);
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createVisitor(req: AuthRequest, res: Response) {
    try {
      const visitor = await visitorsService.createVisitor(req.body);
      return successResponse(res, 'Visitante criado com sucesso', visitor, 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async updateVisitor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const visitor = await visitorsService.updateVisitor(id, req.body);
      return successResponse(res, 'Visitante atualizado com sucesso', visitor);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteVisitor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await visitorsService.deleteVisitor(id);
      return successResponse(res, 'Visitante deletado com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async regenerateQRCode(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const visitor = await visitorsService.regenerateQRCode(id);
      return successResponse(res, 'QR Code regenerado com sucesso', visitor);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
