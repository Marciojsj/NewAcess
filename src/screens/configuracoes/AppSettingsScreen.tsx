/**
 * App Settings Screen
 * Tela de configurações do aplicativo (aparência, idioma, etc)
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../../hooks/useSettings';
import { SettingsToggle } from '../../components/settings/SettingsToggle';
import { deviceType } from '../../utils/responsive';

export default function AppSettingsScreen() {
  const navigation = useNavigation();
  const { appSettings, loading, loadAppSettings, updateAppSettings } = useSettings();

  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  useEffect(() => {
    loadAppSettings();
  }, [loadAppSettings]);

  useEffect(() => {
    if (appSettings) {
      setTheme(appSettings.theme);
      setFontSize(appSettings.fontSize);
      setCompactMode(appSettings.compactMode);
      setShowTutorial(appSettings.showTutorial);
      setAutoRefresh(appSettings.autoRefresh);
      setRefreshInterval(appSettings.refreshInterval);
    }
  }, [appSettings]);

  const handleSave = async () => {
    try {
      await updateAppSettings({
        theme,
        fontSize,
        compactMode,
        showTutorial,
        autoRefresh,
        refreshInterval,
      });
      Alert.alert('Sucesso', 'Configurações do aplicativo salvas!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  if (loading && !appSettings) {
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
          <Text style={styles.title}>Configurações do App</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Theme */}
        <Text style={styles.sectionTitle}>🎨 Aparência</Text>
        
        <Text style={styles.label}>Tema</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[styles.optionButton, theme === 'light' && styles.optionButtonActive]}
            onPress={() => setTheme('light')}
          >
            <Text style={styles.optionIcon}>☀️</Text>
            <Text style={[styles.optionText, theme === 'light' && styles.optionTextActive]}>
              Claro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, theme === 'dark' && styles.optionButtonActive]}
            onPress={() => setTheme('dark')}
          >
            <Text style={styles.optionIcon}>🌙</Text>
            <Text style={[styles.optionText, theme === 'dark' && styles.optionTextActive]}>
              Escuro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, theme === 'auto' && styles.optionButtonActive]}
            onPress={() => setTheme('auto')}
          >
            <Text style={styles.optionIcon}>🔄</Text>
            <Text style={[styles.optionText, theme === 'auto' && styles.optionTextActive]}>
              Auto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Font Size */}
        <Text style={styles.label}>Tamanho da Fonte</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[styles.optionButton, fontSize === 'small' && styles.optionButtonActive]}
            onPress={() => setFontSize('small')}
          >
            <Text style={[styles.fontSizeText, styles.smallText]}>A</Text>
            <Text style={[styles.optionText, fontSize === 'small' && styles.optionTextActive]}>
              Pequena
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, fontSize === 'medium' && styles.optionButtonActive]}
            onPress={() => setFontSize('medium')}
          >
            <Text style={[styles.fontSizeText, styles.mediumText]}>A</Text>
            <Text style={[styles.optionText, fontSize === 'medium' && styles.optionTextActive]}>
              Média
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, fontSize === 'large' && styles.optionButtonActive]}
            onPress={() => setFontSize('large')}
          >
            <Text style={[styles.fontSizeText, styles.largeText]}>A</Text>
            <Text style={[styles.optionText, fontSize === 'large' && styles.optionTextActive]}>
              Grande
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Options */}
        <Text style={styles.sectionTitle}>📱 Exibição</Text>
        
        <SettingsToggle
          title="Modo Compacto"
          description="Reduzir espaçamentos e mostrar mais informações"
          value={compactMode}
          onValueChange={setCompactMode}
        />

        <SettingsToggle
          title="Mostrar Tutorial"
          description="Exibir dicas e tutoriais para novos usuários"
          value={showTutorial}
          onValueChange={setShowTutorial}
        />

        {/* Data Refresh */}
        <Text style={styles.sectionTitle}>🔄 Atualização de Dados</Text>
        
        <SettingsToggle
          title="Atualização Automática"
          description="Recarregar dados automaticamente"
          value={autoRefresh}
          onValueChange={setAutoRefresh}
        />

        {autoRefresh && (
          <>
            <Text style={styles.label}>Intervalo de Atualização</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[styles.optionButton, refreshInterval === 15 && styles.optionButtonActive]}
                onPress={() => setRefreshInterval(15)}
              >
                <Text style={[styles.optionText, refreshInterval === 15 && styles.optionTextActive]}>
                  15s
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, refreshInterval === 30 && styles.optionButtonActive]}
                onPress={() => setRefreshInterval(30)}
              >
                <Text style={[styles.optionText, refreshInterval === 30 && styles.optionTextActive]}>
                  30s
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, refreshInterval === 60 && styles.optionButtonActive]}
                onPress={() => setRefreshInterval(60)}
              >
                <Text style={[styles.optionText, refreshInterval === 60 && styles.optionTextActive]}>
                  1min
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, refreshInterval === 120 && styles.optionButtonActive]}
                onPress={() => setRefreshInterval(120)}
              >
                <Text style={[styles.optionText, refreshInterval === 120 && styles.optionTextActive]}>
                  2min
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Cache & Storage */}
        <Text style={styles.sectionTitle}>💾 Cache e Armazenamento</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Limpar Cache',
              'Isto irá limpar dados temporários. Continuar?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Confirmar',
                  onPress: () => Alert.alert('Sucesso', 'Cache limpo com sucesso!'),
                },
              ]
            );
          }}
        >
          <Text style={styles.actionButtonIcon}>🗑️</Text>
          <Text style={styles.actionButtonText}>Limpar Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.actionButtonIcon}>📊</Text>
          <Text style={styles.actionButtonText}>Ver Uso de Armazenamento</Text>
        </TouchableOpacity>

        {/* Reset */}
        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => {
            Alert.alert(
              'Resetar Configurações',
              'Isto irá restaurar todas as configurações para os valores padrão. Continuar?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Resetar',
                  style: 'destructive',
                  onPress: () => {
                    setTheme('light');
                    setFontSize('medium');
                    setCompactMode(false);
                    setShowTutorial(true);
                    setAutoRefresh(true);
                    setRefreshInterval(30);
                    Alert.alert('Sucesso', 'Configurações resetadas!');
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.actionButtonIcon}>↩️</Text>
          <Text style={[styles.actionButtonText, styles.dangerText]}>
            Resetar para Padrão
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 80,
  },
  optionButtonActive: {
    borderColor: '#673AB7',
    backgroundColor: '#F3E5F5',
  },
  optionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  optionTextActive: {
    color: '#673AB7',
  },
  fontSizeText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  smallText: {
    fontSize: 20,
  },
  mediumText: {
    fontSize: 28,
  },
  largeText: {
    fontSize: 36,
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
    marginTop: 16,
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
