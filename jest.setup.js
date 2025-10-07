// jest.setup.js
// Configuração de setup para Jest

// Os matchers do Testing Library já estão built-in na versão 12.4+
// Não precisa mais importar extend-expect

// Mock do Expo Winter
global.__ExpoImportMetaRegistry = {
  register: jest.fn(),
  resolve: jest.fn(),
};

// Mock do structuredClone
global.structuredClone = jest.fn((val) => JSON.parse(JSON.stringify(val)));

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock do React Native Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock do React Navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Silenciar warnings específicos
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render') ||
     args[0].includes('Warning: useLayoutEffect') ||
     args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Animated:') ||
     args[0].includes('VirtualizedLists'))
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};

// Configuração global de timeout
jest.setTimeout(10000);
