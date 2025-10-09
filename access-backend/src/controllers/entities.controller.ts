import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { entitiesService } from '../services/entities.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const entitiesController = {
  async getAllEntities(req: AuthRequest, res: Response) {
    try {
      const { search } = req.query;
      const entities = await entitiesService.getAllEntities(search as string | undefined);
      return successResponse(res, 'Entidades obtidas com sucesso', entities);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getEntityById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const entity = await entitiesService.getEntityById(id);
      return successResponse(res, 'Entidade obtida com sucesso', entity);
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createEntity(req: AuthRequest, res: Response) {
    try {
      const entity = await entitiesService.createEntity(req.body);
      return successResponse(res, 'Entidade criada com sucesso', entity, 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async updateEntity(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const entity = await entitiesService.updateEntity(id, req.body);
      return successResponse(res, 'Entidade atualizada com sucesso', entity);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteEntity(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await entitiesService.deleteEntity(id);
      return successResponse(res, 'Entidade deletada com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
