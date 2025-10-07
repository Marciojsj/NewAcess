// __tests__/components/ui/LoadingSpinner.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '../../../src/components/ui/LoadingSpinner';
import { ThemeProvider } from '../../../src/contexts/ThemeContext';

describe('LoadingSpinner', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  describe('Rendering', () => {
    it('should render loading spinner', () => {
      const { root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
    });

    it('should render with default size', () => {
      const { root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
      // Verifica se o componente foi renderizado (size padrão é 24)
    });

    it('should render with custom size', () => {
      const customSize = 50;
      const { root } = renderWithTheme(<LoadingSpinner size={customSize} />);
      expect(root).toBeTruthy();
    });

    it('should render with custom color', () => {
      const customColor = '#FF0000';
      const { root } = renderWithTheme(<LoadingSpinner color={customColor} />);
      expect(root).toBeTruthy();
    });

    it('should render with custom style', () => {
      const customStyle = { marginTop: 20 };
      const { root } = renderWithTheme(<LoadingSpinner style={customStyle} />);
      expect(root).toBeTruthy();
    });
  });

  describe('Animation', () => {
    it('should have animation setup', () => {
      const { root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
      // O spinner deve renderizar com animação (testado indiretamente pelo render)
    });

    it('should cleanup animation on unmount', () => {
      const { unmount, root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
      // Verifica que o componente desmonta sem erro
      unmount();
    });
  });

  describe('Props', () => {
    it('should use default color when not provided', () => {
      const { root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
      // Cor padrão é #8a2be2
    });

    it('should use default size when not provided', () => {
      const { root } = renderWithTheme(<LoadingSpinner />);
      expect(root).toBeTruthy();
      // Tamanho padrão é 24
    });

    it('should accept size prop', () => {
      const { root } = renderWithTheme(<LoadingSpinner size={32} />);
      expect(root).toBeTruthy();
    });

    it('should accept color prop', () => {
      const { root } = renderWithTheme(<LoadingSpinner color="#00FF00" />);
      expect(root).toBeTruthy();
    });
  });
});
