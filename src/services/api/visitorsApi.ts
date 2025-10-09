import apiClient from './apiClient';

export interface Visitor {
  id: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  company?: string;
  entityId: string;
  qrCode?: string;
  qrCodeExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitorData {
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
  company?: string;
}

export interface UpdateVisitorData {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
}

export const visitorsApi = {
  /**
   * Listar todos os visitantes
   */
  async getAll(search?: string): Promise<Visitor[]> {
    const params = search ? { search } : {};
    const response = await apiClient.get('/visitors', { params });
    return response.data.message;
  },

  /**
   * Buscar visitante por ID
   */
  async getById(id: string): Promise<Visitor> {
    const response = await apiClient.get(`/visitors/${id}`);
    return response.data.message;
  },

  /**
   * Criar novo visitante
   */
  async create(data: CreateVisitorData): Promise<Visitor> {
    const response = await apiClient.post('/visitors', data);
    return response.data.message;
  },

  /**
   * Atualizar visitante
   */
  async update(id: string, data: UpdateVisitorData): Promise<Visitor> {
    const response = await apiClient.put(`/visitors/${id}`, data);
    return response.data.message;
  },

  /**
   * Deletar visitante
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/visitors/${id}`);
  },

  /**
   * Regenerar QR Code do visitante
   */
  async regenerateQRCode(id: string): Promise<Visitor> {
    const response = await apiClient.post(`/visitors/${id}/regenerate-qrcode`);
    return response.data.message;
  },
};

export default visitorsApi;
