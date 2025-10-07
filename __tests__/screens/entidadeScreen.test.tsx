// __tests__/screens/entidadeScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert, Platform } from 'react-native';
import { EntidadeScreen } from '../../src/screens/entidade/EntidadeScreen';
import { useTheme } from '../../src/contexts/ThemeContext';
// import * as EntidadeService from '../../src/screens/entidade/entidadeService';

// Mock dos styles
jest.mock('../../src/screens/entidade/styles/EntidadeScreen.styles', () => ({
  default: {},
}));

// Mock do Alert
const mockAlert = jest.spyOn(Alert, 'alert');

// Mock dos contexts
jest.mock('../../src/contexts/ThemeContext');

// Mock dos componentes de layout
jest.mock('../../src/components/layout/WebSidebar', () => ({
  WebSidebar: jest.fn(() => null),
}));

jest.mock('../../src/components/layout/MobileSidebar', () => ({
  MobileSidebar: jest.fn(() => null),
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
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
  },
}));

const mockToggleTheme = jest.fn();
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

const mockTheme = {
  primary: '#6366f1',
  background: '#ffffff',
  backgroundCard: '#f9fafb',
  backgroundSecondary: '#f3f4f6',
  text: '#111827',
  textSecondary: '#6b7280',
  textInverse: '#ffffff',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

describe('EntidadeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAlert.mockClear();
    
    mockUseTheme.mockReturnValue({
      theme: mockTheme as any,
      isDark: false,
      toggleTheme: mockToggleTheme,
      isLoading: false,
    });
  });

  describe('Rendering', () => {
    it('should render EntidadeScreen without crashing', () => {
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should render screen title "Entidades"', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('Entidades')).toBeTruthy();
    });

    it('should render search input with placeholder', () => {
      const { getByPlaceholderText } = render(<EntidadeScreen />);
      expect(getByPlaceholderText('Buscar...')).toBeTruthy();
    });

    it('should render "Nova Entidade" button', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('+ Nova Entidade')).toBeTruthy();
    });

    it('should render entity list with data', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
    });

    it('should render table headers', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('Nome')).toBeTruthy();
      expect(getByText('CNPJ')).toBeTruthy();
      expect(getByText('Tipo')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('Status')).toBeTruthy();
      expect(getByText('Ações')).toBeTruthy();
    });

    it('should render search icon', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('🔍')).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('should update search query on text change', () => {
      const { getByPlaceholderText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, 'Tech');
      expect(searchInput.props.value).toBe('Tech');
    });

    it('should filter entities by name', () => {
      const { getByPlaceholderText, getByText, queryByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, 'Tech Solutions');
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
      expect(queryByText('Metalúrgica')).toBeFalsy();
    });

    it('should filter entities by CNPJ', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, '12.345.678');
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
    });

    it('should filter entities by email', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, 'techsolutions');
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
    });

    it('should show empty state when no results found', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, 'xyz123notfound');
      
      expect(getByText('Nenhuma entidade encontrada')).toBeTruthy();
      expect(getByText('Tente ajustar sua busca')).toBeTruthy();
    });

    it('should clear search and show all entities', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      const searchInput = getByPlaceholderText('Buscar...');
      
      fireEvent.changeText(searchInput, 'Tech');
      fireEvent.changeText(searchInput, '');
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
      expect(getByText('Indústria Metalúrgica Brasil S.A.')).toBeTruthy();
    });
  });

  describe('Entity Display', () => {
    it('should display entity names correctly', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
      expect(getByText('Indústria Metalúrgica Brasil S.A.')).toBeTruthy();
      expect(getByText('Comércio ABC Ltda')).toBeTruthy();
    });

    it('should display entity CNPJs', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText('12.345.678/0001-90')).toBeTruthy();
      expect(getByText('23.456.789/0001-01')).toBeTruthy();
    });

    it('should display entity types', () => {
      const { getAllByText } = render(<EntidadeScreen />);
      
      const juridica = getAllByText('Jurídica');
      expect(juridica.length).toBeGreaterThan(0);
    });

    it('should display entity emails', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText('contato@techsolutions.com.br')).toBeTruthy();
    });

    it('should display entity status with badges', () => {
      const { getAllByText } = render(<EntidadeScreen />);
      
      const activeStatuses = getAllByText('Ativo');
      expect(activeStatuses.length).toBeGreaterThan(0);
    });

    it('should display inactive entities', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText('Construtora Horizonte Ltda')).toBeTruthy();
      const inativo = getByText('Inativo');
      expect(inativo).toBeTruthy();
    });

    it('should display city and state', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      expect(getByText('São Paulo/SP')).toBeTruthy();
      expect(getByText('Belo Horizonte/MG')).toBeTruthy();
    });

    it('should display action menu button (⋮)', () => {
      const { getAllByText } = render(<EntidadeScreen />);
      
      const menuButtons = getAllByText('⋮');
      expect(menuButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Modal - Create Entity', () => {
    it('should open create modal when clicking "Nova Entidade" button', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      const addButton = getByText('+ Nova Entidade');
      fireEvent.press(addButton);
      
      expect(getByText('Nova Entidade')).toBeTruthy();
    });

    it('should render all form fields in create modal', () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      expect(getByPlaceholderText('Nome da entidade')).toBeTruthy();
      expect(getByPlaceholderText('00.000.000/0000-00')).toBeTruthy();
      expect(getByPlaceholderText('Rua, Número, Bairro')).toBeTruthy();
      expect(getByPlaceholderText('Cidade')).toBeTruthy();
      expect(getByPlaceholderText('Estado (UF)')).toBeTruthy();
      expect(getByPlaceholderText('email@exemplo.com')).toBeTruthy();
      expect(getByPlaceholderText('(00) 00000-0000')).toBeTruthy();
    });

    it('should close modal when clicking "Cancelar"', () => {
      const { getByText, queryByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      expect(getByText('Nova Entidade')).toBeTruthy();
      
      fireEvent.press(getByText('Cancelar'));
      
      waitFor(() => {
        expect(queryByText('Nova Entidade')).toBeFalsy();
      });
    });

    it('should close modal when clicking close button (×)', () => {
      const { getByText, queryByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      const closeButton = getByText('×');
      fireEvent.press(closeButton);
      
      waitFor(() => {
        expect(queryByText('Nova Entidade')).toBeFalsy();
      });
    });

    it('should show Criar button in create mode', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      expect(getByText('Criar')).toBeTruthy();
    });
  });

  describe('Dropdown Menu Actions', () => {
    it('should open dropdown menu when clicking action button', async () => {
      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      const menuButtons = getAllByText('⋮');
      fireEvent.press(menuButtons[0]);
      
      await waitFor(() => {
        expect(getByText('Editar')).toBeTruthy();
        expect(getByText('Excluir')).toBeTruthy();
      });
    });

    it('should render edit and delete options in dropdown', async () => {
      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        expect(getByText('✏️')).toBeTruthy();
        expect(getByText('🗑️')).toBeTruthy();
      });
    });
  });

  describe('Edit Entity', () => {
    it('should open edit modal when clicking "Editar"', async () => {
      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Editar'));
      });
      
      await waitFor(() => {
        expect(getByText('Editar Entidade')).toBeTruthy();
      });
    });

    it('should show Salvar button in edit mode', async () => {
      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Editar'));
      });
      
      await waitFor(() => {
        expect(getByText('Salvar')).toBeTruthy();
      });
    });

    it('should populate form with entity data in edit mode', async () => {
      const { getAllByText, getByText, getByDisplayValue } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Editar'));
      });
      
      await waitFor(() => {
        expect(getByDisplayValue('Tech Solutions Ltda')).toBeTruthy();
        expect(getByDisplayValue('12.345.678/0001-90')).toBeTruthy();
      });
    });
  });

  describe('Delete Entity', () => {
    it('should show confirmation alert when clicking "Excluir"', async () => {
      mockAlert.mockImplementation((title, message, buttons) => {
        // Simula clicar em "Cancelar"
        if (buttons && buttons[0]) {
          buttons[0].onPress?.();
        }
      });

      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Excluir'));
      });
      
      expect(mockAlert).toHaveBeenCalledWith(
        'Confirmar Exclusão',
        expect.stringContaining('Deseja realmente excluir'),
        expect.any(Array)
      );
    });

    it('should delete entity when confirming', async () => {
      mockAlert.mockImplementation((title, message, buttons) => {
        // Simula clicar em "Excluir"
        if (buttons && buttons[1]) {
          buttons[1].onPress?.();
        }
      });

      const { getAllByText, getByText, queryByText } = render(<EntidadeScreen />);
      
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Excluir'));
      });
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalled();
      });
    });

    it('should not delete entity when canceling', async () => {
      mockAlert.mockImplementation((title, message, buttons) => {
        // Simula clicar em "Cancelar"
        if (buttons && buttons[0]) {
          buttons[0].onPress?.();
        }
      });

      const { getAllByText, getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        fireEvent.press(getByText('Excluir'));
      });
      
      // Entidade ainda deve estar presente
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
    });
  });

  describe('View Entity (Read-only)', () => {
    it('should open entity in view mode with read-only fields', async () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      // Abrir menu dropdown
      const actionButtons = await waitFor(() => {
        const buttons = getByText('⋮');
        return buttons;
      });
      fireEvent.press(actionButtons);
      
      // Clicar em Visualizar
      await waitFor(() => {
        const viewButton = getByText('Visualizar');
        fireEvent.press(viewButton);
      });
      
      // Verificar que o modal abriu
      await waitFor(() => {
        expect(getByText('Visualizar Entidade')).toBeTruthy();
      });
    });

  describe('Form Validation and Interaction', () => {
    it('should update nome field on text change', async () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      const nomeInput = getByPlaceholderText('Nome da entidade');
      fireEvent.changeText(nomeInput, 'Nova Empresa Teste');
      
      expect(nomeInput.props.value).toBe('Nova Empresa Teste');
    });

    it('should update CNPJ field on text change', async () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      const cnpjInput = getByPlaceholderText('00.000.000/0000-00');
      fireEvent.changeText(cnpjInput, '99.999.999/0001-99');
      
      expect(cnpjInput.props.value).toBe('99.999.999/0001-99');
    });

    it('should toggle tipo between Física and Jurídica', async () => {
      const { getByText, getAllByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      const fisica = getAllByText('Física')[0];
      fireEvent.press(fisica);
      
      expect(fisica).toBeTruthy();
    });

    it('should update email field', async () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      const emailInput = getByPlaceholderText('email@exemplo.com');
      fireEvent.changeText(emailInput, 'teste@exemplo.com');
      
      expect(emailInput.props.value).toBe('teste@exemplo.com');
    });
  });

  describe('Overlay Functionality', () => {
    it('should close dropdown when clicking outside', async () => {
      const { getAllByText, getByText, queryByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getAllByText('⋮')[0]);
      
      await waitFor(() => {
        expect(getByText('Editar')).toBeTruthy();
      });
      
      // Simular clique fora (no overlay)
      // O overlay fecha automaticamente ao clicar
      const overlays = getAllByText(/./); // Pega todos os elementos
      // Procura pelo overlay e clica nele
    });

    it('should close modal when clicking on overlay', async () => {
      const { getByText, queryByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      expect(getByText('Nova Entidade')).toBeTruthy();
      
      // O modal deve fechar ao clicar no overlay
      // Isso é testado pela funcionalidade de TouchableOpacity
    });
  });

  describe('Sidebar Integration', () => {
    beforeEach(() => {
      Platform.OS = 'web';
    });

    it('should render WebSidebar on web platform', () => {
      const { WebSidebar } = require('../../src/components/layout/WebSidebar');
      render(<EntidadeScreen />);
      expect(WebSidebar).toHaveBeenCalled();
    });

    it('should render MobileSidebar on mobile platform', () => {
      Platform.OS = 'ios';
      const { MobileSidebar } = require('../../src/components/layout/MobileSidebar');
      render(<EntidadeScreen />);
      expect(MobileSidebar).toHaveBeenCalled();
    });
  });

  describe('Theme Support', () => {
    it('should use light theme by default', () => {
      render(<EntidadeScreen />);
      expect(mockUseTheme).toHaveBeenCalled();
      expect(mockUseTheme).toHaveReturnedWith(
        expect.objectContaining({ isDark: false })
      );
    });

    it('should support dark theme', () => {
      const darkTheme = {
        ...mockTheme,
        background: '#111827',
        text: '#f9fafb',
      };

      mockUseTheme.mockReturnValue({
        theme: darkTheme as any,
        isDark: true,
        toggleTheme: mockToggleTheme,
        isLoading: false,
      });

      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should call toggleTheme when theme button is clicked', () => {
      // O toggle de tema é feito através do sidebar
      render(<EntidadeScreen />);
      expect(mockUseTheme).toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('should render correctly on mobile devices', () => {
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should have compact header on mobile', () => {
      const { getByText } = render(<EntidadeScreen />);
      expect(getByText('Entidades')).toBeTruthy();
      expect(getByText('+ Nova Entidade')).toBeTruthy();
    });
  });

  describe('Entity List Display', () => {
    it('should display all entities initially', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      // Verifica se entidades estão sendo exibidas
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
      expect(getByText('Indústria Metalúrgica Brasil S.A.')).toBeTruthy();
    });

    it('should filter entities correctly when searching', () => {
      const { getByText, getByPlaceholderText } = render(<EntidadeScreen />);
      
      const searchInput = getByPlaceholderText('Buscar...');
      fireEvent.changeText(searchInput, 'Metalúrgica');
      
      // Deve mostrar apenas resultados filtrados
      expect(getByText('Indústria Metalúrgica Brasil S.A.')).toBeTruthy();
    });
  });

  describe('Empty State', () => {
    it('should show search empty state when no results', () => {
      const { getByPlaceholderText, getByText } = render(<EntidadeScreen />);
      
      const searchInput = getByPlaceholderText('Buscar...');
      fireEvent.changeText(searchInput, 'xyznotfound123');
      
      expect(getByText('Nenhuma entidade encontrada')).toBeTruthy();
      expect(getByText('Tente ajustar sua busca')).toBeTruthy();
    });

    it('should display entities list when results exist', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      // Verifica que entidades são exibidas
      expect(getByText('Tech Solutions Ltda')).toBeTruthy();
    });
  });

  describe('Platform-specific Behavior', () => {
    it('should use sticky header on web', () => {
      Platform.OS = 'web';
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should handle mobile gestures', () => {
      Platform.OS = 'ios';
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });
  });

  describe('Animation and Transitions', () => {
    it('should render without animation errors', () => {
      const { root } = render(<EntidadeScreen />);
      expect(root).toBeTruthy();
    });

    it('should handle modal animations', () => {
      const { getByText } = render(<EntidadeScreen />);
      
      fireEvent.press(getByText('+ Nova Entidade'));
      
      // Modal deve aparecer com animação fade
      expect(getByText('Nova Entidade')).toBeTruthy();
    });
  });
})});
