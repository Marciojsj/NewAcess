/**
 * Reports Screen
 * Tela de relatórios e dashboard
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useReports } from '../../hooks/useReports';
import { DashboardStatsCard } from '../../components/reports/DashboardStatsCard';
import { TopVisitorsList } from '../../components/reports/TopVisitorsList';
import { deviceType } from '../../utils/responsive';

export const RelatoriosScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { stats, topVisitors, loading, error, loadDashboardStats, loadTopVisitors } = useReports();

  useEffect(() => {
    if (user?.entityId) {
      loadDashboardStats(user.entityId);
      loadTopVisitors(user.entityId, 10);
    }
  }, [user?.entityId, loadDashboardStats, loadTopVisitors]);

  const handleRefresh = () => {
    if (user?.entityId) {
      loadDashboardStats(user.entityId);
      loadTopVisitors(user.entityId, 10);
    }
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
          <Text style={styles.title}>Relatórios e Estatísticas</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
          >
            <Text style={styles.refreshButtonText}>🔄 Atualizar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Dashboard Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas Gerais</Text>
          <DashboardStatsCard stats={stats} loading={loading} />
        </View>

        {/* Top Visitors */}
        <View style={styles.section}>
          <TopVisitorsList visitors={topVisitors} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionButton, styles.entryButton]}
              onPress={() => navigation.navigate('RegistrarEntrada' as never)}
            >
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Nova Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionButton, styles.exitButton]}
              onPress={() => navigation.navigate('RegistrarSaida' as never)}
            >
              <Text style={styles.quickActionIcon}>➖</Text>
              <Text style={styles.quickActionText}>Nova Saída</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.quickActionButton, styles.historyButton]}
            onPress={() => navigation.navigate('AccessLogs' as never)}
          >
            <Text style={styles.quickActionIcon}>📋</Text>
            <Text style={styles.quickActionText}>Ver Histórico Completo</Text>
          </TouchableOpacity>
        </View>

        {/* Info Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ℹ️ Dados atualizados em tempo real
          </Text>
          <Text style={styles.footerSubtext}>
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#9C27B0',
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
  refreshButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  refreshButtonText: {
    color: '#9C27B0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  exitButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  historyButton: {
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#999',
  },
});
