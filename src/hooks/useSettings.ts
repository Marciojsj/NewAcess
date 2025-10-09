/**
 * useSettings Hook
 * Hook para gerenciar configurações do sistema
 */

import { useState, useCallback } from 'react';
import {
  ProfileSettings,
  SystemSettings,
  SecuritySettings,
  NotificationSettings,
  AppSettings,
} from '../types/settingsTypes';
import { settingsService } from '../services/settingsService';

export const useSettings = () => {
  const [profileSettings, setProfileSettings] = useState<ProfileSettings | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(null);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load Profile Settings
   */
  const loadProfileSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getProfileSettings();
      setProfileSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      console.error('Error loading profile settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update Profile Settings
   */
  const updateProfileSettings = useCallback(async (settings: Partial<ProfileSettings>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.updateProfileSettings(settings);
      setProfileSettings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
      console.error('Error updating profile settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load System Settings
   */
  const loadSystemSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getSystemSettings();
      setSystemSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      console.error('Error loading system settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update System Settings
   */
  const updateSystemSettings = useCallback(async (settings: Partial<SystemSettings>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.updateSystemSettings(settings);
      setSystemSettings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
      console.error('Error updating system settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load Security Settings
   */
  const loadSecuritySettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getSecuritySettings();
      setSecuritySettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      console.error('Error loading security settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update Security Settings
   */
  const updateSecuritySettings = useCallback(async (settings: Partial<SecuritySettings>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.updateSecuritySettings(settings);
      setSecuritySettings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
      console.error('Error updating security settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load Notification Settings
   */
  const loadNotificationSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getNotificationSettings();
      setNotificationSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      console.error('Error loading notification settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update Notification Settings
   */
  const updateNotificationSettings = useCallback(
    async (settings: Partial<NotificationSettings>) => {
      try {
        setLoading(true);
        setError(null);
        const data = await settingsService.updateNotificationSettings(settings);
        setNotificationSettings(data);
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
        console.error('Error updating notification settings:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Load App Settings
   */
  const loadAppSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getAppSettings();
      setAppSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar configurações');
      console.error('Error loading app settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update App Settings
   */
  const updateAppSettings = useCallback(async (settings: Partial<AppSettings>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.updateAppSettings(settings);
      setAppSettings(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar configurações');
      console.error('Error updating app settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Export Settings
   */
  const exportSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.exportSettings();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao exportar configurações');
      console.error('Error exporting settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Import Settings
   */
  const importSettings = useCallback(async (data: string) => {
    try {
      setLoading(true);
      setError(null);
      await settingsService.importSettings(data);
      // Reload all settings
      await Promise.all([
        loadProfileSettings(),
        loadSystemSettings(),
        loadSecuritySettings(),
        loadNotificationSettings(),
        loadAppSettings(),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar configurações');
      console.error('Error importing settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProfileSettings, loadSystemSettings, loadSecuritySettings, loadNotificationSettings, loadAppSettings]);

  return {
    profileSettings,
    systemSettings,
    securitySettings,
    notificationSettings,
    appSettings,
    loading,
    error,
    loadProfileSettings,
    updateProfileSettings,
    loadSystemSettings,
    updateSystemSettings,
    loadSecuritySettings,
    updateSecuritySettings,
    loadNotificationSettings,
    updateNotificationSettings,
    loadAppSettings,
    updateAppSettings,
    exportSettings,
    importSettings,
  };
};
