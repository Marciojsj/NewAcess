// __tests__/screens/RegistrarSaidaScreen.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import RegistrarSaidaScreen from '../../src/screens/registrarSaida/RegistrarSaidaScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

describe('RegistrarSaidaScreen', () => {
  it('should render screen title', () => {
    const { getByText } = render(
      <RegistrarSaidaScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Registrar Saída')).toBeTruthy();
  });

  it('should render subtitle', () => {
    const { getByText } = render(
      <RegistrarSaidaScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Aqui você pode registrar a saída dos usuários.')).toBeTruthy();
  });

  it('should render back button', () => {
    const { getByText } = render(
      <RegistrarSaidaScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Voltar para Home')).toBeTruthy();
  });
});
