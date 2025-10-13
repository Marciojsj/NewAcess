import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { entitiesService } from '../services/entities.service';
import { successResponse, errorResponse } from '../utils/response.util';

export const entitiesController = {
  async getAllEntities(req: AuthRequest, res: Response) {
    try {
      const { search } = req.query;
      const entities = await entitiesService.getAllEntities(search as string | undefined);
      return successResponse(res, entities, 'Entidades obtidas com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async getEntityById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const entity = await entitiesService.getEntityById(id);
      return successResponse(res, entity, 'Entidade obtida com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  },

  async createEntity(req: AuthRequest, res: Response) {
    try {
      console.log('📝 [CREATE ENTITY] Dados recebidos:', JSON.stringify(req.body, null, 2));
      const entity = await entitiesService.createEntity(req.body);
      console.log('✅ [CREATE ENTITY] Entidade criada com sucesso:', {
        id: entity.id,
        name: entity.name,
        type: entity.type
      });
      return successResponse(res, entity, 'Entidade criada com sucesso', 201);
    } catch (error: any) {
      console.error('❌ [CREATE ENTITY] Erro ao criar entidade:', error.message);
      console.error('❌ [CREATE ENTITY] Stack:', error.stack);
      return errorResponse(res, error.message, 400);
    }
  },

  async updateEntity(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const entity = await entitiesService.updateEntity(id, req.body);
      return successResponse(res, entity, 'Entidade atualizada com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },

  async deleteEntity(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await entitiesService.deleteEntity(id);
      return successResponse(res, null, 'Entidade deletada com sucesso');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  },
};
