/**
 * Visitor Stats Card Component
 * Componente para exibir estatísticas do visitante
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface VisitorStats {
  totalVisits: number;
  totalTime: string;
  lastVisit: Date | null;
  averageStay: string;
}

interface VisitorStatsCardProps {
  stats: VisitorStats;
}

export const VisitorStatsCard: React.FC<VisitorStatsCardProps> = ({ stats }) => {
  const formatLastVisit = (date: Date | null) => {
    if (!date) return 'Nunca';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `Há ${diffDays} dias`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>📊</Text>
          <Text style={styles.statValue}>{stats.totalVisits}</Text>
          <Text style={styles.statLabel}>Total de Visitas</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>{stats.totalTime}</Text>
          <Text style={styles.statLabel}>Tempo Total</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statIcon}>📅</Text>
          <Text style={styles.statValue}>{formatLastVisit(stats.lastVisit)}</Text>
          <Text style={styles.statLabel}>Última Visita</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statValue}>{stats.averageStay}</Text>
          <Text style={styles.statLabel}>Permanência Média</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});