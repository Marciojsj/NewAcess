// src/navigation/AppRouter.tsx
import React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Linking } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import { EntidadeScreen } from '../screens/entidade/EntidadeScreen';
import { RegistrarEntradaScreen } from '../screens/registrarEntrada/RegistrarEntradaScreen';
import { RegistrarSaidaScreen } from '../screens/registrarSaida/RegistrarSaidaScreen';
import VisitantesScreen from '../screens/visitantes/VisitantesScreen';
import { VisitorDetailsScreen } from '../screens/visitantes/VisitorDetailsScreen';
import { RelatoriosScreen } from '../screens/relatorios/RelatoriosScreen';
import AlertasScreen from '../screens/alertas/AlertasScreen';
import { UsersScreen } from '../screens/users/UsersScreen';
import { AccessLogsScreen } from '../screens/access/AccessLogsScreen';
import SettingsScreen from '../screens/configuracoes/SettingsScreen';
import ProfileSettingsScreen from '../screens/configuracoes/ProfileSettingsScreen';
import SystemSettingsScreen from '../screens/configuracoes/SystemSettingsScreen';
import SecuritySettingsScreen from '../screens/configuracoes/SecuritySettingsScreen';
import NotificationSettingsScreen from '../screens/configuracoes/NotificationSettingsScreen';
import AppSettingsScreen from '../screens/configuracoes/AppSettingsScreen';
import PermissionsScreen from '../screens/permissoes/PermissionsScreen';

const Stack = createStackNavigator();

// Configuração de linking para URLs navegáveis no web e deep links no mobile
const linking = {
  prefixes: [
    'accesscontrol://',
    'https://accesscontrol.app',
    // Para web, adiciona suporte a localhost e domínios
    ...(Platform.OS === 'web' ? ['http://localhost:8081', 'http://localhost:19006'] : []),
  ],
  config: {
    screens: {
      Login: 'login',
      Home: 'home',
      Entidade: 'entidade',
      RegistrarEntrada: 'registrar-entrada',
      RegistrarSaida: 'registrar-saida',
      Visitantes: 'visitantes',
      VisitorDetails: 'visitantes/:id',
      Relatorios: 'relatorios',
      Alertas: 'alertas',
      Users: 'users',
      AccessLogs: 'access-logs',
      Settings: 'settings',
      ProfileSettings: 'settings/profile',
      SystemSettings: 'settings/system',
      SecuritySettings: 'settings/security',
      NotificationSettings: 'settings/notifications',
      AppSettings: 'settings/app',
      Permissions: 'permissions',
    },
  },
};

function Routes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "Home" : "Login"}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Entidade" component={EntidadeScreen} />
          <Stack.Screen name="RegistrarEntrada" component={RegistrarEntradaScreen} />
          <Stack.Screen name="RegistrarSaida" component={RegistrarSaidaScreen} />
          <Stack.Screen name="Visitantes" component={VisitantesScreen} />
          <Stack.Screen name="VisitorDetails" component={VisitorDetailsScreen} />
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
          <Stack.Screen name="Alertas" component={AlertasScreen} />
          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="AccessLogs" component={AccessLogsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
          <Stack.Screen name="SystemSettings" component={SystemSettingsScreen} />
          <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
          <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
          <Stack.Screen name="Permissions" component={PermissionsScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export const AppRouter: React.FC = () => {
  const navigationRef = React.useRef<NavigationContainerRef<any>>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={null}
      documentTitle={{
        formatter: (options, route) => {
          const routeName = route?.name || 'Access Control';
          const titles: Record<string, string> = {
            Login: 'Login - Access Control',
            Home: 'Dashboard - Access Control',
            Entidade: 'Entidades - Access Control',
            RegistrarEntrada: 'Registrar Entrada - Access Control',
            RegistrarSaida: 'Registrar Saída - Access Control',
            Visitantes: 'Visitantes - Access Control',
            VisitorDetails: 'Detalhes do Visitante - Access Control',
            Relatorios: 'Relatórios - Access Control',
            Alertas: 'Alertas - Access Control',
            Users: 'Usuários - Access Control',
            AccessLogs: 'Logs de Acesso - Access Control',
            Settings: 'Configurações - Access Control',
            ProfileSettings: 'Configurações de Perfil - Access Control',
            SystemSettings: 'Configurações do Sistema - Access Control',
            SecuritySettings: 'Configurações de Segurança - Access Control',
            NotificationSettings: 'Configurações de Notificações - Access Control',
            AppSettings: 'Configurações do App - Access Control',
            Permissions: 'Permissões - Access Control',
          };
          return titles[routeName] || 'Access Control';
        },
      }}
    >
      <Routes />
    </NavigationContainer>
  );
};
