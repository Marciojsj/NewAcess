/**
 * Tipos para Visitantes
 */

export interface Visitor {
  id: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  company?: string;
  photoUrl?: string;
  qrCode?: string;
  qrCodeExpiry?: string;
  entityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorFormData {
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
  company?: string;
}

export interface VisitorsState {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
}
