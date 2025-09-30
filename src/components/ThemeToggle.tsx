import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  size?: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 50 }) => {
  const { isDark, toggleTheme, theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start();
  }, [isDark]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, size - 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#34c759', '#5e5ce6'],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={[styles.container, { width: size, height: size / 2 }]}
    >
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: theme.backgroundSecondary,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            {isDark ? (
              <View style={styles.moonIcon} />
            ) : (
              <View style={styles.sunIcon}>
                {[...Array(8)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.sunRay,
                      {
                        transform: [{ rotate: `${i * 45}deg` }],
                      },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunRay: {
    position: 'absolute',
    width: 2,
    height: 4,
    backgroundColor: '#ff9500',
    borderRadius: 1,
  },
  moonIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5e5ce6',
    shadowColor: '#5e5ce6',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});