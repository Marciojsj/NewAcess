/**
 * Tela de Gerenciamento de Visitantes
 * CRUD completo com dados reais do backend
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { ResponsiveContainer } from '../../components/layout/ResponsiveContainer';
import { responsive, deviceType } from '../../utils/responsive';
import { useVisitors } from '../../hooks/useVisitors';
import { VisitorList } from '../../components/visitors/VisitorList';
import { QRCodeDisplay } from '../../components/access/QRCodeDisplay';
// import { VisitorForm } from '../../components/visitors/VisitorForm';
import { Visitor } from '../../types/visitorTypes';
import { useAuth } from '../../contexts/AuthContext';

export default function VisitantesScreen({ navigation }: any) {
  const { user } = useAuth();
  const {
    visitors,
    loading,
    error,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    regenerateQRCode,
    searchVisitors,
  } = useVisitors();

  const [showForm, setShowForm] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrVisitor, setQRVisitor] = useState<Visitor | null>(null);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    searchVisitors(text);
  };

  const handleEdit = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este visitante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteVisitor(id),
        },
      ]
    );
  };

  const handleShowQRCode = (visitor: Visitor) => {
    setQRVisitor(visitor);
    setShowQRCode(true);
  };

  const handleRegenerateQR = async () => {
    if (!qrVisitor) return;
    
    try {
      await regenerateQRCode(qrVisitor.id);
      // Atualizar o visitante exibido
      const updated = visitors.find(v => v.id === qrVisitor.id);
      if (updated) {
        setQRVisitor(updated);
      }
      Alert.alert('Sucesso', 'QR Code regenerado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao regenerar QR Code');
    }
  };

  const handleSubmitForm = async (data: any) => {
    if (selectedVisitor) {
      await updateVisitor(selectedVisitor.id, data);
    } else {
      await createVisitor(data);
    }
    setShowForm(false);
    setSelectedVisitor(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedVisitor(null);
  };

  const handleNewVisitor = () => {
    setSelectedVisitor(null);
    setShowForm(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2D3436"
        {...(Platform.OS === 'web' && { hidden: true })}
      />
      <ResponsiveContainer>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, deviceType.isDesktop && styles.titleDesktop]}>
              Visitantes
            </Text>
            <TouchableOpacity
              style={[styles.newButton, deviceType.isDesktop && styles.newButtonDesktop]}
              onPress={handleNewVisitor}
            >
              <Text style={styles.newButtonText}>+ Novo Visitante</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, deviceType.isDesktop && styles.searchInputDesktop]}
              placeholder="Buscar visitante..."
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <VisitorList
            visitors={visitors}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShowQRCode={handleShowQRCode}
          />

          <TouchableOpacity
            style={[styles.backButton, deviceType.isDesktop && styles.backButtonDesktop]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.backButtonText, deviceType.isDesktop && styles.backButtonTextDesktop]}>
              Voltar para Home
            </Text>
          </TouchableOpacity>
        </View>
      </ResponsiveContainer>

      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <VisitorForm
              visitor={selectedVisitor}
              entityId={user?.entityId || ''}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
            /> */}
          </View>
        </View>
      </Modal>

      {/* QR Code Display */}
      <QRCodeDisplay
        visible={showQRCode}
        visitor={qrVisitor}
        onClose={() => {
          setShowQRCode(false);
          setQRVisitor(null);
        }}
        onRegenerate={handleRegenerateQR}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3436',
    ...(Platform.OS === 'web' && { minHeight: typeof window !== 'undefined' ? window.innerHeight : 0 }),
  },
  content: {
    flex: 1,
    padding: responsive.padding.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: 'bold',
    color: '#FFF',
  },
  titleDesktop: {
    fontSize: 32,
  },
  newButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  newButtonDesktop: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  newButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  searchInputDesktop: {
    fontSize: 18,
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#DC3545',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonDesktop: {
    padding: 18,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonTextDesktop: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
  },
});
