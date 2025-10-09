/**
 * Visitor Selector Component
 * Seletor de visitante para registro de entrada/saída
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Visitor } from '../../types/visitorTypes';
import { visitorApi } from '../../services/visitorApi';

interface VisitorSelectorProps {
  onSelect: (visitor: Visitor) => void;
  selectedVisitorId?: string;
}

export const VisitorSelector: React.FC<VisitorSelectorProps> = ({
  onSelect,
  selectedVisitorId,
}) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVisitors();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const filtered = visitors.filter(v =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.cpf?.includes(search) ||
        v.company?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVisitors(filtered);
    } else {
      setFilteredVisitors(visitors);
    }
  }, [search, visitors]);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      const data = await visitorApi.getAllVisitors();
      setVisitors(data);
      setFilteredVisitors(data);
    } catch (error) {
      console.error('Erro ao carregar visitantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderVisitor = ({ item }: { item: Visitor }) => {
    const isSelected = item.id === selectedVisitorId;
    
    return (
      <TouchableOpacity
        style={[styles.visitorCard, isSelected && styles.visitorCardSelected]}
        onPress={() => onSelect(item)}
      >
        <View style={styles.visitorInfo}>
          <Text style={[styles.visitorName, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
          {item.cpf && (
            <Text style={styles.visitorDetail}>CPF: {item.cpf}</Text>
          )}
          {item.company && (
            <Text style={styles.visitorDetail}>Empresa: {item.company}</Text>
          )}
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar visitante por nome, CPF ou empresa..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#999"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : (
        <FlatList
          data={filteredVisitors}
          renderItem={renderVisitor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum visitante encontrado</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  visitorCardSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedText: {
    color: '#2196F3',
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 24,
  },
});
