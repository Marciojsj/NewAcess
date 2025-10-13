// src/hooks/useNavigation.ts
import { useNavigation as useReactNavigationNavigate } from '@react-navigation/native';

/**
 * Hook de navegação unificado que funciona em Web e Mobile
 * 
 * Usa React Navigation com linking configurado para URLs navegáveis no web
 * e deep links no mobile.
 */
export const useAppNavigation = () => {
  const navigation = useReactNavigationNavigate();

  /**
   * Navega para uma rota específica
   * @param route - Nome da rota (ex: 'Home', 'Entidade', '/home', '/entidade')
   * @param params - Parâmetros opcionais para a rota
   */
  const navigate = (route: string, params?: any) => {
    // Convert web-style routes (with /) to screen names
    const screenName = routeMap[route] || route;
    (navigation as any).navigate(screenName, params);
  };

  /**
   * Volta para a tela anterior
   */
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  /**
   * Substitui a rota atual (sem adicionar ao histórico)
   * @param route - Nome da rota
   * @param params - Parâmetros opcionais
   */
  const replace = (route: string, params?: any) => {
    const screenName = routeMap[route] || route;
    (navigation as any).reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  };

  return {
    navigate,
    goBack,
    replace,
  };
};

// Mapeamento de rotas (web-style paths -> screen names)
const routeMap: Record<string, string> = {
  '/login': 'Login',
  '/home': 'Home',
  '/entidade': 'Entidade',
  '/registrar-entrada': 'RegistrarEntrada',
  '/registrar-saida': 'RegistrarSaida',
  '/visitantes': 'Visitantes',
  '/relatorios': 'Relatorios',
  '/alertas': 'Alertas',
  '/users': 'Users',
  '/access-logs': 'AccessLogs',
  '/settings': 'Settings',
  '/settings/profile': 'ProfileSettings',
  '/settings/system': 'SystemSettings',
  '/settings/security': 'SecuritySettings',
  '/settings/notifications': 'NotificationSettings',
  '/settings/app': 'AppSettings',
  '/permissions': 'Permissions',
  'login': 'Login',
  'home': 'Home',
  'entidade': 'Entidade',
  'registrar-entrada': 'RegistrarEntrada',
  'registrar-saida': 'RegistrarSaida',
  'visitantes': 'Visitantes',
  'relatorios': 'Relatorios',
  'alertas': 'Alertas',
  'users': 'Users',
  'access-logs': 'AccessLogs',
  'settings': 'Settings',
  'permissions': 'Permissions',
};
