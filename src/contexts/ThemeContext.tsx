// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  // Cores de fundo
  background: string;
  backgroundSecondary: string;
  backgroundCard: string;
  backgroundOverlay: string;
  
  // Cores de texto
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Cores de borda e separadores
  border: string;
  borderLight: string;
  divider: string;
  
  // Cores principais
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Cores de estado
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  
  // Cores específicas
  purple: string;
  purpleLight: string;
  blue: string;
  blueLight: string;
  green: string;
  greenLight: string;
  orange: string;
  orangeLight: string;
  
  // Efeitos
  shadow: string;
  overlay: string;
  glow: string;
  
  // Gradientes
  gradientPrimary: string[];
  gradientSuccess: string[];
  gradientWarning: string[];
  gradientError: string[];
  gradientPurple: string[];
  gradientBlue: string[];
}

export const lightTheme: Theme = {
  // Cores de fundo
  background: '#f5f5f7',
  backgroundSecondary: '#ffffff',
  backgroundCard: '#ffffff',
  backgroundOverlay: 'rgba(255,255,255,0.9)',
  
  // Cores de texto
  text: '#878791ff',
  textSecondary: '#6e6e73',
  textTertiary: '#86868b',
  textInverse: '#ffffff',
  
  // Cores de borda e separadores
  border: '#d2d2d7',
  borderLight: '#e5e5ea',
  divider: '#dee2e6',
  
  // Cores principais
  primary: '#007aff',
  primaryLight: '#4da3ff',
  primaryDark: '#0056b3',
  
  // Cores de estado
  success: '#34c759',
  successLight: '#34ce57',
  warning: '#ff9500',
  warningLight: '#ffd54f',
  error: '#ff4757',
  errorLight: '#e57373',
  info: '#17a2b8',
  infoLight: '#4fc3f7',
  
  // Cores específicas
  purple: '#8a2be2',
  purpleLight: '#9d7bd6',
  blue: '#0071e3',
  blueLight: '#4dabf7',
  green: '#00b894',
  greenLight: '#51cf9e',
  orange: '#e17055',
  orangeLight: '#ffa94d',
  
  // Efeitos
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  glow: 'rgba(0, 122, 255, 0.3)',
  
  // Gradientes
  gradientPrimary: ['#007aff', '#0056b3'],
  gradientSuccess: ['#34c759', '#00b894'],
  gradientWarning: ['#ff9500', '#e17055'],
  gradientError: ['#ff4757', '#ff3b30'],
  gradientPurple: ['#8a2be2', '#6f42c1'],
  gradientBlue: ['#0071e3', '#0056b3'],
};

export const darkTheme: Theme = {
  // Cores de fundo
  background: '#1a1d2e',
  backgroundSecondary: '#252842',
  backgroundCard: '#2d3148',
  backgroundOverlay: 'rgba(37, 40, 66, 0.95)',
  
  // Cores de texto
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  textTertiary: 'rgba(255,255,255,0.5)',
  textInverse: '#1a1d2e',
  
  // Cores de borda e separadores
  border: 'rgba(255,255,255,0.15)',
  borderLight: 'rgba(255,255,255,0.1)',
  divider: 'rgba(255,255,255,0.12)',
  
  // Cores principais
  primary: '#0a84ff',
  primaryLight: '#4da3ff',
  primaryDark: '#0077e6',
  
  // Cores de estado
  success: '#30d158',
  successLight: '#34ce57',
  warning: '#ff9f0a',
  warningLight: '#ffd54f',
  error: '#ff453a',
  errorLight: '#ff6b6b',
  info: '#5ac8fa',
  infoLight: '#4fc3f7',
  
  // Cores específicas
  purple: '#bf5af2',
  purpleLight: '#d8a8ff',
  blue: '#0a84ff',
  blueLight: '#64b5f6',
  green: '#32d74b',
  greenLight: '#69db7c',
  orange: '#ff9f0a',
  orangeLight: '#ffb74d',
  
  // Efeitos
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  glow: 'rgba(10, 132, 255, 0.4)',
  
  // Gradientes
  gradientPrimary: ['#0a84ff', '#0077e6'],
  gradientSuccess: ['#30d158', '#32d74b'],
  gradientWarning: ['#ff9f0a', '#ff9500'],
  gradientError: ['#ff453a', '#dc3545'],
  gradientPurple: ['#bf5af2', '#9d4edd'],
  gradientBlue: ['#0a84ff', '#0071e3'],
};

interface ThemeContextData {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Erro ao carregar preferência de tema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};