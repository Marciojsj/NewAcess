/**
 * AppLayout - Layout Base Global
 * Sidebars + Área de Conteúdo
 */

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebSidebar } from './WebSidebar';
import { MobileSidebar } from './MobileSidebar';
import { deviceType } from '../../utils/responsive';
import HomeScreen from '../../screens/home/HomeScreen'; // Import corrigido

interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const styles = getStyles(isDark);

  const handleLogout = () => {
    console.log('Logout realizado');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Sidebar Web */}
        {deviceType.isDesktop && (
          <WebSidebar
            theme={isDark ? 'dark' : 'light'}
            onThemeChange={toggleTheme}
          />
        )}

        {/* Área de Conteúdo */}
        <View
          style={[
            styles.content,
            {
              paddingLeft: deviceType.isDesktop ? (sidebarOpen ? 60 : 50) : 0,
            },
          ]}
        >
          {/* Aqui você pode renderizar qualquer tela */}
          {children || <HomeScreen />}
        </View>

        {/* Sidebar Mobile */}
        {!deviceType.isDesktop && (
          <MobileSidebar
            visible={true}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            onMenuToggle={(isOpen) => setSidebarOpen(isOpen)}
            theme={isDark ? 'dark' : 'light'}
            onThemeChange={toggleTheme}
            onLogout={handleLogout}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
    },
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      flexDirection: 'row',
      overflow: 'hidden',
      paddingLeft: deviceType.isDesktop ? 0 : 0,
    },
    content: {
      flex: 1,
      minWidth: 0,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
    },
  });
