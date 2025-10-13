// __tests__/integration/crud.integration.test.ts
/**
 * 🔥 TESTES CRUD COMPLETOS - INTEGRAÇÃO COM BACKEND REAL
 * 
 * Testa todas as operações CRUD (Create, Read, Update, Delete) 
 * para todas as entidades do sistema com o backend real rodando.
 * 
 * ANTES DE RODAR:
 * 1. Inicie o backend: cd access-backend && npm run dev
 * 2. Certifique-se que o banco está acessível
 * 3. Execute: npm run test:crud
 */

import { entitiesApi, Entity } from '../../src/services/api/entitiesApi';
import { visitorsApi, Visitor } from '../../src/services/api/visitorsApi';
import { usersApi, User } from '../../src/services/api/usersApi';
import { accessApi, AccessLog } from '../../src/services/api/accessApi';
import { authApi } from '../../src/services/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================
// 🔐 SETUP DE AUTENTICAÇÃO GLOBAL
// ============================================================

beforeAll(async () => {
  console.log('🔐 Fazendo login para obter token de autenticação...');
  
  try {
    // Tentar fazer login com usuário de teste
    // Se não existir, criar um usuário admin de teste
    let authResponse;
    
    try {
      authResponse = await authApi.login({
        email: 'superadmin@teste.com',
        password: 'Super@123',
      });
      console.log('✅ Login realizado com sucesso');
    } catch (loginError: any) {
      // Se usuário não existe, tentar criar e fazer login novamente
      if (loginError.response?.status === 401 || loginError.response?.status === 404) {
        console.log('👤 Usuário SUPERADMIN de teste não encontrado, criando...');
        
        try {
          await authApi.register({
            name: 'SuperAdmin Teste',
            email: 'superadmin@teste.com',
            password: 'Super@123',
            cpf: '11111111111',
            phone: '(11) 99999-8888',
            role: 'SUPERADMIN',
          });
          
          console.log('✅ Usuário SUPERADMIN de teste criado com sucesso');
          
          // Fazer login com o usuário recém-criado
          authResponse = await authApi.login({
            email: 'superadmin@teste.com',
            password: 'Super@123',
          });
          
          console.log('✅ Login realizado após registro');
        } catch (registerError: any) {
          console.error('❌ Erro ao criar/logar usuário SUPERADMIN:', registerError.response?.data || registerError.message);
          throw registerError;
        }
      } else {
        throw loginError;
      }
    }
    
    console.log(`👤 Usuário autenticado: ${authResponse.user.name} (${authResponse.user.role})`);
  } catch (error: any) {
    console.error('❌ Erro na autenticação:', error.response?.data || error.message);
    throw new Error('Falha na autenticação inicial. Não é possível executar testes.');
  }
}, 30000);

afterAll(async () => {
  // Limpar autenticação após todos os testes
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
});

// ============================================================
// 🧰 UTILITÁRIOS DE GERAÇÃO DE DADOS FAKE
// ============================================================

function generateCPF(): string {
  return Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
}

function generateCNPJ(): string {
  return Math.floor(Math.random() * 10000000000000).toString().padStart(14, '0');
}

function generateEmail(name: string): string {
  return `${name.toLowerCase().replace(/\s/g, '.')}@teste.com`;
}

