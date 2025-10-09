/**
 * Access History Component
 * Lista o histórico de acessos (entradas e saídas)
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AccessLog } from '../../types/accessTypes';
import { calculateStayDuration, getRelativeTime } from '../../utils/timeCalculation';

interface AccessHistoryProps {
  logs: AccessLog[];
  loading: boolean;
}

export const AccessHistory: React.FC<AccessHistoryProps> = ({ logs, loading }) => {
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

  // Agrupar logs por visitante e encontrar pares entrada/saída
  const logsWithDuration = useMemo(() => {
    const grouped = logs.reduce((acc, log) => {
      const visitorId = log.visitorId;
      if (!acc[visitorId]) {
        acc[visitorId] = [];
      }
      acc[visitorId].push(log);
      return acc;
    }, {} as Record<string, AccessLog[]>);

    return logs.map(log => {
      if (log.type === 'EXIT') {
        // Procurar entrada correspondente
        const visitorLogs = grouped[log.visitorId] || [];
        const sortedLogs = visitorLogs
          .filter(l => l.type === 'ENTRY')
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        // Encontrar entrada mais recente antes da saída
        const entryLog = sortedLogs.find(entry => 
          new Date(entry.timestamp).getTime() < new Date(log.timestamp).getTime()
        );

        if (entryLog) {
          const duration = calculateStayDuration(entryLog.timestamp, log.timestamp);
          return { ...log, duration: duration.formattedShort, entryTime: entryLog.timestamp };
        }
      }
      return log;
    });
  }, [logs]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <View style={[
          styles.typeBadge,
          item.type === 'ENTRY' ? styles.entryBadge : styles.exitBadge
        ]}>
          <Text style={styles.typeBadgeText}>
            {item.type === 'ENTRY' ? '🟢 ENTRADA' : '🔴 SAÍDA'}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
      </View>

      {item.visitor && (
        <View style={styles.visitorInfo}>
          <Text style={styles.visitorName}>{item.visitor.name}</Text>
          {item.visitor.cpf && (
            <Text style={styles.visitorDetail}>CPF: {item.visitor.cpf}</Text>
          )}
          {item.visitor.company && (
            <Text style={styles.visitorDetail}>Empresa: {item.visitor.company}</Text>
          )}
        </View>
      )}

      {item.duration && (
        <View style={styles.durationBadge}>
          <Text style={styles.durationIcon}>⏱️</Text>
          <View style={styles.durationInfo}>
            <Text style={styles.durationLabel}>Tempo de Permanência:</Text>
            <Text style={styles.durationValue}>{item.duration}</Text>
          </View>
        </View>
      )}

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Observações:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {item.authorizedBy && (
        <Text style={styles.authorizedBy}>
          Autorizado por: {item.authorizedBy}
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Nenhum registro de acesso encontrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={logsWithDuration}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 100,
    height: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  entryBadge: {
    backgroundColor: '#E8F5E9',
  },
  exitBadge: {
    backgroundColor: '#FFEBEE',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  visitorInfo: {
    marginBottom: 8,
  },
  visitorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notesContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
  },
  authorizedBy: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  durationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  durationInfo: {
    flex: 1,
  },
  durationLabel: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 2,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
});
