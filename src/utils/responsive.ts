import React from 'react';
import { Dimensions, Platform } from 'react-native';

// Captura das dimensões atuais da tela para cálculos responsivos
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Definição dos breakpoints responsivos - pontos de quebra para diferentes layouts
// Valores ajustados baseados em padrões da indústria para melhor experiência
export const breakpoints = {
  // Mobile: 0-767px - dispositivos móveis em portrait
  mobile: 0,
  // Tablet: 768-1023px - tablets e móveis em landscape
  tablet: 768,
  // Desktop: 1024-1439px - laptops e monitores pequenos
  desktop: 1024,
  // Large Desktop: 1440px+ - monitores grandes e ultra-wide
  largeDesktop: 1440,
};

// Detecção automática do tipo de dispositivo baseado na largura da tela
// Permite ajustes específicos de layout e comportamento
export const deviceType = {
  // Mobile: largura menor que 768px
  isMobile: screenWidth < breakpoints.tablet,
  // Tablet: largura entre 768px e 1023px
  isTablet: screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop,
  // Desktop: largura maior ou igual a 1024px
  isDesktop: screenWidth >= breakpoints.desktop,
  // Web: plataforma web (independente do tamanho)
  isWeb: Platform.OS === 'web',
};

// Sistema de valores responsivos - funções utilitárias para dimensionamento
export const responsive = {
  // Cálculo de largura baseado em porcentagem da tela
  width: (percentage: number) => (screenWidth * percentage) / 100,
  // Cálculo de altura baseado em porcentagem da tela
  height: (percentage: number) => (screenHeight * percentage) / 100,
  
  // Sistema de padding responsivo - valores ajustados por tipo de dispositivo
  // Mobile recebe valores menores, desktop valores maiores para melhor proporção
  padding: {
    // Extra Small: 8px mobile, 12px desktop - para espaçamentos mínimos
    xs: deviceType.isMobile ? 8 : 12,
    // Small: 12px mobile, 16px desktop - para espaçamentos pequenos
    sm: deviceType.isMobile ? 12 : 16,
    // Medium: 16px mobile, 20px desktop - para espaçamentos padrão
    md: deviceType.isMobile ? 16 : 20,
    // Large: 20px mobile, 24px desktop - para espaçamentos grandes
    lg: deviceType.isMobile ? 20 : 24,
    // Extra Large: 24px mobile, 32px desktop - para espaçamentos máximos
    xl: deviceType.isMobile ? 24 : 32,
  },
  
  // Sistema de tamanhos de fonte responsivos
  // Escalas proporcionalmente para melhor legibilidade em diferentes telas
  fontSize: {
    // Extra Small: 12px mobile, 14px desktop - para textos auxiliares
    xs: deviceType.isMobile ? 12 : 14,
    // Small: 14px mobile, 16px desktop - para textos secundários
    sm: deviceType.isMobile ? 14 : 16,
    // Medium: 16px mobile, 18px desktop - para textos principais
    md: deviceType.isMobile ? 16 : 18,
    // Large: 18px mobile, 20px desktop - para subtítulos
    lg: deviceType.isMobile ? 18 : 20,
    // Extra Large: 20px mobile, 24px desktop - para títulos
    xl: deviceType.isMobile ? 20 : 24,
    // Extra Extra Large: 24px mobile, 32px desktop - para títulos principais
    xxl: deviceType.isMobile ? 24 : 32,
  },
  
  // Sistema de espaçamentos responsivos - para margins e gaps
  // Valores menores que padding para espaçamentos mais sutis
  spacing: {
    // Extra Small: 4px mobile, 6px desktop - para espaçamentos mínimos
    xs: deviceType.isMobile ? 4 : 6,
    // Small: 8px mobile, 12px desktop - para espaçamentos pequenos
    sm: deviceType.isMobile ? 8 : 12,
    // Medium: 12px mobile, 16px desktop - para espaçamentos padrão
    md: deviceType.isMobile ? 12 : 16,
    // Large: 16px mobile, 20px desktop - para espaçamentos grandes
    lg: deviceType.isMobile ? 16 : 20,
    // Extra Large: 20px mobile, 24px desktop - para espaçamentos máximos
    xl: deviceType.isMobile ? 20 : 24,
  },
};

// Hook personalizado para detectar mudanças de orientação e redimensionamento
// Atualiza automaticamente os valores quando a tela muda (rotação, redimensionamento)
export const useResponsive = () => {
  // Estado local para armazenar dimensões atuais
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  
  React.useEffect(() => {
    // Listener para mudanças nas dimensões da tela
    // Atualiza o estado sempre que a tela for redimensionada
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    
    // Cleanup do listener para evitar memory leaks
    return () => subscription?.remove();
  }, []);
  
  // Retorna dimensões atuais e flags de tipo de dispositivo recalculadas
  return {
    // Spread das dimensões atuais (width, height, scale, fontScale)
    ...dimensions,
    // Recálculo dos tipos de dispositivo baseado nas dimensões atuais
    isMobile: dimensions.width < breakpoints.tablet,
    isTablet: dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.desktop,
    isDesktop: dimensions.width >= breakpoints.desktop,
  };
};

// Função utilitária para estilos condicionais baseados na plataforma
// Permite diferentes estilos para web e mobile de forma limpa
export const platformStyles = (webStyle: any, mobileStyle: any) => {
  return Platform.OS === 'web' ? webStyle : mobileStyle;
};