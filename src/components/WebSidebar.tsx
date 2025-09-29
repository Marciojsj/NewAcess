import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { responsive, deviceType } from '../utils/responsive';

interface SidebarAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface WebSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({ isOpen, onToggle }) => {
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -250,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const sidebarActions: SidebarAction[] = [
    {
      id: '1',
      title: 'Dashboard',
      icon: '📊',
      color: '#8a2be2',
      onPress: () => Alert.alert('Dashboard', 'Navegando para dashboard'),
    },
    {
      id: '2',
      title: 'Usuários',
      icon: '👥',
      color: '#6c5ce7',
      onPress: () => Alert.alert('Usuários', 'Gerenciar usuários'),
    },
    {
      id: '3',
      title: 'Relatórios',
      icon: '📈',
      color: '#00b894',
      onPress: () => Alert.alert('Relatórios', 'Visualizar relatórios'),
    },
    {
      id: '4',
      title: 'Configurações',
      icon: '⚙️',
      color: '#fdcb6e',
      onPress: () => Alert.alert('Configurações', 'Configurações do sistema'),
    },
    {
      id: '5',
      title: 'Suporte',
      icon: '💬',
      color: '#e17055',
      onPress: () => Alert.alert('Suporte', 'Entre em contato conosco'),
    },
  ];

  if (!deviceType.isDesktop && Platform.OS !== 'web') {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Animated.View
          style={[
            styles.overlay,
            { opacity: overlayAnim },
          ]}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={onToggle}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onToggle}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {sidebarActions.map((action) => (
            <SidebarButton key={action.id} action={action} />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Controle de Acesso v1.0</Text>
        </View>
      </Animated.View>

      {/* Toggle Button */}
      {!isOpen && (
        <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
          <Text style={styles.toggleIcon}>☰</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const SidebarButton: React.FC<{ action: SidebarAction }> = ({ action }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      action.onPress();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
        <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
          <Text style={styles.actionIconText}>{action.icon}</Text>
        </View>
        <Text style={styles.actionTitle}>{action.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)' as any,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 999,
    paddingTop: responsive.padding.xl,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: responsive.padding.lg,
    paddingBottom: responsive.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: responsive.fontSize.lg,
    fontWeight: '700' as const,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  closeIcon: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  actionsContainer: {
    flex: 1,
    paddingTop: responsive.padding.lg,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.lg,
    marginHorizontal: responsive.padding.sm,
    borderRadius: 12,
    marginBottom: responsive.spacing.sm,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: responsive.spacing.md,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: responsive.fontSize.md,
    fontWeight: '500' as const,
  },
  footer: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: '#888',
    fontSize: responsive.fontSize.sm,
    textAlign: 'center' as const,
  },
  toggleButton: {
    position: 'fixed' as any,
    top: responsive.padding.lg,
    left: responsive.padding.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(138, 43, 226, 0.9)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 997,
    boxShadow: '0 4px 12px rgba(138, 43, 226, 0.3)' as any,
  },
  toggleIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
};