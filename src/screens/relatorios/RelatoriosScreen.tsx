/**
 * Reports Screen
 * Tela de relatórios e dashboard
 */

import React, { useEffect, useState } from 'react';
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
import { useAccess } from '../../hooks/useAccess';
import { DashboardStatsCard } from '../../components/reports/DashboardStatsCard';
import { TopVisitorsList } from '../../components/reports/TopVisitorsList';
import { AccessTrendsChart } from '../../components/reports/AccessTrendsChart';
import { PeakHoursChart } from '../../components/reports/PeakHoursChart';
import { VisitorDistributionChart } from '../../components/reports/VisitorDistributionChart';
import { ReportExportButton } from '../../components/reports/ReportExportButton';
import { deviceType } from '../../utils/responsive';

export const RelatoriosScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { stats, topVisitors, loading, error, loadDashboardStats, loadTopVisitors } = useReports();
  const { logs, loadAccessLogs } = useAccess();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showCharts, setShowCharts] = useState(true);

  useEffect(() => {
    if (user?.entityId) {
      loadDashboardStats(user.entityId);
      loadTopVisitors(user.entityId, 10);
      loadAccessLogs();
    }
  }, [user?.entityId, loadDashboardStats, loadTopVisitors, loadAccessLogs]);

  const handleRefresh = () => {
    if (user?.entityId) {
      loadDashboardStats(user.entityId);
      loadTopVisitors(user.entityId, 10);
      loadAccessLogs();
    }
  };

  const handleToggleCharts = () => {
    setShowCharts(!showCharts);
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas Gerais</Text>
          <DashboardStatsCard stats={stats} loading={loading} />
        </View>

        {/* Charts Toggle */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📈 Gráficos Analíticos</Text>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={handleToggleCharts}
            >
              <Text style={styles.toggleButtonText}>
                {showCharts ? '👁️ Ocultar' : '👁️ Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>

          {showCharts && (
            <>
              {/* Period Selector */}
              <View style={styles.periodSelector}>
                <TouchableOpacity
                  style={[
                    styles.periodButton,
                    period === 'daily' && styles.periodButtonActive,
                  ]}
                  onPress={() => setPeriod('daily')}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      period === 'daily' && styles.periodButtonTextActive,
                    ]}
                  >
                    Diário
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.periodButton,
                    period === 'weekly' && styles.periodButtonActive,
                  ]}
                  onPress={() => setPeriod('weekly')}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      period === 'weekly' && styles.periodButtonTextActive,
                    ]}
                  >
                    Semanal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.periodButton,
                    period === 'monthly' && styles.periodButtonActive,
                  ]}
                  onPress={() => setPeriod('monthly')}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      period === 'monthly' && styles.periodButtonTextActive,
                    ]}
                  >
                    Mensal
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Charts */}
              <View style={styles.chartsContainer}>
                <AccessTrendsChart logs={logs} period={period} />
                <PeakHoursChart logs={logs} />
                <VisitorDistributionChart logs={logs} />
              </View>
            </>
          )}
        </View>

        {/* Top Visitors */}
        <View style={styles.section}>
          <TopVisitorsList visitors={topVisitors} />
        </View>

        {/* Export Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💾 Exportar Relatórios</Text>
          <View style={styles.exportButtons}>
            <ReportExportButton stats={stats} logs={logs} format="csv" />
            <ReportExportButton stats={stats} logs={logs} format="json" />
            <ReportExportButton stats={stats} logs={logs} format="pdf" />
          </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  toggleButtonText: {
    color: '#9C27B0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  periodButtonActive: {
    backgroundColor: '#9C27B0',
    borderColor: '#9C27B0',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  chartsContainer: {
    paddingHorizontal: 16,
  },
  exportButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
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