function generatePhone(): string {
  return `(11) 9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
}

// ============================================================
// 🏢 TESTES CRUD - ENTIDADES (Entities)
// ============================================================

describe('🏢 CRUD Completo - Entidades', () => {
  const createdEntities: string[] = [];
  const testPrefix = `TEST_${Date.now()}`;

  afterAll(async () => {
    // Limpar dados de teste criados
    console.log(`\n🧹 Limpando ${createdEntities.length} entidades de teste...`);
    for (const id of createdEntities) {
      try {
        await entitiesApi.delete(id);
      } catch (error) {
        console.warn(`⚠️  Erro ao deletar entidade ${id}:`, error);
      }
    }
  });

  describe('CREATE - Criar Entidades', () => {
    it('deve criar 5 entidades de tipos diferentes', async () => {
      const types: Array<'SCHOOL' | 'CONDOMINIUM' | 'COMPANY' | 'EVENT' | 'OTHER'> = [
        'SCHOOL',
        'CONDOMINIUM',
        'COMPANY',
        'EVENT',
        'OTHER',
      ];

      console.log('\n🏢 Criando entidades...');

      for (const type of types) {
        const entityData = {
          name: `${testPrefix}_${type}_${Date.now()}`,
          type,
          cnpj: type === 'COMPANY' ? generateCNPJ() : undefined,
          address: `Rua Teste ${Math.floor(Math.random() * 1000)}`,
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000000',
          phone: generatePhone(),
          email: generateEmail(`${type}_entity`),
        };

        console.log(`  ➡️  Tentando criar: ${entityData.name} (${type})`);

        try {
          const entity = await entitiesApi.create(entityData);

          console.log(`  ✅ Criado com sucesso - ID: ${entity.id}`);

          expect(entity).toHaveProperty('id');
          expect(entity.name).toContain(testPrefix);
          expect(entity.type).toBe(type);
          expect(entity.isActive).toBe(true);

          createdEntities.push(entity.id);
        } catch (error: any) {
          console.error(`  ❌ ERRO ao criar ${type}:`, {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            data: error.response?.data,
            enviado: entityData
          });
          throw error;
        }
        
        // Pequeno delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log(`\n✅ Total de entidades criadas: ${createdEntities.length}`);
      expect(createdEntities).toHaveLength(5);
    }, 60000);

    it('deve validar campos obrigatórios na criação', async () => {
      await expect(
        entitiesApi.create({
          name: '',
          type: 'COMPANY',
        })
      ).rejects.toThrow();
    });
  });

  describe('READ - Listar e Buscar Entidades', () => {
    it('deve listar todas as entidades', async () => {
      const entities = await entitiesApi.getAll();

      expect(Array.isArray(entities)).toBe(true);
      expect(entities.length).toBeGreaterThanOrEqual(5);

      // Verificar se as entidades de teste estão na lista
      const testEntities = entities.filter(e => e.name.includes(testPrefix));
      expect(testEntities.length).toBeGreaterThanOrEqual(5);
    });

    it('deve buscar entidade por ID', async () => {
      const entityId = createdEntities[0];
      const entity = await entitiesApi.getById(entityId);

      expect(entity).toHaveProperty('id', entityId);
      expect(entity.name).toContain(testPrefix);
    });

    it('deve buscar entidades por termo de pesquisa', async () => {
      const results = await entitiesApi.getAll(testPrefix);

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThanOrEqual(5);
      results.forEach(entity => {
        expect(entity.name).toContain(testPrefix);
      });
    });

    it('deve retornar erro ao buscar entidade inexistente', async () => {
      await expect(entitiesApi.getById('id-inexistente-999')).rejects.toThrow();
    });
  });

  describe('UPDATE - Atualizar Entidades', () => {
    it('deve atualizar nome e status de entidade', async () => {
      const entityId = createdEntities[0];
      const newName = `${testPrefix}_UPDATED_${Date.now()}`;

      const updated = await entitiesApi.update(entityId, {
        name: newName,
        isActive: false,
      });

      expect(updated.id).toBe(entityId);
      expect(updated.name).toBe(newName);
      expect(updated.isActive).toBe(false);
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThan(
        new Date(updated.createdAt).getTime()
      );
    });

    it('deve atualizar parcialmente sem afetar outros campos', async () => {
      const entityId = createdEntities[1];
      const entity = await entitiesApi.getById(entityId);

      const updated = await entitiesApi.update(entityId, {
        phone: generatePhone(),
      });

      expect(updated.name).toBe(entity.name); // Nome não mudou
      expect(updated.phone).not.toBe(entity.phone); // Telefone mudou
    });
  });

  describe('DELETE - Deletar Entidades', () => {
    it('deve deletar entidade com sucesso', async () => {
      const entityToDelete = await entitiesApi.create({
        name: `${testPrefix}_TO_DELETE_${Date.now()}`,
        type: 'OTHER',
      });

      await entitiesApi.delete(entityToDelete.id);

      // Verificar que foi realmente deletada
      await expect(entitiesApi.getById(entityToDelete.id)).rejects.toThrow();
    });

    it('deve retornar erro ao tentar deletar entidade já deletada', async () => {
      await expect(entitiesApi.delete('id-ja-deletado-999')).rejects.toThrow();
    });
  });
});

// ============================================================
// 👥 TESTES CRUD - VISITANTES (Visitors)
// ============================================================

describe('👥 CRUD Completo - Visitantes', () => {
  const createdVisitors: string[] = [];
  let testEntityId: string;
  const testPrefix = `VISITOR_TEST_${Date.now()}`;

  beforeAll(async () => {
    // Criar entidade de teste para associar visitantes
    const entity = await entitiesApi.create({
      name: `ENTITY_FOR_VISITORS_${Date.now()}`,
      type: 'COMPANY',
    });
    testEntityId = entity.id;
  });

  afterAll(async () => {
    // Limpar visitantes de teste
    console.log(`\n🧹 Limpando ${createdVisitors.length} visitantes de teste...`);
    for (const id of createdVisitors) {
      try {
        await visitorsApi.delete(id);
      } catch (error) {
        console.warn(`⚠️  Erro ao deletar visitante ${id}:`, error);
      }
    }

    // Limpar entidade de teste
    if (testEntityId) {
      try {
        await entitiesApi.delete(testEntityId);
      } catch (error) {
        console.warn(`⚠️  Erro ao deletar entidade ${testEntityId}:`, error);
      }
    }
  });

  describe('CREATE - Criar Visitantes', () => {
    it('deve criar 10 visitantes com dados válidos', async () => {
      console.log('\n👥 Criando visitantes...');

      for (let i = 0; i < 10; i++) {
        const visitorData = {
          name: `${testPrefix}_${i}`,
          cpf: generateCPF(),
          entityId: testEntityId,
          phone: generatePhone(),
          email: generateEmail(`visitor_${i}`),
          company: `Empresa Teste ${i}`,
        };

        console.log(`  ➡️  Tentando criar: ${visitorData.name}`);

        try {
          const visitor = await visitorsApi.create(visitorData);

          console.log(`  ✅ Criado com sucesso - ID: ${visitor.id}`);

          expect(visitor).toHaveProperty('id');
          expect(visitor.name).toContain(testPrefix);
          expect(visitor).toHaveProperty('qrCode');

          createdVisitors.push(visitor.id);
        } catch (error: any) {
          console.error(`  ❌ ERRO ao criar visitante ${i}:`, {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            data: error.response?.data,
            enviado: visitorData
          });
          throw error;
        }
        
        // Pequeno delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log(`\n✅ Total de visitantes criados: ${createdVisitors.length}`);
      expect(createdVisitors).toHaveLength(10);
    }, 60000);

    it('deve validar CPF obrigatório na criação', async () => {
      await expect(
        visitorsApi.create({
          name: 'Teste Sem CPF',
          cpf: '',
          entityId: testEntityId,
        })
      ).rejects.toThrow();
    });
  });

  describe('READ - Listar e Buscar Visitantes', () => {
    it('deve listar todos os visitantes', async () => {
      const visitors = await visitorsApi.getAll();

      expect(Array.isArray(visitors)).toBe(true);
      expect(visitors.length).toBeGreaterThanOrEqual(10);
    });

    it('deve buscar visitante por ID', async () => {
      const visitorId = createdVisitors[0];
      const visitor = await visitorsApi.getById(visitorId);

      expect(visitor).toHaveProperty('id', visitorId);
      expect(visitor.name).toContain(testPrefix);
    });

    it('deve buscar visitantes por nome', async () => {
      const results = await visitorsApi.getAll(testPrefix);

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('UPDATE - Atualizar Visitantes', () => {
    it('deve atualizar dados do visitante', async () => {
      const visitorId = createdVisitors[0];
      const newPhone = generatePhone();

      const updated = await visitorsApi.update(visitorId, {
        phone: newPhone,
        company: 'Empresa Atualizada',
      });

      expect(updated.id).toBe(visitorId);
      expect(updated.phone).toBe(newPhone);
      expect(updated.company).toBe('Empresa Atualizada');
    });
  });

  describe('DELETE - Deletar Visitantes', () => {
    it('deve deletar 3 visitantes', async () => {
      const visitorsToDelete = createdVisitors.slice(0, 3);

      for (const id of visitorsToDelete) {
        await visitorsApi.delete(id);
        await expect(visitorsApi.getById(id)).rejects.toThrow();
      }

      // Verificar que restaram 7 visitantes de teste
      const remaining = await visitorsApi.getAll(testPrefix);
      expect(remaining.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('QR CODE - Regenerar QR Code', () => {
    it('deve regenerar QR Code do visitante', async () => {
      const visitorId = createdVisitors[5];
      const visitor = await visitorsApi.getById(visitorId);
      const oldQRCode = visitor.qrCode;

      const updated = await visitorsApi.regenerateQRCode(visitorId);

      expect(updated.qrCode).toBeDefined();
      expect(updated.qrCode).not.toBe(oldQRCode);
      expect(updated.qrCodeExpiry).toBeDefined();
    });
  });
});

// ============================================================
// 👤 TESTES CRUD - USUÁRIOS (Users)
// ============================================================

describe('👤 CRUD Completo - Usuários', () => {
  const createdUsers: string[] = [];
  let testEntityId: string;
  const testPrefix = `USER_TEST_${Date.now()}`;

  beforeAll(async () => {
    // Criar entidade de teste para associar usuários
    const entity = await entitiesApi.create({
      name: `ENTITY_FOR_USERS_${Date.now()}`,
      type: 'COMPANY',
    });
    testEntityId = entity.id;
  });

  afterAll(async () => {
    // Limpar usuários de teste
    console.log(`\n🧹 Limpando ${createdUsers.length} usuários de teste...`);
    for (const id of createdUsers) {
      try {
        await usersApi.delete(id);
      } catch (error) {
        console.warn(`⚠️  Erro ao deletar usuário ${id}:`, error);
      }
    }

    // Limpar entidade de teste
    if (testEntityId) {
      try {
        await entitiesApi.delete(testEntityId);
      } catch (error) {
        console.warn(`⚠️  Erro ao deletar entidade ${testEntityId}:`, error);
      }
    }
  });

  describe('CREATE - Criar Usuários', () => {
    it('deve criar usuários de diferentes roles', async () => {
      const roles: Array<'ADMIN' | 'OPERATOR' | 'USER'> = ['ADMIN', 'OPERATOR', 'USER'];

      console.log('\n👤 Criando usuários...');

      for (const role of roles) {
        const userData = {
          name: `${testPrefix}_${role}_${Date.now()}`,
          email: generateEmail(`${role}_user`),
          password: 'Teste@123',
          cpf: generateCPF(),
          phone: generatePhone(),
          role,
          entityId: testEntityId,
        };

        console.log(`  ➡️  Tentando criar: ${userData.name} (${role})`);

        try {
          const user = await usersApi.create(userData);

          console.log(`  ✅ Criado com sucesso - ID: ${user.id}`);

          expect(user).toHaveProperty('id');
          expect(user.name).toContain(testPrefix);
          expect(user.role).toBe(role);
          expect(user.isActive).toBe(true);

          createdUsers.push(user.id);
        } catch (error: any) {
          console.error(`  ❌ ERRO ao criar usuário ${role}:`, {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            data: error.response?.data,
            enviado: userData
          });
          throw error;
        }
        
        // Pequeno delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log(`\n✅ Total de usuários criados: ${createdUsers.length}`);
      expect(createdUsers).toHaveLength(3);
    }, 60000);
  });

  describe('READ - Listar e Buscar Usuários', () => {
    it('deve listar todos os usuários', async () => {
      const users = await usersApi.getAll();

      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThanOrEqual(3);
    });

    it('deve filtrar usuários por role', async () => {
      const admins = await usersApi.getAll(undefined, 'ADMIN');

      expect(Array.isArray(admins)).toBe(true);
      admins.forEach(user => {
        expect(user.role).toBe('ADMIN');
      });
    });

    it('deve buscar usuário por ID', async () => {
      const userId = createdUsers[0];
      const user = await usersApi.getById(userId);

      expect(user).toHaveProperty('id', userId);
      expect(user.name).toContain(testPrefix);
    });
  });

  describe('UPDATE - Atualizar Usuários', () => {
    it('deve atualizar dados do usuário', async () => {
      const userId = createdUsers[0];
      const newPhone = generatePhone();

      const updated = await usersApi.update(userId, {
        phone: newPhone,
        role: 'OPERATOR',
      });

      expect(updated.id).toBe(userId);
      expect(updated.phone).toBe(newPhone);
      expect(updated.role).toBe('OPERATOR');
    });

    it('deve desativar usuário', async () => {
      const userId = createdUsers[1];

      const updated = await usersApi.update(userId, {
        isActive: false,
      });

      expect(updated.isActive).toBe(false);
    });
  });

  describe('DELETE - Deletar Usuários', () => {
    it('deve deletar usuário com sucesso', async () => {
      const userToDelete = await usersApi.create({
        name: `${testPrefix}_TO_DELETE`,
        email: generateEmail('delete_user'),
        password: 'Teste@123',
        cpf: generateCPF(),
        role: 'USER',
        entityId: testEntityId,
      });

      await usersApi.delete(userToDelete.id);

      await expect(usersApi.getById(userToDelete.id)).rejects.toThrow();
    });
  });
});

// ============================================================
// 📊 RESUMO DOS TESTES
// ============================================================

describe('📊 Resumo Geral dos Testes CRUD', () => {
  it('deve exibir estatísticas dos testes', () => {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DOS TESTES CRUD EXECUTADOS');
    console.log('='.repeat(60));
    console.log('✅ Entidades: CREATE, READ, UPDATE, DELETE');
    console.log('✅ Visitantes: CREATE, READ, UPDATE, DELETE, QR CODE');
    console.log('✅ Usuários: CREATE, READ, UPDATE, DELETE');
    console.log('='.repeat(60));
    expect(true).toBe(true);
  });

  it('📊 Resumo Final - Mostrar todas as entidades criadas', async () => {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RESUMO FINAL - ENTIDADES NO SISTEMA');
    console.log('='.repeat(80));

    try {
      // Buscar todas as entidades
      const allEntities = await entitiesApi.getAll();
      console.log(`\n🏢 ENTIDADES (${allEntities.length} total):`);
      allEntities.forEach((entity, index) => {
        console.log(`  ${index + 1}. ${entity.name} (${entity.type}) - ID: ${entity.id}`);
      });

      // Buscar todos os visitantes
      const allVisitors = await visitorsApi.getAll();
      console.log(`\n👥 VISITANTES (${allVisitors.length} total):`);
      allVisitors.forEach((visitor, index) => {
        console.log(`  ${index + 1}. ${visitor.name} - CPF: ${visitor.cpf} - ID: ${visitor.id}`);
      });

      // Buscar todos os usuários
      const allUsers = await usersApi.getAll();
      console.log(`\n👤 USUÁRIOS (${allUsers.length} total):`);
      allUsers.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} (${user.role}) - Email: ${user.email} - ID: ${user.id}`);
      });

      console.log('\n' + '='.repeat(80));
      console.log('✅ RESUMO COMPLETO GERADO COM SUCESSO');
      console.log('='.repeat(80) + '\n');

      expect(allEntities.length).toBeGreaterThanOrEqual(0);
      expect(allVisitors.length).toBeGreaterThanOrEqual(0);
      expect(allUsers.length).toBeGreaterThanOrEqual(0);
    } catch (error: any) {
      console.error('❌ Erro ao gerar resumo:', error.message);
      throw error;
    }
  });
});
