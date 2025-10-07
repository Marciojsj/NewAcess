// __tests__/contexts/AuthContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../src/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  describe('Estado Inicial', () => {
    it('should start with no user', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      expect(result.current.user).toBeNull();
    });

    it('should finish loading after initialization', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Login', () => {
    it('should login successfully with any credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('test@test.com', '123456');
      });
      
      expect(result.current.user).not.toBeNull();
      expect(result.current.user?.email).toBe('test@test.com');
      expect(result.current.user?.name).toBe('Usuário Teste');
    });

    it('should save user to AsyncStorage after login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('admin@example.com', 'password');
      });
      
      const storedUser = await AsyncStorage.getItem('@user');
      expect(storedUser).not.toBeNull();
      
      const parsedUser = JSON.parse(storedUser!);
      expect(parsedUser.email).toBe('admin@example.com');
    });

    it('should set loading state during login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      let loadingDuringLogin = false;
      
      act(() => {
        result.current.login('test@test.com', '123456');
        loadingDuringLogin = result.current.isLoading;
      });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(loadingDuringLogin || result.current.isLoading).toBeTruthy();
    });

    it('should handle login errors', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      // Simular erro no AsyncStorage
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(
        act(async () => {
          await result.current.login('test@test.com', '123456');
        })
      ).rejects.toThrow();
      
      expect(result.current.user).toBeNull();
    });
  });

  describe('Logout', () => {
    it('should logout successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      // Primeiro fazer login
      await act(async () => {
        await result.current.login('test@test.com', '123456');
      });
      
      expect(result.current.user).not.toBeNull();
      
      // Depois fazer logout
      await act(async () => {
        await result.current.logout();
      });
      
      expect(result.current.user).toBeNull();
    });

    it('should remove user from AsyncStorage after logout', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('test@test.com', '123456');
      });
      
      await act(async () => {
        await result.current.logout();
      });
      
      const storedUser = await AsyncStorage.getItem('@user');
      expect(storedUser).toBeNull();
    });

    it('should handle logout errors', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('test@test.com', '123456');
      });
      
      // Simular erro no AsyncStorage
      jest.spyOn(AsyncStorage, 'removeItem').mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(
        act(async () => {
          await result.current.logout();
        })
      ).rejects.toThrow();
    });
  });

  describe('Persistência de Sessão', () => {
    it('should load user from AsyncStorage on mount', async () => {
      const mockUser = {
        id: '1',
        email: 'stored@test.com',
        name: 'Stored User',
        role: 'user',
      };
      
      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.user).not.toBeNull();
      expect(result.current.user?.email).toBe('stored@test.com');
      expect(result.current.user?.name).toBe('Stored User');
    });

    it('should handle corrupted data in AsyncStorage', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      await AsyncStorage.setItem('@user', 'invalid json');
      
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
      
      consoleSpy.mockRestore();
    });
  });

  describe('User Properties', () => {
    it('should have correct user structure after login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      
      await act(async () => {
        await result.current.login('test@test.com', '123456');
      });
      
      expect(result.current.user).toHaveProperty('id');
      expect(result.current.user).toHaveProperty('email');
      expect(result.current.user).toHaveProperty('name');
      expect(result.current.user).toHaveProperty('role');
      
      expect(typeof result.current.user?.id).toBe('string');
      expect(typeof result.current.user?.email).toBe('string');
      expect(typeof result.current.user?.name).toBe('string');
      expect(typeof result.current.user?.role).toBe('string');
    });
  });
});
