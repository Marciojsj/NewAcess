// __tests__/screens/RelatoriosScreen.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import RelatoriosScreen from '../../src/screens/relatorios/RelatoriosScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

describe('RelatoriosScreen', () => {
  it('should render screen title', () => {
    const { getByText } = render(
      <RelatoriosScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Relatórios')).toBeTruthy();
  });

  it('should render subtitle', () => {
    const { getByText } = render(
      <RelatoriosScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Aqui você pode acessar os relatórios de acesso.')).toBeTruthy();
  });

  it('should render back button', () => {
    const { getByText } = render(
      <RelatoriosScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Voltar para Home')).toBeTruthy();
  });
});
