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
  entityId: string;
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
    return response.data.data;
  },

  /**
   * Buscar visitante por ID
   */
  async getById(id: string): Promise<Visitor> {
    const response = await apiClient.get(`/visitors/${id}`);
    return response.data.data;
  },

  /**
   * Criar novo visitante
   */
  async create(data: CreateVisitorData): Promise<Visitor> {
    console.log('📤 [visitorsApi] Enviando requisição de criação');
    console.log('📤 [visitorsApi] Dados:', data);
    
    const response = await apiClient.post('/visitors', data);
    
    console.log('📥 [visitorsApi] Resposta recebida');
    console.log('📥 [visitorsApi] Status:', response.status);
    console.log('📥 [visitorsApi] Response.data:', response.data);
    
    return response.data.data;
  },

  /**
   * Atualizar visitante
   */
  async update(id: string, data: UpdateVisitorData): Promise<Visitor> {
    console.log('📤 [visitorsApi] Atualizando visitante:', id);
    console.log('📤 [visitorsApi] Dados:', data);
    
    const response = await apiClient.put(`/visitors/${id}`, data);
    
    console.log('📥 [visitorsApi] Resposta recebida');
    console.log('📥 [visitorsApi] Response.data:', response.data);
    
    return response.data.data;
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
    return response.data.data;
  },
};

export default visitorsApi;
