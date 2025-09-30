// src/components/MobileFooter.tsx (atualizado e corrigido)
import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { responsive, deviceType } from '../utils/responsive';
import { useTheme } from '../contexts/ThemeContext';
import { SearchModal } from './SearchModal';

interface FooterAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface MobileFooterProps {
  visible?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const MobileFooter: React.FC<MobileFooterProps> = ({ visible = true }) => {
  const { theme, isDark } = useTheme();
  const slideAnim = useRef(new Animated.Value(visible ? 0 : 100)).current;
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : 100,
      damping: 20,
      stiffness: 90,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const searchData = [
    {
      id: '1',
      title: 'Dashboard',
      icon: '📊',
      color: '#8b5cf6',
      keywords: ['dashboard', 'início', 'home', 'principal'],
      onPress: () => Alert.alert('Dashboard', 'Navegando para dashboard'),
    },
    {
      id: '2',
      title: 'Usuários',
      icon: '👥',
      color: '#06b6d4',
      keywords: ['usuários', 'users', 'pessoas', 'clientes'],
      onPress: () => Alert.alert('Usuários', 'Gerenciar usuários'),
    },
    {
      id: '3',
      title: 'Relatórios',
      icon: '📈',
      color: '#10b981',
      keywords: ['relatórios', 'reports', 'análise', 'métricas'],
      onPress: () => Alert.alert('Relatórios', 'Visualizar relatórios'),
    },
    {
      id: '4',
      title: 'Configurações',
      icon: '⚙️',
      color: '#f59e0b',
      keywords: ['configurações', 'settings', 'preferências', 'opções'],
      onPress: () => Alert.alert('Configurações', 'Configurações do sistema'),
    },
    {
      id: '5',
      title: 'Suporte',
      icon: '💬',
      color: '#ef4444',
      keywords: ['suporte', 'help', 'ajuda', 'contato'],
      onPress: () => Alert.alert('Suporte', 'Entre em contato conosco'),
    },
  ];

  const footerActions: FooterAction[] = [
    {
      id: 'search',
      title: 'Buscar',
      icon: '🔍',
      onPress: () => setSearchModalVisible(true),
    },
    {
      id: 'support',
      title: 'Suporte',
      icon: '💬',
      onPress: () => Alert.alert('Suporte', 'Entre em contato conosco para ajuda'),
    },
    {
      id: 'about',
      title: 'Sobre',
      icon: 'ℹ️',
      onPress: () => Alert.alert('Sobre', 'Sistema de Controle de Acesso v1.0'),
    },
  ];

  if (deviceType.isDesktop || Platform.OS === 'web') {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
            backgroundColor: theme.backgroundCard,
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.content}>
          {footerActions.map((action, index) => (
            <FooterButton 
              key={action.id} 
              action={action} 
              theme={theme}
              isFirst={index === 0}
              isLast={index === footerActions.length - 1}
            />
          ))}
        </View>
        
        {/* Indicador visual */}
        <View style={[styles.indicator, { backgroundColor: theme.border }]} />
      </Animated.View>

      {/* Modal de Busca */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        theme={isDark ? 'dark' : 'light'}
        searchData={searchData}
      />
    </>
  );
};

// Componente FooterButton corrigido
const FooterButton: React.FC<{ 
  action: FooterAction; 
  theme: any;
  isFirst: boolean;
  isLast: boolean;
}> = ({ action, theme, isFirst, isLast }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        damping: 15,
        stiffness: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 15,
        stiffness: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      action.onPress();
    });
  };

  return (
    <Animated.View 
      style={[
        styles.buttonContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          marginLeft: isFirst ? 0 : 8,
          marginRight: isLast ? 0 : 8,
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { 
            backgroundColor: theme.backgroundSecondary,
            shadowColor: theme.shadow,
          }
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={styles.icon}>{action.icon}</Text>
        <Text style={[styles.title, { color: theme.textSecondary }]}>
          {action.title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 
      (screenWidth >= 375 ? 10 : 20) : // iPhone notch vs older iPhones
      responsive.padding.sm, // Android
    paddingTop: responsive.padding.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: responsive.padding.md,
  },
  buttonContainer: {
    flex: 1,
    maxWidth: 100,
  },
  button: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 10,
    paddingHorizontal: responsive.padding.sm,
    borderRadius: 16,
    minHeight: 52,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  icon: {
    fontSize: 18,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
    letterSpacing: -0.2,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center' as const,
    marginTop: responsive.padding.xs,
    opacity: 0.5,
  },
});