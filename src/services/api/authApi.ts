import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  role?: string;
  entityId?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    cpf?: string;
    phone?: string;
    entityId?: string;
    isActive?: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Realizar login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    const data = response.data.data;

    // Salvar tokens no AsyncStorage
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('userData', JSON.stringify(data.user));

    return data;
  },

  /**
   * Registrar novo usuário
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', data);
    const result = response.data.data;

    return result;
  },

  /**
   * Renovar access token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data.data;

    await AsyncStorage.setItem('accessToken', accessToken);
    return accessToken;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // Limpar dados locais independente do resultado
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
    }
  },

  /**
   * Buscar dados do usuário autenticado
   */
  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  },

  /**
   * Verificar se está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
  },

  /**
   * Buscar dados do usuário do storage
   */
  async getUserData() {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },
};

export default authApi;
