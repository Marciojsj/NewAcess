import { useState, useCallback } from 'react';
import { Entity, EntityFormData, EntitiesState } from '../types/entityTypes';
import { entityApi } from '../services/entityApi';

export const useEntities = () => {
  const [state, setState] = useState<EntitiesState>({
    entities: [],
    loading: false,
    error: null,
  });

  // Carregar entidades
  const loadEntities = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const entities = await entityApi.getAllEntities();
      setState(prev => ({ ...prev, entities, loading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      }));
    }
  }, []);

  // Criar entidade
  const createEntity = useCallback(async (entityData: EntityFormData): Promise<Entity> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const newEntity = await entityApi.createEntity(entityData);
      setState(prev => ({ 
        ...prev, 
        entities: [...prev.entities, newEntity],
        loading: false 
      }));
      return newEntity;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar entidade';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  // Atualizar entidade
  const updateEntity = useCallback(async (id: string, entityData: EntityFormData): Promise<Entity> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const updatedEntity = await entityApi.updateEntity(id, entityData);
      setState(prev => ({
        ...prev,
        entities: prev.entities.map(entity =>
          entity.id === id ? updatedEntity : entity
        ),
        loading: false
      }));
      return updatedEntity;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar entidade';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  // Deletar entidade
  const deleteEntity = useCallback(async (id: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await entityApi.deleteEntity(id);
      setState(prev => ({
        ...prev,
        entities: prev.entities.filter(entity => entity.id !== id),
        loading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar entidade';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, []);

  return {
    entities: state.entities,
    loading: state.loading,
    error: state.error,
    loadEntities,
    createEntity,
    updateEntity,
    deleteEntity,
  };
};