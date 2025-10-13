/**
 * AppLayout - Layout Base Global
 * Layout padronizado para todas as telas do sistema
 * Inclui: Sidebar (web/mobile), Animações, Theme, Navegação
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebSidebar } from './WebSidebar';
import { MobileSidebar } from './MobileSidebar';
import { deviceType } from '../../utils/responsive';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  searchPlaceholder?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'AccessControl',
  showBackButton = true,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Buscar...',
}) => {
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Animação de entrada da tela
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: 12,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = () => {
    console.log('Logout realizado');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home' as never);
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
        {...(Platform.OS === 'web' && { hidden: true })}
      />

      <View style={styles.container}>
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

        {/* Conteúdo Principal com Animação */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Header com Título e Botão Voltar */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {!deviceType.isDesktop && (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
              )}

              {showBackButton && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackToHome}
                >
                  <Text style={styles.backIcon}>←</Text>
                  <Text style={styles.backText}>Home</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
            >
              <Text style={styles.themeIcon}>
                {isDark ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conteúdo da Tela */}
          <View style={styles.contentBody}>
            {children}
          </View>
        </Animated.View>

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

const getStyles = (isDark: boolean) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
  },
  content: {
    flex: 1,
    marginLeft: deviceType.isDesktop ? 0 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: isDark ? '#2D3436' : '#2196F3',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#444' : '#1976D2',
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
      },
    }),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    gap: 6,
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  themeIcon: {
    fontSize: 20,
  },
  contentBody: {
    flex: 1,
  },
});
