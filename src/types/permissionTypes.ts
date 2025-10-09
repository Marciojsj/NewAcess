/**
 * Sistema de Permissões - Tipos e Interfaces
 * 6 níveis hierárquicos de permissões
 */

// ==================== ENUMS ====================

/**
 * Níveis de permissão hierárquicos
 * Cada nível inclui todas as permissões dos níveis inferiores
 */
export enum PermissionLevel {
  SUPER_ADMIN = 'SUPER_ADMIN',     // Nível 6: Acesso total
  ADMIN = 'ADMIN',                  // Nível 5: Administração geral
  MANAGER = 'MANAGER',              // Nível 4: Gerência
  SUPERVISOR = 'SUPERVISOR',        // Nível 3: Supervisão
  OPERATOR = 'OPERATOR',            // Nível 2: Operação
  VIEWER = 'VIEWER'                 // Nível 1: Apenas visualização
}

/**
 * Módulos do sistema que podem ter permissões configuradas
 */
export enum PermissionModule {
  DASHBOARD = 'DASHBOARD',
  ENTRIES = 'ENTRIES',
  EXITS = 'EXITS',
  VISITORS = 'VISITORS',
  REPORTS = 'REPORTS',
  ALERTS = 'ALERTS',
  SETTINGS = 'SETTINGS',
  PERMISSIONS = 'PERMISSIONS',
  USERS = 'USERS',
  ENTITIES = 'ENTITIES',
  ACCESS_HISTORY = 'ACCESS_HISTORY',
  EXPORT = 'EXPORT'
}

/**
 * Tipos de ações que podem ser realizadas
 */
export enum PermissionAction {
  VIEW = 'VIEW',           // Visualizar
  CREATE = 'CREATE',       // Criar
  EDIT = 'EDIT',          // Editar
  DELETE = 'DELETE',       // Deletar
  EXPORT = 'EXPORT',       // Exportar
  APPROVE = 'APPROVE',     // Aprovar
  MANAGE = 'MANAGE'        // Gerenciar (todos os anteriores)
}

// ==================== INTERFACES ====================

/**
 * Permissão individual
 */
export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  description: string;
  requiredLevel: PermissionLevel;
}

/**
 * Configuração de permissões para um nível
 */
export interface PermissionConfig {
  level: PermissionLevel;
  displayName: string;
  description: string;
  color: string;
  permissions: Permission[];
}

/**
 * Permissões de um usuário específico
 */
export interface UserPermissions {
  userId: string;
  userName: string;
  level: PermissionLevel;
  customPermissions?: Permission[]; // Permissões extras além do nível
  restrictedPermissions?: Permission[]; // Permissões removidas do nível
  entityId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Matriz de permissões completa
 */
export interface PermissionMatrix {
  [key: string]: {
    [key: string]: PermissionLevel[];
  };
}

/**
 * Resultado de verificação de permissão
 */
export interface PermissionCheckResult {
  hasPermission: boolean;
  reason?: string;
  requiredLevel?: PermissionLevel;
  currentLevel?: PermissionLevel;
}

/**
 * Filtros para buscar permissões
 */
export interface PermissionFilters {
  level?: PermissionLevel;
  module?: PermissionModule;
  action?: PermissionAction;
  userId?: string;
  entityId?: string;
}

/**
 * Histórico de mudanças de permissões
 */
export interface PermissionHistory {
  id: string;
  userId: string;
  changedBy: string;
  previousLevel: PermissionLevel;
  newLevel: PermissionLevel;
  changes: string[];
  reason?: string;
  timestamp: Date;
}

/**
 * Estatísticas de permissões
 */
export interface PermissionStats {
  totalUsers: number;
  byLevel: {
    [key in PermissionLevel]: number;
  };
  customPermissions: number;
  restrictedPermissions: number;
}

// ==================== CONSTANTES ====================

/**
 * Hierarquia numérica dos níveis (para comparação)
 */
export const PERMISSION_HIERARCHY: Record<PermissionLevel, number> = {
  [PermissionLevel.VIEWER]: 1,
  [PermissionLevel.OPERATOR]: 2,
  [PermissionLevel.SUPERVISOR]: 3,
  [PermissionLevel.MANAGER]: 4,
  [PermissionLevel.ADMIN]: 5,
  [PermissionLevel.SUPER_ADMIN]: 6
};

/**
 * Cores dos níveis de permissão
 */
export const PERMISSION_COLORS: Record<PermissionLevel, string> = {
  [PermissionLevel.SUPER_ADMIN]: '#E91E63',  // Rosa/Magenta
  [PermissionLevel.ADMIN]: '#F44336',        // Vermelho
  [PermissionLevel.MANAGER]: '#FF9800',      // Laranja
  [PermissionLevel.SUPERVISOR]: '#2196F3',   // Azul
  [PermissionLevel.OPERATOR]: '#4CAF50',     // Verde
  [PermissionLevel.VIEWER]: '#9E9E9E'        // Cinza
};

/**
 * Ícones dos níveis de permissão
 */
export const PERMISSION_ICONS: Record<PermissionLevel, string> = {
  [PermissionLevel.SUPER_ADMIN]: '👑',
  [PermissionLevel.ADMIN]: '🔑',
  [PermissionLevel.MANAGER]: '📊',
  [PermissionLevel.SUPERVISOR]: '👁️',
  [PermissionLevel.OPERATOR]: '⚙️',
  [PermissionLevel.VIEWER]: '👀'
};
