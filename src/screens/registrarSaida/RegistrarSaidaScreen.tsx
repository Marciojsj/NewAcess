/**
 * Registrar Saída Screen
 * Tela para registrar saída de visitantes
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
import { useNavigation } from '@react-navigation/native';
import { Visitor } from '../../types/visitorTypes';
import { useAccess } from '../../hooks/useAccess';
import { VisitorSelector } from '../../components/access/VisitorSelector';
import { QRCodeScanner } from '../../components/access/QRCodeScanner';
import { deviceType } from '../../utils/responsive';
import { useVisitors } from '../../hooks/useVisitors';
import { 
  calculateStayDuration, 
  formatDurationShort,
  getRelativeTime 
} from '../../utils/timeCalculation';

export const RegistrarSaidaScreen = () => {
  const navigation = useNavigation();
  const { registerExit, loading, checkVisitorInside, getActiveEntryLogId, getActiveEntryTime } = useAccess();
  const { visitors } = useVisitors();
  
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [notes, setNotes] = useState('');
  const [showSelector, setShowSelector] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [entryTime, setEntryTime] = useState<Date | null>(null);
  const [stayDuration, setStayDuration] = useState<string>('');

  // Calcular duração quando temos entrada
  useEffect(() => {
    if (entryTime) {
      const duration = calculateStayDuration(entryTime.toISOString(), new Date().toISOString());
      setStayDuration(duration.formattedShort);
    }
  }, [entryTime]);

  const handleQRCodeScan = async (qrData: string) => {
    try {
      // Tentar parsear como JSON primeiro
      let visitorId: string;
      try {
        const parsed = JSON.parse(qrData);
        visitorId = parsed.visitorId || parsed.id;
      } catch {
        // Se não for JSON, usar diretamente como ID
        visitorId = qrData;
      }

      // Buscar visitante na lista
      const visitor = visitors.find((v) => v.id === visitorId);
      
      if (visitor) {
        setShowScanner(false);
        await handleSelectVisitor(visitor);
      } else {
        Alert.alert('Erro', 'Visitante não encontrado');
      }
    } catch (error) {
      Alert.alert('Erro', 'QR Code inválido');
    }
  };

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
              setEntryTime(null);
              setStayDuration('');
            },
          },
        ]
      );
    } else {
      // Buscar horário de entrada
      const entry = await getActiveEntryTime(visitor.id);
      setSelectedVisitor(visitor);
      setShowSelector(false);
      setEntryTime(entry);
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
    setEntryTime(null);
    setStayDuration('');
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
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setShowScanner(true)}
            >
              <Text style={styles.scanButtonText}>📷 Escanear QR Code</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

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

              {entryTime && stayDuration && (
                <View style={styles.durationCard}>
                  <View style={styles.durationHeader}>
                    <Text style={styles.durationIcon}>⏱️</Text>
                    <Text style={styles.durationTitle}>Tempo de Permanência</Text>
                  </View>
                  <Text style={styles.durationValue}>{stayDuration}</Text>
                  <Text style={styles.durationDetail}>
                    Entrada: {getRelativeTime(entryTime.toISOString())}
                  </Text>
                </View>
              )}

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

      <QRCodeScanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleQRCodeScan}
        title="Escanear QR Code do Visitante"
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
  scanButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  durationCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  durationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
  },
  durationValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  durationDetail: {
    fontSize: 14,
    color: '#F57C00',
  },
});
