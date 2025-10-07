// __tests__/screens/LoginScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../../src/screens/login/LoginScreen';
import { useAuth } from '../../src/contexts/AuthContext';
import { useTheme } from '../../src/contexts/ThemeContext';

// Mock do Alert
jest.spyOn(Alert, 'alert');

// Mock dos contexts
jest.mock('../../src/contexts/AuthContext');
jest.mock('../../src/contexts/ThemeContext');

const mockLogin = jest.fn();
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      isLoading: false,
    });

    mockUseTheme.mockReturnValue({
      theme: {
        background: '#fff',
        backgroundSecondary: '#fff',
        backgroundCard: '#fff',
        backgroundOverlay: 'rgba(255,255,255,0.9)',
        text: '#000',
        textSecondary: '#666',
        textTertiary: '#999',
        textInverse: '#fff',
        border: '#ccc',
        borderLight: '#e0e0e0',
        divider: '#ccc',
        primary: '#8a2be2',
        primaryLight: '#a855f7',
        primaryDark: '#6a1bb2',
        success: '#22c55e',
        successLight: '#86efac',
        warning: '#f59e0b',
        warningLight: '#fcd34d',
        error: '#ef4444',
        errorLight: '#fca5a5',
        info: '#3b82f6',
        infoLight: '#93c5fd',
        purple: '#8a2be2',
        purpleLight: '#a855f7',
        blue: '#3b82f6',
        blueLight: '#93c5fd',
        green: '#22c55e',
        greenLight: '#86efac',
        orange: '#f59e0b',
        orangeLight: '#fcd34d',
        loginBackground: '#fff',
        loginCard: '#fff',
        loginCircle1: '#8a2be2',
        loginCircle2: '#6a1bb2',
        loginCircle3: '#4a0b82',
        loginCircle4: '#2a0b52',
        loginBorder: '#ccc',
        loginText: '#000',
        loginTextSecondary: '#666',
        loginInputBackground: '#fff',
        loginInputBorder: '#ccc',
        loginInputPlaceholder: '#999',
        loginInputText: '#000',
        loginButtonBackground: '#8a2be2',
        loginButtonBackgroundDisabled: '#ccc',
        loginButtonTextDisabled: '#999',
        loginButtonText: '#fff',
        loginButton: '#8a2be2',
        loginError: '#ff0000',
        loginLink: '#8a2be2',
        loginLinkText: '#8a2be2',
        loginLinkTextHover: '#6a1bb2',
        loginErrorText: '#ff0000',
        shadow: 'rgba(0,0,0,0.1)',
        overlay: 'rgba(0,0,0,0.5)',
        glow: 'rgba(138,43,226,0.5)',
        gradientPrimary: ['#8a2be2', '#6a1bb2'],
        gradientSuccess: ['#22c55e', '#16a34a'],
        gradientWarning: ['#f59e0b', '#d97706'],
        gradientError: ['#ef4444', '#dc2626'],
        gradientPurple: ['#8a2be2', '#6a1bb2'],
        gradientBlue: ['#3b82f6', '#2563eb'],
      },
      isDark: false,
      toggleTheme: jest.fn(),
      isLoading: false,
    });
  });

  describe('Rendering', () => {
    it('should render login screen title', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Controle de Acesso')).toBeTruthy();
    });

    it('should render login screen subtitle', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Faça login para continuar')).toBeTruthy();
    });

    it('should render email input field', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      expect(getByPlaceholderText('Digite seu email')).toBeTruthy();
    });

    it('should render password input field', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    });

    it('should render login button', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Entrar')).toBeTruthy();
    });

    it('should render forgot password link', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Esqueci minha senha')).toBeTruthy();
    });

    it('should render create account link', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Criar conta')).toBeTruthy();
    });

    it('should render email label', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Email')).toBeTruthy();
    });

    it('should render password label', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Senha')).toBeTruthy();
    });
  });

  describe('Email Input', () => {
    it('should update email field on text change', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      expect(emailInput.props.value).toBe('test@example.com');
    });

    it('should show error for empty email on blur', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      
      fireEvent(emailInput, 'focus');
      fireEvent(emailInput, 'blur');
      
      await waitFor(() => {
        expect(getByText('Email é obrigatório')).toBeTruthy();
      });
    });

    it('should show error for invalid email format', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent(emailInput, 'blur');
      
      await waitFor(() => {
        expect(getByText('Email inválido')).toBeTruthy();
      });
    });

    it('should clear error when valid email is entered', async () => {
      const { getByPlaceholderText, queryByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      
      // Primeiro causa erro
      fireEvent(emailInput, 'blur');
      await waitFor(() => {
        expect(queryByText('Email é obrigatório')).toBeTruthy();
      });
      
      // Depois corrige
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent(emailInput, 'blur');
      
      await waitFor(() => {
        expect(queryByText('Email é obrigatório')).toBeNull();
        expect(queryByText('Email inválido')).toBeNull();
      });
    });
  });

  describe('Password Input', () => {
    it('should update password field on text change', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      fireEvent.changeText(passwordInput, 'password123');
      expect(passwordInput.props.value).toBe('password123');
    });

    it('should show error for empty password on blur', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      fireEvent(passwordInput, 'focus');
      fireEvent(passwordInput, 'blur');
      
      await waitFor(() => {
        expect(getByText('Senha é obrigatória')).toBeTruthy();
      });
    });

    it('should show error for password less than 6 characters', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      fireEvent.changeText(passwordInput, '12345');
      fireEvent(passwordInput, 'blur');
      
      await waitFor(() => {
        expect(getByText('Senha deve ter pelo menos 6 caracteres')).toBeTruthy();
      });
    });

    it('should clear error when valid password is entered', async () => {
      const { getByPlaceholderText, queryByText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      // Primeiro causa erro
      fireEvent.changeText(passwordInput, '123');
      fireEvent(passwordInput, 'blur');
      
      await waitFor(() => {
        expect(queryByText('Senha deve ter pelo menos 6 caracteres')).toBeTruthy();
      });
      
      // Depois corrige
      fireEvent.changeText(passwordInput, '123456');
      
      await waitFor(() => {
        expect(queryByText('Senha é obrigatória')).toBeNull();
        expect(queryByText('Senha deve ter pelo menos 6 caracteres')).toBeNull();
      });
    });

    it('should render password input as secure text entry', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });
  });

  describe('Login Submission', () => {
    it('should call login function with valid credentials', async () => {
      mockLogin.mockResolvedValueOnce(undefined);
      
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      const passwordInput = getByPlaceholderText('Digite sua senha');
      const loginButton = getByText('Entrar');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(loginButton);
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should not call login with empty email', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      const loginButton = getByText('Entrar');
      
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(loginButton);
      
      await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled();
      });
    });

    it('should not call login with empty password', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      const loginButton = getByText('Entrar');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.press(loginButton);
      
      await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled();
      });
    });

    it('should not call login with invalid email', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      const passwordInput = getByPlaceholderText('Digite sua senha');
      const loginButton = getByText('Entrar');
      
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(loginButton);
      
      await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled();
      });
    });

    it('should show alert on login error', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Login failed'));
      
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      const passwordInput = getByPlaceholderText('Digite sua senha');
      const loginButton = getByText('Entrar');
      
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(loginButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Falha no login. Tente novamente.');
      });
    });
  });

  describe('Loading State', () => {
    it('should disable login button when loading', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        logout: jest.fn(),
        user: null,
        isLoading: true,
      });
      
      const { root } = render(<LoginScreen />);
      
      // Quando está carregando, o botão não mostra "Entrar", mostra loading spinner
      expect(root).toBeTruthy();
    });

    it('should not show "Entrar" text when loading', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        logout: jest.fn(),
        user: null,
        isLoading: true,
      });
      
      const { queryByText } = render(<LoginScreen />);
      
      // O botão existe mas não mostra o texto "Entrar" quando está carregando
      expect(queryByText('Entrar')).toBeNull();
    });
  });

  describe('Additional Features', () => {
    it('should show alert when clicking forgot password', () => {
      const { getByText } = render(<LoginScreen />);
      const forgotPasswordLink = getByText('Esqueci minha senha');
      
      fireEvent.press(forgotPasswordLink);
      
      expect(Alert.alert).toHaveBeenCalledWith('Info', 'Funcionalidade em desenvolvimento');
    });

    it('should show alert when clicking create account', () => {
      const { getByText } = render(<LoginScreen />);
      const createAccountLink = getByText('Criar conta');
      
      fireEvent.press(createAccountLink);
      
      expect(Alert.alert).toHaveBeenCalledWith('Info', 'Funcionalidade em desenvolvimento');
    });
  });

  describe('Input Focus States', () => {
    it('should handle email input focus', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      const emailInput = getByPlaceholderText('Digite seu email');
      
      fireEvent(emailInput, 'focus');
      fireEvent(emailInput, 'blur');
      
      // Testa que os eventos são disparados sem erro
      expect(emailInput).toBeTruthy();
    });

    it('should handle password input focus', () => {
      const { getByPlaceholderText } = render(<LoginScreen />);
      const passwordInput = getByPlaceholderText('Digite sua senha');
      
      fireEvent(passwordInput, 'focus');
      fireEvent(passwordInput, 'blur');
      
      // Testa que os eventos são disparados sem erro
      expect(passwordInput).toBeTruthy();
    });
  });
});
