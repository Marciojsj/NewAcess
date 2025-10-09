/**
 * Alert Card Component
 * Componente para exibir um alerta individual
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert, AlertType, AlertPriority, AlertStatus } from '../../types/alertTypes';
import { getRelativeTime } from '../../utils/timeCalculation';

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  onPress?: (alert: Alert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onDismiss,
  onResolve,
  onPress,
}) => {
  const getPriorityColor = () => {
    switch (alert.priority) {
      case AlertPriority.CRITICAL:
        return '#D32F2F';
      case AlertPriority.HIGH:
        return '#F44336';
      case AlertPriority.MEDIUM:
        return '#FF9800';
      case AlertPriority.LOW:
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const getTypeIcon = () => {
    switch (alert.type) {
      case AlertType.SECURITY:
        return '🚨';
      case AlertType.CAPACITY:
        return '👥';
      case AlertType.VISITOR_EXPIRED:
        return '⏰';
      case AlertType.SYSTEM:
        return '⚙️';
      case AlertType.WARNING:
        return '⚠️';
      case AlertType.INFO:
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getPriorityLabel = () => {
    switch (alert.priority) {
      case AlertPriority.CRITICAL:
        return 'CRÍTICO';
      case AlertPriority.HIGH:
        return 'ALTO';
      case AlertPriority.MEDIUM:
        return 'MÉDIO';
      case AlertPriority.LOW:
        return 'BAIXO';
      default:
        return '';
    }
  };

  const getStatusLabel = () => {
    switch (alert.status) {
      case AlertStatus.ACTIVE:
        return '🔴 Ativo';
      case AlertStatus.DISMISSED:
        return '⚪ Descartado';
      case AlertStatus.RESOLVED:
        return '✅ Resolvido';
      default:
        return '';
    }
  };

  const priorityColor = getPriorityColor();

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: priorityColor }]}
      onPress={() => onPress?.(alert)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.icon}>{getTypeIcon()}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>{getPriorityLabel()}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{getStatusLabel()}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{alert.title}</Text>

      {/* Message */}
      <Text style={styles.message} numberOfLines={2}>
        {alert.message}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {getRelativeTime(alert.timestamp)}
        </Text>

        {alert.status === AlertStatus.ACTIVE && (
          <View style={styles.actions}>
            {onDismiss && (
              <TouchableOpacity
                style={[styles.actionButton, styles.dismissButton]}
                onPress={() => onDismiss(alert.id)}
              >
                <Text style={styles.actionButtonText}>Descartar</Text>
              </TouchableOpacity>
            )}
            {onResolve && (
              <TouchableOpacity
                style={[styles.actionButton, styles.resolveButton]}
                onPress={() => onResolve(alert.id)}
              >
                <Text style={styles.actionButtonText}>Resolver</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  dismissButton: {
    backgroundColor: '#E0E0E0',
  },
  resolveButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
