import React, { useRef, useEffect } from 'react';
import { View, Animated, Dimensions, ViewStyle } from 'react-native';
import { deviceType } from '../utils/responsive';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AnimatedBackgroundProps {
  style?: ViewStyle;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ style }) => {
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  const circle3Anim = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de rotação contínua para os círculos
    const rotationAnimation1 = Animated.loop(
      Animated.timing(circle1Anim, {
        toValue: 1,
        duration: 25000,
        useNativeDriver: true,
      })
    );

    const rotationAnimation2 = Animated.loop(
      Animated.timing(circle2Anim, {
        toValue: 1,
        duration: 35000,
        useNativeDriver: true,
      })
    );

    const rotationAnimation3 = Animated.loop(
      Animated.timing(circle3Anim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Animação de flutuação vertical
    const floatAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    // Iniciar todas as animações
    rotationAnimation1.start();
    rotationAnimation2.start();
    rotationAnimation3.start();
    floatAnimation1.start();
    floatAnimation2.start();
    floatAnimation3.start();

    return () => {
      rotationAnimation1.stop();
      rotationAnimation2.stop();
      rotationAnimation3.stop();
      floatAnimation1.stop();
      floatAnimation2.stop();
      floatAnimation3.stop();
    };
  }, []);

  const rotate1 = circle1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotate2 = circle2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const rotate3 = circle3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY1 = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const translateY2 = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  const translateY3 = floatAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  if (deviceType.isDesktop) {
    return null; // Não mostrar no desktop para manter clean
  }

  return (
    <View style={[styles.container, style]}>
      {/* Círculo 1 - Grande, canto superior esquerdo */}
      <Animated.View
        style={[
          styles.circle,
          styles.circle1,
          {
            transform: [
              { rotate: rotate1 },
              { translateY: translateY1 },
            ],
          },
        ]}
      />

      {/* Círculo 2 - Médio, centro direita */}
      <Animated.View
        style={[
          styles.circle,
          styles.circle2,
          {
            transform: [
              { rotate: rotate2 },
              { translateY: translateY2 },
            ],
          },
        ]}
      />

      {/* Círculo 3 - Pequeno, canto inferior esquerdo */}
      <Animated.View
        style={[
          styles.circle,
          styles.circle3,
          {
            transform: [
              { rotate: rotate3 },
              { translateY: translateY3 },
            ],
          },
        ]}
      />

      {/* Círculos adicionais para mais profundidade */}
      <View style={[styles.staticCircle, styles.staticCircle1]} />
      <View style={[styles.staticCircle, styles.staticCircle2]} />
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden' as const,
  },
  circle: {
    position: 'absolute' as const,
    borderWidth: 2,
    borderRadius: 999,
  },
  circle1: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderColor: 'rgba(138, 43, 226, 0.15)',
    top: -screenWidth * 0.3,
    left: -screenWidth * 0.2,
  },
  circle2: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderColor: 'rgba(138, 43, 226, 0.1)',
    top: screenHeight * 0.3,
    right: -screenWidth * 0.2,
  },
  circle3: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderColor: 'rgba(138, 43, 226, 0.2)',
    bottom: screenHeight * 0.1,
    left: -screenWidth * 0.1,
  },
  staticCircle: {
    position: 'absolute' as const,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  staticCircle1: {
    width: screenWidth * 1.2,
    height: screenWidth * 1.2,
    top: screenHeight * 0.1,
    left: -screenWidth * 0.1,
  },
  staticCircle2: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    bottom: -screenWidth * 0.1,
    right: screenWidth * 0.1,
  },
};