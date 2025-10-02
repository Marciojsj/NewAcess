import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entity } from '../../types/entityTypes';
import { useEntities } from '../../hooks/useEntities';
import { EntityList } from '../../components/entity/EntityList';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles/entidadeScreen.styles';

export const EntidadeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { entities, loading, error, loadEntities, deleteEntity } = useEntities();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEntities();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', error);
    }
  }, [error]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEntities();
    setRefreshing(false);
  };

  const handleCreate = () => {
    navigation.navigate('RegistroEntidade' as never);
  };

  const handleEdit = (entity: Entity) => {
    // navigation.navigate('RegistroEntidade' as never, { entity } as never);
    console.log('Edit entity:', entity);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntity(id);
      Alert.alert('Sucesso', 'Entidade excluída com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a entidade');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <EntityList
        entities={entities}
        loading={loading || refreshing}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
    </View>
  );
};