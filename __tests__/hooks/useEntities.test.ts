// __tests__/hooks/useEntities.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useEntities } from '../../src/hooks/useEntities';
import { entityApi } from '../../src/services/entityApi';
import { Entity } from '../../src/types/entityTypes';

// Mock do entityApi
jest.mock('../../src/services/entityApi');

describe('useEntities', () => {
  const mockEntities: Entity[] = [
    {
      id: '1',
      cpf: '12345678901',
      rg: '123456789',
      type: 'Funcionário',
      active: true,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
    {
      id: '2',
      cpf: '98765432109',
      rg: '987654321',
      type: 'Visitante',
      active: false,
      createdAt: '2025-01-02',
      updatedAt: '2025-01-02',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (entityApi.getAllEntities as jest.Mock).mockResolvedValue(mockEntities);
  });

  describe('Estado Inicial', () => {
    it('should start with empty entities array', () => {
      const { result } = renderHook(() => useEntities());

      expect(result.current.entities).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('loadEntities', () => {
    it('should load entities successfully', async () => {
      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await result.current.loadEntities();
      });

      expect(result.current.entities).toEqual(mockEntities);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(entityApi.getAllEntities).toHaveBeenCalledTimes(1);
    });

    it('should handle loading error', async () => {
      const errorMessage = 'Failed to load';
      (entityApi.getAllEntities as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await result.current.loadEntities();
      });

      expect(result.current.entities).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });

    it('should set loading state correctly', async () => {
      const { result } = renderHook(() => useEntities());

      expect(result.current.loading).toBe(false);

      act(() => {
        result.current.loadEntities();
      });

      expect(result.current.loading).toBe(true);
    });
  });

  describe('createEntity', () => {
    it('should create new entity', async () => {
      const newEntityData = {
        cpf: '11111111111',
        rg: '111111111',
        type: 'Morador',
        active: true,
      };

      const newEntity: Entity = {
        id: '3',
        ...newEntityData,
        createdAt: '2025-01-03',
        updatedAt: '2025-01-03',
      };

      (entityApi.createEntity as jest.Mock).mockResolvedValue(newEntity);

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await result.current.createEntity(newEntityData);
      });

      expect(result.current.entities).toContainEqual(newEntity);
      expect(entityApi.createEntity).toHaveBeenCalledWith(newEntityData);
    });

    it('should handle create entity error', async () => {
      const newEntityData = {
        cpf: '11111111111',
        rg: '111111111',
        type: 'Morador',
        active: true,
      };

      (entityApi.createEntity as jest.Mock).mockRejectedValue(
        new Error('Failed to create')
      );

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await expect(result.current.createEntity(newEntityData)).rejects.toThrow();
      });
    });
  });
  describe('updateEntity', () => {
    it('should update existing entity', async () => {
      const updateData = {
        cpf: mockEntities[0].cpf,
        rg: mockEntities[0].rg,
        type: 'Gerente',
        active: true,
      };

      const updatedEntity: Entity = {
        ...mockEntities[0],
        type: 'Gerente',
      };

      (entityApi.updateEntity as jest.Mock).mockResolvedValue(updatedEntity);

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await result.current.loadEntities();
      });

      await act(async () => {
        await result.current.updateEntity('1', updateData);
      });

      const entity = result.current.entities.find((e) => e.id === '1');
      expect(entity?.type).toBe('Gerente');
      expect(entityApi.updateEntity).toHaveBeenCalledWith('1', updateData);
    });

    it('should handle update entity error', async () => {
      (entityApi.updateEntity as jest.Mock).mockRejectedValue(
        new Error('Failed to update')
      );

      const { result } = renderHook(() => useEntities());

      const updateData = {
        cpf: '123',
        rg: '123',
        type: 'Test',
        active: true,
      };

      await act(async () => {
        await expect(
          result.current.updateEntity('1', updateData)
        ).rejects.toThrow();
      });
    });
  });

  describe('deleteEntity', () => {
    it('should delete entity by id', async () => {
      (entityApi.deleteEntity as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await result.current.loadEntities();
      });

      const initialCount = result.current.entities.length;

      await act(async () => {
        await result.current.deleteEntity('1');
      });

      expect(result.current.entities.length).toBe(initialCount - 1);
      expect(result.current.entities.find((e) => e.id === '1')).toBeUndefined();
      expect(entityApi.deleteEntity).toHaveBeenCalledWith('1');
    });

    it('should handle delete entity error', async () => {
      (entityApi.deleteEntity as jest.Mock).mockRejectedValue(
        new Error('Failed to delete')
      );

      const { result } = renderHook(() => useEntities());

      await act(async () => {
        await expect(result.current.deleteEntity('1')).rejects.toThrow();
      });
    });
  });
});
