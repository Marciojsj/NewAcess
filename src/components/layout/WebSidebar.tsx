// WebSidebar.tsx - Sidebar com hover, logout, pesquisa, scroll invisível e destaque
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal, StyleSheet, Platform } from 'react-native';
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
  theme: 'light' | 'dark';
  onThemeChange: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({ theme, onThemeChange }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme: appTheme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [hoveredFooter, setHoveredFooter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const sidebarActions: SidebarAction[] = [
    { id: '1', title: 'Dashboard', icon: Home, onPress: () => navigation.navigate('Home') },
    { id: '2', title: 'Registrar Entrada', icon: LogIn, onPress: () => navigation.navigate('RegistrarEntrada') },
    { id: '3', title: 'Registrar Saída', icon: LogOut, onPress: () => navigation.navigate('RegistrarSaida') },
    { id: '4', title: 'Visitantes', icon: Users, onPress: () => navigation.navigate('Visitantes') },
    { id: '5', title: 'Histórico de Acesso', icon: FileText, onPress: () => navigation.navigate('AccessLogs') },
    { id: '6', title: 'Relatórios', icon: BarChart2, onPress: () => navigation.navigate('Relatorios') },
    { id: '7', title: 'Alertas', icon: Bell, onPress: () => navigation.navigate('Alertas') },
    { id: '8', title: 'Usuários', icon: User, onPress: () => navigation.navigate('Users') },
    { id: '9', title: 'Entidades', icon: Building, onPress: () => navigation.navigate('Entidade') },
    { id: '10', title: 'Configurações', icon: Settings, onPress: () => navigation.navigate('Settings') },
    { id: '11', title: 'Permissões', icon: Lock, onPress: () => navigation.navigate('Permissions') },
  ];

  const filteredActions = sidebarActions.filter(action =>
    action.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarWidth = isHovered ? 280 : 35;

  const handleLogout = () => {
    logout();
    setLogoutModalVisible(false);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const getActionStyle = (id: string, isMatched: boolean) => {
    let style: any = { justifyContent: isHovered ? 'flex-start' : 'center' };
    if (isMatched) style = { ...style, borderWidth: 2, borderColor: '#7f00ff', borderRadius: 10 };
    if (hoveredAction === id) style = { ...style, backgroundColor: currentTheme === 'dark' ? '#333' : '#e0e0e0' };
    return style;
  };

  const getFooterStyle = (id: string): React.ComponentProps<typeof View>['style'] => ({
    justifyContent: isHovered ? 'flex-start' as 'flex-start' : 'center' as 'center',
    backgroundColor: hoveredFooter === id ? (currentTheme === 'dark' ? '#333' : '#e0e0e0') : 'transparent',
  });

  if (!deviceType.isDesktop && Platform.OS !== 'web') return null;

  const currentTheme = theme;

  return (
    <>
      <div
        id="web-sidebar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: sidebarWidth,
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          paddingTop: 20,
          paddingLeft: 5,
          paddingRight: 10,
          backgroundColor: currentTheme === 'dark' ? appTheme.backgroundSecondary : appTheme.backgroundCard,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.2s',
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.toggleButton}>
            <Text style={{ color: appTheme.text, fontSize: 18 }}>☰</Text>
          </Pressable>
          {isHovered && <Text style={[styles.userName, { color: appTheme.text }]}>{user?.name || 'Admin'}</Text>}
        </View>

        {/* PESQUISA */}
        {isHovered && (
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: appTheme.backgroundCard, color: appTheme.text, borderColor: appTheme.border },
            ]}
            placeholder="Pesquisar..."
            placeholderTextColor={appTheme.text + '99'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        {/* AÇÕES */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
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
                {isHovered && <Text style={[styles.actionTitle, { color: appTheme.text }]}>{item.title}</Text>}
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
            {isHovered && <Text style={{ marginLeft: 10, color: appTheme.text }}>{isDark ? 'Modo Claro' : 'Modo Escuro'}</Text>}
          </Pressable>
          <Pressable
            onPress={() => setLogoutModalVisible(true)}
            onHoverIn={() => setHoveredFooter('logout')}
            onHoverOut={() => setHoveredFooter(null)}
            style={[styles.footerButton, getFooterStyle('logout')]}
          >
            <LogOut color={appTheme.error} size={20} />
            {isHovered && <Text style={{ marginLeft: 10, color: appTheme.error }}>Logout</Text>}
          </Pressable>
        </View>
      </div>

      {/* MODAL DE LOGOUT */}
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

// STYLES
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  toggleButton: { padding: 8 },
  userName: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  searchInput: { height: 40, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 10, borderRadius: 8, marginBottom: 12 },
  actionTitle: { fontSize: 14, fontWeight: '500', marginLeft: 12 },
  footer: { marginBottom: 20 },
  footerButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, marginBottom: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 280, borderRadius: 12, padding: 20, margin: 20 },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { fontSize: 14, fontWeight: '600' },
});
