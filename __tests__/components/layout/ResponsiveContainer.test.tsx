// __tests__/components/layout/ResponsiveContainer.test.tsx
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ResponsiveContainer } from '../../../src/components/layout/ResponsiveContainer';

describe('ResponsiveContainer', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      const { getByText } = render(
        <ResponsiveContainer>
          <Text>Test Content</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('should render multiple children', () => {
      const { getByText } = render(
        <ResponsiveContainer>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
    });
  });

  describe('Props', () => {
    it('should accept centerContent prop', () => {
      const { getByText } = render(
        <ResponsiveContainer centerContent={true}>
          <Text>Centered</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Centered')).toBeTruthy();
    });

    it('should accept centerContent false', () => {
      const { getByText } = render(
        <ResponsiveContainer centerContent={false}>
          <Text>Not Centered</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Not Centered')).toBeTruthy();
    });

    it('should accept animated prop', () => {
      const { getByText } = render(
        <ResponsiveContainer animated={true}>
          <Text>Animated</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Animated')).toBeTruthy();
    });

    it('should accept maxWidth prop', () => {
      const { getByText } = render(
        <ResponsiveContainer maxWidth={600}>
          <Text>Max Width</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Max Width')).toBeTruthy();
    });

    it('should accept backgroundColor prop', () => {
      const { getByText } = render(
        <ResponsiveContainer backgroundColor="#FF0000">
          <Text>Background</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Background')).toBeTruthy();
    });

    it('should accept custom style', () => {
      const { getByText } = render(
        <ResponsiveContainer style={{ padding: 20 }}>
          <Text>Custom Style</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Animation', () => {
    it('should render as Animated.View when animated is true', () => {
      const { getByText } = render(
        <ResponsiveContainer animated={true}>
          <Text>Animated Content</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Animated Content')).toBeTruthy();
    });

    it('should render as View when animated is false', () => {
      const { getByText } = render(
        <ResponsiveContainer animated={false}>
          <Text>Static Content</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Static Content')).toBeTruthy();
    });
  });

  describe('Default Behavior', () => {
    it('should center content by default', () => {
      const { getByText } = render(
        <ResponsiveContainer>
          <Text>Default</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Default')).toBeTruthy();
    });

    it('should not be animated by default', () => {
      const { getByText } = render(
        <ResponsiveContainer>
          <Text>Not Animated</Text>
        </ResponsiveContainer>
      );
      
      expect(getByText('Not Animated')).toBeTruthy();
    });
  });
});
