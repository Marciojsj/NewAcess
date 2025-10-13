/**
 * Componente Toast para feedback visual
 * Mostra mensagens de sucesso, erro, warning e info
 */

import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const { theme } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Animação de entrada
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide após duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  if (!visible) return null;

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          background: '#10B981',
          text: '#FFFFFF',
          icon: '✅',
        };
      case 'error':
        return {
          background: '#EF4444',
          text: '#FFFFFF',
          icon: '❌',
        };
      case 'warning':
        return {
          background: '#F59E0B',
          text: '#FFFFFF',
          icon: '⚠️',
        };
      case 'info':
      default:
        return {
          background: '#3B82F6',
          text: '#FFFFFF',
          icon: 'ℹ️',
        };
    }
  };

  const colors = getColors();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text style={styles.icon}>{colors.icon}</Text>
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 60,
    left: 20,
    right: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
    ...(Platform.OS === 'web' && {
      maxWidth: 500,
      alignSelf: 'center',
      left: 'auto',
      right: 'auto',
    }),
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});
