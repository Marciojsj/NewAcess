/**
 * User Service - Wrapper para a API de usuários
 * Usa dados REAIS do backend via API REST
 */

import { User, UserFormData, UserRole } from '../types/userTypes';
import { usersApi, User as APIUser, CreateUserData, UpdateUserData } from './api/usersApi';

// Mapear role da API para role do frontend
const mapApiRoleToUserRole = (apiRole: string): UserRole => {
  // API usa ADMIN, OPERATOR, etc. Frontend usa ADMIN, MANAGER, OPERATOR
  if (apiRole === 'ADMIN' || apiRole === 'SUPERADMIN') return 'ADMIN';
  if (apiRole === 'OPERATOR') return 'OPERATOR';
  return 'OPERATOR'; // Default
};

// Mapear role do frontend para role da API
const mapUserRoleToApiRole = (userRole: UserRole): 'ADMIN' | 'OPERATOR' => {
  if (userRole === 'ADMIN') return 'ADMIN';
  if (userRole === 'MANAGER') return 'ADMIN'; // Manager = Admin na API
  return 'OPERATOR';
};

export const userService = {
  /**
   * Buscar todos os usuários
   */
  getAllUsers: async (search?: string): Promise<User[]> => {
    try {
      const users = await usersApi.getAll(search);
      return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: mapApiRoleToUserRole(user.role),
        entityId: user.entityId,
        isActive: user.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entity: user.entity,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar usuários');
    }
  },

  /**
   * Buscar usuário por ID
   */
  getUserById: async (id: string): Promise<User> => {
    try {
      const user = await usersApi.getById(id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: mapApiRoleToUserRole(user.role),
        entityId: user.entityId,
        isActive: user.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entity: user.entity,
      };
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar usuário');
    }
  },

  /**
   * Criar novo usuário
   */
  createUser: async (userData: UserFormData): Promise<User> => {
    try {
      console.log('🔷 [userService] Iniciando criação de usuário');
      
      if (!userData.password) {
        throw new Error('Senha é obrigatória para criar usuário');
      }

      // Gerar CPF único baseado em timestamp + random
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const uniqueCpf = timestamp + random;
      
      console.log('🔑 [userService] CPF gerado:', uniqueCpf);

      const createData: CreateUserData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        cpf: uniqueCpf, // CPF único gerado
        role: mapUserRoleToApiRole(userData.role),
        entityId: userData.entityId,
      };

      console.log('📤 [userService] Enviando para API');
      const newUser = await usersApi.create(createData);
      console.log('✅ [userService] Usuário criado com sucesso:', newUser.id);
      
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: mapApiRoleToUserRole(newUser.role),
        entityId: newUser.entityId,
        isActive: newUser.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entity: newUser.entity,
      };
    } catch (error: any) {
      console.error('❌ [userService] Erro ao criar usuário:', error);
      console.error('Response data:', error.response?.data);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao criar usuário');
    }
  },
  /**
   * Atualizar usuário existente
   */
  updateUser: async (id: string, userData: Partial<UserFormData>): Promise<User> => {
    try {
      const updateData: UpdateUserData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role ? mapUserRoleToApiRole(userData.role) : undefined,
      };

      const updatedUser = await usersApi.update(id, updateData);
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: mapApiRoleToUserRole(updatedUser.role),
        entityId: updatedUser.entityId,
        isActive: updatedUser.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entity: updatedUser.entity,
      };
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error(error.response?.data?.error || 'Erro ao atualizar usuário');
    }
  },

  /**
   * Deletar usuário
   */
  deleteUser: async (id: string): Promise<void> => {
    try {
      await usersApi.delete(id);
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      throw new Error(error.response?.data?.error || 'Erro ao deletar usuário');
    }
  },

  /**
   * Ativar/Desativar usuário
   */
  toggleUserStatus: async (id: string, isActive: boolean): Promise<User> => {
    try {
      const updatedUser = await usersApi.update(id, { isActive });
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: mapApiRoleToUserRole(updatedUser.role),
        entityId: updatedUser.entityId,
        isActive: updatedUser.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entity: updatedUser.entity,
      };
    } catch (error: any) {
      console.error('Erro ao alterar status do usuário:', error);
      throw new Error(error.response?.data?.error || 'Erro ao alterar status do usuário');
    }
  },
};
