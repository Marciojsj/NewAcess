/**
 * useReports Hook
 * Gerencia relatórios e estatísticas
 */

import { useState, useCallback } from 'react';
import { DashboardStats, AccessReport, VisitorReport, ReportFilters } from '../types/reportTypes';
import { reportsService } from '../services/reportsService';

export const useReports = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [accessReport, setAccessReport] = useState<AccessReport[]>([]);
  const [topVisitors, setTopVisitors] = useState<VisitorReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carregar estatísticas do dashboard
   */
  const loadDashboardStats = useCallback(async (entityId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportsService.getDashboardStats(entityId);
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estatísticas');
      console.error('Erro ao carregar estatísticas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Gerar relatório de acessos
   */
  const generateAccessReport = useCallback(async (filters: ReportFilters, entityId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportsService.getAccessReport(filters, entityId);
      setAccessReport(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar relatório');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carregar visitantes mais frequentes
   */
  const loadTopVisitors = useCallback(async (entityId: string, limit?: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportsService.getTopVisitorsReport(entityId, limit);
      setTopVisitors(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar visitantes');
      console.error('Erro ao carregar visitantes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    accessReport,
    topVisitors,
    loading,
    error,
    loadDashboardStats,
    generateAccessReport,
    loadTopVisitors,
  };
};
