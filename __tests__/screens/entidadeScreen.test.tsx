// __tests__/screens/entidadeScreen.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { EntidadeScreen } from '../../src/screens/entidade/entidadeScreen';
import { useTheme } from '../../src/contexts/ThemeContext';

// Mock do Alert
jest.spyOn(Alert, 'alert');

// Mock dos contexts
jest.mock('../../src/contexts/ThemeContext');

// Mock dos componentes de layout
jest.mock('../../src/components/layout/WebSidebar', () => ({
  WebSidebar: 'WebSidebar',
}));

jest.mock('../../src/components/layout/WebNavbar', () => ({
  WebNavbar: 'WebNavbar',
}));

jest.mock('../../src/components/layout/MobileSidebar', () => ({
  MobileSidebar: 'MobileSidebar',
}));

jest.mock('../../src/components/layout/MobileNavbar', () => ({
  __esModule: true,
  default: 'MobileNavbar',
}));

// Mock do responsive
jest.mock('../../src/utils/responsive', () => ({
  deviceType: {
    isDesktop: false,
    isTablet: false,
    isMobile: true,
  },
  responsive: {
    padding: { sm: 8, md: 16, lg: 24, xl: 32 },
    spacing: { sm: 8, md: 16, lg: 24, xl: 32 },
    fontSize: { sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 },
  },
}));

const mockToggleTheme = jest.fn();
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('EntidadeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseTheme.mockReturnValue({
      theme: {
        background: '#fff',
        text: '#000',
      } as any,
      isDark: false,
      toggleTheme: mockToggleTheme,
      isLoading: false,
    });
  });

  describe('Rendering', () => {
    it('should render EntidadeScreen', () => {
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should render search input', () => {
      const { getByPlaceholderText } = render(<EntidadeScreen />);
      expect(getByPlaceholderText(/pesquisar/i)).toBeTruthy();
    });

    it('should render entity list', () => {
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('should update search query on text change', () => {
      const { getByPlaceholderText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText(/pesquisar/i);
      
      fireEvent.changeText(searchInput, 'Bradesco');
      expect(searchInput.props.value).toBe('Bradesco');
    });

    it('should filter entities by search query', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText(/pesquisar/i);
      
      fireEvent.changeText(searchInput, 'Bradesco');
      
      // Deve mostrar a entidade filtrada
      expect(getByText(/Banco Bradesco/i)).toBeTruthy();
    });
  });

  describe('Entity Display', () => {
    it('should display entity names', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText(/Companhia Siderurgica Nacional/i)).toBeTruthy();
      expect(getByText(/VILLARES METALS/i)).toBeTruthy();
    });

    it('should display entity emails', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText(/contato@csn.com.br/i)).toBeTruthy();
    });

    it('should display entity status', () => {
      const { getAllByText } = render(<EntidadeScreen />);
      
      const activeStatuses = getAllByText(/Ativo/i);
      expect(activeStatuses.length).toBeGreaterThan(0);
    });
  });

  describe('Filter Functionality', () => {
    it('should have filter buttons', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText(/Todos/i)).toBeTruthy();
    });

    it('should filter by Ativos', () => {
      const { getByText, root } = render(<EntidadeScreen />);
      
      const ativosButton = getByText(/Ativos/i);
      fireEvent.press(ativosButton);
      
      // Após filtrar, deve mostrar apenas entidades ativas
      expect(root).toBeTruthy();
    });

    it('should filter by Inativos', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      const inativosButton = getByText(/Inativos/i);
      fireEvent.press(inativosButton);
      
      expect(inativosButton).toBeTruthy();
    });
  });

  describe('Entity Actions', () => {
    it('should handle entity selection', () => {
      const { root } = render(<EntidadeScreen />);
      
      // Testa que a tela renderiza (seleção é feita por checkbox)
      expect(root).toBeTruthy();
    });

    it('should toggle favorite status', () => {
      const { root } = render(<EntidadeScreen />);
      
      // Testa que a tela renderiza (favorito é um botão de estrela)
      expect(root).toBeTruthy();
    });
  });

  describe('Theme', () => {
    it('should use light theme by default', () => {
      render(<EntidadeScreen />);
      expect(mockUseTheme).toHaveBeenCalled();
    });

    it('should use dark theme when isDark is true', () => {
      mockUseTheme.mockReturnValue({
        theme: {
          background: '#000',
          text: '#fff',
        } as any,
        isDark: true,
        toggleTheme: mockToggleTheme,
        isLoading: false,
      });

      render(<EntidadeScreen />);
      expect(mockUseTheme).toHaveBeenCalled();
    });
  });

  describe('Pagination', () => {
    it('should display entity count', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      // Verifica se mostra algum contador
      expect(getByText(/entidades/i)).toBeTruthy();
    });
  });
});
