/**
 * Reports Service
 * Serviço para geração de relatórios e estatísticas
 */

import { DashboardStats, AccessReport, VisitorReport, ReportFilters } from '../types/reportTypes';
import { accessApi } from './api/accessApi';
import { visitorsApi } from './api/visitorsApi';

export const reportsService = {
  /**
   * Buscar estatísticas do dashboard
   */
  getDashboardStats: async (entityId: string): Promise<DashboardStats> => {
    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Buscar todos os visitantes
      const visitors = await visitorsApi.getAll();

      // Buscar logs de acesso
      const allLogs = await accessApi.getLogs({ entityId });
      const todayLogs = allLogs.filter(log => log.timestamp.startsWith(today));
      const weekLogs = allLogs.filter(log => log.timestamp >= weekAgo);
      const monthLogs = allLogs.filter(log => log.timestamp >= monthAgo);

      // Calcular visitantes ativos (com entrada sem saída)
      const visitorStatus = new Map();
      allLogs
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .forEach(log => {
          if (log.visitorId && !visitorStatus.has(log.visitorId)) {
            visitorStatus.set(log.visitorId, log.type === 'ENTRY');
          }
        });
      const activeVisitors = Array.from(visitorStatus.values()).filter(Boolean).length;

      return {
        totalVisitors: visitors.length,
        activeVisitors,
        todayEntries: todayLogs.filter(log => log.type === 'ENTRY').length,
        todayExits: todayLogs.filter(log => log.type === 'EXIT').length,
        weekEntries: weekLogs.filter(log => log.type === 'ENTRY').length,
        monthEntries: monthLogs.filter(log => log.type === 'ENTRY').length,
      };
    } catch (error: any) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar estatísticas');
    }
  },

  /**
   * Gerar relatório de acessos por período
   */
  getAccessReport: async (filters: ReportFilters, entityId: string): Promise<AccessReport[]> => {
    try {
      const logs = await accessApi.getLogs({
        entityId,
        startDate: filters.startDate,
        endDate: filters.endDate,
        type: filters.type,
      });

      // Agrupar por data
      const reportMap = new Map<string, { entries: number; exits: number }>();
      
      logs.forEach(log => {
        const date = log.timestamp.split('T')[0];
        if (!reportMap.has(date)) {
          reportMap.set(date, { entries: 0, exits: 0 });
        }
        const dayData = reportMap.get(date)!;
        if (log.type === 'ENTRY') {
          dayData.entries++;
        } else {
          dayData.exits++;
        }
      });

      // Converter para array ordenado
      return Array.from(reportMap.entries())
        .map(([date, data]) => ({
          date,
          entries: data.entries,
          exits: data.exits,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error: any) {
      console.error('Erro ao gerar relatório de acessos:', error);
      throw new Error(error.response?.data?.error || 'Erro ao gerar relatório');
    }
  },

  /**
   * Gerar relatório de visitantes mais frequentes
   */
  getTopVisitorsReport: async (entityId: string, limit: number = 10): Promise<VisitorReport[]> => {
    try {
      const logs = await accessApi.getLogs({ entityId });
      const visitors = await visitorsApi.getAll();

      // Contar acessos por visitante
      const visitorAccessMap = new Map<string, { count: number; lastAccess: string }>();
      
      logs.forEach(log => {
        if (log.visitorId) {
          if (!visitorAccessMap.has(log.visitorId)) {
            visitorAccessMap.set(log.visitorId, { count: 0, lastAccess: log.timestamp });
          }
          const data = visitorAccessMap.get(log.visitorId)!;
          data.count++;
          if (log.timestamp > data.lastAccess) {
            data.lastAccess = log.timestamp;
          }
        }
      });

      // Criar relatório
      const report: VisitorReport[] = [];
      visitorAccessMap.forEach((data, visitorId) => {
        const visitor = visitors.find(v => v.id === visitorId);
        if (visitor) {
          report.push({
            visitorId,
            visitorName: visitor.name,
            company: visitor.company,
            totalAccesses: data.count,
            lastAccess: data.lastAccess,
          });
        }
      });

      // Ordenar por total de acessos e limitar
      return report
        .sort((a, b) => b.totalAccesses - a.totalAccesses)
        .slice(0, limit);
    } catch (error: any) {
      console.error('Erro ao gerar relatório de visitantes:', error);
      throw new Error(error.response?.data?.error || 'Erro ao gerar relatório');
    }
  },
};
