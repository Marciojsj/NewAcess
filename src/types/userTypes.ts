/**
 * User Types
 * Tipos para gerenciamento de usuários
 */

export type UserRole = 'ADMIN' | 'MANAGER' | 'OPERATOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  entityId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Dados relacionados
  entity?: {
    id: string;
    name: string;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  entityId?: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const USER_ROLES: { value: UserRole; label: string; description: string }[] = [
  {
    value: 'ADMIN',
    label: 'Administrador',
    description: 'Acesso total ao sistema',
  },
  {
    value: 'MANAGER',
    label: 'Gerente',
    description: 'Gerencia entidade e usuários',
  },
  {
    value: 'OPERATOR',
    label: 'Operador',
    description: 'Registra entradas e saídas',
  },
];
