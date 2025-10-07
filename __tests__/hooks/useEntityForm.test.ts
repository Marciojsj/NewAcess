// __tests__/hooks/useEntityForm.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useEntityForm } from '../../src/hooks/useEntityForm';
import { Entity } from '../../src/types/entityTypes';

describe('useEntityForm', () => {
  const mockEntity: Entity = {
    id: '1',
    cpf: '12345678901',
    rg: '123456789',
    type: 'Funcionário',
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  };

  describe('Estado Inicial', () => {
    it('should start with empty form when no initial entity', () => {
      const { result } = renderHook(() => useEntityForm());

      expect(result.current.formData).toEqual({
        cpf: '',
        rg: '',
        type: '',
        active: true,
        name: '',
      });
      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(false);
    });

    it('should initialize with entity data when provided', () => {
      const { result } = renderHook(() => useEntityForm(mockEntity));

      expect(result.current.formData.cpf).toBe(mockEntity.cpf);
      expect(result.current.formData.rg).toBe(mockEntity.rg);
      expect(result.current.formData.type).toBe(mockEntity.type);
      expect(result.current.formData.active).toBe(mockEntity.active);
    });
  });

  describe('handleChange', () => {
    it('should update form field', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '12345678901');
      });

      expect(result.current.formData.cpf).toBe('12345678901');
    });

    it('should update multiple fields', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '12345678901');
        result.current.handleChange('rg', '123456789');
        result.current.handleChange('type', 'Funcionário');
      });

      expect(result.current.formData.cpf).toBe('12345678901');
      expect(result.current.formData.rg).toBe('123456789');
      expect(result.current.formData.type).toBe('Funcionário');
    });

    it('should handle boolean fields', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('active', false);
      });

      expect(result.current.formData.active).toBe(false);
    });
  });

  describe('validate', () => {
    it('should validate required fields', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.validate();
      });

      expect(result.current.errors).toHaveProperty('cpf');
      expect(result.current.errors).toHaveProperty('type');
      expect(result.current.isValid).toBe(false);
    });

    it('should pass validation with valid data', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '12345678901');
        result.current.handleChange('type', 'Funcionário');
      });

      act(() => {
        result.current.validate();
      });

      expect(Object.keys(result.current.errors).length).toBe(0);
      expect(result.current.isValid).toBe(true);
    });

    it('should validate CPF format', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '123');
        result.current.validate();
      });

      expect(result.current.errors.cpf).toBeTruthy();
      expect(result.current.isValid).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset form to initial state', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '12345678901');
        result.current.handleChange('rg', '123456789');
        result.current.handleChange('type', 'Funcionário');
      });

      expect(result.current.formData.cpf).toBe('12345678901');

      act(() => {
        result.current.reset();
      });

      expect(result.current.formData).toEqual({
        cpf: '',
        rg: '',
        type: '',
        active: true,
        name: '',
      });
      expect(result.current.errors).toEqual({});
    });

    it('should reset to initial entity if provided', () => {
      const { result } = renderHook(() => useEntityForm(mockEntity));

      act(() => {
        result.current.handleChange('cpf', '99999999999');
      });

      expect(result.current.formData.cpf).toBe('99999999999');

      act(() => {
        result.current.reset();
      });

      expect(result.current.formData.cpf).toBe(mockEntity.cpf);
    });
  });

  describe('clearErrors', () => {
    it('should clear all errors', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.validate();
      });

      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.errors).toEqual({});
    });
  });

  describe('isDirty', () => {
    it('should detect changes in form', () => {
      const { result } = renderHook(() => useEntityForm(mockEntity));

      expect(result.current.isDirty).toBe(false);

      act(() => {
        result.current.handleChange('cpf', '99999999999');
      });

      expect(result.current.isDirty).toBe(true);
    });

    it('should be dirty when starting with empty form', () => {
      const { result } = renderHook(() => useEntityForm());

      act(() => {
        result.current.handleChange('cpf', '12345678901');
      });

      expect(result.current.isDirty).toBe(true);
    });
  });
});
