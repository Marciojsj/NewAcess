/**
 * Hook customizado para operações CRUD com feedback automático
 * Gerencia create, update, delete com mensagens e atualização de lista
 */

import { useState, useCallback } from 'react';
import { crudFeedback, crudLogger } from '../utils/feedback';

interface UseCrudOperationsOptions<T> {
  entityName: string;
  loadData: () => Promise<void>;
  createFn?: (data: any) => Promise<T>;
  updateFn?: (id: string | number, data: any) => Promise<T>;
  deleteFn?: (id: string | number) => Promise<void>;
}

export function useCrudOperations<T>({
  entityName,
  loadData,
  createFn,
  updateFn,
  deleteFn
}: UseCrudOperationsOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  /**
   * Criar novo registro
   */
  const handleCreate = useCallback(async (data: any): Promise<boolean> => {
    if (!createFn) {
      console.error('[CRUD] createFn não fornecido');
      return false;
    }

    try {
      setIsLoading(true);
      crudLogger.attempt('CREATE', entityName, data);
      
      const result = await createFn(data);
      
      crudLogger.success('CREATE', entityName, result);
      crudFeedback.createSuccess(entityName);
      
      // Fecha o modal
      setModalVisible(false);
      setEditingItem(null);
      
      // Atualiza a lista
      await loadData();
      
      return true;
    } catch (error) {
      crudLogger.error('CREATE', entityName, error);
      crudFeedback.createError(entityName, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [createFn, entityName, loadData]);

  /**
   * Atualizar registro existente
   */
  const handleUpdate = useCallback(async (id: string | number, data: any): Promise<boolean> => {
    if (!updateFn) {
      console.error('[CRUD] updateFn não fornecido');
      return false;
    }

    try {
      setIsLoading(true);
      crudLogger.attempt('UPDATE', entityName, { id, data });
      
      const result = await updateFn(id, data);
      
      crudLogger.success('UPDATE', entityName, result);
      crudFeedback.updateSuccess(entityName);
      
      // Fecha o modal
      setModalVisible(false);
      setEditingItem(null);
      
      // Atualiza a lista
      await loadData();
      
      return true;
    } catch (error) {
      crudLogger.error('UPDATE', entityName, error);
      crudFeedback.updateError(entityName, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [updateFn, entityName, loadData]);

  /**
   * Excluir registro
   */
  const handleDelete = useCallback(async (id: string | number): Promise<boolean> => {
    if (!deleteFn) {
      console.error('[CRUD] deleteFn não fornecido');
      return false;
    }

    try {
      setIsLoading(true);
      crudLogger.attempt('DELETE', entityName, { id });
      
      await deleteFn(id);
      
      crudLogger.success('DELETE', entityName);
      crudFeedback.deleteSuccess(entityName);
      
      // Atualiza a lista
      await loadData();
      
      return true;
    } catch (error) {
      crudLogger.error('DELETE', entityName, error);
      crudFeedback.deleteError(entityName, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [deleteFn, entityName, loadData]);

  /**
   * Abrir modal para criar
   */
  const openCreateModal = useCallback(() => {
    console.log(`[CRUD] Abrindo modal para criar ${entityName}`);
    setEditingItem(null);
    setModalVisible(true);
  }, [entityName]);

  /**
   * Abrir modal para editar
   */
  const openEditModal = useCallback((item: T) => {
    console.log(`[CRUD] Abrindo modal para editar ${entityName}`, item);
    setEditingItem(item);
    setModalVisible(true);
  }, [entityName]);

  /**
   * Fechar modal
   */
  const closeModal = useCallback(() => {
    console.log(`[CRUD] Fechando modal de ${entityName}`);
    setModalVisible(false);
    setEditingItem(null);
  }, [entityName]);

  /**
   * Handler unificado de save (create ou update)
   */
  const handleSave = useCallback(async (data: any, id?: string | number): Promise<boolean> => {
    if (id || editingItem) {
      const itemId = id || (editingItem as any)?.id;
      return await handleUpdate(itemId, data);
    } else {
      return await handleCreate(data);
    }
  }, [editingItem, handleCreate, handleUpdate]);

  return {
    isLoading,
    modalVisible,
    editingItem,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSave,
    openCreateModal,
    openEditModal,
    closeModal,
    setModalVisible,
    setEditingItem
  };
}
