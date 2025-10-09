import apiClient from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'OPERATOR' | 'USER' | 'VISITOR';
  entityId?: string;
  isActive: boolean;
  entity?: any;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'OPERATOR' | 'USER' | 'VISITOR';
  entityId?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: 'SUPERADMIN' | 'ADMIN' | 'OPERATOR' | 'USER' | 'VISITOR';
  isActive?: boolean;
}

export const usersApi = {
  /**
   * Listar todos os usuários
   */
  async getAll(entityId?: string, role?: string): Promise<User[]> {
    const params: any = {};
    if (entityId) params.entityId = entityId;
    if (role) params.role = role;

    const response = await apiClient.get('/users', { params });
    return response.data.message;
  },

  /**
   * Buscar usuário por ID
   */
  async getById(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data.message;
  },

  /**
   * Criar novo usuário
   */
  async create(data: CreateUserData): Promise<User> {
    const response = await apiClient.post('/users', data);
    return response.data.message;
  },

  /**
   * Atualizar usuário
   */
  async update(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data.message;
  },

  /**
   * Deletar usuário
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};

export default usersApi;
