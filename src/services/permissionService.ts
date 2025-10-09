/**
 * Serviço de Permissões
 * Mock service para gerenciamento de permissões
 */

import {
  Permission,
  PermissionConfig,
  UserPermissions,
  PermissionMatrix,
  PermissionLevel,
  PermissionModule,
  PermissionAction,
  PermissionFilters,
  PermissionHistory,
  PermissionStats,
  PERMISSION_HIERARCHY,
  PERMISSION_COLORS,
  PERMISSION_ICONS
} from '../types/permissionTypes';

// ==================== MATRIZ DE PERMISSÕES ====================

/**
 * Matriz completa de permissões do sistema
 * Define quais níveis podem realizar quais ações em quais módulos
 */
const permissionMatrix: PermissionMatrix = {
  [PermissionModule.DASHBOARD]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.VIEWER,
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.ENTRIES]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.VIEWER,
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.CREATE]: [
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EDIT]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.DELETE]: [
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.EXITS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.VIEWER,
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.CREATE]: [
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EDIT]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.DELETE]: [
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.VISITORS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.VIEWER,
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.CREATE]: [
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EDIT]: [
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.DELETE]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.APPROVE]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.REPORTS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EXPORT]: [
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.ALERTS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.OPERATOR,
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.MANAGE]: [
      PermissionLevel.SUPERVISOR,
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.SETTINGS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EDIT]: [
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.PERMISSIONS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.MANAGE]: [
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.USERS]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.MANAGER,
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.CREATE]: [
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.EDIT]: [
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.DELETE]: [
      PermissionLevel.SUPER_ADMIN
    ]
  },
  [PermissionModule.ENTITIES]: {
    [PermissionAction.VIEW]: [
      PermissionLevel.ADMIN,
      PermissionLevel.SUPER_ADMIN
    ],
    [PermissionAction.MANAGE]: [
      PermissionLevel.SUPER_ADMIN
    ]
  }
};

// ==================== DADOS MOCK ====================

let mockUserPermissions: UserPermissions[] = [
  {
    userId: '1',
    userName: 'João Silva (Super Admin)',
    level: PermissionLevel.SUPER_ADMIN,
    entityId: '1',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    userId: '2',
    userName: 'Maria Santos (Admin)',
    level: PermissionLevel.ADMIN,
    entityId: '1',
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01')
  },
  {
    userId: '3',
    userName: 'Pedro Costa (Manager)',
    level: PermissionLevel.MANAGER,
    entityId: '1',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-01')
  },
  {
    userId: '4',
    userName: 'Ana Oliveira (Supervisor)',
    level: PermissionLevel.SUPERVISOR,
    entityId: '1',
    createdAt: new Date('2025-04-01'),
    updatedAt: new Date('2025-04-01')
  },
  {
    userId: '5',
    userName: 'Carlos Ferreira (Operator)',
    level: PermissionLevel.OPERATOR,
    entityId: '1',
    createdAt: new Date('2025-05-01'),
    updatedAt: new Date('2025-05-01')
  }
];

let mockHistory: PermissionHistory[] = [
  {
    id: '1',
    userId: '2',
    changedBy: '1',
    previousLevel: PermissionLevel.MANAGER,
    newLevel: PermissionLevel.ADMIN,
    changes: ['Promovido para Admin'],
    reason: 'Desempenho excepcional',
    timestamp: new Date('2025-02-15')
  }
];

// ==================== SERVIÇO ====================

