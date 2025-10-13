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
import { AppLayout } from '../../components/layout/AppLayout';
import { useUsers } from '../../hooks/useUsers';
import { UserList } from '../../components/users/UserList';
import { UserForm } from '../../components/users/UserForm';
import { Toast } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { User, UserFormData } from '../../types/userTypes';
import { deviceType } from '../../utils/responsive';

export const UsersScreen = () => {
  const navigation = useNavigation();
  const { users, loading, error, createUser, updateUser, deleteUser, toggleUserStatus, searchUsers } = useUsers();
  const { toast, hideToast, success, error: showError } = useToast();
  
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
              console.log('🗑️ Tentando excluir usuário:', user.id);
              await deleteUser(user.id);
              console.log('✅ Usuário excluído com sucesso');
              success('Usuário excluído com sucesso!');
            } catch (error: any) {
              console.error('❌ Erro ao excluir usuário:', error);
              showError(error.message || 'Erro ao excluir usuário');
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
              console.log(`🔄 Tentando ${action} usuário:`, user.id);
              await toggleUserStatus(user.id, !user.isActive);
              console.log(`✅ Usuário ${action} com sucesso`);
              success(`Usuário ${action === 'ativar' ? 'ativado' : 'desativado'} com sucesso!`);
            } catch (error: any) {
              console.error(`❌ Erro ao ${action} usuário:`, error);
              showError(error.message || 'Erro ao alterar status do usuário');
            }
          },
        },
      ]
    );
  };

  const handleSubmitForm = async (userData: UserFormData) => {
    try {
      console.log('💾 Iniciando submissão do formulário de usuário');
      console.log('📝 Dados recebidos:', {
        ...userData,
        password: userData.password ? '***' : undefined
      });
      
      if (selectedUser) {
        console.log('➡️ Atualizando usuário existente:', selectedUser.id);
        const result = await updateUser(selectedUser.id, userData);
        console.log('✅ Usuário atualizado com sucesso:', result);
        success('Usuário atualizado com sucesso!');
      } else {
        console.log('➡️ Criando novo usuário');
        const result = await createUser(userData);
        console.log('✅ Usuário criado com sucesso:', result);
        success('Usuário criado com sucesso!');
      }
      
      console.log('🚪 Fechando modal após sucesso');
      setModalVisible(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error('❌ Erro ao salvar usuário:', error);
      console.error('Stack trace:', error.stack);
      console.error('Response:', error.response?.data);
      showError(error.message || 'Erro ao salvar usuário');
      // Não fecha o modal em caso de erro
      throw error;
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <AppLayout title="Gerenciar Usuários" showBackButton={true}>
      <View style={styles.container}>
        {/* Action Bar */}
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddUser}
          >
            <Text style={styles.addButtonText}>+ Novo Usuário</Text>
          </TouchableOpacity>
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

      {/* Toast Component */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
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
