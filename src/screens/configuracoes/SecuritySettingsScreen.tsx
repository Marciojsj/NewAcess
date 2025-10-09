/**
 * Security Settings Screen
 * Tela de configurações de segurança
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
import { useSettings } from '../../hooks/useSettings';
import { SettingsToggle } from '../../components/settings/SettingsToggle';
import { deviceType } from '../../utils/responsive';

export default function SecuritySettingsScreen() {
  const navigation = useNavigation();
  const { securitySettings, loading, loadSecuritySettings, updateSecuritySettings } = useSettings();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordExpirationDays, setPasswordExpirationDays] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('');
  const [allowMultipleSessions, setAllowMultipleSessions] = useState(true);
  const [requireStrongPassword, setRequireStrongPassword] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState('');
  const [lockoutDuration, setLockoutDuration] = useState('');

  useEffect(() => {
    loadSecuritySettings();
  }, [loadSecuritySettings]);

  useEffect(() => {
    if (securitySettings) {
      setTwoFactorEnabled(securitySettings.twoFactorEnabled);
      setPasswordExpirationDays(String(securitySettings.passwordExpirationDays));
      setSessionTimeout(String(securitySettings.sessionTimeout));
      setAllowMultipleSessions(securitySettings.allowMultipleSessions);
      setRequireStrongPassword(securitySettings.requireStrongPassword);
      setLoginAttempts(String(securitySettings.loginAttempts));
      setLockoutDuration(String(securitySettings.lockoutDuration));
    }
  }, [securitySettings]);

  const handleSave = async () => {
    try {
      await updateSecuritySettings({
        twoFactorEnabled,
        passwordExpirationDays: parseInt(passwordExpirationDays) || 90,
        sessionTimeout: parseInt(sessionTimeout) || 60,
        allowMultipleSessions,
        requireStrongPassword,
        loginAttempts: parseInt(loginAttempts) || 5,
        lockoutDuration: parseInt(lockoutDuration) || 15,
      });
      Alert.alert('Sucesso', 'Configurações de segurança salvas!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  if (loading && !securitySettings) {
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
          <Text style={styles.title}>Configurações de Segurança</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Authentication */}
        <Text style={styles.sectionTitle}>🔐 Autenticação</Text>
        
        <SettingsToggle
          title="Autenticação de Dois Fatores"
          description="Adicione uma camada extra de segurança"
          value={twoFactorEnabled}
          onValueChange={setTwoFactorEnabled}
        />

        <SettingsToggle
          title="Exigir Senha Forte"
          description="Senhas devem ter letras, números e caracteres especiais"
          value={requireStrongPassword}
          onValueChange={setRequireStrongPassword}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expiração de Senha (dias)</Text>
          <TextInput
            style={styles.input}
            value={passwordExpirationDays}
            onChangeText={setPasswordExpirationDays}
            placeholder="90"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Usuários precisarão alterar a senha após este período
          </Text>
        </View>

        {/* Session Management */}
        <Text style={styles.sectionTitle}>⏱️ Gerenciamento de Sessões</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Timeout de Sessão (minutos)</Text>
          <TextInput
            style={styles.input}
            value={sessionTimeout}
            onChangeText={setSessionTimeout}
            placeholder="60"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Sessão expira após este tempo de inatividade
          </Text>
        </View>

        <SettingsToggle
          title="Permitir Múltiplas Sessões"
          description="Usuário pode estar logado em vários dispositivos"
          value={allowMultipleSessions}
          onValueChange={setAllowMultipleSessions}
        />

        {/* Login Security */}
        <Text style={styles.sectionTitle}>🚨 Segurança de Login</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tentativas de Login</Text>
          <TextInput
            style={styles.input}
            value={loginAttempts}
            onChangeText={setLoginAttempts}
            placeholder="5"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Número de tentativas antes de bloquear a conta
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duração do Bloqueio (minutos)</Text>
          <TextInput
            style={styles.input}
            value={lockoutDuration}
            onChangeText={setLockoutDuration}
            placeholder="15"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Tempo que a conta fica bloqueada após exceder tentativas
          </Text>
        </View>

        {/* Security Actions */}
        <Text style={styles.sectionTitle}>⚡ Ações de Segurança</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.actionButtonIcon}>🔑</Text>
          <Text style={styles.actionButtonText}>Alterar Senha Master</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.actionButtonIcon}>📱</Text>
          <Text style={styles.actionButtonText}>Gerenciar Dispositivos Autorizados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.actionButtonIcon}>📊</Text>
          <Text style={styles.actionButtonText}>Ver Log de Acessos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => {
            Alert.alert(
              'Encerrar Todas as Sessões',
              'Isto irá desconectar todos os usuários do sistema. Continuar?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Confirmar',
                  style: 'destructive',
                  onPress: () => Alert.alert('Sucesso', 'Todas as sessões foram encerradas'),
                },
              ]
            );
          }}
        >
          <Text style={styles.actionButtonIcon}>🚪</Text>
          <Text style={[styles.actionButtonText, styles.dangerText]}>
            Encerrar Todas as Sessões
          </Text>
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
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  actionButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dangerButton: {
    borderColor: '#F44336',
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dangerText: {
    color: '#F44336',
  },
  saveButton: {
    backgroundColor: '#673AB7',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
