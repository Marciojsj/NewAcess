import { StyleSheet } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (theme: Theme) => T
) => {
  return stylesFn;
};

export const getThemedColor = (theme: Theme, color: keyof Theme): string => {
  return theme[color];
};