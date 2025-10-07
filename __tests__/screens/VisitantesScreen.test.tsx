// __tests__/screens/VisitantesScreen.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import VisitantesScreen from '../../src/screens/visitantes/VisitantesScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

describe('VisitantesScreen', () => {
  it('should render screen title', () => {
    const { getByText } = render(
      <VisitantesScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Visitantes')).toBeTruthy();
  });

  it('should render subtitle', () => {
    const { getByText } = render(
      <VisitantesScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Aqui você pode gerenciar os visitantes.')).toBeTruthy();
  });

  it('should render back button', () => {
    const { getByText } = render(
      <VisitantesScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Voltar para Home')).toBeTruthy();
  });
});
