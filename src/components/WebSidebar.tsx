import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Alert,
  Platform,
  Switch,
  StyleSheet,
  FlatList,
} from 'react-native';
import { responsive, deviceType } from '../utils/responsive';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  keywords: string[];
  onPress: () => void;
}

interface WebSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
  onLogout?: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({
  isOpen,
  onToggle,
  theme = 'dark',
  onThemeChange,
  onLogout
}) => {
  const { theme: appTheme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-320)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActions, setFilteredActions] = useState<SidebarAction[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<TextInput>(null);

  const sidebarActions: SidebarAction[] = [
    {
      id: '1',
      title: 'Dashboard',
      icon: '📊',
      color: appTheme.purple,
      keywords: ['dashboard', 'início', 'home', 'principal'],
      onPress: () => Alert.alert('Dashboard', 'Navegando para dashboard'),
    },
    {
      id: '2',
      title: 'Usuários',
      icon: '👥',
      color: appTheme.blue,
      keywords: ['usuários', 'users', 'pessoas', 'clientes'],
      onPress: () => Alert.alert('Usuários', 'Gerenciar usuários'),
    },
    {
      id: '3',
      title: 'Relatórios',
      icon: '📈',
      color: appTheme.green,
      keywords: ['relatórios', 'reports', 'análise', 'métricas'],
      onPress: () => Alert.alert('Relatórios', 'Visualizar relatórios'),
    },
    {
      id: '4',
      title: 'Configurações',
      icon: '⚙️',
      color: appTheme.orange,
      keywords: ['configurações', 'settings', 'preferências', 'opções'],
      onPress: () => Alert.alert('Configurações', 'Configurações do sistema'),
    },
    {
      id: '5',
      title: 'Suporte',
      icon: '💬',
      color: appTheme.error,
      keywords: ['suporte', 'help', 'ajuda', 'contato'],
      onPress: () => Alert.alert('Suporte', 'Entre em contato conosco'),
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -320,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (isOpen && Platform.OS === 'web') {
      setTimeout(() => searchInputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredActions(sidebarActions);
      setSelectedIndex(-1);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = sidebarActions.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
      setFilteredActions(filtered);
      setSelectedIndex(filtered.length > 0 ? 0 : -1);
    }
  }, [searchQuery]);

  const handleKeyPress = useCallback((e: any) => {
    if (!isOpen || filteredActions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredActions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev > 0 ? prev - 1 : filteredActions.length - 1
      );
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      filteredActions[selectedIndex].onPress();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  }, [isOpen, filteredActions, selectedIndex]);

  useEffect(() => {
    if (Platform.OS === 'web' && isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress, isOpen]);

  const handleThemeToggle = (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={[styles.highlightedText, { backgroundColor: appTheme.primary }]}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  const renderSearchResult = ({ item, index }: { item: SidebarAction; index: number }) => (
    <SidebarButton
      action={item}
      theme={currentTheme}
      isSelected={index === selectedIndex}
      searchQuery={searchQuery}
    />
  );

  if (!deviceType.isDesktop && Platform.OS !== 'web') {
    return null;
  }

  return (
    <>
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

      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
            backgroundColor: currentTheme === 'dark' ? appTheme.backgroundSecondary : appTheme.backgroundCard,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={[styles.avatar, { backgroundColor: appTheme.purpleLight }]}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={[
                styles.userName,
                { color: appTheme.text }
              ]}>
                Admin User
              </Text>
              <Text style={[styles.userRole, { color: appTheme.purple }]}>
                Administrador
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.closeButton,
              { backgroundColor: appTheme.borderLight }
            ]}
            onPress={onToggle}
          >
            <Text style={[
              styles.closeIcon,
              { color: appTheme.text }
            ]}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            ref={searchInputRef}
            style={[
              styles.searchInput,
              {
                color: appTheme.text,
                backgroundColor: appTheme.background + '80',
                // textAlign: 'center',
              }
            ]}
            placeholder="Buscar funcionalidades..."
            placeholderTextColor={appTheme.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            selectionColor={appTheme.primary + '40'}
            {...(Platform.OS === 'web' ? {
              onFocus: (e: any) => {
                if (e.target && e.target.style) {
                  e.target.style.outline = 'none';
                }
              }
            } : {})}
          />
        </View>

        <View style={styles.actionsContainer}>
          <FlatList
            data={filteredActions}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={[
                  styles.emptyIcon,
                  { backgroundColor: appTheme.background }
                ]}>
                  <Text style={[
                    styles.emptyIconText,
                    { color: appTheme.textTertiary }
                  ]}>
                    🔍
                  </Text>
                </View>
                <Text style={[
                  styles.emptyText,
                  { color: appTheme.textTertiary }
                ]}>
                  {searchQuery ? 'Nenhum resultado encontrado' : 'Busque por funcionalidades'}
                </Text>
                {!searchQuery && (
                  <Text style={[
                    styles.emptySubtext,
                    { color: appTheme.textTertiary }
                  ]}>
                    Digite acima para explorar o sistema
                  </Text>
                )}
              </View>
            }
          />
        </View>

        <View style={[
          styles.controlsSection,
          {
            borderTopColor: appTheme.borderLight,
          }
        ]}>
          <View style={styles.controlItem}>
            <View style={styles.controlLeft}>
              <View style={[
                styles.controlIcon,
                { backgroundColor: appTheme.background }
              ]}>
                <Text style={styles.controlIconText}>
                  {currentTheme === 'dark' ? '🌙' : '☀️'}
                </Text>
              </View>
              <Text style={[
                styles.controlText,
                { color: appTheme.text }
              ]}>
                Modo Escuro
              </Text>
            </View>
            <Switch
              value={currentTheme === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{ false: appTheme.border, true: appTheme.primary }}
              thumbColor={appTheme.backgroundCard}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: appTheme.errorLight + '20' }
            ]}
            onPress={handleLogout}
          >
            <View style={[
              styles.logoutIcon,
              { backgroundColor: appTheme.error }
            ]}>
              <Text style={styles.logoutIconText}>🚪</Text>
            </View>
            <Text style={[
              styles.logoutText,
              { color: appTheme.error }
            ]}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[
          styles.footer,
          {
            borderTopColor: appTheme.borderLight,
          }
        ]}>
          <Text style={[
            styles.footerText,
            { color: appTheme.textTertiary }
          ]}>
            Controle de Acesso v0.0 Desenvolvimento
          </Text>
        </View>
      </Animated.View>

      {!isOpen && (
        <TouchableOpacity
          style={[
            styles.toggleButton,
            {
              backgroundColor: appTheme.backgroundCard,
              borderColor: appTheme.borderLight,
            }
          ]}
          onPress={onToggle}
        >
          <View style={styles.toggleIconContainer}>
            <View style={[
              styles.toggleLine,
              { backgroundColor: appTheme.text }
            ]} />
            <View style={[
              styles.toggleLine,
              { backgroundColor: appTheme.text }
            ]} />
            <View style={[
              styles.toggleLine,
              { backgroundColor: appTheme.text }
            ]} />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const SidebarButton: React.FC<{
  action: SidebarAction;
  theme: 'light' | 'dark';
  isSelected?: boolean;
  searchQuery?: string;
}> = ({ action, theme, isSelected = false, searchQuery = '' }) => {
  const { theme: appTheme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      action.onPress();
    });
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={[styles.highlightedText, { backgroundColor: appTheme.primary }]}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isSelected
              ? appTheme.primary + '20'
              : 'transparent',
          }
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={[
          styles.actionIcon,
          {
            backgroundColor: action.color,
          }
        ]}>
          <Text style={styles.actionIconText}>{action.icon}</Text>
        </View>
        <Text style={[
          styles.actionTitle,
          { color: appTheme.text }
        ]}>
          {searchQuery ? highlightText(action.title, searchQuery) : action.title}
        </Text>
        <View style={styles.chevron}>
          <Text style={[
            styles.chevronText,
            { color: appTheme.textTertiary }
          ]}>
            ›
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    position: "fixed" as any,
    top: 0,
    left: 0,
    bottom: 0,
    width: 320,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 999,
    paddingTop: responsive.padding.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    ...(Platform.OS === "web" ? { backdropFilter: "blur(20px)" } as any : {}),
  },
  header: {
    paddingHorizontal: responsive.padding.lg,
    paddingBottom: responsive.padding.lg,
    marginHorizontal: responsive.padding.md,
  },
  headerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: responsive.padding.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: responsive.spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  avatarText: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  userName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  userRole: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500' as const,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-end' as const,
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: 'bold' as const,
  },
  searchWrapper: {
    paddingHorizontal: responsive.padding.lg,
    marginBottom: responsive.padding.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    paddingVertical: responsive.padding.sm,
    paddingHorizontal: responsive.padding.md,
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontWeight: '400',
    borderRadius: 12,
    // textAlign: 'center',
  },
  highlightedText: {
    color: '#ffffff',
    fontWeight: '600',
    borderRadius: 2,
    paddingHorizontal: 2,
  },
  actionsContainer: {
    flex: 1,
    paddingTop: responsive.padding.md,
    paddingHorizontal: responsive.padding.sm,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.md,
    marginHorizontal: responsive.padding.xs,
    borderRadius: 12,
    marginBottom: responsive.spacing.xs,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: responsive.spacing.md,
  },
  actionIconText: {
    fontSize: 16,
  },
  actionTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500' as const,
    flex: 1,
  },
  chevron: {
    opacity: 0.7,
  },
  chevronText: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  emptyState: {
    paddingVertical: responsive.padding.xl,
    alignItems: 'center',
    paddingHorizontal: responsive.padding.lg,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.padding.md,
  },
  emptyIconText: {
    fontSize: 24,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: responsive.fontSize.md,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: responsive.padding.xs,
  },
  emptySubtext: {
    fontSize: responsive.fontSize.sm,
    textAlign: 'center',
    opacity: 0.7,
  },
  controlsSection: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderTopWidth: 1,
    marginTop: responsive.padding.md,
  },
  controlItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: responsive.padding.lg,
  },
  controlLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  controlIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: responsive.spacing.md,
  },
  controlIconText: {
    fontSize: 14,
  },
  controlText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500' as const,
  },
  logoutButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.md,
    borderRadius: 12,
    marginTop: responsive.spacing.sm,
  },
  logoutIcon: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: responsive.spacing.md,
  },
  logoutIconText: {
    fontSize: 14,
  },
  logoutText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600' as const,
  },
  footer: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: responsive.fontSize.xs,
    textAlign: 'center' as const,
    fontWeight: '500' as const,
  },
  toggleButton: {
    position: "fixed" as any,
    top: 20,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    zIndex: 997,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    ...(Platform.OS === "web" ? { backdropFilter: "blur(10px)" } as any : {}),
  },
  toggleIconContainer: {
    width: 20,
    height: 16,
    justifyContent: 'space-between' as const,
  },
  toggleLine: {
    height: 2,
    borderRadius: 1,
    width: '100%',
  },
});