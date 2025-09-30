// src/screens/Home/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebSidebar } from '../../components/WebSidebar';
import { MobileFooter } from '../../components/MobileFooter';
import { deviceType } from '../../utils/responsive';

export default function HomeScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout realizado');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
        {...(Platform.OS === 'web' && { hidden: true })}
      />

      {/* Sidebar Web */}
      {deviceType.isDesktop && (
        <WebSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          theme={isDark ? 'dark' : 'light'}
          onThemeChange={toggleTheme}
          onLogout={handleLogout}
        />
      )}

      {/* Conteúdo principal */}
      <View style={{ flex: 1, backgroundColor: theme.background }} />

      {/* Footer Mobile */}
      <MobileFooter visible={!deviceType.isDesktop} />
    </SafeAreaView>
  );
}