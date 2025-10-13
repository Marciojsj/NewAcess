// Teste de debug para ver erro detalhado ao criar visitante
import { visitorsApi } from '../src/services/api/visitorsApi';
import { entitiesApi } from '../src/services/api/entitiesApi';
import { authApi } from '../src/services/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

function generateCPF(): string {
  return Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
}

describe('🔍 DEBUG - Criar Visitante', () => {
  let testEntityId: string;
  
  beforeAll(async () => {
    console.log('🔐 Fazendo login...');
    try {
      await authApi.login({
        email: 'superadmin@teste.com',
        password: 'Super@123',
      });
      console.log('✅ Login OK');
      
      // Criar entidade para o visitante
      const entity = await entitiesApi.create({
        name: `ENTITY_DEBUG_${Date.now()}`,
        type: 'COMPANY',
      });
      testEntityId = entity.id;
      console.log('✅ Entidade criada:', entity.id);
    } catch (error: any) {
      console.error('❌ Erro no setup:', error.response?.data || error.message);
      throw error;
    }
  }, 30000);

  it('deve criar um visitante simples', async () => {
    const visitorData = {
      name: `VISITANTE_DEBUG_${Date.now()}`,
      cpf: generateCPF(),
      entityId: testEntityId,
      phone: '(11) 99999-9999',
      email: 'visitante@teste.com',
      company: 'Empresa Teste',
    };

    console.log('\n📤 Enviando dados:', JSON.stringify(visitorData, null, 2));
    console.log('CPF length:', visitorData.cpf.length);

    try {
      const visitor = await visitorsApi.create(visitorData);
      console.log('\n✅ Visitante criado:', JSON.stringify(visitor, null, 2));
      expect(visitor).toHaveProperty('id');
      expect(visitor).toHaveProperty('qrCode');
      
      // Limpar
      await visitorsApi.delete(visitor.id);
    } catch (error: any) {
      console.error('\n❌ ERRO DETALHADO:');
      console.error('Status:', error.response?.status);
      console.error('Data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Message:', error.message);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    // Limpar entidade
    if (testEntityId) {
      try {
        await entitiesApi.delete(testEntityId);
      } catch (error) {
        console.warn('Erro ao deletar entidade');
      }
    }
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
  });
});
