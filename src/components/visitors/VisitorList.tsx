/**
 * Componente de lista de visitantes
 */

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Visitor } from '../../types/visitorTypes';

interface VisitorListProps {
  visitors: Visitor[];
  loading: boolean;
  onEdit: (visitor: Visitor) => void;
  onDelete: (id: string) => void;
  onShowQRCode: (visitor: Visitor) => void;
  onViewDetails?: (visitor: Visitor) => void;
}

export const VisitorList: React.FC<VisitorListProps> = ({
  visitors,
  loading,
  onEdit,
  onDelete,
  onShowQRCode,
  onViewDetails,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Carregando visitantes...</Text>
      </View>
    );
  }

  if (visitors.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum visitante cadastrado</Text>
      </View>
    );
  }

  const renderVisitor = ({ item }: { item: Visitor }) => (
    <View style={styles.visitorCard}>
      <View style={styles.visitorInfo}>
        <Text style={styles.visitorName}>{item.name}</Text>
        {item.company && <Text style={styles.visitorCompany}>{item.company}</Text>}
        {item.cpf && <Text style={styles.visitorDetail}>CPF: {item.cpf}</Text>}
        {item.phone && <Text style={styles.visitorDetail}>Tel: {item.phone}</Text>}
        {item.email && <Text style={styles.visitorDetail}>Email: {item.email}</Text>}
      </View>
      
      <View style={styles.actionsContainer}>
        {onViewDetails && (
          <TouchableOpacity
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => onViewDetails(item)}
          >
            <Text style={styles.actionButtonText}>👁️ Detalhes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.qrButton]}
          onPress={() => onShowQRCode(item)}
        >
          <Text style={styles.actionButtonText}>📱 QR Code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={visitors}
      renderItem={renderVisitor}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  visitorCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitorInfo: {
    marginBottom: 12,
  },
  visitorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  visitorCompany: {
    fontSize: 14,
    color: '#0066CC',
    marginBottom: 8,
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#9C27B0',
  },
  editButton: {
    backgroundColor: '#0066CC',
  },
  qrButton: {
    backgroundColor: '#28A745',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
