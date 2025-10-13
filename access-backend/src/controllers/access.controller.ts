import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { accessService } from '../services/access.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const accessController = {
  async registerEntry(req: AuthRequest, res: Response) {
    try {
      const operatorId = req.user!.userId;
      const accessLog = await accessService.registerEntry({
        ...req.body,
        operatorId,
      });
      return successResponse(res, accessLog, 201, 'Entrada registrada com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async registerExit(req: AuthRequest, res: Response) {
    try {
      const operatorId = req.user!.userId;
      const { accessLogId, notes } = req.body;
      const accessLog = await accessService.registerExit(accessLogId, operatorId, notes);
      return successResponse(res, accessLog, 201, 'Saída registrada com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getAccessLogs(req: AuthRequest, res: Response) {
    try {
      const { entityId, visitorId, type, startDate, endDate } = req.query;
      
      const filters: any = {};
      if (entityId) filters.entityId = entityId as string;
      if (visitorId) filters.visitorId = visitorId as string;
      if (type) filters.type = type;
      if (startDate) filters.startDate = new Date(startDate as string);
      if (endDate) filters.endDate = new Date(endDate as string);

      const logs = await accessService.getAccessLogs(filters);
      return successResponse(res, logs, 'Registros de acesso obtidos com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getAccessReport(req: AuthRequest, res: Response) {
    try {
      const { entityId, startDate, endDate } = req.query;
      
      if (!entityId || !startDate || !endDate) {
        return errorResponse(res, 'entityId, startDate e endDate são obrigatórios', 400);
      }

      const report = await accessService.getAccessReport(
        entityId as string,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      return successResponse(res, report, 'Relatório obtido com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
