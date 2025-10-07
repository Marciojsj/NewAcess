// src/utils/entityHelpers.ts
import { Entity } from '../types/entityTypes';

/**
 * Formata CPF para o padrão XXX.XXX.XXX-XX
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  
  const numbers = cpf.replace(/\D/g, '');
  
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

/**
 * Formata RG para o padrão XX.XXX.XXX-X
 */
export const formatRG = (rg: string): string => {
  if (!rg) return '';
  
  const numbers = rg.replace(/\D/g, '');
  
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}-${numbers.slice(8, 9)}`;
};

/**
 * Valida CPF
 */
export const validateCPF = (cpf: string): boolean => {
  if (!cpf) return false;
  
  const numbers = cpf.replace(/\D/g, '');
  
  if (numbers.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  return true;
};

/**
 * Valida RG
 */
export const validateRG = (rg: string): boolean => {
  if (!rg) return false;
  
  const numbers = rg.replace(/\D/g, '');
  
  return numbers.length >= 7 && numbers.length <= 9;
};

/**
 * Retorna o label do tipo de entidade
 */
export const getEntityTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    'Funcionário': 'Funcionário',
    'Visitante': 'Visitante',
    'Morador': 'Morador',
    'Prestador': 'Prestador de Serviço',
    'Entregador': 'Entregador',
  };
  
  return types[type] || 'Desconhecido';
};

/**
 * Retorna o label do status da entidade
 */
export const getEntityStatusLabel = (active: boolean): string => {
  return active ? 'Ativo' : 'Inativo';
};

/**
 * Filtra entidades por tipo
 */
export const filterEntitiesByType = (entities: Entity[], type: string): Entity[] => {
  if (type === 'all') return entities;
  return entities.filter(entity => entity.type === type);
};

/**
 * Filtra entidades por status
 */
export const filterEntitiesByStatus = (entities: Entity[], active: boolean | null): Entity[] => {
  if (active === null) return entities;
  return entities.filter(entity => entity.active === active);
};

/**
 * Ordena entidades por nome
 */
export const sortEntitiesByName = (entities: Entity[], order: 'asc' | 'desc' = 'asc'): Entity[] => {
  return [...entities].sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    
    if (order === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
};

/**
 * Busca entidades por query
 */
export const searchEntities = (entities: Entity[], query: string): Entity[] => {
  if (!query) return entities;
  
  const lowerQuery = query.toLowerCase();
  
  return entities.filter(entity => {
    const name = entity.name?.toLowerCase() || '';
    const cpf = entity.cpf?.toLowerCase() || '';
    const rg = entity.rg?.toLowerCase() || '';
    const type = entity.type?.toLowerCase() || '';
    
    return (
      name.includes(lowerQuery) ||
      cpf.includes(lowerQuery) ||
      rg.includes(lowerQuery) ||
      type.includes(lowerQuery)
    );
  });
};
