/**
 * Settings Types
 * Definições de tipos para configurações do sistema
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  entityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileSettings {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  language: 'pt-BR' | 'en-US' | 'es-ES';
  timezone: string;
}

export interface SystemSettings {
  entityName: string;
  maxCapacity: number;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[]; // 0-6 (Sunday-Saturday)
  autoLogoutEnabled: boolean;
  autoLogoutTime: number; // minutes
  qrCodeExpiration: number; // hours
  allowGuestAccess: boolean;
  requirePhotoUpload: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordExpirationDays: number;
  sessionTimeout: number; // minutes
  ipWhitelist: string[];
  allowMultipleSessions: boolean;
  requireStrongPassword: boolean;
  loginAttempts: number;
  lockoutDuration: number; // minutes
}

export interface NotificationSettings {
  enableAlerts: boolean;
  alertTypes: {
    security: boolean;
    capacity: boolean;
    expired: boolean;
    system: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt-BR' | 'en-US' | 'es-ES';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  showTutorial: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // seconds
}

export interface SettingsCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  screen?: string;
  action?: () => void;
}
