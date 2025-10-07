// __tests__/contexts/ThemeContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ThemeProvider, useTheme, lightTheme, darkTheme } from '../../src/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Wrapper para o provider
const wrapper = ({ children }: any) => <ThemeProvider>{children}</ThemeProvider>;

describe('ThemeContext', () => {
  beforeEach(() => {
    // Limpar storage antes de cada teste
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Estado Inicial', () => {
    it('should start with dark theme by default', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      expect(result.current.isDark).toBe(true);
      expect(result.current.theme).toEqual(darkTheme);
    });

    it('should not be loading after initialization', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useTheme(), { wrapper });
      
      // Aguardar o useEffect carregar
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Toggle Theme', () => {
    it('should toggle from dark to light theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      expect(result.current.isDark).toBe(true);
      
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(result.current.isDark).toBe(false);
      expect(result.current.theme).toEqual(lightTheme);
    });

    it('should toggle from light to dark theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      // Primeiro toggle: dark -> light
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(result.current.isDark).toBe(false);
      
      // Segundo toggle: light -> dark
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(result.current.isDark).toBe(true);
      expect(result.current.theme).toEqual(darkTheme);
    });

    it('should persist theme preference to AsyncStorage', async () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      await act(async () => {
        result.current.toggleTheme();
      });
      
      const storedTheme = await AsyncStorage.getItem('@app_theme');
      expect(storedTheme).toBe('light');
    });
  });

  describe('Load Theme Preference', () => {
    it('should load saved dark theme from AsyncStorage', async () => {
      await AsyncStorage.setItem('@app_theme', 'dark');
      
      const { result, waitForNextUpdate } = renderHook(() => useTheme(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.isDark).toBe(true);
    });

    it('should load saved light theme from AsyncStorage', async () => {
      await AsyncStorage.setItem('@app_theme', 'light');
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.isDark).toBe(false);
    });
  });

  describe('Theme Colors', () => {
    it('should have all required color properties in dark theme', () => {
      const requiredProperties = [
        'background',
        'backgroundSecondary',
        'text',
        'textSecondary',
        'primary',
        'success',
        'error',
        'warning',
        'border',
      ];

      requiredProperties.forEach(prop => {
        expect(darkTheme).toHaveProperty(prop);
        expect(typeof (darkTheme as any)[prop]).toBe('string');
      });
    });

    it('should have all required color properties in light theme', () => {
      const requiredProperties = [
        'background',
        'backgroundSecondary',
        'text',
        'textSecondary',
        'primary',
        'success',
        'error',
        'warning',
        'border',
      ];

      requiredProperties.forEach(prop => {
        expect(lightTheme).toHaveProperty(prop);
        expect(typeof (lightTheme as any)[prop]).toBe('string');
      });
    });

    it('should have different colors for dark and light themes', () => {
      expect(darkTheme.background).not.toBe(lightTheme.background);
      expect(darkTheme.text).not.toBe(lightTheme.text);
    });
  });

  describe('Error Handling', () => {
    it('should handle AsyncStorage errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Simular erro no AsyncStorage
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      // Deve manter o tema padrão (dark)
      expect(result.current.isDark).toBe(true);
      expect(result.current.isLoading).toBe(false);
      
      consoleSpy.mockRestore();
    });
  });
});
