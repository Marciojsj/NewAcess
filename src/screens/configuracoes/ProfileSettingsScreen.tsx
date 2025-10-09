/**
 * Profile Settings Screen
 * Tela de configurações de perfil do usuário
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../hooks/useSettings';
import { SettingsToggle } from '../../components/settings/SettingsToggle';
import { deviceType } from '../../utils/responsive';

export default function ProfileSettingsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { profileSettings, loading, loadProfileSettings, updateProfileSettings } = useSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  useEffect(() => {
    loadProfileSettings();
  }, [loadProfileSettings]);

  useEffect(() => {
    if (profileSettings) {
      setName(profileSettings.name);
      setEmail(profileSettings.email);
      setPhone(profileSettings.phone || '');
      setPushNotifications(profileSettings.notifications.push);
      setEmailNotifications(profileSettings.notifications.email);
      setSmsNotifications(profileSettings.notifications.sms);
    }
  }, [profileSettings]);

  const handleSave = async () => {
    try {
      await updateProfileSettings({
        name,
        email,
        phone,
        notifications: {
          push: pushNotifications,
          email: emailNotifications,
          sms: smsNotifications,
        },
      });
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  if (loading && !profileSettings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#673AB7" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

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
          <Text style={styles.title}>Configurações de Perfil</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Personal Info Section */}
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+55 11 98765-4321"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notificações</Text>
        
        <SettingsToggle
          title="Notificações Push"
          description="Receber notificações no aplicativo"
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />

        <SettingsToggle
          title="Notificações por Email"
          description="Receber alertas por email"
          value={emailNotifications}
          onValueChange={setEmailNotifications}
        />

        <SettingsToggle
          title="Notificações por SMS"
          description="Receber alertas por SMS"
          value={smsNotifications}
          onValueChange={setSmsNotifications}
        />

        {/* Account Info */}
        <Text style={styles.sectionTitle}>Informações da Conta</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID da Conta:</Text>
            <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Função:</Text>
            <Text style={styles.infoValue}>{user?.role || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Entidade:</Text>
            <Text style={styles.infoValue}>{user?.entityId || 'N/A'}</Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.changePasswordText}>🔒 Alterar Senha</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Salvar Alterações</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  changePasswordButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#673AB7',
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  saveButton: {
    backgroundColor: '#673AB7',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
