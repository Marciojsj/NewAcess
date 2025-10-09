/**
 * Alert Service
 * Serviço para gerenciar alertas do sistema (mock para desenvolvimento)
 */

import { Alert, AlertType, AlertPriority, AlertStatus, AlertFilters, AlertStats } from '../types/alertTypes';

// Mock data para desenvolvimento
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: AlertType.SECURITY,
    priority: AlertPriority.HIGH,
    status: AlertStatus.ACTIVE,
    title: 'Acesso não autorizado detectado',
    message: 'Tentativa de acesso sem autorização no portão principal',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    entityId: '1',
  },
  {
    id: '2',
    type: AlertType.CAPACITY,
    priority: AlertPriority.MEDIUM,
    status: AlertStatus.ACTIVE,
    title: 'Capacidade máxima atingida',
    message: 'O número de visitantes atingiu 90% da capacidade máxima',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    entityId: '1',
  },
  {
    id: '3',
    type: AlertType.VISITOR_EXPIRED,
    priority: AlertPriority.LOW,
    status: AlertStatus.DISMISSED,
    title: 'Visitante com acesso expirado',
    message: 'O visitante João Silva possui autorização expirada',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    entityId: '1',
    dismissedAt: new Date(Date.now() - 3600000).toISOString(),
    dismissedBy: 'admin',
  },
  {
    id: '4',
    type: AlertType.SYSTEM,
    priority: AlertPriority.CRITICAL,
    status: AlertStatus.RESOLVED,
    title: 'Falha no sistema de câmeras',
    message: 'Câmera 03 offline - manutenção necessária',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    entityId: '1',
    resolvedAt: new Date(Date.now() - 86400000).toISOString(),
    resolvedBy: 'tech_support',
  },
  {
    id: '5',
    type: AlertType.WARNING,
    priority: AlertPriority.MEDIUM,
    status: AlertStatus.ACTIVE,
    title: 'Visitante sem saída registrada',
    message: 'Maria Santos entrou há mais de 12 horas sem registrar saída',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    entityId: '1',
  },
];

export const alertService = {
  /**
   * Buscar alertas com filtros opcionais
   */
  async getAlerts(filters?: AlertFilters): Promise<Alert[]> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...mockAlerts];

    if (filters) {
      if (filters.type) {
        filtered = filtered.filter(alert => alert.type === filters.type);
      }
      if (filters.priority) {
        filtered = filtered.filter(alert => alert.priority === filters.priority);
      }
      if (filters.status) {
        filtered = filtered.filter(alert => alert.status === filters.status);
      }
      if (filters.startDate) {
        filtered = filtered.filter(alert => 
          new Date(alert.timestamp) >= new Date(filters.startDate!)
        );
      }
      if (filters.endDate) {
        filtered = filtered.filter(alert => 
          new Date(alert.timestamp) <= new Date(filters.endDate!)
        );
      }
    }

    return filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  /**
   * Buscar alerta por ID
   */
  async getAlertById(id: string): Promise<Alert | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAlerts.find(alert => alert.id === id) || null;
  },

  /**
   * Descartar alerta
   */
  async dismissAlert(id: string, dismissedBy: string): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) {
      throw new Error('Alerta não encontrado');
    }

    alert.status = AlertStatus.DISMISSED;
    alert.dismissedAt = new Date().toISOString();
    alert.dismissedBy = dismissedBy;

    return alert;
  },

  /**
   * Resolver alerta
   */
  async resolveAlert(id: string, resolvedBy: string): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) {
      throw new Error('Alerta não encontrado');
    }

    alert.status = AlertStatus.RESOLVED;
    alert.resolvedAt = new Date().toISOString();
    alert.resolvedBy = resolvedBy;

    return alert;
  },

  /**
   * Criar novo alerta
   */
  async createAlert(
    type: AlertType,
    priority: AlertPriority,
    title: string,
    message: string,
    entityId: string,
    metadata?: Record<string, any>
  ): Promise<Alert> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const newAlert: Alert = {
      id: String(mockAlerts.length + 1),
      type,
      priority,
      status: AlertStatus.ACTIVE,
      title,
      message,
      timestamp: new Date().toISOString(),
      entityId,
      metadata,
    };

    mockAlerts.unshift(newAlert);
    return newAlert;
  },

  /**
   * Obter estatísticas de alertas
   */
  async getAlertStats(entityId: string): Promise<AlertStats> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const entityAlerts = mockAlerts.filter(a => a.entityId === entityId);

    const stats: AlertStats = {
      total: entityAlerts.length,
      active: entityAlerts.filter(a => a.status === AlertStatus.ACTIVE).length,
      dismissed: entityAlerts.filter(a => a.status === AlertStatus.DISMISSED).length,
      resolved: entityAlerts.filter(a => a.status === AlertStatus.RESOLVED).length,
      byType: {
        [AlertType.SECURITY]: 0,
        [AlertType.VISITOR_EXPIRED]: 0,
        [AlertType.CAPACITY]: 0,
        [AlertType.SYSTEM]: 0,
        [AlertType.WARNING]: 0,
        [AlertType.INFO]: 0,
      },
      byPriority: {
        [AlertPriority.LOW]: 0,
        [AlertPriority.MEDIUM]: 0,
        [AlertPriority.HIGH]: 0,
        [AlertPriority.CRITICAL]: 0,
      },
    };

    entityAlerts.forEach(alert => {
      stats.byType[alert.type]++;
      stats.byPriority[alert.priority]++;
    });

    return stats;
  },

  /**
   * Limpar todos os alertas descartados
   */
  async clearDismissed(entityId: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const initialLength = mockAlerts.length;
    const filtered = mockAlerts.filter(
      a => !(a.entityId === entityId && a.status === AlertStatus.DISMISSED)
    );
    
    mockAlerts.length = 0;
    mockAlerts.push(...filtered);

    return initialLength - mockAlerts.length;
  },
};
