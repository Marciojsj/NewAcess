// src/types/permissions.ts
/**
 * Sistema de Permissões - 6 Níveis
 * 
 * Este arquivo define a estrutura completa do sistema de permissões,
 * incluindo os níveis, features e validações.
 */

/**
 * Enum com os 6 níveis de permissão do sistema
 * Ordem crescente de privilégios: GUEST < SECURITY < RECEPTIONIST < SUPERVISOR < MANAGER < ADMIN
 */
export enum PermissionLevel {
  /** Nível 0 - Visitante: Acesso mínimo, apenas visualização limitada */
  GUEST = 0,
  
  /** Nível 1 - Segurança: Registro de entrada e saída */
  SECURITY = 1,
  
  /** Nível 2 - Recepcionista: Gestão de visitantes e registros */
  RECEPTIONIST = 2,
  
  /** Nível 3 - Supervisor: Aprovações, relatórios e visualização de alertas */
  SUPERVISOR = 3,
  
  /** Nível 4 - Gerente: Configuração de alertas e gestão avançada */
  MANAGER = 4,
  
  /** Nível 5 - Administrador: Acesso total ao sistema */
  ADMIN = 5
}

/**
 * Features disponíveis no sistema
 * Cada feature pode ter diferentes níveis de acesso (view, create, edit, delete)
 */
export enum Feature {
  // Acesso básico
  LOGIN = 'login',
  HOME = 'home',
  PROFILE = 'profile',
  
  // Registro de acesso
  ENTRY = 'entry',
  EXIT = 'exit',
  ACCESS_HISTORY = 'access_history',
  
  // Visitantes
  VISITORS = 'visitors',
  VISITOR_CREATE = 'visitor_create',
  VISITOR_EDIT = 'visitor_edit',
  VISITOR_DELETE = 'visitor_delete',
  
  // Entidades
  ENTITIES = 'entities',
  ENTITY_CREATE = 'entity_create',
  ENTITY_EDIT = 'entity_edit',
  ENTITY_DELETE = 'entity_delete',
  
  // Relatórios
  REPORTS = 'reports',
  REPORTS_EXPORT = 'reports_export',
  REPORTS_ADVANCED = 'reports_advanced',
  
  // Alertas
  ALERTS = 'alerts',
  ALERTS_CREATE = 'alerts_create',
  ALERTS_CONFIGURE = 'alerts_configure',
  
  // Configurações
  SETTINGS = 'settings',
  SETTINGS_SYSTEM = 'settings_system',
  SETTINGS_SECURITY = 'settings_security',
  
  // Administração
  USERS = 'users',
  PERMISSIONS = 'permissions',
}

/**
 * Ações que podem ser realizadas em uma feature
 */
export enum Action {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  EXPORT = 'export',
  CONFIGURE = 'configure',
  APPROVE = 'approve',
}

/**
 * Interface que define uma permissão específica
 */
export interface Permission {
  /** ID único da permissão */
  id: string;
  
  /** Nome da permissão (ex: "Administrador") */
  name: string;
  
  /** Nível de permissão (0-5) */
  level: PermissionLevel;
  
  /** Descrição detalhada da permissão */
  description: string;
  
  /** Features que este nível tem acesso */
  features: FeaturePermission[];
  
  /** Cor para identificação visual */
  color: string;
  
  /** Ícone para identificação visual */
  icon: string;
}

/**
 * Interface que define as permissões de uma feature específica
 */
export interface FeaturePermission {
  /** Nome da feature */
  feature: Feature;
  
  /** Pode visualizar */
  canView: boolean;
  
  /** Pode criar */
  canCreate: boolean;
  
  /** Pode editar */
  canEdit: boolean;
  
  /** Pode deletar */
  canDelete: boolean;
  
  /** Ações adicionais permitidas */
  additionalActions?: Action[];
}

/**
 * Interface do usuário com suas permissões
 */
export interface UserPermission {
  /** ID do usuário */
  userId: string;
  
  /** Nível de permissão do usuário */
  permissionLevel: PermissionLevel;
  
  /** Permissões customizadas (opcional) */
  customPermissions?: FeaturePermission[];
  
  /** Data de atribuição da permissão */
  assignedAt: string;
  
  /** ID de quem atribuiu a permissão */
  assignedBy: string;
}

/**
 * Interface para log de alterações de permissões
 */
export interface PermissionLog {
  /** ID do log */
  id: string;
  
  /** ID do usuário afetado */
  userId: string;
  
  /** Nível anterior */
  previousLevel: PermissionLevel;
  
  /** Novo nível */
  newLevel: PermissionLevel;
  
  /** Motivo da mudança */
  reason: string;
  
  /** Data da mudança */
  changedAt: string;
  
  /** ID de quem fez a mudança */
  changedBy: string;
}

/**
 * Matriz de permissões padrão do sistema
 * Define o que cada nível pode fazer em cada feature
 */