export const permissionService = {
  /**
   * Verificar se um usuário tem permissão para realizar uma ação
   */
  hasPermission: (
    userLevel: PermissionLevel,
    module: PermissionModule,
    action: PermissionAction
  ): boolean => {
    const modulePermissions = permissionMatrix[module];
    if (!modulePermissions) return false;

    const actionPermissions = modulePermissions[action];
    if (!actionPermissions) return false;

    return actionPermissions.includes(userLevel);
  },

  /**
   * Verificar se um nível é superior a outro
   */
  isLevelHigherOrEqual: (
    level: PermissionLevel,
    requiredLevel: PermissionLevel
  ): boolean => {
    return PERMISSION_HIERARCHY[level] >= PERMISSION_HIERARCHY[requiredLevel];
  },

  /**
   * Obter matriz de permissões
   */
  getPermissionMatrix: (): PermissionMatrix => {
    return permissionMatrix;
  },

  /**
   * Obter configurações de um nível
   */
  getLevelConfig: (level: PermissionLevel): PermissionConfig => {
    const configs: Record<PermissionLevel, PermissionConfig> = {
      [PermissionLevel.SUPER_ADMIN]: {
        level: PermissionLevel.SUPER_ADMIN,
        displayName: 'Super Administrador',
        description: 'Acesso total ao sistema. Pode gerenciar tudo.',
        color: PERMISSION_COLORS[PermissionLevel.SUPER_ADMIN],
        permissions: []
      },
      [PermissionLevel.ADMIN]: {
        level: PermissionLevel.ADMIN,
        displayName: 'Administrador',
        description: 'Gerencia usuários e configurações gerais.',
        color: PERMISSION_COLORS[PermissionLevel.ADMIN],
        permissions: []
      },
      [PermissionLevel.MANAGER]: {
        level: PermissionLevel.MANAGER,
        displayName: 'Gerente',
        description: 'Gerencia operações e visualiza relatórios.',
        color: PERMISSION_COLORS[PermissionLevel.MANAGER],
        permissions: []
      },
      [PermissionLevel.SUPERVISOR]: {
        level: PermissionLevel.SUPERVISOR,
        displayName: 'Supervisor',
        description: 'Supervisiona operações e aprova visitantes.',
        color: PERMISSION_COLORS[PermissionLevel.SUPERVISOR],
        permissions: []
      },
      [PermissionLevel.OPERATOR]: {
        level: PermissionLevel.OPERATOR,
        displayName: 'Operador',
        description: 'Registra entradas e saídas de visitantes.',
        color: PERMISSION_COLORS[PermissionLevel.OPERATOR],
        permissions: []
      },
      [PermissionLevel.VIEWER]: {
        level: PermissionLevel.VIEWER,
        displayName: 'Visualizador',
        description: 'Apenas visualiza informações básicas.',
        color: PERMISSION_COLORS[PermissionLevel.VIEWER],
        permissions: []
      }
    };

    return configs[level];
  },

  /**
   * Obter permissões de um usuário
   */
  getUserPermissions: async (userId: string): Promise<UserPermissions | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUserPermissions.find(p => p.userId === userId) || null;
  },

  /**
   * Listar permissões de usuários com filtros
   */
  listUserPermissions: async (
    filters?: PermissionFilters
  ): Promise<UserPermissions[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered = [...mockUserPermissions];

    if (filters?.level) {
      filtered = filtered.filter(p => p.level === filters.level);
    }

    if (filters?.userId) {
      filtered = filtered.filter(p => p.userId === filters.userId);
    }

    if (filters?.entityId) {
      filtered = filtered.filter(p => p.entityId === filters.entityId);
    }

    return filtered;
  },

  /**
   * Atualizar permissões de um usuário
   */
  updateUserPermissions: async (
    userId: string,
    updates: Partial<UserPermissions>,
    changedBy: string
  ): Promise<UserPermissions> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = mockUserPermissions.findIndex(p => p.userId === userId);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    const previous = mockUserPermissions[index];
    const updated = {
      ...previous,
      ...updates,
      updatedAt: new Date()
    };

    mockUserPermissions[index] = updated;

    // Registrar histórico
    if (updates.level && updates.level !== previous.level) {
      mockHistory.push({
        id: String(mockHistory.length + 1),
        userId,
        changedBy,
        previousLevel: previous.level,
        newLevel: updates.level,
        changes: [`Nível alterado de ${previous.level} para ${updates.level}`],
        timestamp: new Date()
      });
    }

    return updated;
  },

  /**
   * Obter histórico de mudanças
   */
  getPermissionHistory: async (userId?: string): Promise<PermissionHistory[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (userId) {
      return mockHistory.filter(h => h.userId === userId);
    }

    return mockHistory;
  },

  /**
   * Obter estatísticas de permissões
   */
  getPermissionStats: async (): Promise<PermissionStats> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const byLevel = mockUserPermissions.reduce((acc, p) => {
      acc[p.level] = (acc[p.level] || 0) + 1;
      return acc;
    }, {} as Record<PermissionLevel, number>);

    // Garantir que todos os níveis estejam presentes
    Object.values(PermissionLevel).forEach(level => {
      if (!byLevel[level]) {
        byLevel[level] = 0;
      }
    });

    return {
      totalUsers: mockUserPermissions.length,
      byLevel,
      customPermissions: mockUserPermissions.filter(p => p.customPermissions?.length).length,
      restrictedPermissions: mockUserPermissions.filter(p => p.restrictedPermissions?.length).length
    };
  },

  /**
   * Criar permissões para novo usuário
   */
  createUserPermissions: async (
    data: Omit<UserPermissions, 'createdAt' | 'updatedAt'>
  ): Promise<UserPermissions> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newPermission: UserPermissions = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserPermissions.push(newPermission);
    return newPermission;
  },

  /**
   * Deletar permissões de um usuário
   */
  deleteUserPermissions: async (userId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    mockUserPermissions = mockUserPermissions.filter(p => p.userId !== userId);
  }
};
