// __tests__/services/entityApi.test.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { entityApi } from '../../src/services/entityApi';
import { Entity } from '../../src/types/entityTypes';

describe('entityApi', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  describe('getAllEntities', () => {
    it('should return empty array when no entities exist', async () => {
      const result = await entityApi.getAllEntities();
      
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return all stored entities', async () => {
      const mockEntities: Entity[] = [
        {
          id: '1',
          cpf: '12345678901',
          rg: '123456789',
          type: 'Funcionário',
          active: true,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          cpf: '98765432109',
          rg: '987654321',
          type: 'Visitante',
          active: false,
          createdAt: '2025-01-02T00:00:00.000Z',
          updatedAt: '2025-01-02T00:00:00.000Z',
        },
      ];

      await AsyncStorage.setItem('@entities', JSON.stringify(mockEntities));

      const result = await entityApi.getAllEntities();

      expect(result).toHaveLength(2);
      expect(result).toEqual(mockEntities);
    });

    it('should handle corrupted data gracefully', async () => {
      await AsyncStorage.setItem('@entities', 'invalid json');

      await expect(entityApi.getAllEntities()).rejects.toThrow('Erro ao buscar entidades');
    });

    it('should throw error on storage failure', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));

      await expect(entityApi.getAllEntities()).rejects.toThrow('Erro ao buscar entidades');
    });
  });

  describe('createEntity', () => {
    it('should create and return new entity', async () => {
      const newEntityData = {
        cpf: '12345678901',
        rg: '123456789',
        type: 'Funcionário',
        active: true,
      };

      const result = await entityApi.createEntity(newEntityData);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.cpf).toBe(newEntityData.cpf);
      expect(result.rg).toBe(newEntityData.rg);
      expect(result.type).toBe(newEntityData.type);
      expect(result.active).toBe(newEntityData.active);
    });

    it('should add entity to storage', async () => {
      const newEntityData = {
        cpf: '12345678901',
        rg: '123456789',
        type: 'Funcionário',
        active: true,
      };

      await entityApi.createEntity(newEntityData);

      const stored = await AsyncStorage.getItem('@entities');
      const entities = JSON.parse(stored!);

      expect(entities).toHaveLength(1);
      expect(entities[0].cpf).toBe(newEntityData.cpf);
    });

    it('should append to existing entities', async () => {
      const existingEntity: Entity = {
        id: '1',
        cpf: '11111111111',
        rg: '111111111',
        type: 'Existing',
        active: true,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      };

      await AsyncStorage.setItem('@entities', JSON.stringify([existingEntity]));

      const newEntityData = {
        cpf: '22222222222',
        rg: '222222222',
        type: 'New',
        active: true,
      };

      await entityApi.createEntity(newEntityData);

      const stored = await AsyncStorage.getItem('@entities');
      const entities = JSON.parse(stored!);

      expect(entities).toHaveLength(2);
    });

    it('should generate unique IDs', async () => {
      const entity1 = await entityApi.createEntity({
        cpf: '11111111111',
        rg: '111111111',
        type: 'Type1',
        active: true,
      });

      const entity2 = await entityApi.createEntity({
        cpf: '22222222222',
        rg: '222222222',
        type: 'Type2',
        active: true,
      });

      expect(entity1.id).not.toBe(entity2.id);
    });

    it('should throw error on storage failure', async () => {
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));

      await expect(
        entityApi.createEntity({
          cpf: '12345678901',
          rg: '123456789',
          type: 'Test',
          active: true,
        })
      ).rejects.toThrow('Erro ao criar entidade');
    });
  });

  describe('updateEntity', () => {
    it('should update existing entity', async () => {
      const existingEntity: Entity = {
        id: '1',
        cpf: '12345678901',
        rg: '123456789',
        type: 'Old Type',
        active: true,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      };

      await AsyncStorage.setItem('@entities', JSON.stringify([existingEntity]));

      const updateData = {
        cpf: '12345678901',
        rg: '123456789',
        type: 'New Type',
        active: false,
      };

      const result = await entityApi.updateEntity('1', updateData);

      expect(result.id).toBe('1');
      expect(result.type).toBe('New Type');
      expect(result.active).toBe(false);
      expect(result.updatedAt).not.toBe(existingEntity.updatedAt);
    });

    it('should preserve other entities when updating', async () => {
      const entities: Entity[] = [
        {
          id: '1',
          cpf: '11111111111',
          rg: '111111111',
          type: 'Type1',
          active: true,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          cpf: '22222222222',
          rg: '222222222',
          type: 'Type2',
          active: true,
          createdAt: '2025-01-02T00:00:00.000Z',
          updatedAt: '2025-01-02T00:00:00.000Z',
        },
      ];

      await AsyncStorage.setItem('@entities', JSON.stringify(entities));

      await entityApi.updateEntity('1', {
        cpf: '11111111111',
        rg: '111111111',
        type: 'Updated Type',
        active: false,
      });

      const stored = await AsyncStorage.getItem('@entities');
      const updatedEntities = JSON.parse(stored!);

      expect(updatedEntities).toHaveLength(2);
      expect(updatedEntities[1].type).toBe('Type2'); // Não foi modificado
    });

    it('should throw error if entity not found', async () => {
      await AsyncStorage.setItem('@entities', JSON.stringify([{ id: '1', name: 'Test', type: 'type1', cpf: '123', rg: '456', active: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' }]));

      await expect(
        entityApi.updateEntity('999', {
          name: 'Updated',
          type: 'type1',
          cpf: '123',
          rg: '456',
          active: true,
        })
      ).rejects.toThrow('Erro ao atualizar entidade');
    });
  });

  describe('deleteEntity', () => {
    it('should delete entity by id', async () => {
      const entities: Entity[] = [
        {
          id: '1',
          cpf: '11111111111',
          rg: '111111111',
          type: 'Type1',
          active: true,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          cpf: '22222222222',
          rg: '222222222',
          type: 'Type2',
          active: true,
          createdAt: '2025-01-02T00:00:00.000Z',
          updatedAt: '2025-01-02T00:00:00.000Z',
        },
      ];

      await AsyncStorage.setItem('@entities', JSON.stringify(entities));

      await entityApi.deleteEntity('1');

      const stored = await AsyncStorage.getItem('@entities');
      const remainingEntities = JSON.parse(stored!);

      expect(remainingEntities).toHaveLength(1);
      expect(remainingEntities[0].id).toBe('2');
    });

    it('should handle deleting from empty storage', async () => {
      await AsyncStorage.setItem('@entities', JSON.stringify([]));

      await expect(entityApi.deleteEntity('1')).resolves.not.toThrow();
    });

    it('should throw error on storage failure', async () => {
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));

      await expect(entityApi.deleteEntity('1')).rejects.toThrow('Erro ao deletar entidade');
    });
  });
});
