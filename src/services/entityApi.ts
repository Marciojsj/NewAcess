import { Entity, EntityFormData } from '../types/entityTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTITIES_STORAGE_KEY = '@entities';

// Gerar UUID v7 simplificado
const generateId = (): string => {
  const timestamp = Date.now().toString(16);
  const random = Math.random().toString(16).substring(2);
  return `${timestamp}-${random}`.substring(0, 36);
};

export const entityApi = {
  // Buscar todas as entidades
  getAllEntities: async (): Promise<Entity[]> => {
    try {
      const stored = await AsyncStorage.getItem(ENTITIES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      throw new Error('Erro ao buscar entidades');
    }
  },

  // Criar nova entidade
  createEntity: async (entityData: EntityFormData): Promise<Entity> => {
    try {
      const entities = await entityApi.getAllEntities();
      const newEntity: Entity = {
        ...entityData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedEntities = [...entities, newEntity];
      await AsyncStorage.setItem(ENTITIES_STORAGE_KEY, JSON.stringify(updatedEntities));
      
      return newEntity;
    } catch (error) {
      throw new Error('Erro ao criar entidade');
    }
  },

  // Atualizar entidade
  updateEntity: async (id: string, entityData: EntityFormData): Promise<Entity> => {
    try {
      const entities = await entityApi.getAllEntities();
      const updatedEntities = entities.map(entity =>
        entity.id === id
          ? { ...entity, ...entityData, updatedAt: new Date().toISOString() }
          : entity
      );

      await AsyncStorage.setItem(ENTITIES_STORAGE_KEY, JSON.stringify(updatedEntities));
      
      const updatedEntity = updatedEntities.find(entity => entity.id === id);
      if (!updatedEntity) throw new Error('Entidade não encontrada');
      
      return updatedEntity;
    } catch (error) {
      throw new Error('Erro ao atualizar entidade');
    }
  },

  // Deletar entidade
  deleteEntity: async (id: string): Promise<void> => {
    try {
      const entities = await entityApi.getAllEntities();
      const filteredEntities = entities.filter(entity => entity.id !== id);
      await AsyncStorage.setItem(ENTITIES_STORAGE_KEY, JSON.stringify(filteredEntities));
    } catch (error) {
      throw new Error('Erro ao deletar entidade');
    }
  },
};