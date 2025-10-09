/**
 * Settings Screen
 * Tela principal de configurações do sistema
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { SettingsCard } from '../../components/settings/SettingsCard';
import { deviceType } from '../../utils/responsive';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair do Sistema',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.navigate('Login' as never);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Configurações</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role || 'Usuário'}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>👤 Conta</Text>
        <SettingsCard
          icon="👤"
          title="Configurações de Perfil"
          description="Edite suas informações pessoais e preferências"
          onPress={() => navigation.navigate('ProfileSettings' as never)}
        />
        <SettingsCard
          icon="🔐"
          title="Segurança"
          description="Senha, autenticação de dois fatores e sessões"
          onPress={() => navigation.navigate('SecuritySettings' as never)}
        />

        {/* System Section */}
        <Text style={styles.sectionTitle}>⚙️ Sistema</Text>
        <SettingsCard
          icon="🏢"
          title="Configurações da Entidade"
          description="Gerenciar informações e limites da organização"
          onPress={() => navigation.navigate('SystemSettings' as never)}
        />
        <SettingsCard
          icon="🔔"
          title="Notificações"
          description="Configure alertas e notificações do sistema"
          onPress={() => navigation.navigate('NotificationSettings' as never)}
        />
        <SettingsCard
          icon="👥"
          title="Gerenciar Usuários"
          description="Adicionar, editar ou remover usuários"
          onPress={() => navigation.navigate('Users' as never)}
        />

        {/* App Section */}
        <Text style={styles.sectionTitle}>📱 Aplicativo</Text>
        <SettingsCard
          icon="🎨"
          title="Aparência"
          description="Tema, tamanho da fonte e modo compacto"
          onPress={() => navigation.navigate('AppSettings' as never)}
        />
        <SettingsCard
          icon="🌐"
          title="Idioma e Região"
          description="Configurar idioma e fuso horário"
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        />

        {/* Data Section */}
        <Text style={styles.sectionTitle}>💾 Dados</Text>
        <SettingsCard
          icon="📤"
          title="Exportar Configurações"
          description="Fazer backup das suas configurações"
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        />
        <SettingsCard
          icon="📥"
          title="Importar Configurações"
          description="Restaurar configurações de um backup"
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        />

        {/* About Section */}
        <Text style={styles.sectionTitle}>ℹ️ Sobre</Text>
        <SettingsCard
          icon="📋"
          title="Versão do Sistema"
          description="v1.0.0 - Build 2025.10.09"
          onPress={() => Alert.alert('Versão', 'Access Control System v1.0.0')}
        />
        <SettingsCard
          icon="📄"
          title="Termos e Privacidade"
          description="Leia nossos termos de uso e política de privacidade"
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        />
        <SettingsCard
          icon="❓"
          title="Ajuda e Suporte"
          description="Tutoriais, FAQ e contato com suporte"
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Sair do Sistema</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Access Control System © 2025
          </Text>
          <Text style={styles.footerSubtext}>
            Todos os direitos reservados
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#673AB7',
    padding: 16,
    paddingTop: deviceType.isMobile ? 40 : 16,
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#673AB7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: '#E1BEE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  logoutIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#BBB',
  },
});
