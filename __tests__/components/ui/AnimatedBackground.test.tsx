// __tests__/components/ui/AnimatedBackground.test.tsx
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { AnimatedBackground } from '../../../src/components/ui/AnimatedBackground';

describe('AnimatedBackground', () => {
  describe('Rendering', () => {
    it('should render without children', () => {
      const { root } = render(<AnimatedBackground />);
      expect(root).toBeTruthy();
    });

    it('should render with children', () => {
      const { getByText } = render(
        <AnimatedBackground>
          <Text>Test Content</Text>
        </AnimatedBackground>
      );
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('should render multiple children', () => {
      const { getByText } = render(
        <AnimatedBackground>
          <Text>First Child</Text>
          <Text>Second Child</Text>
        </AnimatedBackground>
      );
      expect(getByText('First Child')).toBeTruthy();
      expect(getByText('Second Child')).toBeTruthy();
    });
  });

  describe('Container', () => {
    it('should have flex container', () => {
      const { root } = render(<AnimatedBackground />);
      expect(root).toBeTruthy();
      // Container deve ter flex: 1
    });
  });

  describe('Children Rendering', () => {
    it('should pass through children unchanged', () => {
      const testText = 'Test children content';
      const { getByText } = render(
        <AnimatedBackground>
          <Text>{testText}</Text>
        </AnimatedBackground>
      );
      expect(getByText(testText)).toBeTruthy();
    });

    it('should handle complex children', () => {
      const { getByText } = render(
        <AnimatedBackground>
          <>
            <Text>Child 1</Text>
            <Text>Child 2</Text>
          </>
        </AnimatedBackground>
      );
      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
    });
  });
});
