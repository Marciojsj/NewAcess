/**
 * useAccess Hook
 * Gerencia o estado e operações de controle de acesso
 */

import { useState, useCallback, useEffect } from 'react';
import { AccessLog, EntryData, ExitData, AccessFilters } from '../types/accessTypes';
import { accessService } from '../services/accessService';

export const useAccess = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carregar registros de acesso
   */
  const loadAccessLogs = useCallback(async (filters?: AccessFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await accessService.getAllAccessLogs(filters);
      setLogs(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar registros de acesso');
      console.error('Erro ao carregar registros:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Registrar entrada de visitante
   */
  const registerEntry = useCallback(async (entryData: EntryData, entityId: string) => {
    try {
      setLoading(true);
      setError(null);
      const newLog = await accessService.registerEntry(entryData, entityId);
      setLogs(prev => [newLog, ...prev]);
      return newLog;
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar entrada');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Registrar saída de visitante
   */
  const registerExit = useCallback(async (exitData: ExitData, accessLogId: string) => {
    try {
      setLoading(true);
      setError(null);
      const newLog = await accessService.registerExit(exitData, accessLogId);
      setLogs(prev => [newLog, ...prev]);
      return newLog;
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar saída');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Buscar ID do log ativo (última entrada sem saída)
   */
  const getActiveEntryLogId = useCallback(async (visitorId: string) => {
    try {
      return await accessService.getActiveEntryLogId(visitorId);
    } catch (err: any) {
      console.error('Erro ao buscar log ativo:', err);
      return null;
    }
  }, []);

  /**
   * Buscar histórico de um visitante específico
   */
  const getVisitorHistory = useCallback(async (visitorId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await accessService.getVisitorAccessHistory(visitorId);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar histórico');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verificar se visitante está dentro
   */
  const checkVisitorInside = useCallback(async (visitorId: string) => {
    try {
      return await accessService.isVisitorInside(visitorId);
    } catch (err: any) {
      console.error('Erro ao verificar status:', err);
      return false;
    }
  }, []);

  /**
   * Filtrar logs localmente
   */
  const filterLogs = useCallback((filters: AccessFilters) => {
    let filtered = [...logs];

    if (filters.type) {
      filtered = filtered.filter(log => log.type === filters.type);
    }

    if (filters.visitorId) {
      filtered = filtered.filter(log => log.visitorId === filters.visitorId);
    }

    if (filters.startDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) <= new Date(filters.endDate!)
      );
    }

    return filtered;
  }, [logs]);

  // Carregar registros ao montar o componente
  useEffect(() => {
    loadAccessLogs();
  }, [loadAccessLogs]);

  return {
    logs,
    loading,
    error,
    loadAccessLogs,
    registerEntry,
    registerExit,
    getVisitorHistory,
    checkVisitorInside,
    getActiveEntryLogId,
    filterLogs,
  };
};
