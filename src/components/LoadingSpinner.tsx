import React, { useRef, useEffect } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { responsive } from '../utils/responsive';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = '#8a2be2',
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    
    spinAnimation.start();
    
    return () => spinAnimation.stop();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: color,
          borderTopColor: 'transparent',
          borderRadius: size / 2,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};