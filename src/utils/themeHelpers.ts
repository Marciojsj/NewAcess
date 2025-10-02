import { StyleSheet } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (theme: Theme) => T
) => {
  return stylesFn;
};

// Corrigido: Aceita tanto string quanto string[]
export const getThemedColor = (theme: Theme, color: keyof Theme): string | string[] => {
  return theme[color];
};

// Nova função para cores que são sempre strings
export const getThemedSolidColor = (theme: Theme, color: keyof Theme): string => {
  const value = theme[color];
  if (Array.isArray(value)) {
    // Para gradientes, retorna a primeira cor
    return value[0];
  }
  return value;
};

// Função específica para gradientes
export const getThemedGradient = (theme: Theme, color: keyof Theme): string[] => {
  const value = theme[color];
  if (Array.isArray(value)) {
    return value;
  }
  return [value]; // Retorna array com uma cor se não for gradiente
};