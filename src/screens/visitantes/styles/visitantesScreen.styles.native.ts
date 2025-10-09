/**
 * Estilos NATIVE (Mobile)
 * Otimizado para smartphones
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  grid: {
    gap: 12,
  },
  gridItem: {
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
