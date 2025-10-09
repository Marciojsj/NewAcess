/**
 * System Settings Screen
 * Tela de configurações do sistema/entidade
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

export default function SystemSettingsScreen() {
  const navigation = useNavigation();
  const { systemSettings, loading, loadSystemSettings, updateSystemSettings } = useSettings();

  const [entityName, setEntityName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [workingHoursStart, setWorkingHoursStart] = useState('');
  const [workingHoursEnd, setWorkingHoursEnd] = useState('');
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(true);
  const [autoLogoutTime, setAutoLogoutTime] = useState('');
  const [qrCodeExpiration, setQrCodeExpiration] = useState('');
  const [allowGuestAccess, setAllowGuestAccess] = useState(true);
  const [requirePhotoUpload, setRequirePhotoUpload] = useState(false);

  useEffect(() => {
    loadSystemSettings();
  }, [loadSystemSettings]);

  useEffect(() => {
    if (systemSettings) {
      setEntityName(systemSettings.entityName);
      setMaxCapacity(String(systemSettings.maxCapacity));
      setWorkingHoursStart(systemSettings.workingHours.start);
      setWorkingHoursEnd(systemSettings.workingHours.end);
      setAutoLogoutEnabled(systemSettings.autoLogoutEnabled);
      setAutoLogoutTime(String(systemSettings.autoLogoutTime));
      setQrCodeExpiration(String(systemSettings.qrCodeExpiration));
      setAllowGuestAccess(systemSettings.allowGuestAccess);
      setRequirePhotoUpload(systemSettings.requirePhotoUpload);
    }
  }, [systemSettings]);

  const handleSave = async () => {
    try {
      await updateSystemSettings({
        entityName,
        maxCapacity: parseInt(maxCapacity) || 100,
        workingHours: {
          start: workingHoursStart,
          end: workingHoursEnd,
        },
        autoLogoutEnabled,
        autoLogoutTime: parseInt(autoLogoutTime) || 30,
        qrCodeExpiration: parseInt(qrCodeExpiration) || 24,
        allowGuestAccess,
        requirePhotoUpload,
      });
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  if (loading && !systemSettings) {
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
          <Text style={styles.title}>Configurações do Sistema</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Entity Info */}
        <Text style={styles.sectionTitle}>🏢 Informações da Entidade</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome da Entidade</Text>
          <TextInput
            style={styles.input}
            value={entityName}
            onChangeText={setEntityName}
            placeholder="Nome da organização"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Capacidade Máxima</Text>
          <TextInput
            style={styles.input}
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            placeholder="100"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Número máximo de visitantes permitidos simultaneamente
          </Text>
        </View>

        {/* Working Hours */}
        <Text style={styles.sectionTitle}>⏰ Horário de Funcionamento</Text>
        
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.flex]}>
            <Text style={styles.label}>Abertura</Text>
            <TextInput
              style={styles.input}
              value={workingHoursStart}
              onChangeText={setWorkingHoursStart}
              placeholder="08:00"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.spacer} />
          <View style={[styles.inputContainer, styles.flex]}>
            <Text style={styles.label}>Fechamento</Text>
            <TextInput
              style={styles.input}
              value={workingHoursEnd}
              onChangeText={setWorkingHoursEnd}
              placeholder="18:00"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Access Control */}
        <Text style={styles.sectionTitle}>🔐 Controle de Acesso</Text>
        
        <SettingsToggle
          title="Logout Automático"
          description="Deslogar usuários inativos automaticamente"
          value={autoLogoutEnabled}
          onValueChange={setAutoLogoutEnabled}
        />

        {autoLogoutEnabled && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tempo de Inatividade (minutos)</Text>
            <TextInput
              style={styles.input}
              value={autoLogoutTime}
              onChangeText={setAutoLogoutTime}
              placeholder="30"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expiração do QR Code (horas)</Text>
          <TextInput
            style={styles.input}
            value={qrCodeExpiration}
            onChangeText={setQrCodeExpiration}
            placeholder="24"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Tempo até que o QR Code expire e precise ser regenerado
          </Text>
        </View>

        {/* Visitor Settings */}
        <Text style={styles.sectionTitle}>👥 Configurações de Visitantes</Text>
        
        <SettingsToggle
          title="Permitir Acesso de Convidados"
          description="Visitantes sem cadastro prévio podem entrar"
          value={allowGuestAccess}
          onValueChange={setAllowGuestAccess}
        />

        <SettingsToggle
          title="Exigir Upload de Foto"
          description="Visitantes devem ter foto cadastrada"
          value={requirePhotoUpload}
          onValueChange={setRequirePhotoUpload}
        />

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
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  spacer: {
    width: 16,
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
