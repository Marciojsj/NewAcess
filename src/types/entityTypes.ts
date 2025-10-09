/**
 * Tipos para Entidades
 * Atualizados para corresponder ao schema do backend
 */

export interface Entity {
  id: string;
  name: string;
  cnpj?: string;
  type: 'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER';
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

export interface EntityFormData {
  name: string;
  cnpj?: string;
  type: 'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER';
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}

export interface EntitiesState {
  entities: Entity[];
  loading: boolean;
  error: string | null;
}