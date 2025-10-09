/**
 * Registrar Saída Screen
 * Tela para registrar saída de visitantes
 */

import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Visitor } from '../../types/visitorTypes';
import { useAccess } from '../../hooks/useAccess';
import { VisitorSelector } from '../../components/access/VisitorSelector';
import { deviceType } from '../../utils/responsive';

export const RegistrarSaidaScreen = () => {
  const navigation = useNavigation();
  const { registerExit, loading, checkVisitorInside, getActiveEntryLogId } = useAccess();
  
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [notes, setNotes] = useState('');
  const [showSelector, setShowSelector] = useState(true);

  const handleSelectVisitor = async (visitor: Visitor) => {
    // Verificar se o visitante está dentro (tem entrada sem saída)
    const isInside = await checkVisitorInside(visitor.id);
    
    if (!isInside) {
      Alert.alert(
        'Atenção',
        `${visitor.name} não possui registro de entrada ativo. Deseja continuar mesmo assim?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Continuar',
            onPress: () => {
              setSelectedVisitor(visitor);
              setShowSelector(false);
            },
          },
        ]
      );
    } else {
      setSelectedVisitor(visitor);
      setShowSelector(false);
    }
  };

  const handleRegisterExit = async () => {
    if (!selectedVisitor) {
      Alert.alert('Erro', 'Selecione um visitante');
      return;
    }

    try {
      // Buscar o ID do log de entrada ativo
      const accessLogId = await getActiveEntryLogId(selectedVisitor.id);
      
      if (!accessLogId) {
        Alert.alert('Erro', 'Não foi encontrado registro de entrada ativo para este visitante');
        return;
      }

      await registerExit(
        {
          visitorId: selectedVisitor.id,
          notes: notes.trim() || undefined,
        },
        accessLogId
      );

      Alert.alert(
        'Sucesso',
        `Saída de ${selectedVisitor.name} registrada com sucesso!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar saída');
    }
  };

  const handleChangeVisitor = () => {
    setSelectedVisitor(null);
    setShowSelector(true);
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
        <Text style={styles.title}>Registrar Saída</Text>
      </View>

      <ScrollView style={styles.content}>
        {showSelector ? (
          <View style={styles.selectorContainer}>
            <Text style={styles.sectionTitle}>Selecione o Visitante:</Text>
            <VisitorSelector
              onSelect={handleSelectVisitor}
              selectedVisitorId={selectedVisitor?.id}
            />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.selectedVisitorCard}>
              <Text style={styles.sectionTitle}>Visitante Selecionado:</Text>
              <View style={styles.visitorInfo}>
                <Text style={styles.visitorName}>{selectedVisitor?.name}</Text>
                {selectedVisitor?.cpf && (
                  <Text style={styles.visitorDetail}>CPF: {selectedVisitor.cpf}</Text>
                )}
                {selectedVisitor?.company && (
                  <Text style={styles.visitorDetail}>
                    Empresa: {selectedVisitor.company}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={handleChangeVisitor}
              >
                <Text style={styles.changeButtonText}>Alterar Visitante</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.notesContainer}>
              <Text style={styles.label}>Observações (opcional):</Text>
              <TextInput
                style={styles.textArea}
                value={notes}
                onChangeText={setNotes}
                placeholder="Digite observações sobre esta saída..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.buttonDisabled]}
              onPress={handleRegisterExit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>
                  ✓ Registrar Saída
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#F44336',
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
  content: {
    flex: 1,
  },
  selectorContainer: {
    padding: 16,
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  selectedVisitorCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitorInfo: {
    marginTop: 8,
    marginBottom: 12,
  },
  visitorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  changeButton: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2196F3',
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notesContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 100,
  },
  registerButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
});
