// src/components/MobilesSidebar.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { deviceType } from '../../utils/responsive';
import Feather from 'react-native-vector-icons/Feather';

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

type MobileSidebarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarAction {
  id: string;
  title: string;
  icon: () => React.ReactElement;
  onPress: () => void;
}

interface MobileSidebarProps {
  visible?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
  theme?: 'light' | 'dark';
  onThemeChange?: (theme?: 'light' | 'dark') => void;
  onLogout?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  visible = true,
  isOpen: externalIsOpen = false,
  onToggle,
  onMenuToggle,
  theme: externalTheme,
  onThemeChange,
  onLogout
}) => {
  const { theme: appTheme, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation<MobileSidebarNavigationProp>();
  const slideAnim = useRef(new Animated.Value(visible ? 0 : -100)).current;
  const menuAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActions, setFilteredActions] = useState<SidebarAction[]>([]);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { user, logout } = useAuth();

  const sidebarActions: SidebarAction[] = [
    { id: '1', title: 'Dashboard', icon: () => <Feather name="home" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Home'); closeMenu(); } },
    { id: '2', title: 'Registrar Entrada', icon: () => <Feather name="log-in" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('RegistrarEntrada'); closeMenu(); } },
    { id: '3', title: 'Registrar Saída', icon: () => <Feather name="log-out" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('RegistrarSaida'); closeMenu(); } },
    { id: '4', title: 'Visitantes', icon: () => <Feather name="users" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Visitantes'); closeMenu(); } },
    { id: '5', title: 'Histórico de Acesso', icon: () => <Feather name="file-text" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('AccessLogs'); closeMenu(); } },
    { id: '6', title: 'Relatórios', icon: () => <Feather name="bar-chart-2" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Relatorios'); closeMenu(); } },
    { id: '7', title: 'Alertas', icon: () => <Feather name="bell" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Alertas'); closeMenu(); } },
    { id: '8', title: 'Usuários', icon: () => <Feather name="user" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Users'); closeMenu(); } },
    { id: '9', title: 'Entidades', icon: () => <Feather name="building" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Entidade'); closeMenu(); } },
    { id: '10', title: 'Configurações', icon: () => <Feather name="settings" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Settings'); closeMenu(); } },
    { id: '11', title: 'Permissões', icon: () => <Feather name="lock" size={20} color={appTheme.text} />, onPress: () => { navigation.navigate('Permissions'); closeMenu(); } },
  ];

  useEffect(() => { setIsOpen(externalIsOpen); }, [externalIsOpen]);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuToggle?.(newState);
    onToggle?.();
  };

  const closeMenu = () => {
    setIsOpen(false);
    setSearchQuery('');
    Keyboard.dismiss();
    onMenuToggle?.(false);
    onToggle?.();
  };

  useEffect(() => { Animated.spring(slideAnim, { toValue: visible ? 0 : -100, damping: 20, stiffness: 90, useNativeDriver: true }).start(); }, [visible]);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(menuAnim, { toValue: 0, damping: 20, stiffness: 90, useNativeDriver: true }),
        Animated.spring(contentAnim, { toValue: screenWidth * 0.75, damping: 20, stiffness: 90, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(menuAnim, { toValue: -screenWidth * 0.75, damping: 20, stiffness: 90, useNativeDriver: true }),
        Animated.spring(contentAnim, { toValue: 0, damping: 20, stiffness: 90, useNativeDriver: true }),
      ]).start();
      Keyboard.dismiss();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredActions(sidebarActions);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredActions(sidebarActions.filter(item => item.title.toLowerCase().includes(query)));
    }
  }, [searchQuery]);

  const handleThemeToggle = () => { toggleTheme(); onThemeChange?.(isDark ? 'light' : 'dark'); };
  const handleLogout = () => { logout(); onLogout?.(); setLogoutModalVisible(false); closeMenu(); };
  const handleOverlayPress = () => { Keyboard.dismiss(); closeMenu(); };

  const renderAction = ({ item }: { item: SidebarAction }) => (
    <MobileActionButton action={item} searchQuery={searchQuery} />
  );

  if (deviceType.isDesktop) return null;

  return (
    <>
      {/* BOTÃO TOGGLE FLUTUANTE */}
      <Animated.View style={[styles.navbar, { transform: [{ translateX: contentAnim }] }]}>
        <Pressable onPress={toggleMenu} style={[styles.toggleButton, { backgroundColor: appTheme.backgroundCard }]}>
          <View style={styles.toggleIcon}>
            <View style={[styles.line, { backgroundColor: appTheme.text }]} />
            <View style={[styles.line, { backgroundColor: appTheme.text }]} />
            <View style={[styles.line, { backgroundColor: appTheme.text }]} />
          </View>
        </Pressable>
      </Animated.View>

      {/* OVERLAY */}
      {isOpen && <Pressable style={styles.overlay} onPress={handleOverlayPress} />}

      {/* SIDEBAR */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: menuAnim }], backgroundColor: isDark ? appTheme.backgroundSecondary : appTheme.backgroundCard }]}>
        <View style={styles.header}>
          <Text style={[styles.userName, { color: appTheme.text }]}>{user?.name || 'Admin User'}</Text>
          <Text style={[styles.userRole, { color: appTheme.textTertiary }]}>Administrador</Text>
        </View>

        <TextInput
          style={[styles.searchInput, { backgroundColor: appTheme.backgroundCard, borderColor: appTheme.border, color: appTheme.text }]}
          placeholder="Buscar..."
          placeholderTextColor={appTheme.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredActions}
          renderItem={renderAction}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ flex: 1, marginTop: 10 }}
        />

        <View style={styles.footer}>
          <HoverButton label={isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro'} color={appTheme.text} onPress={handleThemeToggle} />
          <HoverButton label="Logout" color={appTheme.error} onPress={() => setLogoutModalVisible(true)} />
        </View>
      </Animated.View>

      {/* LOGOUT MODAL */}
      <Modal visible={logoutModalVisible} transparent animationType="fade" onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: appTheme.backgroundCard }]}>
            <Text style={[styles.modalTitle, { color: appTheme.text }]}>Deseja realmente sair?</Text>
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalButton, { backgroundColor: appTheme.primary }]} onPress={handleLogout}>
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Sim</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: appTheme.backgroundSecondary }]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={[styles.modalButtonText, { color: appTheme.text }]}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

