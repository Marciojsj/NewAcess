/**
 * Reports Types
 * Tipos para relatórios e dashboard
 */

export interface DashboardStats {
  totalVisitors: number;
  activeVisitors: number;
  todayEntries: number;
  todayExits: number;
  weekEntries: number;
  monthEntries: number;
}

export interface AccessReport {
  date: string;
  entries: number;
  exits: number;
}

export interface VisitorReport {
  visitorId: string;
  visitorName: string;
  company?: string;
  totalAccesses: number;
  lastAccess: string;
}

export interface ReportFilters {
  startDate: string;
  endDate: string;
  type?: 'ENTRY' | 'EXIT';
  visitorId?: string;
}
