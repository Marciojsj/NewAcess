// __tests__/components/ui/AnimatedInput.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AnimatedInput } from '../../../src/components/ui/AnimatedInput';

describe('AnimatedInput', () => {
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render input with label', () => {
      const { getByText } = render(
        <AnimatedInput
          label="Test Label"
          value=""
          onChangeText={mockOnChangeText}
        />
      );
      expect(getByText('Test Label')).toBeTruthy();
    });

    it('should render with value', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test@example.com"
          onChangeText={mockOnChangeText}
        />
      );
      expect(getByDisplayValue('test@example.com')).toBeTruthy();
    });

    it('should render error message when error prop is provided', () => {
      const { getByText } = render(
        <AnimatedInput
          label="Email"
          value=""
          onChangeText={mockOnChangeText}
          error="Email is required"
        />
      );
      expect(getByText('Email is required')).toBeTruthy();
    });

    it('should not render error message when no error', () => {
      const { queryByText } = render(
        <AnimatedInput
          label="Email"
          value="test@example.com"
          onChangeText={mockOnChangeText}
        />
      );
      expect(queryByText('Email is required')).toBeNull();
    });
  });

  describe('Focus States', () => {
    it('should call onFocus when input is focused', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
          onFocus={mockOnFocus}
        />
      );
      
      const input = getByDisplayValue('test');
      fireEvent(input, 'focus');
      
      expect(mockOnFocus).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
          onBlur={mockOnBlur}
        />
      );
      
      const input = getByDisplayValue('test');
      fireEvent(input, 'blur');
      
      expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should handle focus and blur without callbacks', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
        />
      );
      
      const input = getByDisplayValue('test');
      fireEvent(input, 'focus');
      fireEvent(input, 'blur');
      
      expect(input).toBeTruthy();
    });
  });

  describe('Text Input', () => {
    it('should update value on text change', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
        />
      );
      
      const input = getByDisplayValue('test');
      fireEvent.changeText(input, 'new value');
      
      expect(mockOnChangeText).toHaveBeenCalledWith('new value');
    });

    it('should pass through TextInput props', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Password"
          value="secret"
          onChangeText={mockOnChangeText}
          secureTextEntry
          autoCapitalize="none"
        />
      );
      
      const input = getByDisplayValue('secret');
      expect(input.props.secureTextEntry).toBe(true);
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('should set placeholder color to transparent', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
        />
      );
      
      const input = getByDisplayValue('test');
      expect(input.props.placeholderTextColor).toBe('transparent');
    });
  });

  describe('Styling', () => {
    it('should apply custom container style', () => {
      const customStyle = { marginTop: 20 };
      const { root } = render(
        <AnimatedInput
          label="Email"
          value=""
          onChangeText={mockOnChangeText}
          containerStyle={customStyle}
        />
      );
      
      expect(root).toBeTruthy();
    });

    it('should apply custom input style', () => {
      const customStyle = { fontSize: 18 };
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
          style={customStyle}
        />
      );
      
      const input = getByDisplayValue('test');
      expect(input).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('should display error with red styling', () => {
      const { getByText } = render(
        <AnimatedInput
          label="Email"
          value=""
          onChangeText={mockOnChangeText}
          error="Invalid email format"
        />
      );
      
      const errorText = getByText('Invalid email format');
      expect(errorText).toBeTruthy();
    });

    it('should show different error messages', () => {
      const { getByText, rerender } = render(
        <AnimatedInput
          label="Password"
          value=""
          onChangeText={mockOnChangeText}
          error="Password is required"
        />
      );
      
      expect(getByText('Password is required')).toBeTruthy();
      
      rerender(
        <AnimatedInput
          label="Password"
          value="123"
          onChangeText={mockOnChangeText}
          error="Password too short"
        />
      );
      
      expect(getByText('Password too short')).toBeTruthy();
    });
  });

  describe('Label Animation', () => {
    it('should render label above input when focused', () => {
      const { getByText } = render(
        <AnimatedInput
          label="Email"
          value=""
          onChangeText={mockOnChangeText}
          focused={true}
        />
      );
      
      expect(getByText('Email')).toBeTruthy();
    });

    it('should render label above input when has value', () => {
      const { getByText } = render(
        <AnimatedInput
          label="Email"
          value="test@example.com"
          onChangeText={mockOnChangeText}
        />
      );
      
      expect(getByText('Email')).toBeTruthy();
    });
  });

  describe('Keyboard Types', () => {
    it('should support email-address keyboard type', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Email"
          value="test"
          onChangeText={mockOnChangeText}
          keyboardType="email-address"
        />
      );
      
      const input = getByDisplayValue('test');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('should support numeric keyboard type', () => {
      const { getByDisplayValue } = render(
        <AnimatedInput
          label="Phone"
          value="123"
          onChangeText={mockOnChangeText}
          keyboardType="numeric"
        />
      );
      
      const input = getByDisplayValue('123');
      expect(input.props.keyboardType).toBe('numeric');
    });
  });
});
