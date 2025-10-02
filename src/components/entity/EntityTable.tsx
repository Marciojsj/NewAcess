import React from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Entity } from '../../types/entityTypes';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './EntityTable.styles';

interface EntityTableProps {
  entities: Entity[];
  loading: boolean;
  onEdit: (entity: Entity) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export const EntityTable: React.FC<EntityTableProps> = ({
  entities,
  loading,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const { theme } = useTheme();

  const handleDelete = (entity: Entity) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja excluir a entidade ${entity.cpf}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => onDelete(entity.id)
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          Carregando entidades...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Entidades ({entities.length})
        </Text>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: theme.primary }]}
          onPress={onCreate}
        >
          <Text style={styles.createButtonText}>Nova Entidade</Text>
        </TouchableOpacity>
      </View>

      {entities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Nenhuma entidade cadastrada
          </Text>
          <TouchableOpacity
            style={[styles.emptyButton, { backgroundColor: theme.primary }]}
            onPress={onCreate}
          >
            <Text style={styles.emptyButtonText}>Criar Primeira Entidade</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.tableContainer}>
          <View style={[styles.tableHeader, { backgroundColor: theme.backgroundCard }]}>
            <Text style={[styles.headerCell, { color: theme.text }]}>CPF</Text>
            <Text style={[styles.headerCell, { color: theme.text }]}>RG</Text>
            <Text style={[styles.headerCell, { color: theme.text }]}>Tipo</Text>
            <Text style={[styles.headerCell, { color: theme.text }]}>Status</Text>
            <Text style={[styles.headerCell, { color: theme.text }]}>Ações</Text>
          </View>

          {entities.map((entity) => (
            <View 
              key={entity.id} 
              style={[styles.tableRow, { 
                backgroundColor: theme.backgroundCard,
                borderBottomColor: theme.borderLight 
              }]}
            >
              <Text style={[styles.cell, { color: theme.text }]}>{entity.cpf}</Text>
              <Text style={[styles.cell, { color: theme.text }]}>{entity.rg}</Text>
              <Text style={[styles.cell, { color: theme.text }]}>{entity.type}</Text>
              <View style={styles.statusCell}>
                <View 
                  style={[
                    styles.statusBadge,
                    { 
                      backgroundColor: entity.active ? theme.success : theme.error 
                    }
                  ]}
                />
                <Text style={[styles.statusText, { color: theme.text }]}>
                  {entity.active ? 'Ativo' : 'Inativo'}
                </Text>
              </View>
              <View style={styles.actionsCell}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.warning }]}
                  onPress={() => onEdit(entity)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.error }]}
                  onPress={() => handleDelete(entity)}
                >
                  <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};