/**
 * Service Layer - Entidades
 * Conectado ao backend real (Prisma + Supabase)
 */

import { Entidade } from './entidade.types';
import entitiesApi, { Entity, CreateEntityData, UpdateEntityData } from '../../services/api/entitiesApi';

const mapBackendToFrontend = (entity: Entity): Entidade => ({
  id: entity.id,
  nome: entity.name,
  cnpj: entity.cnpj || '',
  tipo: entity.type === 'COMPANY' ? 'Jurídica' : 'Física',
  endereco: entity.address,
  cidade: entity.city,
  estado: entity.state,
  email: entity.email || '',
  telefone: entity.phone,
  status: entity.isActive ? 'Ativo' : 'Inativo',
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});

const mapFrontendToCreate = (data: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>): CreateEntityData => ({
  name: data.nome,
  cnpj: data.cnpj,
  type: data.tipo === 'Jurídica' ? 'COMPANY' : 'SCHOOL',
  address: data.endereco,
  city: data.cidade,
  state: data.estado,
  phone: data.telefone,
  email: data.email,
});

const mapFrontendToUpdate = (data: Partial<Entidade>): UpdateEntityData => ({
  name: data.nome,
  cnpj: data.cnpj,
  type: data.tipo ? (data.tipo === 'Jurídica' ? 'COMPANY' : 'SCHOOL') : undefined,
  address: data.endereco,
  city: data.cidade,
  state: data.estado,
  phone: data.telefone,
  email: data.email,
  isActive: data.status ? data.status === 'Ativo' : undefined,
});

export const getAll = async (): Promise<Entidade[]> => {
  const entities = await entitiesApi.getAll();
  return entities.map(mapBackendToFrontend);
};

export const getById = async (id: string): Promise<Entidade | null> => {
  try {
    const entity = await entitiesApi.getById(id);
    return mapBackendToFrontend(entity);
  } catch {
    return null;
  }
};

export const create = async (data: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entidade> => {
  const entity = await entitiesApi.create(mapFrontendToCreate(data));
  return mapBackendToFrontend(entity);
};

export const update = async (id: string, data: Partial<Entidade>): Promise<Entidade | null> => {
  try {
    const entity = await entitiesApi.update(id, mapFrontendToUpdate(data));
    return mapBackendToFrontend(entity);
  } catch {
    return null;
  }
};

export const deleteEntidade = async (id: string): Promise<boolean> => {
  try {
    await entitiesApi.delete(id);
    return true;
  } catch {
    return false;
  }
};

export const search = async (text: string): Promise<Entidade[]> => {
  const entities = await entitiesApi.getAll(text);
  return entities.map(mapBackendToFrontend);
};

export const validateCNPJ = (cnpj: string): boolean => {
  return cnpj.replace(/[^\d]/g, '').length === 14;
};

export const formatCNPJ = (cnpj: string): string => {
  const clean = cnpj.replace(/[^\d]/g, '');
  return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatPhone = (phone: string): string => {
  const clean = phone.replace(/[^\d]/g, '');
  return clean.length === 11 
    ? clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    : clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};
