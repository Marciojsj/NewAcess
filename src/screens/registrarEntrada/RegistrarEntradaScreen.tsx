/**
 * Registrar Entrada Screen
 * Tela para registrar entrada de visitantes
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
import { useAuth } from '../../contexts/AuthContext';
import { useVisitors } from '../../hooks/useVisitors';
import { VisitorSelector } from '../../components/access/VisitorSelector';
import { QRCodeScanner } from '../../components/access/QRCodeScanner';
import { deviceType } from '../../utils/responsive';

export const RegistrarEntradaScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { registerEntry, loading } = useAccess();
  const { visitors } = useVisitors();
  
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [notes, setNotes] = useState('');
  const [showSelector, setShowSelector] = useState(true);
  const [showScanner, setShowScanner] = useState(false);

  const handleSelectVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setShowSelector(false);
  };

  const handleRegisterEntry = async () => {
    if (!selectedVisitor) {
      Alert.alert('Erro', 'Selecione um visitante');
      return;
    }

    if (!user?.entityId) {
      Alert.alert('Erro', 'Entidade não identificada');
      return;
    }

    try {
      await registerEntry(
        {
          visitorId: selectedVisitor.id,
          notes: notes.trim() || undefined,
        },
        user.entityId
      );

      Alert.alert(
        'Sucesso',
        `Entrada de ${selectedVisitor.name} registrada com sucesso!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar entrada');
    }
  };

  const handleChangeVisitor = () => {
    setSelectedVisitor(null);
    setShowSelector(true);
  };

  const handleQRCodeScan = (qrData: string) => {
    try {
      // Tentar parsear o QR Code como JSON
      const parsedData = JSON.parse(qrData);
      
      // Verificar se é um QR Code válido de visitante
      if (parsedData.visitorId) {
        const visitor = visitors.find(v => v.id === parsedData.visitorId);
        
        if (visitor) {
          setSelectedVisitor(visitor);
          setShowSelector(false);
          setShowScanner(false);
          Alert.alert('Sucesso', `Visitante ${visitor.name} identificado!`);
        } else {
          Alert.alert('Erro', 'Visitante não encontrado');
        }
      } else {
        Alert.alert('Erro', 'QR Code inválido');
      }
    } catch (error) {
      // Se não for JSON, tratar como ID direto
      const visitor = visitors.find(v => v.id === qrData);
      
      if (visitor) {
        setSelectedVisitor(visitor);
        setShowSelector(false);
        setShowScanner(false);
        Alert.alert('Sucesso', `Visitante ${visitor.name} identificado!`);
      } else {
        Alert.alert('Erro', 'QR Code inválido ou visitante não encontrado');
      }
    }
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
        <Text style={styles.title}>Registrar Entrada</Text>
      </View>

      <ScrollView style={styles.content}>
        {showSelector ? (
          <View style={styles.selectorContainer}>
            <Text style={styles.sectionTitle}>Selecione o Visitante:</Text>
            
            {/* Botão para abrir scanner */}
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setShowScanner(true)}
            >
              <Text style={styles.scanButtonIcon}>📷</Text>
              <Text style={styles.scanButtonText}>Escanear QR Code</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.sectionSubtitle}>Buscar Manualmente:</Text>
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
                placeholder="Digite observações sobre esta entrada..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.buttonDisabled]}
              onPress={handleRegisterEntry}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>
                  ✓ Registrar Entrada
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Scanner QR Code */}
      <QRCodeScanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleQRCodeScan}
        title="Escaneie o QR Code do Visitante"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
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
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
    marginTop: 8,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scanButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
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
    backgroundColor: '#4CAF50',
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
