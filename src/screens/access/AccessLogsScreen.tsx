/**
 * Access Logs Screen
 * Tela para visualizar histórico de acessos
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccess } from '../../hooks/useAccess';
import { AccessHistory } from '../../components/access/AccessHistory';
import { AccessFilters } from '../../types/accessTypes';
import { deviceType } from '../../utils/responsive';

export const AccessLogsScreen = () => {
  const navigation = useNavigation();
  const { logs, loading, filterLogs } = useAccess();
  
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ENTRY' | 'EXIT'>('ALL');

  const handleFilterChange = (filter: 'ALL' | 'ENTRY' | 'EXIT') => {
    setActiveFilter(filter);
  };

  const getFilteredLogs = () => {
    if (activeFilter === 'ALL') {
      return logs;
    }
    
    const filters: AccessFilters = {
      type: activeFilter as 'ENTRY' | 'EXIT',
    };
    
    return filterLogs(filters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Acessos</Text>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'ALL' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilterChange('ALL')}
        >
          <Text
            style={[
              styles.filterButtonText,
              activeFilter === 'ALL' && styles.filterButtonTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            styles.filterButtonEntry,
            activeFilter === 'ENTRY' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilterChange('ENTRY')}
        >
          <Text
            style={[
              styles.filterButtonText,
              activeFilter === 'ENTRY' && styles.filterButtonTextActive,
            ]}
          >
            🟢 Entradas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            styles.filterButtonExit,
            activeFilter === 'EXIT' && styles.filterButtonActive,
          ]}
          onPress={() => handleFilterChange('EXIT')}
        >
          <Text
            style={[
              styles.filterButtonText,
              activeFilter === 'EXIT' && styles.filterButtonTextActive,
            ]}
          >
            🔴 Saídas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <AccessHistory logs={getFilteredLogs()} loading={loading} />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  filtersContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  filterButtonEntry: {
    borderColor: '#4CAF50',
  },
  filterButtonExit: {
    borderColor: '#F44336',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});
