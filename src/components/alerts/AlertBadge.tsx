/**
 * Alert Badge Component
 * Badge para mostrar contagem de alertas ativos
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AlertBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
}

export const AlertBadge: React.FC<AlertBadgeProps> = ({ count, size = 'medium' }) => {
  if (count === 0) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 16, height: 16, fontSize: 10 };
      case 'large':
        return { width: 32, height: 32, fontSize: 16 };
      default:
        return { width: 24, height: 24, fontSize: 12 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          width: sizeStyles.width,
          height: sizeStyles.height,
          borderRadius: sizeStyles.width / 2,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
