/**
 * useUsers Hook
 * Gerencia o estado e operações de usuários
 */

import { useState, useCallback, useEffect } from 'react';
import { User, UserFormData } from '../types/userTypes';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carregar usuários
   */
  const loadUsers = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers(search);
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar usuários');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Criar novo usuário
   */
  const createUser = useCallback(async (userData: UserFormData) => {
    try {
      console.log('🔷 [useUsers] Iniciando criação de usuário');
      console.log('📤 [useUsers] Dados enviados:', {
        ...userData,
        password: userData.password ? '***' : undefined
      });
      setLoading(true);
      setError(null);
      
      const newUser = await userService.createUser(userData);
      console.log('📥 [useUsers] Usuário retornado do serviço:', newUser);
      
      setUsers(prev => {
        console.log('🔄 [useUsers] Atualizando lista local. Antes:', prev.length);
        const updated = [...prev, newUser];
        console.log('🔄 [useUsers] Depois:', updated.length);
        return updated;
      });
      
      console.log('✅ [useUsers] Criação concluída com sucesso');
      return newUser;
    } catch (err: any) {
      console.error('❌ [useUsers] Erro na criação:', err);
      setError(err.message || 'Erro ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Atualizar usuário
   */
  const updateUser = useCallback(async (id: string, userData: Partial<UserFormData>) => {
    try {
      console.log('🔷 [useUsers] Iniciando atualização de usuário:', id);
      console.log('📤 [useUsers] Dados de atualização:', {
        ...userData,
        password: userData.password ? '***' : undefined
      });
      setLoading(true);
      setError(null);
      
      const updatedUser = await userService.updateUser(id, userData);
      console.log('📥 [useUsers] Usuário atualizado retornado:', updatedUser);
      
      setUsers(prev => {
        const updated = prev.map(u => u.id === id ? updatedUser : u);
        console.log('🔄 [useUsers] Lista atualizada');
        return updated;
      });
      
      console.log('✅ [useUsers] Atualização concluída com sucesso');
      return updatedUser;
    } catch (err: any) {
      console.error('❌ [useUsers] Erro na atualização:', err);
      setError(err.message || 'Erro ao atualizar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Deletar usuário
   */
  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Ativar/Desativar usuário
   */
  const toggleUserStatus = useCallback(async (id: string, isActive: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.toggleUserStatus(id, isActive);
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
      return updatedUser;
    } catch (err: any) {
      setError(err.message || 'Erro ao alterar status do usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Buscar usuários localmente
   */
  const searchUsers = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      return users;
    }

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }, [users]);

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    searchUsers,
  };
};
