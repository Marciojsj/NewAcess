/**
 * User Form Component
 * Formulário para criar e editar usuários
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
import { User, UserFormData, USER_ROLES, UserRole } from '../../types/userTypes';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'OPERATOR',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        entityId: user.entityId,
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    // Validações
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Erro', 'O email é obrigatório');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    // Se for novo usuário, senha é obrigatória
    if (!user && !formData.password) {
      Alert.alert('Erro', 'A senha é obrigatória para novos usuários');
      return;
    }

    // Se senha informada, validar tamanho mínimo
    if (formData.password && formData.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      Alert.alert('Sucesso', user ? 'Usuário atualizado!' : 'Usuário cadastrado!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          {user ? 'Editar Usuário' : 'Novo Usuário'}
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
          <Text style={styles.label}>Email *</Text>
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
          <Text style={styles.label}>
            {user ? 'Nova Senha (deixe em branco para manter)' : 'Senha *'}
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              placeholder={user ? 'Digite para alterar a senha' : 'Mínimo 6 caracteres'}
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.passwordToggleText}>
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Perfil *</Text>
          <View style={styles.roleButtons}>
            {USER_ROLES.map((role) => (
              <TouchableOpacity
                key={role.value}
                style={[
                  styles.roleButton,
                  formData.role === role.value && styles.roleButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, role: role.value as UserRole })}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === role.value && styles.roleButtonTextActive,
                  ]}
                >
                  {role.label}
                </Text>
                <Text style={styles.roleButtonDesc}>{role.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.roleInfo}>
          <Text style={styles.roleInfoTitle}>ℹ️ Sobre os perfis:</Text>
          {USER_ROLES.map((role) => (
            <Text key={role.value} style={styles.roleInfoText}>
              • <Text style={styles.roleInfoLabel}>{role.label}:</Text> {role.description}
            </Text>
          ))}
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
                {user ? 'Atualizar' : 'Cadastrar'}
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 12,
  },
  passwordToggleText: {
    fontSize: 20,
  },
  roleButtons: {
    gap: 8,
  },
  roleButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  roleButtonActive: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  roleButtonTextActive: {
    color: '#2196F3',
  },
  roleButtonDesc: {
    fontSize: 12,
    color: '#999',
  },
  roleInfo: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  roleInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  roleInfoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  roleInfoLabel: {
    fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: '#2196F3',
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
