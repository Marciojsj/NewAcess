import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { responsive, deviceType } from '../../utils/responsive';

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: ViewStyle;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  error,
  focused = false,
  onFocus,
  onBlur,
  containerStyle,
  ...textInputProps
}) => {
  const labelAnim = useRef(new Animated.Value(textInputProps.value ? 1 : 0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação do label
    Animated.timing(labelAnim, {
      toValue: focused || textInputProps.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Animação da borda
    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused, textInputProps.value]);

  useEffect(() => {
    if (error) {
      // Animação de shake quando há erro
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [error]);

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -8],
  });

  const labelFontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.2)', '#8a2be2'],
  });

  const backgroundColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.05)', 'rgba(138, 43, 226, 0.1)'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        { transform: [{ translateX: shakeAnim }] },
      ]}
    >
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? '#ff4757' : borderColor,
            backgroundColor: error ? 'rgba(255, 71, 87, 0.1)' : backgroundColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            {
              top: labelTop,
              fontSize: labelFontSize,
              color: error ? '#ff4757' : focused ? '#8a2be2' : '#999',
            },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          {...textInputProps}
          style={[styles.input, textInputProps.style]}
          onFocus={() => {
            onFocus?.();
          }}
          onBlur={() => {
            onBlur?.();
          }}
          placeholderTextColor="transparent"
        />
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

const styles = {
  container: {
    marginBottom: responsive.spacing.lg,
  } as ViewStyle,
  inputContainer: {
    position: 'relative' as const,
    borderWidth: 2,
    borderRadius: 12,
    height: deviceType.isDesktop ? 60 : 56,
    justifyContent: 'center' as const,
  } as ViewStyle,
  label: {
    position: 'absolute' as const,
    left: responsive.padding.md,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 4,
    fontWeight: '500' as const,
    zIndex: 1,
  } as TextStyle,
  input: {
    height: '100%',
    paddingHorizontal: responsive.padding.md,
    fontSize: responsive.fontSize.md,
    color: '#ffffff',
    outlineStyle: 'none' as any, // Para web
  } as TextStyle,
  errorText: {
    color: '#ff4757',
    fontSize: responsive.fontSize.sm,
    marginTop: responsive.spacing.xs,
    marginLeft: responsive.spacing.xs,
  } as TextStyle,
};