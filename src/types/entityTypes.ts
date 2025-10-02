// 

export interface Entity {
  id: string; // UUID v7
  cpf: string; // VAR(14)
  rg: string; // VAR(9)
  type: string; // VAR(255)
  active: boolean; // BOOLEAN
  createdAt: string;
  updatedAt: string;
}

export type EntityFormData = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;

export interface EntitiesState {
  entities: Entity[];
  loading: boolean;
  error: string | null;
}