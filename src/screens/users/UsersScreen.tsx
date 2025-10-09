/**
 * Users Screen
 * Tela de gerenciamento de usuários (CRUD)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../hooks/useUsers';
import { UserList } from '../../components/users/UserList';
import { UserForm } from '../../components/users/UserForm';
import { User, UserFormData } from '../../types/userTypes';
import { deviceType } from '../../utils/responsive';

export const UsersScreen = () => {
  const navigation = useNavigation();
  const { users, loading, error, createUser, updateUser, deleteUser, toggleUserStatus, searchUsers } = useUsers();
  
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const getFilteredUsers = () => {
    if (search.trim()) {
      return searchUsers(search);
    }
    return users;
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = (user: User) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o usuário ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(user.id);
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao excluir usuário');
            }
          },
        },
      ]
    );
  };

  const handleToggleStatus = (user: User) => {
    const action = user.isActive ? 'desativar' : 'ativar';
    Alert.alert(
      'Confirmar Alteração',
      `Deseja ${action} o usuário ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await toggleUserStatus(user.id, !user.isActive);
              Alert.alert('Sucesso', `Usuário ${action === 'ativar' ? 'ativado' : 'desativado'} com sucesso!`);
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao alterar status do usuário');
            }
          },
        },
      ]
    );
  };

  const handleSubmitForm = async (userData: UserFormData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
      } else {
        await createUser(userData);
      }
      setModalVisible(false);
      setSelectedUser(null);
    } catch (error: any) {
      throw error;
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Gerenciar Usuários</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddUser}
          >
            <Text style={styles.addButtonText}>+ Novo Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, email ou perfil..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      )}

      {/* User List */}
      <UserList
        users={getFilteredUsers()}
        loading={loading}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal Form */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmitForm}
            onCancel={handleCloseModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: deviceType.isMobile ? 40 : 16,
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
