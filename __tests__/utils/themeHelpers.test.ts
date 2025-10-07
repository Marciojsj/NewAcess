// __tests__/utils/themeHelpers.test.ts
import {
  getContrastColor,
  hexToRgba,
  lightenColor,
  darkenColor,
  isLightColor,
  getThemeColors,
} from '../../src/utils/themeHelpers';

describe('themeHelpers', () => {
  describe('getContrastColor', () => {
    it('should return white for dark colors', () => {
      expect(getContrastColor('#000000')).toBe('#FFFFFF');
      expect(getContrastColor('#1a1a1a')).toBe('#FFFFFF');
    });

    it('should return black for light colors', () => {
      expect(getContrastColor('#FFFFFF')).toBe('#000000');
      expect(getContrastColor('#f0f0f0')).toBe('#000000');
    });

    it('should handle colors without #', () => {
      expect(getContrastColor('000000')).toBe('#FFFFFF');
      expect(getContrastColor('FFFFFF')).toBe('#000000');
    });
  });

  describe('hexToRgba', () => {
    it('should convert hex to rgba', () => {
      expect(hexToRgba('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
      expect(hexToRgba('#00FF00', 0.8)).toBe('rgba(0, 255, 0, 0.8)');
      expect(hexToRgba('#0000FF', 1)).toBe('rgba(0, 0, 255, 1)');
    });

    it('should handle short hex format', () => {
      expect(hexToRgba('#F00', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should handle hex without #', () => {
      expect(hexToRgba('FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should use default opacity', () => {
      expect(hexToRgba('#FF0000')).toBe('rgba(255, 0, 0, 1)');
    });

    it('should clamp opacity between 0 and 1', () => {
      expect(hexToRgba('#FF0000', 1.5)).toBe('rgba(255, 0, 0, 1)');
      expect(hexToRgba('#FF0000', -0.5)).toBe('rgba(255, 0, 0, 0)');
    });
  });

  describe('lightenColor', () => {
    it('should lighten color by percentage', () => {
      const result = lightenColor('#808080', 20);
      expect(result).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should not exceed white', () => {
      const result = lightenColor('#FFFFFF', 50);
      expect(result).toBe('#FFFFFF');
    });

    it('should handle black', () => {
      const result = lightenColor('#000000', 50);
      expect(result).not.toBe('#000000');
    });

    it('should handle percentage of 0', () => {
      const result = lightenColor('#808080', 0);
      expect(result).toBe('#808080');
    });
  });

  describe('darkenColor', () => {
    it('should darken color by percentage', () => {
      const result = darkenColor('#808080', 20);
      expect(result).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should not go below black', () => {
      const result = darkenColor('#000000', 50);
      expect(result).toBe('#000000');
    });

    it('should handle white', () => {
      const result = darkenColor('#FFFFFF', 50);
      expect(result).not.toBe('#FFFFFF');
    });

    it('should handle percentage of 0', () => {
      const result = darkenColor('#808080', 0);
      expect(result).toBe('#808080');
    });
  });

  describe('isLightColor', () => {
    it('should return true for light colors', () => {
      expect(isLightColor('#FFFFFF')).toBe(true);
      expect(isLightColor('#F0F0F0')).toBe(true);
      expect(isLightColor('#CCCCCC')).toBe(true);
    });

    it('should return false for dark colors', () => {
      expect(isLightColor('#000000')).toBe(false);
      expect(isLightColor('#1A1A1A')).toBe(false);
      expect(isLightColor('#333333')).toBe(false);
    });

    it('should handle colors without #', () => {
      expect(isLightColor('FFFFFF')).toBe(true);
      expect(isLightColor('000000')).toBe(false);
    });
  });

  describe('getThemeColors', () => {
    it('should return dark theme colors', () => {
      const colors = getThemeColors('dark');
      
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('primary');
      expect(colors.background).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should return light theme colors', () => {
      const colors = getThemeColors('light');
      
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('primary');
      expect(colors.background).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should have different colors for dark and light', () => {
      const darkColors = getThemeColors('dark');
      const lightColors = getThemeColors('light');
      
      expect(darkColors.background).not.toBe(lightColors.background);
      expect(darkColors.text).not.toBe(lightColors.text);
    });

    it('should have all required color properties', () => {
      const colors = getThemeColors('dark');
      
      const requiredProps = [
        'background',
        'text',
        'primary',
        'error',
        'success',
        'warning',
      ];

      requiredProps.forEach(prop => {
        expect(colors).toHaveProperty(prop);
      });
    });
  });
});
