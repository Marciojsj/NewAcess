import { StyleSheet } from 'react-native';
import { Theme, lightTheme, darkTheme } from '../contexts/ThemeContext';

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

/**
 * Retorna a cor de contraste (preto ou branco) baseada na luminosidade da cor
 */
export const getContrastColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Fórmula de luminosidade
  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminosity > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Converte cor hex para rgba
 */
export const hexToRgba = (hex: string, opacity: number = 1): string => {
  const hexClean = hex.replace('#', '');
  
  let r, g, b;
  
  if (hexClean.length === 3) {
    r = parseInt(hexClean[0] + hexClean[0], 16);
    g = parseInt(hexClean[1] + hexClean[1], 16);
    b = parseInt(hexClean[2] + hexClean[2], 16);
  } else {
    r = parseInt(hexClean.substr(0, 2), 16);
    g = parseInt(hexClean.substr(2, 2), 16);
    b = parseInt(hexClean.substr(4, 2), 16);
  }
  
  const alpha = Math.max(0, Math.min(1, opacity));
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Clareia uma cor em uma porcentagem
 */
export const lightenColor = (hex: string, percent: number): string => {
  const hexClean = hex.replace('#', '');
  const num = parseInt(hexClean, 16);
  
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * (percent / 100)));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * (percent / 100)));
  const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * (percent / 100)));
  
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
};

/**
 * Escurece uma cor em uma porcentagem
 */
export const darkenColor = (hex: string, percent: number): string => {
  const hexClean = hex.replace('#', '');
  const num = parseInt(hexClean, 16);
  
  const r = Math.max(0, Math.floor((num >> 16) * (1 - percent / 100)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - percent / 100)));
  const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - percent / 100)));
  
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
};

/**
 * Verifica se uma cor é clara
 */
export const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminosity > 0.5;
};

/**
 * Retorna as cores do tema especificado
 */
export const getThemeColors = (theme: 'dark' | 'light'): Theme => {
  return theme === 'dark' ? darkTheme : lightTheme;
};