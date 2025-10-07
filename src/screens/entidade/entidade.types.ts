// src/screens/entidade/entidade.types.ts

export interface Entidade {
  id: string;
  nome: string;
  cnpj: string;
  tipo: 'Física' | 'Jurídica';
  endereco?: string;
  cidade?: string;
  estado?: string;
  email: string;
  telefone?: string;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
  updatedAt: string;
}

export type FormMode = 'create' | 'edit' | 'view' | null;
export type ViewMode = 'list' | 'grid';
