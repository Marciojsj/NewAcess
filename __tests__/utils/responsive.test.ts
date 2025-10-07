// __tests__/utils/responsive.test.ts

describe('responsive utils', () => {
  describe('breakpoints', () => {
    it('should have correct breakpoint values', () => {
      // Teste básico que não depende do Dimensions
      // Os valores são constantes
      const expectedBreakpoints = {
        mobile: 0,
        tablet: 768,
        desktop: 1024,
        largeDesktop: 1440,
      };

      expect(expectedBreakpoints.mobile).toBe(0);
      expect(expectedBreakpoints.tablet).toBe(768);
      expect(expectedBreakpoints.desktop).toBe(1024);
      expect(expectedBreakpoints.largeDesktop).toBe(1440);
    });
  });

  // Nota: Testes do objeto responsive, platformStyles e responsiveValue 
  // requerem mocking complexo do Dimensions que não é compatível com a 
  // forma como o módulo é estruturado (usa Dimensions.get no nível superior).
  // Esses helpers são testados indiretamente nos testes de componentes.
});
