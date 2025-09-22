// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/Login/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';

const Stack = createStackNavigator();

// Componente para controlar a navegação baseada na autenticação
function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <></> // Ou um componente de loading
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
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
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}