// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../services/api/authApi';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'OPERATOR' | 'USER' | 'VISITOR';
  cpf?: string;
  phone?: string;
  entityId?: string;
  isActive: boolean;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await authApi.isAuthenticated();
      
      if (isAuthenticated) {
        const userData = await authApi.getUserData();
        if (userData) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await authApi.login({ email, password });

      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role as 'SUPERADMIN' | 'ADMIN' | 'OPERATOR' | 'USER' | 'VISITOR',
        cpf: response.user.cpf,
        phone: response.user.phone,
        entityId: response.user.entityId,
        isActive: true,
      };

      setUser(userData);

      console.log('Login bem-sucedido:', response.user.name);

    } catch (error: any) {
      console.error('Erro no login:', error.message || error);
      throw new Error(error.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      setUser(null);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userData']);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
