/**
 * Settings Service
 * Serviço para gerenciar configurações do sistema (mock para desenvolvimento)
 */

import {
  ProfileSettings,
  SystemSettings,
  SecuritySettings,
  NotificationSettings,
  AppSettings,
} from '../types/settingsTypes';

// Mock data
const mockProfileSettings: ProfileSettings = {
  name: 'Administrador',
  email: 'admin@accesscontrol.com',
  phone: '+55 11 98765-4321',
  avatar: undefined,
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
  language: 'pt-BR',
  timezone: 'America/Sao_Paulo',
};

const mockSystemSettings: SystemSettings = {
  entityName: 'Empresa Exemplo',
  maxCapacity: 100,
  workingHours: {
    start: '08:00',
    end: '18:00',
  },
  workingDays: [1, 2, 3, 4, 5], // Monday to Friday
  autoLogoutEnabled: true,
  autoLogoutTime: 30,
  qrCodeExpiration: 24,
  allowGuestAccess: true,
  requirePhotoUpload: false,
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  passwordExpirationDays: 90,
  sessionTimeout: 60,
  ipWhitelist: [],
  allowMultipleSessions: true,
  requireStrongPassword: true,
  loginAttempts: 5,
  lockoutDuration: 15,
};

const mockNotificationSettings: NotificationSettings = {
  enableAlerts: true,
  alertTypes: {
    security: true,
    capacity: true,
    expired: true,
    system: true,
  },
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '07:00',
  },
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
};

const mockAppSettings: AppSettings = {
  theme: 'light',
  language: 'pt-BR',
  fontSize: 'medium',
  compactMode: false,
  showTutorial: true,
  autoRefresh: true,
  refreshInterval: 30,
};

export const settingsService = {
  /**
   * Profile Settings
   */
  async getProfileSettings(): Promise<ProfileSettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockProfileSettings };
  },

  async updateProfileSettings(settings: Partial<ProfileSettings>): Promise<ProfileSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockProfileSettings, settings);
    return { ...mockProfileSettings };
  },

  /**
   * System Settings
   */
  async getSystemSettings(): Promise<SystemSettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockSystemSettings };
  },

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockSystemSettings, settings);
    return { ...mockSystemSettings };
  },

  /**
   * Security Settings
   */
  async getSecuritySettings(): Promise<SecuritySettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockSecuritySettings };
  },

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockSecuritySettings, settings);
    return { ...mockSecuritySettings };
  },

  /**
   * Notification Settings
   */
  async getNotificationSettings(): Promise<NotificationSettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockNotificationSettings };
  },

  async updateNotificationSettings(
    settings: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockNotificationSettings, settings);
    return { ...mockNotificationSettings };
  },

  /**
   * App Settings
   */
  async getAppSettings(): Promise<AppSettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockAppSettings };
  },

  async updateAppSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    Object.assign(mockAppSettings, settings);
    return { ...mockAppSettings };
  },

  /**
   * Export Settings
   */
  async exportSettings(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return JSON.stringify(
      {
        profile: mockProfileSettings,
        system: mockSystemSettings,
        security: mockSecuritySettings,
        notifications: mockNotificationSettings,
        app: mockAppSettings,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  },

  /**
   * Import Settings
   */
  async importSettings(data: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const parsed = JSON.parse(data);
    
    if (parsed.profile) Object.assign(mockProfileSettings, parsed.profile);
    if (parsed.system) Object.assign(mockSystemSettings, parsed.system);
    if (parsed.security) Object.assign(mockSecuritySettings, parsed.security);
    if (parsed.notifications) Object.assign(mockNotificationSettings, parsed.notifications);
    if (parsed.app) Object.assign(mockAppSettings, parsed.app);
  },

  /**
   * Reset Settings to Default
   */
  async resetSettings(category: 'all' | 'profile' | 'system' | 'security' | 'notifications' | 'app'): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (category) {
      case 'all':
        // Reset all settings
        break;
      case 'profile':
        // Reset profile settings
        break;
      // Add other cases
    }
  },
};