export const PERMISSION_MATRIX: Record<PermissionLevel, FeaturePermission[]> = {
  [PermissionLevel.GUEST]: [
    // Guest não tem acesso a nenhuma feature além do login
    { feature: Feature.LOGIN, canView: true, canCreate: false, canEdit: false, canDelete: false },
  ],
  
  [PermissionLevel.SECURITY]: [
    { feature: Feature.LOGIN, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.HOME, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.PROFILE, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.ENTRY, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.EXIT, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.ACCESS_HISTORY, canView: true, canCreate: false, canEdit: false, canDelete: false },
  ],
  
  [PermissionLevel.RECEPTIONIST]: [
    { feature: Feature.LOGIN, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.HOME, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.PROFILE, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.ENTRY, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.EXIT, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.ACCESS_HISTORY, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.VISITORS, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.VISITOR_CREATE, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.VISITOR_EDIT, canView: true, canCreate: false, canEdit: true, canDelete: false },
  ],
  
  [PermissionLevel.SUPERVISOR]: [
    { feature: Feature.LOGIN, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.HOME, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.PROFILE, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.ENTRY, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.EXIT, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.ACCESS_HISTORY, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.VISITORS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITOR_CREATE, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.VISITOR_EDIT, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.VISITOR_DELETE, canView: true, canCreate: false, canEdit: false, canDelete: true },
    { feature: Feature.REPORTS, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.REPORTS_EXPORT, canView: true, canCreate: true, canEdit: false, canDelete: false, additionalActions: [Action.EXPORT] },
    { feature: Feature.ALERTS, canView: true, canCreate: false, canEdit: false, canDelete: false },
  ],
  
  [PermissionLevel.MANAGER]: [
    { feature: Feature.LOGIN, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.HOME, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.PROFILE, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.ENTRY, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.EXIT, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ACCESS_HISTORY, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.VISITORS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITOR_CREATE, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.VISITOR_EDIT, canView: true, canCreate: false, canEdit: true, canDelete: false },
    { feature: Feature.VISITOR_DELETE, canView: true, canCreate: false, canEdit: false, canDelete: true },
    { feature: Feature.REPORTS, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.REPORTS_EXPORT, canView: true, canCreate: true, canEdit: false, canDelete: false, additionalActions: [Action.EXPORT] },
    { feature: Feature.REPORTS_ADVANCED, canView: true, canCreate: false, canEdit: false, canDelete: false },
    { feature: Feature.ALERTS, canView: true, canCreate: true, canEdit: true, canDelete: false },
    { feature: Feature.ALERTS_CREATE, canView: true, canCreate: true, canEdit: false, canDelete: false },
    { feature: Feature.ALERTS_CONFIGURE, canView: true, canCreate: false, canEdit: true, canDelete: false, additionalActions: [Action.CONFIGURE] },
    { feature: Feature.SETTINGS, canView: true, canCreate: false, canEdit: true, canDelete: false },
  ],
  
  [PermissionLevel.ADMIN]: [
    // Admin tem acesso total a todas as features
    { feature: Feature.LOGIN, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.HOME, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.PROFILE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ENTRY, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.EXIT, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ACCESS_HISTORY, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITORS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITOR_CREATE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITOR_EDIT, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.VISITOR_DELETE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ENTITIES, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ENTITY_CREATE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ENTITY_EDIT, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ENTITY_DELETE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.REPORTS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.REPORTS_EXPORT, canView: true, canCreate: true, canEdit: true, canDelete: true, additionalActions: [Action.EXPORT] },
    { feature: Feature.REPORTS_ADVANCED, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ALERTS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ALERTS_CREATE, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.ALERTS_CONFIGURE, canView: true, canCreate: true, canEdit: true, canDelete: true, additionalActions: [Action.CONFIGURE] },
    { feature: Feature.SETTINGS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.SETTINGS_SYSTEM, canView: true, canCreate: true, canEdit: true, canDelete: true, additionalActions: [Action.CONFIGURE] },
    { feature: Feature.SETTINGS_SECURITY, canView: true, canCreate: true, canEdit: true, canDelete: true, additionalActions: [Action.CONFIGURE] },
    { feature: Feature.USERS, canView: true, canCreate: true, canEdit: true, canDelete: true },
    { feature: Feature.PERMISSIONS, canView: true, canCreate: true, canEdit: true, canDelete: true, additionalActions: [Action.CONFIGURE, Action.APPROVE] },
  ],
};

/**
 * Definição dos níveis de permissão com metadados
 */
export const PERMISSION_LEVELS: Permission[] = [
  {
    id: 'guest',
    name: 'Visitante',
    level: PermissionLevel.GUEST,
    description: 'Acesso mínimo ao sistema, apenas visualização limitada',
    features: PERMISSION_MATRIX[PermissionLevel.GUEST],
    color: '#6c757d',
    icon: '👤',
  },
  {
    id: 'security',
    name: 'Segurança',
    level: PermissionLevel.SECURITY,
    description: 'Pode registrar entradas e saídas, visualizar histórico',
    features: PERMISSION_MATRIX[PermissionLevel.SECURITY],
    color: '#17a2b8',
    icon: '🛡️',
  },
  {
    id: 'receptionist',
    name: 'Recepcionista',
    level: PermissionLevel.RECEPTIONIST,
    description: 'Gestão completa de visitantes e registros de acesso',
    features: PERMISSION_MATRIX[PermissionLevel.RECEPTIONIST],
    color: '#007bff',
    icon: '📋',
  },
  {
    id: 'supervisor',
    name: 'Supervisor',
    level: PermissionLevel.SUPERVISOR,
    description: 'Aprovações, relatórios e visualização de alertas',
    features: PERMISSION_MATRIX[PermissionLevel.SUPERVISOR],
    color: '#ffc107',
    icon: '👨‍💼',
  },
  {
    id: 'manager',
    name: 'Gerente',
    level: PermissionLevel.MANAGER,
    description: 'Configuração de alertas, gestão avançada e configurações',
    features: PERMISSION_MATRIX[PermissionLevel.MANAGER],
    color: '#fd7e14',
    icon: '👔',
  },
  {
    id: 'admin',
    name: 'Administrador',
    level: PermissionLevel.ADMIN,
    description: 'Acesso total ao sistema, incluindo gestão de usuários e permissões',
    features: PERMISSION_MATRIX[PermissionLevel.ADMIN],
    color: '#dc3545',
    icon: '👑',
  },
];
