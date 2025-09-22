import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

// Ícones simulados - em um projeto real, use react-native-vector-icons ou similar
const Icon = ({ name, size = 24, color = '#fff' }: { name: string; size?: number; color?: string }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size, backgroundColor: color }]} />
);

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

export default function DrawerContent(props: any) {
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      onPress: () => props.navigation.navigate('Home'),
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: 'person',
      onPress: () => console.log('Navegar para Perfil'),
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: 'settings',
      onPress: () => console.log('Navegar para Configurações'),
    },
    {
      id: 'reports',
      title: 'Relatórios',
      icon: 'chart',
      onPress: () => console.log('Navegar para Relatórios'),
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'bell',
      onPress: () => console.log('Navegar para Notificações'),
    },
    {
      id: 'help',
      title: 'Ajuda',
      icon: 'help',
      onPress: () => console.log('Navegar para Ajuda'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header do Menu */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'email@exemplo.com'}</Text>
            <Text style={styles.userRole}>{user?.role || 'user'}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} style={styles.menuContainer}>
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Icon name={item.icon} size={24} color="#8a2be2" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <View style={styles.menuItemArrow}>
                <Icon name="arrow" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer com Logout */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.7}
        >
          <Icon name="logout" size={20} color="#ff4757" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8a2be2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#888',
    fontSize: 14,
    marginBottom: 2,
  },
  userRole: {
    color: '#8a2be2',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItems: {
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  menuItemArrow: {
    opacity: 0.5,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
  logoutText: {
    color: '#ff4757',
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '600',
  },
  iconPlaceholder: {
    borderRadius: 4,
    opacity: 0.8,
  },
});