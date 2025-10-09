/**
 * Notification Settings Screen
 * Tela de configurações de notificações
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

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();
  const { notificationSettings, loading, loadNotificationSettings, updateNotificationSettings } = useSettings();

  const [enableAlerts, setEnableAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [capacityAlerts, setCapacityAlerts] = useState(true);
  const [expiredAlerts, setExpiredAlerts] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('');
  const [quietHoursEnd, setQuietHoursEnd] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, [loadNotificationSettings]);

  useEffect(() => {
    if (notificationSettings) {
      setEnableAlerts(notificationSettings.enableAlerts);
      setSecurityAlerts(notificationSettings.alertTypes.security);
      setCapacityAlerts(notificationSettings.alertTypes.capacity);
      setExpiredAlerts(notificationSettings.alertTypes.expired);
      setSystemAlerts(notificationSettings.alertTypes.system);
      setQuietHoursEnabled(notificationSettings.quietHours.enabled);
      setQuietHoursStart(notificationSettings.quietHours.start);
      setQuietHoursEnd(notificationSettings.quietHours.end);
      setEmailNotifications(notificationSettings.emailNotifications);
      setPushNotifications(notificationSettings.pushNotifications);
      setSmsNotifications(notificationSettings.smsNotifications);
    }
  }, [notificationSettings]);

  const handleSave = async () => {
    try {
      await updateNotificationSettings({
        enableAlerts,
        alertTypes: {
          security: securityAlerts,
          capacity: capacityAlerts,
          expired: expiredAlerts,
          system: systemAlerts,
        },
        quietHours: {
          enabled: quietHoursEnabled,
          start: quietHoursStart,
          end: quietHoursEnd,
        },
        emailNotifications,
        pushNotifications,
        smsNotifications,
      });
      Alert.alert('Sucesso', 'Configurações de notificação salvas!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  if (loading && !notificationSettings) {
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
          <Text style={styles.title}>Configurações de Notificações</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* General Alerts */}
        <Text style={styles.sectionTitle}>🔔 Alertas Gerais</Text>
        
        <SettingsToggle
          title="Habilitar Alertas"
          description="Ativar/desativar todo o sistema de alertas"
          value={enableAlerts}
          onValueChange={setEnableAlerts}
        />

        {/* Alert Types */}
        <Text style={styles.sectionTitle}>🚨 Tipos de Alertas</Text>
        
        <SettingsToggle
          title="Alertas de Segurança"
          description="Avisos sobre acessos não autorizados"
          value={securityAlerts}
          onValueChange={setSecurityAlerts}
          disabled={!enableAlerts}
        />

        <SettingsToggle
          title="Alertas de Capacidade"
          description="Avisos quando a capacidade máxima for atingida"
          value={capacityAlerts}
          onValueChange={setCapacityAlerts}
          disabled={!enableAlerts}
        />

        <SettingsToggle
          title="Alertas de Expiração"
          description="Avisos sobre visitantes com acesso expirado"
          value={expiredAlerts}
          onValueChange={setExpiredAlerts}
          disabled={!enableAlerts}
        />

        <SettingsToggle
          title="Alertas de Sistema"
          description="Avisos sobre manutenção e problemas técnicos"
          value={systemAlerts}
          onValueChange={setSystemAlerts}
          disabled={!enableAlerts}
        />

        {/* Quiet Hours */}
        <Text style={styles.sectionTitle}>🌙 Horário Silencioso</Text>
        
        <SettingsToggle
          title="Ativar Horário Silencioso"
          description="Silenciar notificações em horários específicos"
          value={quietHoursEnabled}
          onValueChange={setQuietHoursEnabled}
        />

        {quietHoursEnabled && (
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex]}>
              <Text style={styles.label}>Início</Text>
              <TextInput
                style={styles.input}
                value={quietHoursStart}
                onChangeText={setQuietHoursStart}
                placeholder="22:00"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.spacer} />
            <View style={[styles.inputContainer, styles.flex]}>
              <Text style={styles.label}>Fim</Text>
              <TextInput
                style={styles.input}
                value={quietHoursEnd}
                onChangeText={setQuietHoursEnd}
                placeholder="07:00"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        )}

        {/* Notification Methods */}
        <Text style={styles.sectionTitle}>📬 Métodos de Notificação</Text>
        
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
          description="Receber alertas por SMS (pode gerar custos)"
          value={smsNotifications}
          onValueChange={setSmsNotifications}
        />

        {/* Test Notification */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => Alert.alert('Teste', 'Esta é uma notificação de teste! 🔔')}
        >
          <Text style={styles.testButtonText}>🧪 Enviar Notificação de Teste</Text>
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
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  spacer: {
    width: 16,
  },
  testButton: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#673AB7',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
