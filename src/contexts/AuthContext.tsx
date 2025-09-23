// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir a interface do User
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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

  // Verificar se usuário está logado ao iniciar o app
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

const login = async (email: string, password: string) => {
  try {
    setIsLoading(true);

    // =========================
    // Validação comentada para teste
    // =========================
    /*
    const validEmail = 'teste@teste.com';
    const validPassword = '123456';

    if (email !== validEmail || password !== validPassword) {
      throw new Error('Email ou senha inválidos');
    }
    */

    // Simular API call - mantém o login com qualquer usuário
    const mockUser: User = {
      id: '1',
      email: email,
      name: 'Usuário Teste',
      role: 'user',
    };

    await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
    setUser(mockUser);

  } catch (error: any) {
    console.error('Erro no login:', error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  // ✅ CORREÇÃO: Retornar o Provider com value
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