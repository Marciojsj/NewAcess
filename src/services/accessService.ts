/**
 * Access Service - Wrapper para a API de controle de acesso
 * Usa dados REAIS do backend via API REST
 */

import { AccessLog, EntryData, ExitData, AccessFilters } from '../types/accessTypes';
import { accessApi, AccessLog as APIAccessLog, RegisterEntryData, RegisterExitData } from './api/accessApi';

export const accessService = {
  /**
   * Buscar todos os registros de acesso
   */
  getAllAccessLogs: async (filters?: AccessFilters): Promise<AccessLog[]> => {
    try {
      const logs = await accessApi.getLogs(filters);
      return logs.map((log: APIAccessLog) => ({
        id: log.id,
        visitorId: log.visitorId || '',
        entityId: log.entityId,
        type: log.type,
        timestamp: log.timestamp,
        notes: log.notes,
        createdAt: log.timestamp,
        updatedAt: log.timestamp,
        visitor: log.visitor,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar registros de acesso:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar registros de acesso');
    }
  },

  /**
   * Registrar entrada de visitante
   */
  registerEntry: async (entryData: EntryData, entityId: string): Promise<AccessLog> => {
    try {
      const registerData: RegisterEntryData = {
        visitorId: entryData.visitorId,
        entityId: entityId,
        notes: entryData.notes,
      };

      const newLog = await accessApi.registerEntry(registerData);
      return {
        id: newLog.id,
        visitorId: newLog.visitorId || '',
        entityId: newLog.entityId,
        type: newLog.type,
        timestamp: newLog.timestamp,
        notes: newLog.notes,
        createdAt: newLog.timestamp,
        updatedAt: newLog.timestamp,
        visitor: newLog.visitor,
      };
    } catch (error: any) {
      console.error('Erro ao registrar entrada:', error);
      throw new Error(error.response?.data?.error || 'Erro ao registrar entrada');
    }
  },

  /**
   * Registrar saída de visitante
   */
  registerExit: async (exitData: ExitData, accessLogId: string): Promise<AccessLog> => {
    try {
      const registerData: RegisterExitData = {
        accessLogId: accessLogId,
        notes: exitData.notes,
      };

      const newLog = await accessApi.registerExit(registerData);
      return {
        id: newLog.id,
        visitorId: newLog.visitorId || '',
        entityId: newLog.entityId,
        type: newLog.type,
        timestamp: newLog.timestamp,
        notes: newLog.notes,
        createdAt: newLog.timestamp,
        updatedAt: newLog.timestamp,
        visitor: newLog.visitor,
      };
    } catch (error: any) {
      console.error('Erro ao registrar saída:', error);
      throw new Error(error.response?.data?.error || 'Erro ao registrar saída');
    }
  },

  /**
   * Buscar últimos acessos de um visitante
   */
  getVisitorAccessHistory: async (visitorId: string): Promise<AccessLog[]> => {
    try {
      const logs = await accessApi.getLogs({ visitorId });
      return logs.map((log: APIAccessLog) => ({
        id: log.id,
        visitorId: log.visitorId || '',
        entityId: log.entityId,
        type: log.type,
        timestamp: log.timestamp,
        notes: log.notes,
        createdAt: log.timestamp,
        updatedAt: log.timestamp,
        visitor: log.visitor,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar histórico de acesso:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar histórico de acesso');
    }
  },

  /**
   * Verificar se visitante está dentro (última entrada sem saída)
   */
  isVisitorInside: async (visitorId: string): Promise<boolean> => {
    try {
      const logs = await accessApi.getLogs({ visitorId });
      if (logs.length === 0) return false;
      
      // Ordena por timestamp decrescente e verifica o último registro
      const sortedLogs = logs.sort((a: APIAccessLog, b: APIAccessLog) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      return sortedLogs[0].type === 'ENTRY';
    } catch (error: any) {
      console.error('Erro ao verificar status do visitante:', error);
      return false;
    }
  },

  /**
   * Buscar ID do último log de entrada ativo (para registrar saída)
   */
  getActiveEntryLogId: async (visitorId: string): Promise<string | null> => {
    try {
      const logs = await accessApi.getLogs({ visitorId });
      if (logs.length === 0) return null;
      
      // Ordena por timestamp decrescente
      const sortedLogs = logs.sort((a: APIAccessLog, b: APIAccessLog) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      // Verifica se o último registro é entrada
      if (sortedLogs[0].type === 'ENTRY') {
        return sortedLogs[0].id;
      }
      
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar log ativo:', error);
      return null;
    }
  },
};
