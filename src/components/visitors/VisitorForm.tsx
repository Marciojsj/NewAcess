/**
 * Visitor Form Component
 * Formulário para criar e editar visitantes
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Visitor, VisitorFormData } from '../../types/visitorTypes';

interface VisitorFormProps {
  visitor?: Visitor | null;
  entityId: string;
  onSubmit: (data: VisitorFormData) => Promise<void>;
  onCancel: () => void;
}

export const VisitorForm: React.FC<VisitorFormProps> = ({
  visitor,
  entityId,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<VisitorFormData>({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visitor) {
      setFormData({
        name: visitor.name,
        cpf: visitor.cpf || '',
        phone: visitor.phone || '',
        email: visitor.email || '',
        company: visitor.company || '',
      });
    }
  }, [visitor]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!formData.cpf.trim()) {
      Alert.alert('Erro', 'O CPF é obrigatório');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      Alert.alert('Sucesso', visitor ? 'Visitante atualizado!' : 'Visitante cadastrado!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao salvar visitante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          {visitor ? 'Editar Visitante' : 'Novo Visitante'}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Nome completo"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF *</Text>
          <TextInput
            style={styles.input}
            value={formData.cpf}
            onChangeText={(text) => setFormData({ ...formData, cpf: text })}
            placeholder="000.000.000-00"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="(00) 00000-0000"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="email@exemplo.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Empresa</Text>
          <TextInput
            style={styles.input}
            value={formData.company}
            onChangeText={(text) => setFormData({ ...formData, company: text })}
            placeholder="Nome da empresa"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {visitor ? 'Atualizar' : 'Cadastrar'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
});
