// src/screens/entidade/entidadeService.ts
import { Entidade } from './entidade.types';
import { mockEntidades } from './entidade.data';

let entidades: Entidade[] = [...mockEntidades];

// ✅ APENAS funções de negócio (CRUD)

export const getAll = (): Entidade[] => {
  return [...entidades];
};

export const getById = (id: string): Entidade | undefined => {
  return entidades.find((e) => e.id === id);
};

export const create = (
  entidade: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>
): Entidade => {
  const newEntidade: Entidade = {
    ...entidade,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  entidades.push(newEntidade);
  return newEntidade;
};

export const update = (
  id: string,
  data: Partial<Entidade>
): Entidade | null => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return null;

  entidades[index] = {
    ...entidades[index],
    ...data,
    id: entidades[index].id,
    updatedAt: new Date().toISOString(),
  };
  return entidades[index];
};

export const deleteEntidade = (id: string): boolean => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return false;
  entidades.splice(index, 1);
  return true;
};

export const search = (term: string): Entidade[] => {
  const normalized = term.toLowerCase().trim();
  if (!normalized) return [...entidades];

  return entidades.filter(
    (e) =>
      e.nome.toLowerCase().includes(normalized) ||
      e.cnpj.includes(normalized) ||
      e.email.toLowerCase().includes(normalized) ||
      e.cidade?.toLowerCase().includes(normalized) ||
      e.estado?.toLowerCase().includes(normalized)
  );
};

export const filterByStatus = (status: 'Ativo' | 'Inativo'): Entidade[] => {
  return entidades.filter((e) => e.status === status);
};

export const filterByType = (tipo: 'Física' | 'Jurídica'): Entidade[] => {
  return entidades.filter((e) => e.tipo === tipo);
};

export const getStats = () => {
  const total = entidades.length;
  const ativas = entidades.filter((e) => e.status === 'Ativo').length;
  const inativas = entidades.filter((e) => e.status === 'Inativo').length;
  const juridicas = entidades.filter((e) => e.tipo === 'Jurídica').length;
  const fisicas = entidades.filter((e) => e.tipo === 'Física').length;

  return { total, ativas, inativas, juridicas, fisicas };
};
