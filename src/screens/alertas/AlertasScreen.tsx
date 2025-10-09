/**
 * Alertas Screen
 * Tela para gerenciar alertas do sistema
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert as RNAlert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useAlerts } from '../../hooks/useAlerts';
import { AlertCard } from '../../components/alerts/AlertCard';
import { AlertBadge } from '../../components/alerts/AlertBadge';
import { AlertType, AlertPriority, AlertStatus } from '../../types/alertTypes';
import { deviceType } from '../../utils/responsive';

type FilterType = 'all' | AlertType;
type FilterPriority = 'all' | AlertPriority;
type FilterStatus = 'all' | AlertStatus;

export default function AlertasScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    alerts,
    stats,
    loading,
    error,
    loadAlerts,
    loadStats,
    dismissAlert,
    resolveAlert,
    clearDismissed,
    getActiveCount,
  } = useAlerts();

  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    if (user?.entityId) {
      loadAlerts();
      loadStats(user.entityId);
    }
  }, [user?.entityId, loadAlerts, loadStats]);

  const handleRefresh = () => {
    if (user?.entityId) {
      const filters: any = {};
      if (filterType !== 'all') filters.type = filterType;
      if (filterPriority !== 'all') filters.priority = filterPriority;
      if (filterStatus !== 'all') filters.status = filterStatus;

      loadAlerts(Object.keys(filters).length > 0 ? filters : undefined);
      loadStats(user.entityId);
    }
  };

  const handleDismiss = async (alertId: string) => {
    try {
      await dismissAlert(alertId, user?.name || 'user');
      RNAlert.alert('Sucesso', 'Alerta descartado com sucesso');
      handleRefresh();
    } catch (err) {
      RNAlert.alert('Erro', 'Não foi possível descartar o alerta');
    }
  };

  const handleResolve = async (alertId: string) => {
    try {
      await resolveAlert(alertId, user?.name || 'user');
      RNAlert.alert('Sucesso', 'Alerta resolvido com sucesso');
      handleRefresh();
    } catch (err) {
      RNAlert.alert('Erro', 'Não foi possível resolver o alerta');
    }
  };

  const handleClearDismissed = async () => {
    if (!user?.entityId) return;

    RNAlert.alert(
      'Confirmar',
      'Deseja limpar todos os alertas descartados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (user?.entityId) {
                const count = await clearDismissed(user.entityId);
                RNAlert.alert('Sucesso', `${count} alerta(s) removido(s)`);
                handleRefresh();
              }
            } catch (err) {
              RNAlert.alert('Erro', 'Não foi possível limpar alertas');
            }
          },
        },
      ]
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (filterPriority !== 'all' && alert.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    return true;
  });

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
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Alertas do Sistema</Text>
            <AlertBadge count={getActiveCount()} size="medium" />
          </View>
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

      {/* Stats */}
      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.active}</Text>
            <Text style={styles.statLabel}>Ativos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.dismissed}</Text>
            <Text style={styles.statLabel}>Descartados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.resolved}</Text>
            <Text style={styles.statLabel}>Resolvidos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      )}

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterStatus === 'all' && styles.filterButtonTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === AlertStatus.ACTIVE && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus(AlertStatus.ACTIVE)}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterStatus === AlertStatus.ACTIVE && styles.filterButtonTextActive,
            ]}
          >
            🔴 Ativos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === AlertStatus.DISMISSED && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus(AlertStatus.DISMISSED)}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterStatus === AlertStatus.DISMISSED && styles.filterButtonTextActive,
            ]}
          >
            ⚪ Descartados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === AlertStatus.RESOLVED && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus(AlertStatus.RESOLVED)}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterStatus === AlertStatus.RESOLVED && styles.filterButtonTextActive,
            ]}
          >
            ✅ Resolvidos
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading && alerts.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#FF9800" />
            <Text style={styles.loadingText}>Carregando alertas...</Text>
          </View>
        ) : filteredAlerts.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>Nenhum alerta encontrado</Text>
            <Text style={styles.emptySubtext}>
              {filterStatus !== 'all' || filterType !== 'all' || filterPriority !== 'all'
                ? 'Tente ajustar os filtros'
                : 'Você está em dia!'}
            </Text>
          </View>
        ) : (
          <>
            {filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={handleDismiss}
                onResolve={handleResolve}
              />
            ))}

            {/* Clear Button */}
            {stats && stats.dismissed > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearDismissed}
              >
                <Text style={styles.clearButtonText}>
                  🗑️ Limpar Alertas Descartados ({stats.dismissed})
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
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
    backgroundColor: '#FF9800',
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    color: '#FF9800',
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  filtersContainer: {
    maxHeight: 50,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filtersContent: {
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  clearButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
