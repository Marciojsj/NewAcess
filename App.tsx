import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth, AuthProvider } from './src/contexts/AuthContext';

import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegistrarEntradaScreen from './src/screens/registrarEntrada/RegistrarEntradaScreen';
import RegistrarSaidaScreen from './src/screens/registrarSaida/RegistrarSaidaScreen';
import VisitantesScreen from './src/screens/visitantes/VisitantesScreen';
import RelatoriosScreen from './src/screens/relatorios/RelatoriosScreen';

const Stack = createStackNavigator();

function Routes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Opcional: mostrar tela de loading enquanto verifica AsyncStorage
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RegistrarEntrada" component={RegistrarEntradaScreen} />
          <Stack.Screen name="RegistrarSaida" component={RegistrarSaidaScreen} />
          <Stack.Screen name="Visitantes" component={VisitantesScreen} />
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
