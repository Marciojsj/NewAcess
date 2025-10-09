/**
 * useAlerts Hook
 * Hook para gerenciar alertas do sistema
 */

import { useState, useCallback } from 'react';
import { Alert, AlertType, AlertPriority, AlertFilters, AlertStats } from '../types/alertTypes';
import { alertService } from '../services/alertService';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<AlertStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carregar alertas com filtros
   */
  const loadAlerts = useCallback(async (filters?: AlertFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await alertService.getAlerts(filters);
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar alertas');
      console.error('Error loading alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carregar estatísticas de alertas
   */
  const loadStats = useCallback(async (entityId: string) => {
    try {
      setError(null);
      const data = await alertService.getAlertStats(entityId);
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
      console.error('Error loading alert stats:', err);
    }
  }, []);

  /**
   * Descartar alerta
   */
  const dismissAlert = useCallback(async (alertId: string, dismissedBy: string) => {
    try {
      setError(null);
      const updatedAlert = await alertService.dismissAlert(alertId, dismissedBy);
      setAlerts(prev =>
        prev.map(alert => (alert.id === alertId ? updatedAlert : alert))
      );
      return updatedAlert;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao descartar alerta');
      console.error('Error dismissing alert:', err);
      throw err;
    }
  }, []);

  /**
   * Resolver alerta
   */
  const resolveAlert = useCallback(async (alertId: string, resolvedBy: string) => {
    try {
      setError(null);
      const updatedAlert = await alertService.resolveAlert(alertId, resolvedBy);
      setAlerts(prev =>
        prev.map(alert => (alert.id === alertId ? updatedAlert : alert))
      );
      return updatedAlert;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao resolver alerta');
      console.error('Error resolving alert:', err);
      throw err;
    }
  }, []);

  /**
   * Criar novo alerta
   */
  const createAlert = useCallback(
    async (
      type: AlertType,
      priority: AlertPriority,
      title: string,
      message: string,
      entityId: string,
      metadata?: Record<string, any>
    ) => {
      try {
        setError(null);
        const newAlert = await alertService.createAlert(
          type,
          priority,
          title,
          message,
          entityId,
          metadata
        );
        setAlerts(prev => [newAlert, ...prev]);
        return newAlert;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar alerta');
        console.error('Error creating alert:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Limpar alertas descartados
   */
  const clearDismissed = useCallback(async (entityId: string) => {
    try {
      setError(null);
      const count = await alertService.clearDismissed(entityId);
      setAlerts(prev => prev.filter(a => a.entityId !== entityId || a.status !== 'DISMISSED'));
      return count;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao limpar alertas');
      console.error('Error clearing dismissed alerts:', err);
      throw err;
    }
  }, []);

  /**
   * Obter contagem de alertas ativos
   */
  const getActiveCount = useCallback(() => {
    return alerts.filter(a => a.status === 'ACTIVE').length;
  }, [alerts]);

  return {
    alerts,
    stats,
    loading,
    error,
    loadAlerts,
    loadStats,
    dismissAlert,
    resolveAlert,
    createAlert,
    clearDismissed,
    getActiveCount,
  };
};
