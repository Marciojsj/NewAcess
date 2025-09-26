import React from 'react';
import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Breakpoints responsivos
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Detectar tipo de dispositivo
export const deviceType = {
  isMobile: screenWidth < breakpoints.tablet,
  isTablet: screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop,
  isDesktop: screenWidth >= breakpoints.desktop,
  isWeb: Platform.OS === 'web',
};

// Função para valores responsivos
export const responsive = {
  width: (percentage: number) => (screenWidth * percentage) / 100,
  height: (percentage: number) => (screenHeight * percentage) / 100,
  
  // Padding responsivo
  padding: {
    xs: deviceType.isMobile ? 8 : 12,
    sm: deviceType.isMobile ? 12 : 16,
    md: deviceType.isMobile ? 16 : 20,
    lg: deviceType.isMobile ? 20 : 24,
    xl: deviceType.isMobile ? 24 : 32,
  },
  
  // Font sizes responsivos
  fontSize: {
    xs: deviceType.isMobile ? 12 : 14,
    sm: deviceType.isMobile ? 14 : 16,
    md: deviceType.isMobile ? 16 : 18,
    lg: deviceType.isMobile ? 18 : 20,
    xl: deviceType.isMobile ? 20 : 24,
    xxl: deviceType.isMobile ? 24 : 32,
  },
  
  // Espaçamentos
  spacing: {
    xs: deviceType.isMobile ? 4 : 6,
    sm: deviceType.isMobile ? 8 : 12,
    md: deviceType.isMobile ? 12 : 16,
    lg: deviceType.isMobile ? 16 : 20,
    xl: deviceType.isMobile ? 20 : 24,
  },
};

// Hook para detectar mudanças de orientação
export const useResponsive = () => {
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    
    return () => subscription?.remove();
  }, []);
  
  return {
    ...dimensions,
    isMobile: dimensions.width < breakpoints.tablet,
    isTablet: dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.desktop,
    isDesktop: dimensions.width >= breakpoints.desktop,
  };
};

// Função para estilos condicionais baseados na plataforma
export const platformStyles = (webStyle: any, mobileStyle: any) => {
  return Platform.OS === 'web' ? webStyle : mobileStyle;
};