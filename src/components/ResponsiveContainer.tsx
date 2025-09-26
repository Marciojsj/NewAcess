import React from 'react';
import { View, ViewStyle } from 'react-native';
import { responsive, deviceType } from '../utils/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
  centerContent?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  maxWidth = 1200,
  centerContent = true,
}) => {
  const containerStyle: ViewStyle = {
    width: '100%',
    paddingHorizontal: responsive.padding.md,
    ...(deviceType.isDesktop && {
      maxWidth,
      alignSelf: centerContent ? 'center' : 'flex-start',
    }),
    ...style,
  };

  return <View style={containerStyle}>{children}</View>;
};