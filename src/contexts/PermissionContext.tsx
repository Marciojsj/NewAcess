/**
 * Context de Permissões
 * Gerencia permissões do usuário atual e verificações de acesso
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PermissionLevel,
  PermissionModule,
  PermissionAction,
  UserPermissions,
  PermissionCheckResult,
  PERMISSION_HIERARCHY
} from '../types/permissionTypes';
import { permissionService } from '../services/permissionService';
import { useAuth } from './AuthContext';

// ==================== TIPOS ====================

interface PermissionContextData {
  userPermissions: UserPermissions | null;
  loading: boolean;
  error: string | null;

  // Verificações de permissão
  hasPermission: (module: PermissionModule, action: PermissionAction) => boolean;
  checkPermission: (module: PermissionModule, action: PermissionAction) => PermissionCheckResult;
  hasLevel: (requiredLevel: PermissionLevel) => boolean;
  isLevelOrHigher: (level: PermissionLevel) => boolean;

  // Getters de nível
  getCurrentLevel: () => PermissionLevel;
  getLevelName: () => string;
  getLevelColor: () => string;
  getLevelIcon: () => string;

  // Verificações especiais
  canManageUsers: () => boolean;
  canManagePermissions: () => boolean;
  canAccessSettings: () => boolean;
  canExportReports: () => boolean;
  canApproveVisitors: () => boolean;

  // Atualização
  refreshPermissions: () => Promise<void>;
}

// ==================== CONTEXT ====================

const PermissionContext = createContext<PermissionContextData>({} as PermissionContextData);

// ==================== PROVIDER ====================

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==================== CARREGAR PERMISSÕES ====================

  const loadPermissions = async () => {
    if (!user) {
      setUserPermissions(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const permissions = await permissionService.getUserPermissions(user.id);

      if (permissions) {
        setUserPermissions(permissions);
      } else {
        // Se não encontrou, criar permissões padrão baseado no role
        const defaultLevel = mapRoleToLevel(user.role);
        const newPermissions = await permissionService.createUserPermissions({
          userId: user.id,
          userName: user.name,
          level: defaultLevel,
          entityId: user.entityId
        });
        setUserPermissions(newPermissions);
      }
    } catch (err) {
      console.error('Erro ao carregar permissões:', err);
      setError('Erro ao carregar permissões');
      // Criar permissões padrão em caso de erro
      setUserPermissions({
        userId: user.id,
        userName: user.name,
        level: PermissionLevel.VIEWER,
        entityId: user.entityId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, [user]);

  // ==================== HELPER: MAPEAR ROLE PARA LEVEL ====================

  const mapRoleToLevel = (role: string): PermissionLevel => {
    const roleMap: Record<string, PermissionLevel> = {
      'SUPER_ADMIN': PermissionLevel.SUPER_ADMIN,
      'ADMIN': PermissionLevel.ADMIN,
      'MANAGER': PermissionLevel.MANAGER,
      'SUPERVISOR': PermissionLevel.SUPERVISOR,
      'OPERATOR': PermissionLevel.OPERATOR,
      'USER': PermissionLevel.VIEWER,
      'VIEWER': PermissionLevel.VIEWER
    };

    return roleMap[role.toUpperCase()] || PermissionLevel.VIEWER;
  };

  // ==================== VERIFICAÇÕES DE PERMISSÃO ====================

  const hasPermission = (module: PermissionModule, action: PermissionAction): boolean => {
    if (!userPermissions) return false;

    // Verificar permissões customizadas
    if (userPermissions.customPermissions?.length) {
      const hasCustom = userPermissions.customPermissions.some(
        p => p.module === module && p.action === action
      );
      if (hasCustom) return true;
    }

    // Verificar restrições
    if (userPermissions.restrictedPermissions?.length) {
      const isRestricted = userPermissions.restrictedPermissions.some(
        p => p.module === module && p.action === action
      );
      if (isRestricted) return false;
    }

    // Verificar na matriz de permissões
    return permissionService.hasPermission(userPermissions.level, module, action);
  };

  const checkPermission = (
    module: PermissionModule,
    action: PermissionAction
  ): PermissionCheckResult => {
    if (!userPermissions) {
      return {
        hasPermission: false,
        reason: 'Usuário não autenticado',
        currentLevel: undefined
      };
    }

    const hasAccess = hasPermission(module, action);

    if (!hasAccess) {
      return {
        hasPermission: false,
        reason: `Permissão insuficiente. Seu nível: ${userPermissions.level}`,
        currentLevel: userPermissions.level
      };
    }

    return {
      hasPermission: true,
      currentLevel: userPermissions.level
    };
  };

  const hasLevel = (requiredLevel: PermissionLevel): boolean => {
    if (!userPermissions) return false;
    return userPermissions.level === requiredLevel;
  };

  const isLevelOrHigher = (level: PermissionLevel): boolean => {
    if (!userPermissions) return false;
    return permissionService.isLevelHigherOrEqual(userPermissions.level, level);
  };

  // ==================== GETTERS ====================

  const getCurrentLevel = (): PermissionLevel => {
    return userPermissions?.level || PermissionLevel.VIEWER;
  };

  const getLevelName = (): string => {
    if (!userPermissions) return 'Visualizador';
    const config = permissionService.getLevelConfig(userPermissions.level);
    return config.displayName;
  };

  const getLevelColor = (): string => {
    if (!userPermissions) return '#9E9E9E';
    const config = permissionService.getLevelConfig(userPermissions.level);
    return config.color;
  };

  const getLevelIcon = (): string => {
    const icons: Record<PermissionLevel, string> = {
      [PermissionLevel.SUPER_ADMIN]: '👑',
      [PermissionLevel.ADMIN]: '🔑',
      [PermissionLevel.MANAGER]: '📊',
      [PermissionLevel.SUPERVISOR]: '👁️',
      [PermissionLevel.OPERATOR]: '⚙️',
      [PermissionLevel.VIEWER]: '👀'
    };
    return icons[getCurrentLevel()];
  };

  // ==================== VERIFICAÇÕES ESPECIAIS ====================

  const canManageUsers = (): boolean => {
    return hasPermission(PermissionModule.USERS, PermissionAction.MANAGE);
  };

  const canManagePermissions = (): boolean => {
    return hasPermission(PermissionModule.PERMISSIONS, PermissionAction.MANAGE);
  };

  const canAccessSettings = (): boolean => {
    return hasPermission(PermissionModule.SETTINGS, PermissionAction.VIEW);
  };

  const canExportReports = (): boolean => {
    return hasPermission(PermissionModule.REPORTS, PermissionAction.EXPORT);
  };

  const canApproveVisitors = (): boolean => {
    return hasPermission(PermissionModule.VISITORS, PermissionAction.APPROVE);
  };

  // ==================== REFRESH ====================

  const refreshPermissions = async () => {
    await loadPermissions();
  };

  // ==================== PROVIDER VALUE ====================

  const value: PermissionContextData = {
    userPermissions,
    loading,
    error,

    // Verificações
    hasPermission,
    checkPermission,
    hasLevel,
    isLevelOrHigher,

    // Getters
    getCurrentLevel,
    getLevelName,
    getLevelColor,
    getLevelIcon,

    // Verificações especiais
    canManageUsers,
    canManagePermissions,
    canAccessSettings,
    canExportReports,
    canApproveVisitors,

    // Atualização
    refreshPermissions
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

// ==================== HOOK ====================

export const usePermissions = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error('usePermissions deve ser usado dentro de um PermissionProvider');
  }

  return context;
};
