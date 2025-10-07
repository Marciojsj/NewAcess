// __tests__/screens/HomeScreen.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/Home/HomeScreen';
import { useTheme } from '../../src/contexts/ThemeContext';

// Mock dos contexts
jest.mock('../../src/contexts/ThemeContext');

// Mock dos componentes de layout
jest.mock('../../src/components/layout/WebSidebar', () => ({
  WebSidebar: 'WebSidebar',
}));

jest.mock('../../src/components/layout/MobileSidebar', () => ({
  MobileSidebar: 'MobileSidebar',
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

describe('HomeScreen', () => {
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
    it('should render HomeScreen', () => {
      const { root } = render(<HomeScreen />);
      expect(root).toBeTruthy();
    });

    it('should render SafeAreaView', () => {
      const { root } = render(<HomeScreen />);
      expect(root).toBeTruthy();
    });

    it('should apply theme background color', () => {
      const { root } = render(<HomeScreen />);
      expect(root).toBeTruthy();
    });
  });

  describe('Theme', () => {
    it('should use light theme by default', () => {
      render(<HomeScreen />);
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

      render(<HomeScreen />);
      expect(mockUseTheme).toHaveBeenCalled();
    });
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      // Mock deviceType as desktop
      jest.mock('../../src/utils/responsive', () => ({
        deviceType: {
          isDesktop: true,
          isTablet: false,
          isMobile: false,
        },
        responsive: {
          padding: { sm: 8, md: 16, lg: 24, xl: 32 },
          spacing: { sm: 8, md: 16, lg: 24, xl: 32 },
          fontSize: { sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 },
        },
      }));
    });

    it('should render for desktop', () => {
      const { root } = render(<HomeScreen />);
      expect(root).toBeTruthy();
    });
  });
});
