// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface do usuário - define a estrutura dos dados do usuário logado
// Campos essenciais para controle de acesso e personalização
interface User {
  // ID único do usuário para identificação no sistema
  id: string;
  // Email para login e comunicação
  email: string;
  // Nome para personalização da interface
  name: string;
  // Role para controle de permissões (user, admin, etc.)
  role: string;
}

// Interface do contexto de autenticação - define todas as funcionalidades disponíveis
interface AuthContextData {
  // Estado atual do usuário (null se não logado)
  user: User | null;
  // Função de login - retorna Promise para tratamento assíncrono
  login: (email: string, password: string) => Promise<void>;
  // Função de logout - limpa dados do usuário
  logout: () => Promise<void>;
  // Flag de carregamento para mostrar spinners/loading states
  isLoading: boolean;
}

// Criação do contexto com valor padrão vazio
// O valor real será fornecido pelo Provider
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para usar o contexto de autenticação
// Simplifica o acesso ao contexto em componentes
export const useAuth = () => useContext(AuthContext);

// Interface para props do Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider do contexto de autenticação - gerencia estado global de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado do usuário atual - null indica não logado
  const [user, setUser] = useState<User | null>(null);
  // Estado de carregamento - true durante operações assíncronas
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para verificar autenticação persistida ao inicializar o app
  // Executa apenas uma vez na montagem do componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Função para verificar status de autenticação no AsyncStorage
  // Recupera dados do usuário salvos localmente
  const checkAuthStatus = async () => {
    try {
      // Busca dados do usuário no storage local
      // Chave '@user' para identificação única
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        // Parse dos dados JSON e atualização do estado
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      // Sempre define loading como false, independente do resultado
      setIsLoading(false);
    }
  };

// Função de login - autentica usuário e salva dados localmente
const login = async (email: string, password: string) => {
  try {
    // Ativa estado de carregamento durante o processo
    setIsLoading(true);

    // ========================================================================
    // Validação de credenciais específicas comentada para facilitar testes
    // Em ambiente de produção, esta validação seria feita no backend
    // ========================================================================
    /*
    const validEmail = 'teste@teste.com';
    const validPassword = '123456';

    if (email !== validEmail || password !== validPassword) {
      throw new Error('Email ou senha inválidos');
    }
    */

    // Simulação de chamada de API - aceita qualquer combinação de email/senha
    // Em produção, aqui seria feita a requisição para o servidor de autenticação
    const mockUser: User = {
      id: '1',
      // Usa o email fornecido para personalização
      email: email,
      name: 'Usuário Teste',
      // Role padrão para todos os usuários
      role: 'user',
    };

    // Salva dados do usuário no AsyncStorage para persistência
    // Permite manter login entre sessões do app
    await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
    // Atualiza estado global com dados do usuário
    setUser(mockUser);

  } catch (error: any) {
    console.error('Erro no login:', error.message);
    // Propaga erro para tratamento no componente
    throw error;
  } finally {
    // Sempre desativa loading, independente do resultado
    setIsLoading(false);
  }
};


  // Função de logout - remove dados do usuário e limpa estado
  const logout = async () => {
    try {
      // Remove dados do AsyncStorage
      await AsyncStorage.removeItem('@user');
      // Limpa estado global do usuário
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      // Propaga erro para tratamento no componente
      throw error;
    }
  };

  // Provider que disponibiliza o contexto para toda a árvore de componentes
  // Value contém todas as funcionalidades e estados do contexto
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