import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl, API_CONFIG } from '../../config/api.config';

// Obter URL da API baseada no ambiente e plataforma
const API_URL = getApiUrl();

// Criar instância do Axios com configurações centralizadas
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Interceptor para adicionar token em todas as requisições
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao buscar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros e refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se erro 401 e não é retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (refreshToken) {
          // Tentar renovar o token
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          await AsyncStorage.setItem('accessToken', accessToken);

          // Repetir requisição original com novo token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Se falhar, limpar tokens e redirecionar para login
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
        // Aqui você pode disparar um evento para o AuthContext fazer logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
