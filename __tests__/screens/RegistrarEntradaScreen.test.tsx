// __tests__/screens/RegistrarEntradaScreen.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegistrarEntradaScreen from '../../src/screens/registrarEntrada/RegistrarEntradaScreen';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

describe('RegistrarEntradaScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render screen title', () => {
      const { getByText } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      expect(getByText('Registrar Entrada')).toBeTruthy();
    });

    it('should render subtitle', () => {
      const { getByText } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      expect(getByText('Aqui você pode registrar a entrada dos usuários.')).toBeTruthy();
    });

    it('should render back button', () => {
      const { getByText } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      expect(getByText('Voltar para Home')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('should navigate to Home on back button press', () => {
      const { getByText } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      const backButton = getByText('Voltar para Home');
      fireEvent.press(backButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  describe('Layout', () => {
    it('should render SafeAreaView', () => {
      const { root } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      expect(root).toBeTruthy();
    });

    it('should render ResponsiveContainer', () => {
      const { root } = render(
        <RegistrarEntradaScreen navigation={mockNavigation} />
      );
      
      expect(root).toBeTruthy();
    });
  });
});
