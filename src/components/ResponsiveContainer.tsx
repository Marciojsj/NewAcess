import React from 'react';
import { View, ViewStyle } from 'react-native';
import { responsive, deviceType } from '../utils/responsive';

// Interface para props do container responsivo
// Define todas as opções de configuração disponíveis
interface ResponsiveContainerProps {
  // Conteúdo a ser renderizado dentro do container
  children: React.ReactNode;
  // Estilos adicionais opcionais para customização
  style?: ViewStyle;
  // Largura máxima em pixels - padrão 1200px para boa legibilidade
  maxWidth?: number;
  // Flag para centralizar conteúdo horizontalmente - padrão true
  centerContent?: boolean;
}

// Componente container responsivo - adapta layout baseado no tipo de dispositivo
// Fornece padding consistente e controla largura máxima em telas grandes
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  // Largura máxima padrão de 1200px - valor otimizado para legibilidade
  maxWidth = 1200,
  // Centralização ativada por padrão para melhor apresentação
  centerContent = true,
}) => {
  // Configuração do estilo do container baseado nas props e tipo de dispositivo
  const containerStyle: ViewStyle = {
    // Largura total disponível como base
    width: '100%',
    // Padding horizontal responsivo - ajustado automaticamente por dispositivo
    paddingHorizontal: responsive.padding.md,
    // Configurações específicas para desktop
    ...(deviceType.isDesktop && {
      // Limita largura máxima para evitar linhas muito longas
      maxWidth,
      // Centralização condicional baseada na prop
      alignSelf: centerContent ? 'center' : 'flex-start',
    }),
    // Merge com estilos customizados passados via props
    ...style,
  };

  // Renderiza View com estilos calculados e children
  return <View style={containerStyle}>{children}</View>;
};