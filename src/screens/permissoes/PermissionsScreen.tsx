/**
 * Tela de Gerenciamento de Permissões
 * Gerencia permissões de usuários e visualiza matriz de permissões
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { usePermissions } from '../../contexts/PermissionContext';
import { ProtectedRoute } from '../../components/permissions/ProtectedRoute';
import {
  PermissionLevel,
  PermissionModule,
  PermissionAction,
  UserPermissions,
  PermissionStats,
  PERMISSION_COLORS,
  PERMISSION_ICONS
} from '../../types/permissionTypes';
import { permissionService } from '../../services/permissionService';

// ==================== COMPONENTE PRINCIPAL ====================

const PermissionsScreen: React.FC = () => {
  return (
    <ProtectedRoute
      module={PermissionModule.PERMISSIONS}
      action={PermissionAction.VIEW}
    >
      <PermissionsContent />
    </ProtectedRoute>
  );
};

// ==================== CONTEÚDO ====================

const PermissionsContent: React.FC = () => {
  const { theme } = useTheme();
  const { canManagePermissions } = usePermissions();

  const [users, setUsers] = useState<UserPermissions[]>([]);
  const [stats, setStats] = useState<PermissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<PermissionLevel | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [editingUser, setEditingUser] = useState<UserPermissions | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedLevel]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [usersData, statsData] = await Promise.all([
        permissionService.listUserPermissions({ level: selectedLevel || undefined }),
        permissionService.getPermissionStats()
      ]);

      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar as permissões');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLevel = async (userId: string, newLevel: PermissionLevel) => {
    try {
      await permissionService.updateUserPermissions(userId, { level: newLevel }, 'current-user');
      Alert.alert('Sucesso', 'Nível de permissão atualizado!');
      loadData();
      setEditingUser(null);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o nível');
    }
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🔐 Gerenciar Permissões</Text>
          <Text style={styles.headerSubtitle}>
            Controle de acesso e níveis de usuários
          </Text>
        </View>
      </View>

      {/* Stats */}
      {stats && (
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats.totalUsers}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Total Usuários
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats.byLevel[PermissionLevel.SUPER_ADMIN]}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Super Admins
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={styles.statIcon}>🔑</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats.byLevel[PermissionLevel.ADMIN]}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Admins
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats.byLevel[PermissionLevel.MANAGER]}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Gerentes
            </Text>
          </View>
        </View>
      )}

      {/* Botão Ver Matriz */}
      <TouchableOpacity
        style={[styles.matrixButton, { backgroundColor: theme.info }]}
        onPress={() => setShowMatrix(true)}
      >
        <Text style={styles.matrixButtonText}>📋 Ver Matriz de Permissões</Text>
      </TouchableOpacity>

      {/* Busca e Filtros */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: theme.backgroundCard,
            color: theme.text
          }]}
          placeholder="Buscar usuário..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelFilters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              !selectedLevel && { backgroundColor: theme.primary }
            ]}
            onPress={() => setSelectedLevel(null)}
          >
            <Text style={[styles.filterText, !selectedLevel && styles.filterTextActive]}>
              Todos
            </Text>
          </TouchableOpacity>

          {Object.values(PermissionLevel).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterButton,
                selectedLevel === level && { backgroundColor: PERMISSION_COLORS[level] }
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[styles.filterText, selectedLevel === level && styles.filterTextActive]}>
                {PERMISSION_ICONS[level]} {permissionService.getLevelConfig(level).displayName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Usuários */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      ) : filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👤</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Nenhum usuário encontrado
          </Text>
        </View>
      ) : (
        <View style={styles.usersContainer}>
          {filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.userId}
              style={[styles.userCard, { backgroundColor: theme.backgroundCard }]}
              onPress={() => canManagePermissions() && setEditingUser(user)}
              disabled={!canManagePermissions()}
            >
              <View style={styles.userInfo}>
                <View style={[
                  styles.userAvatar,
                  { backgroundColor: PERMISSION_COLORS[user.level] }
                ]}>
                  <Text style={styles.userAvatarText}>
                    {user.userName.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.userDetails}>
                  <Text style={[styles.userName, { color: theme.text }]}>
                    {user.userName}
                  </Text>
                  <View style={styles.userMeta}>
                    <Text style={[styles.userMetaText, { color: theme.textSecondary }]}>
                      ID: {user.userId}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[
                styles.levelBadge,
                { backgroundColor: PERMISSION_COLORS[user.level] }
              ]}>
                <Text style={styles.levelBadgeIcon}>{PERMISSION_ICONS[user.level]}</Text>
                <Text style={styles.levelBadgeText}>
                  {permissionService.getLevelConfig(user.level).displayName}
                </Text>
              </View>

              {canManagePermissions() && (
                <Text style={[styles.editIcon, { color: theme.primary }]}>✏️</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Modal de Edição */}
      {editingUser && (
        <Modal
          visible={!!editingUser}
          transparent
          animationType="fade"
          onRequestClose={() => setEditingUser(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.backgroundCard }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Alterar Nível de Permissão
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                {editingUser.userName}
              </Text>

              <View style={styles.levelsGrid}>
                {Object.values(PermissionLevel).map((level) => {
                  const config = permissionService.getLevelConfig(level);
                  return (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.levelOption,
                        { backgroundColor: PERMISSION_COLORS[level] + '20', borderColor: PERMISSION_COLORS[level] }
                      ]}
                      onPress={() => handleUpdateLevel(editingUser.userId, level)}
                    >
                      <Text style={styles.levelOptionIcon}>{PERMISSION_ICONS[level]}</Text>
                      <Text style={[styles.levelOptionName, { color: theme.text }]}>
                        {config.displayName}
                      </Text>
                      <Text style={[styles.levelOptionDesc, { color: theme.textSecondary }]}>
                        {config.description}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[styles.modalCloseButton, { backgroundColor: theme.error }]}
                onPress={() => setEditingUser(null)}
              >
                <Text style={styles.modalCloseButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal Matriz de Permissões */}
      {showMatrix && (
        <Modal
          visible={showMatrix}
          animationType="slide"
          onRequestClose={() => setShowMatrix(false)}
        >
          <View style={[styles.matrixContainer, { backgroundColor: theme.background }]}>
            <View style={[styles.matrixHeader, { backgroundColor: theme.primary }]}>
              <Text style={styles.matrixHeaderTitle}>📋 Matriz de Permissões</Text>
              <TouchableOpacity onPress={() => setShowMatrix(false)}>
                <Text style={styles.matrixHeaderClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.matrixContent}>
              <Text style={[styles.matrixInfo, { color: theme.textSecondary }]}>
                Esta matriz mostra quais níveis têm acesso a cada módulo e ação do sistema.
              </Text>

              {Object.values(PermissionModule).map((module) => (
                <View key={module} style={[styles.matrixModule, { backgroundColor: theme.backgroundCard }]}>
                  <Text style={[styles.matrixModuleTitle, { color: theme.text }]}>
                    {formatModuleName(module)}
                  </Text>

                  {Object.values(PermissionAction).map((action) => {
                    const matrix = permissionService.getPermissionMatrix();
                    const allowedLevels = matrix[module]?.[action] || [];

                    if (allowedLevels.length === 0) return null;

                    return (
                      <View key={action} style={styles.matrixAction}>
                        <Text style={[styles.matrixActionName, { color: theme.textSecondary }]}>
                          {formatActionName(action)}:
                        </Text>
                        <View style={styles.matrixLevels}>
                          {allowedLevels.map((level) => (
                            <View
                              key={level}
                              style={[styles.matrixLevelBadge, { backgroundColor: PERMISSION_COLORS[level] }]}
                            >
                              <Text style={styles.matrixLevelText}>
                                {PERMISSION_ICONS[level]}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

// ==================== HELPERS ====================

const formatModuleName = (module: PermissionModule): string => {
  const names: Record<PermissionModule, string> = {
    [PermissionModule.DASHBOARD]: '📊 Dashboard',
    [PermissionModule.ENTRIES]: '🚪 Entradas',
    [PermissionModule.EXITS]: '🚶 Saídas',
    [PermissionModule.VISITORS]: '👥 Visitantes',
    [PermissionModule.REPORTS]: '📈 Relatórios',
    [PermissionModule.ALERTS]: '🔔 Alertas',
    [PermissionModule.SETTINGS]: '⚙️ Configurações',
    [PermissionModule.PERMISSIONS]: '🔐 Permissões',
    [PermissionModule.USERS]: '👤 Usuários',
    [PermissionModule.ENTITIES]: '🏢 Entidades',
    [PermissionModule.ACCESS_HISTORY]: '📜 Histórico',
    [PermissionModule.EXPORT]: '📤 Exportação'
  };
  return names[module] || module;
};

const formatActionName = (action: PermissionAction): string => {
  const names: Record<PermissionAction, string> = {
    [PermissionAction.VIEW]: 'Visualizar',
    [PermissionAction.CREATE]: 'Criar',
    [PermissionAction.EDIT]: 'Editar',
    [PermissionAction.DELETE]: 'Deletar',
    [PermissionAction.EXPORT]: 'Exportar',
    [PermissionAction.APPROVE]: 'Aprovar',
    [PermissionAction.MANAGE]: 'Gerenciar'
  };
  return names[action] || action;
};

// ==================== ESTILOS ====================

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 20,
    paddingTop: 40
  },
  headerContent: {
    gap: 8
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8
  },
  statIcon: {
    fontSize: 32
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 12
  },
  matrixButton: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  matrixButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  filtersContainer: {
    padding: 16,
    gap: 12
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16
  },
  levelFilters: {
    flexDirection: 'row'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#E0E0E0'
  },
  filterText: {
    fontSize: 14,
    color: '#666'
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  loader: {
    marginTop: 50
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  emptyText: {
    fontSize: 16
  },
  usersContainer: {
    padding: 16,
    gap: 12
  },
  userCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userAvatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  userDetails: {
    flex: 1,
    gap: 4
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  userMeta: {
    flexDirection: 'row',
    gap: 8
  },
  userMetaText: {
    fontSize: 12
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  levelBadgeIcon: {
    fontSize: 16
  },
  levelBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  editIcon: {
    fontSize: 20
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 20,
    gap: 16
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  levelsGrid: {
    gap: 12
  },
  levelOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8
  },
  levelOptionIcon: {
    fontSize: 32
  },
  levelOptionName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  levelOptionDesc: {
    fontSize: 12
  },
  modalCloseButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  modalCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  matrixContainer: {
    flex: 1
  },
  matrixHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40
  },
  matrixHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  matrixHeaderClose: {
    fontSize: 28,
    color: '#FFF'
  },
  matrixContent: {
    padding: 16
  },
  matrixInfo: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20
  },
  matrixModule: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12
  },
  matrixModuleTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  matrixAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8
  },
  matrixActionName: {
    fontSize: 14,
    width: 100
  },
  matrixLevels: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  matrixLevelBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  matrixLevelText: {
    fontSize: 16
  }
});

export default PermissionsScreen;
