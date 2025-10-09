/**
 * Dashboard Stats Component
 * Exibe cards com estatísticas principais
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DashboardStats } from '../../types/reportTypes';

interface DashboardStatsCardProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.statCard, styles.primaryCard]}>
          <Text style={styles.statValue}>{stats.totalVisitors}</Text>
          <Text style={styles.statLabel}>Total Visitantes</Text>
        </View>
        <View style={[styles.statCard, styles.successCard]}>
          <Text style={styles.statValue}>{stats.activeVisitors}</Text>
          <Text style={styles.statLabel}>Visitantes Ativos</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.statCard, styles.infoCard]}>
          <Text style={styles.statValue}>{stats.todayEntries}</Text>
          <Text style={styles.statLabel}>Entradas Hoje</Text>
        </View>
        <View style={[styles.statCard, styles.warningCard]}>
          <Text style={styles.statValue}>{stats.todayExits}</Text>
          <Text style={styles.statLabel}>Saídas Hoje</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.statCard, styles.secondaryCard]}>
          <Text style={styles.statValue}>{stats.weekEntries}</Text>
          <Text style={styles.statLabel}>Entradas (7 dias)</Text>
        </View>
        <View style={[styles.statCard, styles.secondaryCard]}>
          <Text style={styles.statValue}>{stats.monthEntries}</Text>
          <Text style={styles.statLabel}>Entradas (30 dias)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryCard: {
    backgroundColor: '#2196F3',
  },
  successCard: {
    backgroundColor: '#4CAF50',
  },
  infoCard: {
    backgroundColor: '#00BCD4',
  },
  warningCard: {
    backgroundColor: '#FF9800',
  },
  secondaryCard: {
    backgroundColor: '#9C27B0',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});
