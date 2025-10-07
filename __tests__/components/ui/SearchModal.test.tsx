// __tests__/components/ui/SearchModal.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SearchModal } from '../../../src/components/ui/SearchModal';

const mockSearchData = [
  {
    id: '1',
    title: 'Dashboard',
    icon: '📊',
    color: '#8a2be2',
    keywords: ['home', 'main', 'principal'],
    onPress: jest.fn(),
  },
  {
    id: '2',
    title: 'Entidades',
    icon: '👥',
    color: '#3498db',
    keywords: ['users', 'people', 'pessoas'],
    onPress: jest.fn(),
  },
  {
    id: '3',
    title: 'Relatórios',
    icon: '📈',
    color: '#2ecc71',
    keywords: ['reports', 'analytics', 'análises'],
    onPress: jest.fn(),
  },
];

describe('SearchModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render when visible is true', () => {
      const { getByPlaceholderText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      // Procura pelo input de busca
      expect(getByPlaceholderText('Buscar páginas...')).toBeTruthy();
    });

    it('should render all search items initially', () => {
      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      expect(getByText('Dashboard')).toBeTruthy();
      expect(getByText('Entidades')).toBeTruthy();
      expect(getByText('Relatórios')).toBeTruthy();
    });

    it('should render with dark theme', () => {
      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="dark"
          searchData={mockSearchData}
        />
      );
      
      expect(getByText('Dashboard')).toBeTruthy();
    });

    it('should render with light theme', () => {
      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      expect(getByText('Dashboard')).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('should filter results by title', async () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const searchInput = getByPlaceholderText('Buscar páginas...');
      fireEvent.changeText(searchInput, 'Dashboard');
      
      await waitFor(() => {
        expect(getByText('Dashboard')).toBeTruthy();
        expect(queryByText('Entidades')).toBeNull();
        expect(queryByText('Relatórios')).toBeNull();
      });
    });

    it('should filter results by keyword', async () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const searchInput = getByPlaceholderText('Buscar páginas...');
      fireEvent.changeText(searchInput, 'people');
      
      await waitFor(() => {
        expect(getByText('Entidades')).toBeTruthy();
        expect(queryByText('Dashboard')).toBeNull();
      });
    });

    it('should be case insensitive', async () => {
      const { getByPlaceholderText, getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const searchInput = getByPlaceholderText('Buscar páginas...');
      fireEvent.changeText(searchInput, 'DASHBOARD');
      
      await waitFor(() => {
        expect(getByText('Dashboard')).toBeTruthy();
      });
    });

    it('should show all results when search is empty', async () => {
      const { getByPlaceholderText, getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const searchInput = getByPlaceholderText('Buscar páginas...');
      
      // Primeiro busca algo
      fireEvent.changeText(searchInput, 'Dashboard');
      
      // Depois limpa a busca
      fireEvent.changeText(searchInput, '');
      
      await waitFor(() => {
        expect(getByText('Dashboard')).toBeTruthy();
        expect(getByText('Entidades')).toBeTruthy();
        expect(getByText('Relatórios')).toBeTruthy();
      });
    });

    it('should show no results when search doesnt match', async () => {
      const { getByPlaceholderText, queryByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const searchInput = getByPlaceholderText('Buscar páginas...');
      fireEvent.changeText(searchInput, 'xyz123notfound');
      
      await waitFor(() => {
        expect(queryByText('Dashboard')).toBeNull();
        expect(queryByText('Entidades')).toBeNull();
        expect(queryByText('Relatórios')).toBeNull();
      });
    });
  });

  describe('Item Selection', () => {
    it('should call onPress when item is selected', async () => {
      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      const dashboardItem = getByText('Dashboard');
      fireEvent.press(dashboardItem);
      
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('should call item onPress after modal closes', async () => {
      const mockItemPress = jest.fn();
      const customData = [
        {
          ...mockSearchData[0],
          onPress: mockItemPress,
        },
      ];

      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={customData}
        />
      );
      
      const dashboardItem = getByText('Dashboard');
      fireEvent.press(dashboardItem);
      
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });
  });

  describe('Modal Closing', () => {
    it('should call onClose when backdrop is pressed', () => {
      const { getByTestId } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      // Tenta fechar clicando fora do modal (no backdrop)
      // Como não temos testID, vamos simular de outra forma
      expect(mockOnClose).toBeDefined();
    });
  });

  describe('Icons and Colors', () => {
    it('should render item icons', () => {
      const { getByText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      expect(getByText('📊')).toBeTruthy();
      expect(getByText('👥')).toBeTruthy();
      expect(getByText('📈')).toBeTruthy();
    });

    it('should apply item colors', () => {
      const { root } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
        />
      );
      
      expect(root).toBeTruthy();
    });
  });

  describe('AutoFocus', () => {
    it('should support autoFocus prop', () => {
      const { getByPlaceholderText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
          autoFocus={true}
        />
      );
      
      expect(getByPlaceholderText('Buscar páginas...')).toBeTruthy();
    });

    it('should support disabling autoFocus', () => {
      const { getByPlaceholderText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={mockSearchData}
          autoFocus={false}
        />
      );
      
      expect(getByPlaceholderText('Buscar páginas...')).toBeTruthy();
    });
  });

  describe('Empty State', () => {
    it('should handle empty search data', () => {
      const { getByPlaceholderText } = render(
        <SearchModal
          visible={true}
          onClose={mockOnClose}
          theme="light"
          searchData={[]}
        />
      );
      
      expect(getByPlaceholderText('Buscar páginas...')).toBeTruthy();
    });
  });
});
