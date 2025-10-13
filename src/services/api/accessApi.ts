import apiClient from './apiClient';

export interface AccessLog {
  id: string;
  type: 'ENTRY' | 'EXIT';
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'COMPLETED';
  timestamp: string;
  visitorId?: string;
  entityId: string;
  operatorId?: string;
  purpose?: string;
  notes?: string;
  temperature?: number;
  photoUrl?: string;
  visitor?: any;
  entity?: any;
  operator?: any;
}

export interface RegisterEntryData {
  visitorId: string;
  entityId: string;
  purpose?: string;
  notes?: string;
  temperature?: number;
  photoUrl?: string;
}

export interface RegisterExitData {
  accessLogId: string;
  notes?: string;
}

export interface AccessFilters {
  entityId?: string;
  visitorId?: string;
  type?: 'ENTRY' | 'EXIT';
  startDate?: string;
  endDate?: string;
}

export interface AccessReport {
  totalEntries: number;
  totalExits: number;
  uniqueVisitors: number;
  logs: AccessLog[];
}

export const accessApi = {
  /**
   * Registrar entrada
   */
  async registerEntry(data: RegisterEntryData): Promise<AccessLog> {
    const response = await apiClient.post('/access/entry', data);
    return response.data.data;
  },

  /**
   * Registrar saída
   */
  async registerExit(data: RegisterExitData): Promise<AccessLog> {
    const response = await apiClient.post('/access/exit', data);
    return response.data.data;
  },

  /**
   * Listar logs de acesso
   */
  async getLogs(filters?: AccessFilters): Promise<AccessLog[]> {
    const response = await apiClient.get('/access/logs', { params: filters });
    return response.data.data;
  },

  /**
   * Gerar relatório de acessos
   */
  async getReport(
    entityId: string,
    startDate: string,
    endDate: string
  ): Promise<AccessReport> {
    const response = await apiClient.get('/access/report', {
      params: { entityId, startDate, endDate },
    });
    return response.data.data;
  },
};

export default accessApi;
