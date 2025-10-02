import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import { Entity, EntityFormData } from '../types/entityTypes';
import { useTheme } from '../contexts/ThemeContext';
import styles from './EntityForm.styles';

interface EntityFormProps {
  entity?: Entity | null;
  onSubmit: (data: EntityFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  entity,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<EntityFormData>({
    cpf: '',
    rg: '',
    type: '',
    active: true,
  });

  useEffect(() => {
    if (entity) {
      setFormData({
        cpf: entity.cpf,
        rg: entity.rg,
        type: entity.type,
        active: entity.active,
      });
    }
  }, [entity]);

  const handleSubmit = async () => {
    if (!formData.cpf || !formData.rg || !formData.type) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a entidade');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {entity ? 'Editar Entidade' : 'Nova Entidade'}
      </Text>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>CPF *</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: theme.backgroundCard,
              color: theme.text,
              borderColor: theme.border 
            }
          ]}
          value={formData.cpf}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cpf: text }))}
          placeholder="Digite o CPF"
          placeholderTextColor={theme.textSecondary}
          maxLength={14}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>RG *</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: theme.backgroundCard,
              color: theme.text,
              borderColor: theme.border 
            }
          ]}
          value={formData.rg}
          onChangeText={(text) => setFormData(prev => ({ ...prev, rg: text }))}
          placeholder="Digite o RG"
          placeholderTextColor={theme.textSecondary}
          maxLength={9}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Tipo *</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: theme.backgroundCard,
              color: theme.text,
              borderColor: theme.border 
            }
          ]}
          value={formData.type}
          onChangeText={(text) => setFormData(prev => ({ ...prev, type: text }))}
          placeholder="Digite o tipo"
          placeholderTextColor={theme.textSecondary}
          maxLength={255}
        />
      </View>

      <View style={[styles.formGroup, styles.switchContainer]}>
        <Text style={[styles.label, { color: theme.text }]}>Ativo</Text>
        <Switch
          value={formData.active}
          onValueChange={(value) => setFormData(prev => ({ ...prev, active: value }))}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={formData.active ? theme.primary : theme.textSecondary}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton, { backgroundColor: theme.border }]}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton, { backgroundColor: theme.primary }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.textInverse }]}>
            {loading ? 'Salvando...' : entity ? 'Atualizar' : 'Criar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};