/* === COMPONENTES AUXILIARES === */
const MobileActionButton: React.FC<{ action: SidebarAction; searchQuery: string }> = ({ action, searchQuery }) => {
  const { theme: appTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isMatch = searchQuery && action.title.toLowerCase().includes(searchQuery.toLowerCase());

  const Icon = action.icon;

  return (
    <Pressable
      onPress={action.onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.actionButton,
        { 
          backgroundColor: hovered ? appTheme.primary + '20' : appTheme.background + '05',
          borderWidth: isMatch ? 2 : 0,
          borderColor: isMatch ? '#8A2BE2' : 'transparent',
        }
      ]}
    >
      <View style={{ marginRight: 12 }}>
        <Icon />
      </View>
      <Text style={[styles.actionTitle, { color: appTheme.text }]}>{action.title}</Text>
    </Pressable>
  );
};

const HoverButton: React.FC<{ label: string; color: string; onPress: () => void }> = ({ label, color, onPress }) => {
  const { theme: appTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.footerButton,
        { backgroundColor: hovered ? appTheme.primary + '20' : appTheme.background + '05' },
      ]}
    >
      <Text style={{ color, fontWeight: '500' }}>{label}</Text>
    </Pressable>
  );
};

/* === ESTILOS === */
const styles = StyleSheet.create({
  navbar: { position: 'absolute', top: 10, left: 20, zIndex: 1000 },
  toggleButton: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  toggleIcon: { width: 24, height: 18, justifyContent: 'space-between' },
  line: { height: 2, borderRadius: 1, width: '100%' },
  overlay: { position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 998 },
  sidebar: { position: 'absolute', top: 0, left: 0, width: screenWidth * 0.75, height: '100%', padding: 20, zIndex: 999, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
  header: { marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: '600' },
  userRole: { fontSize: 13, marginTop: 2 },
  searchInput: { height: 40, borderRadius: 10, paddingHorizontal: 12, borderWidth: 1 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 12, marginBottom: 8 },
  actionTitle: { fontSize: 16 },
  footer: { marginTop: 10 },
  footerButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 280, borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { fontWeight: '600' },
});
