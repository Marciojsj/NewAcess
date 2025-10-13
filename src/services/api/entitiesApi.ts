import apiClient from './apiClient';

export interface Entity {
  id: string;
  name: string;
  type: 'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER';
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntityData {
  name: string;
  type: 'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER';
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}

export interface UpdateEntityData {
  name?: string;
  type?: 'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER';
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

export const entitiesApi = {
  /**
   * Listar todas as entidades
   */
  async getAll(search?: string): Promise<Entity[]> {
    const params = search ? { search } : {};
    const response = await apiClient.get('/entities', { params });
    return response.data.data;
  },

  /**
   * Buscar entidade por ID
   */
  async getById(id: string): Promise<Entity> {
    const response = await apiClient.get(`/entities/${id}`);
    return response.data.data;
  },

  /**
   * Criar nova entidade
   */
  async create(data: CreateEntityData): Promise<Entity> {
    console.log('📤 [FRONTEND] Enviando dados para criar entidade:', data);
    const response = await apiClient.post('/entities', data);
    console.log('📥 [FRONTEND] Resposta do backend:', response.data);
    return response.data.data;
  },

  /**
   * Atualizar entidade
   */
  async update(id: string, data: UpdateEntityData): Promise<Entity> {
    const response = await apiClient.put(`/entities/${id}`, data);
    return response.data.data;
  },

  /**
   * Deletar entidade
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/entities/${id}`);
  },
};

export default entitiesApi;
