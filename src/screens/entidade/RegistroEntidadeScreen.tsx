import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entity, EntityFormData } from '../../types/entityTypes';
import { useEntities } from '../../hooks/useEntities';
import { EntityForm } from '../../components/EntityForm';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles/RegistroEntidadeScreen.styles';

interface RouteParams {
  entity?: Entity;
}

export const RegistroEntidadeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { createEntity, updateEntity, loading } = useEntities();
  
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);

  useEffect(() => {
    const params = route.params as RouteParams;
    if (params?.entity) {
      setEditingEntity(params.entity);
    }
  }, [route.params]);

  const handleSubmit = async (formData: EntityFormData) => {
    try {
      if (editingEntity) {
        await updateEntity(editingEntity.id, formData);
        Alert.alert('Sucesso', 'Entidade atualizada com sucesso');
      } else {
        await createEntity(formData);
        Alert.alert('Sucesso', 'Entidade criada com sucesso');
      }
      
      navigation.goBack();
    } catch (error) {
      // Error is handled by the hook and shown in Alert
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <EntityForm
        entity={editingEntity}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </ScrollView>
  );
};