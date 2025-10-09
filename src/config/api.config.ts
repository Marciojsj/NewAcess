/**
 * Configuração centralizada da API
 * 
 * Este arquivo contém todas as configurações relacionadas à comunicação
 * com o backend, incluindo URLs, timeouts e outras configurações.
 */

import { Platform } from 'react-native';

/**
 * Configurações da API
 */
export const API_CONFIG = {
  // URLs do backend
  BACKEND_URL_LOCAL: 'http://localhost:3000/api',
  BACKEND_URL_IP: 'http://192.168.101.245:3000/api', // IP da sua máquina
  BACKEND_URL_ANDROID_EMULATOR: 'http://10.0.2.2:3000/api',
  BACKEND_URL_PRODUCTION: 'https://seu-backend-producao.com/api',
  
  // Timeouts
  REQUEST_TIMEOUT: 10000, // 10 segundos
  
  // Headers padrão
  HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Configurações de retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

/**
 * Retorna a URL da API baseada no ambiente e plataforma
 */
export const getApiUrl = (): string => {
  // Ambiente de produção
  if (!__DEV__) {
    return API_CONFIG.BACKEND_URL_PRODUCTION;
  }
  
  // Ambiente de desenvolvimento
  switch (Platform.OS) {
    case 'web':
      // Browser usa localhost
      return API_CONFIG.BACKEND_URL_LOCAL;
      
    case 'android':
      // Android emulador usa 10.0.2.2
      // Para device físico, mude para BACKEND_URL_IP
      return API_CONFIG.BACKEND_URL_ANDROID_EMULATOR;
      
    case 'ios':
      // iOS pode usar localhost
      return API_CONFIG.BACKEND_URL_LOCAL;
      
    default:
      return API_CONFIG.BACKEND_URL_LOCAL;
  }
};

/**
 * Log da configuração atual (apenas em desenvolvimento)
 */
if (__DEV__) {
  console.log('🔧 Configuração da API:');
  console.log('  - Plataforma:', Platform.OS);
  console.log('  - URL da API:', getApiUrl());
  console.log('  - Timeout:', API_CONFIG.REQUEST_TIMEOUT, 'ms');
}
