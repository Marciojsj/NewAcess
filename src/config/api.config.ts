/**
 * API Config centralizado
 * Compatível com: Web, iOS (emulador/físico), Android (emulador/físico)
 */

import { Platform } from 'react-native';

export const API_CONFIG = {
  BACKEND_URL_LOCAL: 'http://localhost:3000/api',           // Web/dev
  BACKEND_URL_IP: 'http://192.168.101.245:3000/api',       // Mobile físico (mesma rede)
  BACKEND_URL_ANDROID_EMULATOR: 'http://10.0.2.2:3000/api',// Android emulator
  BACKEND_URL_PRODUCTION: 'https://seu-backend-producao.com/api',

  REQUEST_TIMEOUT: 10000, // 10 segundos
  HEADERS: {
    'Content-Type': 'application/json',
  },

  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

/**
 * Retorna a URL correta do backend
 */
export const getApiUrl = (): string => {
  let selectedUrl = API_CONFIG.BACKEND_URL_LOCAL;

  if (!__DEV__) {
    selectedUrl = API_CONFIG.BACKEND_URL_PRODUCTION;
  } else {
    switch (Platform.OS) {
      case 'web':
        selectedUrl = API_CONFIG.BACKEND_URL_LOCAL;
        break;
      case 'android':
        // Emulador usa 10.0.2.2, device físico precisa do IP
        selectedUrl = API_CONFIG.BACKEND_URL_ANDROID_EMULATOR;
        break;
      case 'ios':
        // Emulador pode usar localhost, dispositivo físico precisa do IP
        // Aqui assumimos que __DEV__ + iOS físico → usar IP
        selectedUrl = API_CONFIG.BACKEND_URL_IP;
        break;
      default:
        selectedUrl = API_CONFIG.BACKEND_URL_LOCAL;
    }
  }

  // Log detalhado para debug
  console.log('🔧 [API CONFIG]');
  console.log('  - Plataforma:', Platform.OS);
  console.log('  - __DEV__:', __DEV__);
  console.log('  - URL selecionada:', selectedUrl);
  console.log('  - Timeout:', API_CONFIG.REQUEST_TIMEOUT, 'ms');

  return selectedUrl;
};

/**
 * Teste rápido da URL
 * Retorna true se a URL é acessível via fetch (apenas dev)
 */
export const testApiConnection = async () => {
  const url = getApiUrl();
  try {
    const response = await fetch(url + '/ping'); // ajuste endpoint de teste no seu backend
    const data = await response.json();
    console.log('✅ Teste de conexão API OK:', data);
    return true;
  } catch (error) {
    console.error('❌ Teste de conexão API falhou:', error);
    return false;
  }
};
