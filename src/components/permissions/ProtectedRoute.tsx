/**
 * ProtectedRoute Component
 * Componente para proteger rotas com base em permissões
 */

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from '../../contexts/PermissionContext';
import { PermissionModule, PermissionAction } from '../../types/permissionTypes';
import { useTheme } from '../../contexts/ThemeContext';

// ==================== TIPOS ====================

interface ProtectedRouteProps {
  children: ReactNode;
  module: PermissionModule;
  action: PermissionAction;
  fallback?: ReactNode;
  showError?: boolean;
}

// ==================== COMPONENTE ====================

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  module,
  action,
  fallback,
  showError = true
}) => {
  const { hasPermission, checkPermission, getLevelName, getLevelIcon } = usePermissions();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const hasAccess = hasPermission(module, action);
  const check = checkPermission(module, action);

  // Se tem acesso, renderiza o conteúdo
  if (hasAccess) {
    return <>{children}</>;
  }

  // Se tem fallback customizado, renderiza ele
  if (fallback) {
    return <>{fallback}</>;
  }

  // Se não deve mostrar erro, não renderiza nada
  if (!showError) {
    return null;
  }

  // Renderiza tela de acesso negado
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Ícone */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔒</Text>
        </View>

        {/* Título */}
        <Text style={[styles.title, { color: theme.text }]}>
          Acesso Negado
        </Text>

        {/* Mensagem */}
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          Você não tem permissão para acessar esta área.
        </Text>

        {/* Detalhes da permissão */}
        <View style={styles.detailsContainer}>
          <View style={[styles.detailCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Seu Nível
            </Text>
            <View style={styles.levelInfo}>
              <Text style={styles.levelIcon}>{getLevelIcon()}</Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {getLevelName()}
              </Text>
            </View>
          </View>

          <View style={[styles.detailCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Módulo Requerido
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatModuleName(module)}
            </Text>
          </View>

          <View style={[styles.detailCard, { backgroundColor: theme.backgroundCard }]}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Ação Requerida
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatActionName(action)}
            </Text>
          </View>
        </View>

        {/* Mensagem de ajuda */}
        <View style={[styles.helpCard, { backgroundColor: theme.warning + '20', borderColor: theme.warning }]}>
          <Text style={styles.helpIcon}>ℹ️</Text>
          <Text style={[styles.helpText, { color: theme.text }]}>
            Entre em contato com um administrador para solicitar acesso a esta funcionalidade.
          </Text>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ==================== HELPERS ====================

const formatModuleName = (module: PermissionModule): string => {
  const names: Record<PermissionModule, string> = {
    [PermissionModule.DASHBOARD]: 'Dashboard',
    [PermissionModule.ENTRIES]: 'Entradas',
    [PermissionModule.EXITS]: 'Saídas',
    [PermissionModule.VISITORS]: 'Visitantes',
    [PermissionModule.REPORTS]: 'Relatórios',
    [PermissionModule.ALERTS]: 'Alertas',
    [PermissionModule.SETTINGS]: 'Configurações',
    [PermissionModule.PERMISSIONS]: 'Permissões',
    [PermissionModule.USERS]: 'Usuários',
    [PermissionModule.ENTITIES]: 'Entidades',
    [PermissionModule.ACCESS_HISTORY]: 'Histórico de Acesso',
    [PermissionModule.EXPORT]: 'Exportação'
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center'
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  icon: {
    fontSize: 48
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32
  },
  detailsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24
  },
  detailCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600'
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  levelIcon: {
    fontSize: 20
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12
  },
  helpIcon: {
    fontSize: 24
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
