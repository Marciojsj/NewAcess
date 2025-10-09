/**
 * Alert Types
 * Definições de tipos para o sistema de alertas
 */

export enum AlertType {
  SECURITY = 'SECURITY',
  VISITOR_EXPIRED = 'VISITOR_EXPIRED',
  CAPACITY = 'CAPACITY',
  SYSTEM = 'SYSTEM',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum AlertPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  DISMISSED = 'DISMISSED',
  RESOLVED = 'RESOLVED',
}

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  status: AlertStatus;
  title: string;
  message: string;
  timestamp: string;
  entityId: string;
  visitorId?: string;
  accessLogId?: string;
  metadata?: Record<string, any>;
  dismissedAt?: string;
  dismissedBy?: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface AlertRule {
  id: string;
  entityId: string;
  type: AlertType;
  enabled: boolean;
  conditions: {
    threshold?: number;
    duration?: number;
    timeWindow?: number;
    comparison?: 'greater' | 'less' | 'equal';
  };
  actions: {
    notify?: boolean;
    email?: boolean;
    sms?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AlertConfig {
  enableSecurityAlerts: boolean;
  enableCapacityAlerts: boolean;
  enableExpirationAlerts: boolean;
  capacityThreshold: number;
  expirationWarningDays: number;
  notificationMethods: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

export interface AlertFilters {
  type?: AlertType;
  priority?: AlertPriority;
  status?: AlertStatus;
  startDate?: string;
  endDate?: string;
}

export interface AlertStats {
  total: number;
  active: number;
  dismissed: number;
  resolved: number;
  byType: Record<AlertType, number>;
  byPriority: Record<AlertPriority, number>;
}
