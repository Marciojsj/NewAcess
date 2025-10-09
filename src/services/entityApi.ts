/**
 * Entity API - Serviço de comunicação com o backend
 * 
 * Este serviço agora usa dados REAIS do backend via API REST
 * Todas as operações são feitas diretamente no banco de dados Supabase
 */

import { Entity, EntityFormData } from '../types/entityTypes';
import { entitiesApi } from './api/entitiesApi';

export const entityApi = {
  /**
   * Buscar todas as entidades do banco de dados
   * @param search - Termo de busca opcional (filtra por nome ou CNPJ)
   * @returns Promise com array de entidades
   */
  getAllEntities: async (search?: string): Promise<Entity[]> => {
    try {
      const entities = await entitiesApi.getAll(search);
      
      // Mapeia os dados da API para o formato esperado pelo frontend
      return entities.map(entity => ({
        id: entity.id,
        name: entity.name,
        cnpj: entity.cnpj,
        type: entity.type,
        address: entity.address,
        city: entity.city,
        state: entity.state,
        zipCode: entity.zipCode,
        phone: entity.phone,
        email: entity.email,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar entidades:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar entidades');
    }
  },

  /**
   * Criar nova entidade no banco de dados
   * @param entityData - Dados da entidade a ser criada
   * @returns Promise com a entidade criada
   */
  createEntity: async (entityData: EntityFormData): Promise<Entity> => {
    try {
      const newEntity = await entitiesApi.create({
        name: entityData.name,
        cnpj: entityData.cnpj,
        type: entityData.type,
        address: entityData.address,
        city: entityData.city,
        state: entityData.state,
        zipCode: entityData.zipCode,
        phone: entityData.phone,
        email: entityData.email,
      });

      return {
        id: newEntity.id,
        name: newEntity.name,
        cnpj: newEntity.cnpj,
        type: newEntity.type,
        address: newEntity.address,
        city: newEntity.city,
        state: newEntity.state,
        zipCode: newEntity.zipCode,
        phone: newEntity.phone,
        email: newEntity.email,
        isActive: newEntity.isActive,
        createdAt: newEntity.createdAt,
        updatedAt: newEntity.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao criar entidade:', error);
      throw new Error(error.response?.data?.error || 'Erro ao criar entidade');
    }
  },

  /**
   * Atualizar entidade existente no banco de dados
   * @param id - ID da entidade a ser atualizada
   * @param entityData - Dados atualizados da entidade
   * @returns Promise com a entidade atualizada
   */
  updateEntity: async (id: string, entityData: EntityFormData): Promise<Entity> => {
    try {
      const updatedEntity = await entitiesApi.update(id, {
        name: entityData.name,
        cnpj: entityData.cnpj,
        type: entityData.type,
        address: entityData.address,
        city: entityData.city,
        state: entityData.state,
        zipCode: entityData.zipCode,
        phone: entityData.phone,
        email: entityData.email,
      });

      return {
        id: updatedEntity.id,
        name: updatedEntity.name,
        cnpj: updatedEntity.cnpj,
        type: updatedEntity.type,
        address: updatedEntity.address,
        city: updatedEntity.city,
        state: updatedEntity.state,
        zipCode: updatedEntity.zipCode,
        phone: updatedEntity.phone,
        email: updatedEntity.email,
        isActive: updatedEntity.isActive,
        createdAt: updatedEntity.createdAt,
        updatedAt: updatedEntity.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao atualizar entidade:', error);
      throw new Error(error.response?.data?.error || 'Erro ao atualizar entidade');
    }
  },

  /**
   * Deletar entidade do banco de dados
   * @param id - ID da entidade a ser deletada
   * @returns Promise vazia
   */
  deleteEntity: async (id: string): Promise<void> => {
    try {
      await entitiesApi.delete(id);
    } catch (error: any) {
      console.error('Erro ao deletar entidade:', error);
      throw new Error(error.response?.data?.error || 'Erro ao deletar entidade');
    }
  },
};