// __tests__/services/entidadeService.test.ts
// Testes do service de Entidades (conectado ao backend real)

import * as EntidadeService from '../../src/screens/entidade/entidade.service';
import type { Entidade } from '../../src/screens/entidade/entidade.types';

// Mock do entitiesApi
jest.mock('../../src/services/api/entitiesApi', () => ({
  entitiesApi: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('EntidadeService - Backend Integration', () => {
  describe('Helper Functions', () => {
    describe('validateCNPJ', () => {
      it('should validate CNPJ with 14 digits', () => {
        expect(EntidadeService.validateCNPJ('12.345.678/0001-90')).toBe(true);
        expect(EntidadeService.validateCNPJ('12345678000190')).toBe(true);
      });

      it('should reject invalid CNPJ', () => {
        expect(EntidadeService.validateCNPJ('123')).toBe(false);
        expect(EntidadeService.validateCNPJ('')).toBe(false);
      });
    });

    describe('formatCNPJ', () => {
      it('should format CNPJ correctly', () => {
        expect(EntidadeService.formatCNPJ('12345678000190')).toBe('12.345.678/0001-90');
      });

      it('should handle already formatted CNPJ', () => {
        expect(EntidadeService.formatCNPJ('12.345.678/0001-90')).toBe('12.345.678/0001-90');
      });
    });

    describe('formatPhone', () => {
      it('should format mobile phone (11 digits)', () => {
        expect(EntidadeService.formatPhone('11987654321')).toBe('(11) 98765-4321');
      });

      it('should format landline (10 digits)', () => {
        expect(EntidadeService.formatPhone('1134567890')).toBe('(11) 3456-7890');
      });
    });
  });

  describe('CRUD Operations', () => {
    it('should export all required methods', () => {
      expect(EntidadeService.getAll).toBeDefined();
      expect(EntidadeService.getById).toBeDefined();
      expect(EntidadeService.create).toBeDefined();
      expect(EntidadeService.update).toBeDefined();
      expect(EntidadeService.deleteEntidade).toBeDefined();
      expect(EntidadeService.search).toBeDefined();
    });

    it('getAll should be async', () => {
      expect(EntidadeService.getAll()).toBeInstanceOf(Promise);
    });

    it('getById should be async', () => {
      expect(EntidadeService.getById('123')).toBeInstanceOf(Promise);
    });

    it('create should be async', async () => {
      const data = {
        nome: 'Test',
        cnpj: '12345678000190',
        tipo: 'Jurídica' as const,
        email: 'test@test.com',
        status: 'Ativo' as const,
      };
      
      const result = EntidadeService.create(data);
      expect(result).toBeInstanceOf(Promise);
    });

    it('update should be async', () => {
      const result = EntidadeService.update('123', { nome: 'Updated' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('deleteEntidade should be async', () => {
      const result = EntidadeService.deleteEntidade('123');
      expect(result).toBeInstanceOf(Promise);
    });

    it('search should be async', () => {
      const result = EntidadeService.search('test');
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
