// __tests__/utils/entityHelpers.test.ts
import {
  formatCPF,
  formatRG,
  validateCPF,
  validateRG,
  getEntityTypeLabel,
  getEntityStatusLabel,
  filterEntitiesByType,
  filterEntitiesByStatus,
  sortEntitiesByName,
  searchEntities,
} from '../../src/utils/entityHelpers';
import { Entity } from '../../src/types/entityTypes';

describe('entityHelpers', () => {
  const mockEntities: Entity[] = [
    {
      id: '1',
      name: 'João Silva',
      cpf: '12345678901',
      rg: '123456789',
      type: 'Funcionário',
      active: true,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
    {
      id: '2',
      name: 'Maria Santos',
      cpf: '98765432109',
      rg: '987654321',
      type: 'Visitante',
      active: false,
      createdAt: '2025-01-02',
      updatedAt: '2025-01-02',
    },
    {
      id: '3',
      name: 'Pedro Costa',
      cpf: '11111111111',
      rg: '111111111',
      type: 'Morador',
      active: true,
      createdAt: '2025-01-03',
      updatedAt: '2025-01-03',
    },
  ];

  describe('formatCPF', () => {
    it('should format CPF correctly', () => {
      expect(formatCPF('12345678901')).toBe('123.456.789-01');
    });

    it('should handle partial CPF', () => {
      expect(formatCPF('123456')).toBe('123.456');
    });

    it('should handle empty string', () => {
      expect(formatCPF('')).toBe('');
    });

    it('should remove non-numeric characters', () => {
      expect(formatCPF('123.456.789-01')).toBe('123.456.789-01');
    });
  });

  describe('formatRG', () => {
    it('should format RG correctly', () => {
      expect(formatRG('123456789')).toBe('12.345.678-9');
    });

    it('should handle partial RG', () => {
      expect(formatRG('12345')).toBe('12.345');
    });

    it('should handle empty string', () => {
      expect(formatRG('')).toBe('');
    });
  });

  describe('validateCPF', () => {
    it('should validate correct CPF', () => {
      expect(validateCPF('12345678901')).toBe(true);
    });

    it('should reject CPF with wrong length', () => {
      expect(validateCPF('123')).toBe(false);
    });

    it('should reject CPF with all same digits', () => {
      expect(validateCPF('11111111111')).toBe(false);
    });

    it('should reject empty CPF', () => {
      expect(validateCPF('')).toBe(false);
    });

    it('should accept formatted CPF', () => {
      expect(validateCPF('123.456.789-01')).toBe(true);
    });
  });

  describe('validateRG', () => {
    it('should validate correct RG', () => {
      expect(validateRG('123456789')).toBe(true);
    });

    it('should reject RG with wrong length', () => {
      expect(validateRG('123')).toBe(false);
    });

    it('should reject empty RG', () => {
      expect(validateRG('')).toBe(false);
    });

    it('should accept formatted RG', () => {
      expect(validateRG('12.345.678-9')).toBe(true);
    });
  });

  describe('getEntityTypeLabel', () => {
    it('should return correct label for Funcionário', () => {
      expect(getEntityTypeLabel('Funcionário')).toBe('Funcionário');
    });

    it('should return correct label for Visitante', () => {
      expect(getEntityTypeLabel('Visitante')).toBe('Visitante');
    });

    it('should return correct label for Morador', () => {
      expect(getEntityTypeLabel('Morador')).toBe('Morador');
    });

    it('should return default label for unknown type', () => {
      expect(getEntityTypeLabel('Unknown' as any)).toBe('Desconhecido');
    });
  });

  describe('getEntityStatusLabel', () => {
    it('should return Ativo for active entity', () => {
      expect(getEntityStatusLabel(true)).toBe('Ativo');
    });

    it('should return Inativo for inactive entity', () => {
      expect(getEntityStatusLabel(false)).toBe('Inativo');
    });
  });

  describe('filterEntitiesByType', () => {
    it('should filter entities by type', () => {
      const result = filterEntitiesByType(mockEntities, 'Funcionário');
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Funcionário');
    });

    it('should return all entities when type is "all"', () => {
      const result = filterEntitiesByType(mockEntities, 'all');
      
      expect(result).toHaveLength(mockEntities.length);
    });

    it('should return empty array when no matches', () => {
      const result = filterEntitiesByType(mockEntities, 'Gerente' as any);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('filterEntitiesByStatus', () => {
    it('should filter active entities', () => {
      const result = filterEntitiesByStatus(mockEntities, true);
      
      expect(result).toHaveLength(2);
      expect(result.every(e => e.active)).toBe(true);
    });

    it('should filter inactive entities', () => {
      const result = filterEntitiesByStatus(mockEntities, false);
      
      expect(result).toHaveLength(1);
      expect(result.every(e => !e.active)).toBe(true);
    });

    it('should return all entities when status is null', () => {
      const result = filterEntitiesByStatus(mockEntities, null);
      
      expect(result).toHaveLength(mockEntities.length);
    });
  });

  describe('sortEntitiesByName', () => {
    it('should sort entities by name ascending', () => {
      const result = sortEntitiesByName(mockEntities, 'asc');
      
      expect(result[0].name).toBe('João Silva');
      expect(result[1].name).toBe('Maria Santos');
      expect(result[2].name).toBe('Pedro Costa');
    });

    it('should sort entities by name descending', () => {
      const result = sortEntitiesByName(mockEntities, 'desc');
      
      expect(result[0].name).toBe('Pedro Costa');
      expect(result[1].name).toBe('Maria Santos');
      expect(result[2].name).toBe('João Silva');
    });

    it('should handle entities without names', () => {
      const entitiesWithoutNames = [
        { ...mockEntities[0], name: undefined },
        mockEntities[1],
      ];
      
      const result = sortEntitiesByName(entitiesWithoutNames, 'asc');
      
      expect(result).toHaveLength(2);
    });
  });

  describe('searchEntities', () => {
    it('should search by name', () => {
      const result = searchEntities(mockEntities, 'João');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('João Silva');
    });

    it('should search by CPF', () => {
      const result = searchEntities(mockEntities, '123456');
      
      expect(result).toHaveLength(1);
      expect(result[0].cpf).toBe('12345678901');
    });

    it('should search case-insensitive', () => {
      const result = searchEntities(mockEntities, 'maria');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Maria Santos');
    });

    it('should return all entities when query is empty', () => {
      const result = searchEntities(mockEntities, '');
      
      expect(result).toHaveLength(mockEntities.length);
    });

    it('should return empty array when no matches', () => {
      const result = searchEntities(mockEntities, 'xyz123');
      
      expect(result).toHaveLength(0);
    });

    it('should search by type', () => {
      const result = searchEntities(mockEntities, 'Visitante');
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('Visitante');
    });
  });
});
