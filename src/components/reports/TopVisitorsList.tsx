/**
 * Top Visitors List Component
 * Lista dos visitantes mais frequentes
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { VisitorReport } from '../../types/reportTypes';

interface TopVisitorsListProps {
  visitors: VisitorReport[];
}

export const TopVisitorsList: React.FC<TopVisitorsListProps> = ({ visitors }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item, index }: { item: VisitorReport; index: number }) => (
    <View style={styles.visitorCard}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{index + 1}º</Text>
      </View>
      <View style={styles.visitorInfo}>
        <Text style={styles.visitorName}>{item.visitorName}</Text>
        {item.company && (
          <Text style={styles.visitorCompany}>{item.company}</Text>
        )}
        <Text style={styles.visitorStats}>
          {item.totalAccesses} acessos • Último: {formatDate(item.lastAccess)}
        </Text>
      </View>
      <View style={styles.accessBadge}>
        <Text style={styles.accessCount}>{item.totalAccesses}</Text>
      </View>
    </View>
  );

  if (visitors.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum visitante encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Top 10 Visitantes</Text>
      <FlatList
        data={visitors}
        renderItem={renderItem}
        keyExtractor={(item) => item.visitorId}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  visitorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  visitorCompany: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  visitorStats: {
    fontSize: 11,
    color: '#999',
  },
  accessBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  accessCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
