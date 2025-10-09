/**
 * Access Control Types
 * Tipos para controle de entrada e saída de visitantes
 */

export interface AccessLog {
  id: string;
  visitorId: string;
  entityId: string;
  type: 'ENTRY' | 'EXIT';
  timestamp: string;
  notes?: string;
  authorizedBy?: string;
  createdAt: string;
  updatedAt: string;
  // Dados relacionados
  visitor?: {
    id: string;
    name: string;
    cpf?: string;
    company?: string;
  };
}

export interface EntryData {
  visitorId: string;
  notes?: string;
}

export interface ExitData {
  visitorId: string;
  notes?: string;
}

export interface AccessState {
  logs: AccessLog[];
  loading: boolean;
  error: string | null;
}

export interface AccessFilters {
  startDate?: string;
  endDate?: string;
  type?: 'ENTRY' | 'EXIT';
  visitorId?: string;
}
