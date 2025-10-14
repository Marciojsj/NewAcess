/* WebSidebar.tsx - Sidebar com hover, logout funcional, pesquisa, scroll invisível e destaque */
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, Platform, ScrollView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { deviceType } from '../../utils/responsive';
import {
  Home,
  LogIn,
  LogOut,
  User,
  Users,
  Bell,
  FileText,
  Settings,
  Lock,
  Building,
  BarChart2,
  Sun,
  Moon,
} from 'lucide-react';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  RegistrarEntrada: undefined;
  RegistrarSaida: undefined;
  Visitantes: undefined;
  Relatorios: undefined;
  Users: undefined;
  AccessLogs: undefined;
  Alertas: undefined;
  Entidade: undefined;
  RegistroEntidade: undefined;
  Settings: undefined;
  Permissions: undefined;
};

interface SidebarAction {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  onPress: () => void;
}

interface WebSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
  onThemeChange: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({
  isOpen,
  onToggle,
  theme,
  onThemeChange,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme: appTheme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const slideAnim = useRef(new Animated.Value(isOpen ? 0 : -280)).current;
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const [hoveredAction, setHoveredAction] = useState<string | null>(null); // hover item
  const [hoveredFooter, setHoveredFooter] = useState<string | null>(null); // hover footer

  const sidebarActions: SidebarAction[] = [
    { id: '1', title: 'Dashboard', icon: Home, onPress: () => { navigation.navigate('Home'); onToggle(); } },
    { id: '2', title: 'Registrar Entrada', icon: LogIn, onPress: () => { navigation.navigate('RegistrarEntrada'); onToggle(); } },
    { id: '3', title: 'Registrar Saída', icon: LogOut, onPress: () => { navigation.navigate('RegistrarSaida'); onToggle(); } },
    { id: '4', title: 'Visitantes', icon: Users, onPress: () => { navigation.navigate('Visitantes'); onToggle(); } },
    { id: '5', title: 'Histórico de Acesso', icon: FileText, onPress: () => { navigation.navigate('AccessLogs'); onToggle(); } },
    { id: '6', title: 'Relatórios', icon: BarChart2, onPress: () => { navigation.navigate('Relatorios'); onToggle(); } },
    { id: '7', title: 'Alertas', icon: Bell, onPress: () => { navigation.navigate('Alertas'); onToggle(); } },
    { id: '8', title: 'Usuários', icon: User, onPress: () => { navigation.navigate('Users'); onToggle(); } },
    { id: '9', title: 'Entidades', icon: Building, onPress: () => { navigation.navigate('Entidade'); onToggle(); } },
    { id: '10', title: 'Configurações', icon: Settings, onPress: () => { navigation.navigate('Settings'); onToggle(); } },
    { id: '11', title: 'Permissões', icon: Lock, onPress: () => { navigation.navigate('Permissions'); onToggle(); } },
  ];

  // Filtra ações pelo texto digitado
  const filteredActions = sidebarActions.filter(action =>
    action.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  }, [isOpen]);

  if (!deviceType.isDesktop && Platform.OS !== 'web') return null;

  const sidebarWidth = isOpen ? 280 : 60;

  const handleLogout = () => {
    logout(); // limpa usuário/contexto
    setLogoutModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getActionStyle = (id: string, isMatched: boolean): import('react-native').ViewStyle => {
      let style: import('react-native').ViewStyle = {
        justifyContent: isOpen ? 'flex-start' : 'center',
      };
      if (isMatched) {
        style = { ...style, borderWidth: 2, borderColor: '#7f00ff', borderRadius: 10 };
      }
      if (hoveredAction === id) {
        style = { ...style, backgroundColor: currentTheme === 'dark' ? '#333' : '#e0e0e0' };
      }
      return style;
    };

  const getFooterStyle = (id: string): import('react-native').ViewStyle => {
    return {
      justifyContent: isOpen ? 'flex-start' : 'center',
      backgroundColor: hoveredFooter === id ? (currentTheme === 'dark' ? '#333' : '#e0e0e0') : 'transparent',
    };
  };

  return (
    <>
      <Animated.View
        style={[
          styles.sidebar,
          {
            width: sidebarWidth,
            backgroundColor: currentTheme === 'dark'
              ? appTheme.backgroundSecondary
              : appTheme.backgroundCard,
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={onToggle} style={styles.toggleButton}>
            <Text style={{ color: appTheme.text, fontSize: 18 }}>☰</Text>
          </Pressable>
          {isOpen && <Text style={[styles.userName, { color: appTheme.text }]}>{user?.name || 'Admin'}</Text>}
        </View>

        {/* BARRA DE PESQUISA */}
        {isOpen && (
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: appTheme.backgroundCard, color: appTheme.text, borderColor: appTheme.border }]
            }
            placeholder="Pesquisar..."
            placeholderTextColor={appTheme.text + '99'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        {/* AÇÕES COM SCROLL INVISÍVEL */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredActions.map(item => {
            const isMatched = !!(searchQuery && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
            return (
              <Pressable
                key={item.id}
                onPress={item.onPress}
                onHoverIn={() => setHoveredAction(item.id)}
                onHoverOut={() => setHoveredAction(null)}
                style={[styles.actionButton, getActionStyle(item.id, isMatched)]}
              >
                <item.icon size={24} color={appTheme.text} />
                {isOpen && <Text style={[styles.actionTitle, { color: appTheme.text }]}>{item.title}</Text>}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Pressable
            onPress={onThemeChange}
            onHoverIn={() => setHoveredFooter('theme')}
            onHoverOut={() => setHoveredFooter(null)}
            style={[styles.footerButton, getFooterStyle('theme')]}
          >
            {isDark ? <Sun color={appTheme.text} size={20} /> : <Moon color={appTheme.text} size={20} />}
            {isOpen && (
              <Text style={{ marginLeft: 10, color: appTheme.text }}>
                {isDark ? 'Modo Claro' : 'Modo Escuro'}
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => setLogoutModalVisible(true)}
            onHoverIn={() => setHoveredFooter('logout')}
            onHoverOut={() => setHoveredFooter(null)}
            style={[styles.footerButton, getFooterStyle('logout')]}
          >
            <LogOut color={appTheme.error} size={20} />
            {isOpen && <Text style={{ marginLeft: 10, color: appTheme.error }}>Logout</Text>}
          </Pressable>
        </View>
      </Animated.View>

      {/* MODAL DE CONFIRMAÇÃO DE LOGOUT */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: appTheme.backgroundCard }]}>
            <Text style={[styles.modalTitle, { color: appTheme.text }]}>
              Deseja realmente sair?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: appTheme.primary }]}
                onPress={handleLogout}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Sim</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: appTheme.backgroundSecondary }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: appTheme.text }]}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    bottom: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  toggleButton: { padding: 8 },
  userName: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionTitle: { fontSize: 14, fontWeight: '500', marginLeft: 12 },
  footer: { marginBottom: 20 },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 280, borderRadius: 12, padding: 20, margin: 20 },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { fontSize: 14, fontWeight: '600' },
});
