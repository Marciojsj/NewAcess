// Teste de debug para ver erro detalhado ao criar entidade
import { entitiesApi } from '../src/services/api/entitiesApi';
import { authApi } from '../src/services/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('🔍 DEBUG - Criar Entidade', () => {
  beforeAll(async () => {
    console.log('🔐 Fazendo login...');
    try {
      const authResponse = await authApi.login({
        email: 'superadmin@teste.com',
        password: 'Super@123',
      });
      console.log('✅ Login OK:', authResponse.user.email);
    } catch (error: any) {
      console.error('❌ Erro no login:', error.response?.data || error.message);
      throw error;
    }
  }, 30000);

  it('deve criar uma entidade simples', async () => {
    const entityData = {
      name: `TESTE_DEBUG_${Date.now()}`,
      type: 'COMPANY' as const,
      cnpj: '12345678901234',
      address: 'Rua Teste 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000000',
      phone: '(11) 99999-9999',
      email: 'teste@teste.com',
    };

    console.log('\n📤 Enviando dados:', JSON.stringify(entityData, null, 2));

    try {
      const entity = await entitiesApi.create(entityData);
      console.log('\n✅ Entidade criada:', JSON.stringify(entity, null, 2));
      expect(entity).toHaveProperty('id');
      
      // Limpar
      await entitiesApi.delete(entity.id);
    } catch (error: any) {
      console.error('\n❌ ERRO DETALHADO:');
      console.error('Status:', error.response?.status);
      console.error('Data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Message:', error.message);
      throw error;
    }
  }, 30000);

  afterAll(async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
  });
});
