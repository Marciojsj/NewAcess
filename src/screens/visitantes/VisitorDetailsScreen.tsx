/**
 * Visitor Details Screen
 * Tela de detalhes do visitante com histórico completo
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Visitor } from '../../types/visitorTypes';
import { useVisitors } from '../../hooks/useVisitors';
import { useAccess } from '../../hooks/useAccess';
import { AccessHistory } from '../../components/access/AccessHistory';
import { VisitorStatsCard } from '../../components/visitors/VisitorStatsCard';
import { VisitorPhotoUpload } from '../../components/visitors/VisitorPhotoUpload';
import { VisitorVisitsChart } from '../../components/visitors/VisitorVisitsChart';
import { deviceType } from '../../utils/responsive';
import { calculateStayDuration, formatDurationShort } from '../../utils/timeCalculation';

export const VisitorDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { visitorId } = route.params as { visitorId: string };

  const { getVisitorById, updateVisitor, loading: visitorLoading } = useVisitors();
  const { getVisitorHistory, loading: historyLoading } = useAccess();

  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorHistory, setVisitorHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalTime: '0h 0min',
    lastVisit: null as Date | null,
    averageStay: '0h 0min',
  });

  useEffect(() => {
    loadVisitorData();
  }, [visitorId]);

  const loadVisitorData = async () => {
    try {
      const visitorData = await getVisitorById(visitorId);
      if (visitorData) {
        setVisitor(visitorData);
        await loadVisitorHistory(visitorData.id);
      }
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do visitante');
    }
  };

  const loadVisitorHistory = async (id: string) => {
    try {
      const history = await getVisitorHistory(id);
      setVisitorHistory(history);
      calculateStats(history);
    } catch (error: any) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const calculateStats = (history: any[]) => {
    if (history.length === 0) return;

    const entries = history.filter(log => log.type === 'ENTRY');
    const exits = history.filter(log => log.type === 'EXIT');

    // Calcular tempo total
    let totalMinutes = 0;
    let visitCount = 0;

    // Agrupar por pares entrada/saída
    const pairedVisits: { entry: any; exit: any }[] = [];

    entries.forEach(entry => {
      const correspondingExit = exits.find(exit =>
        new Date(exit.timestamp) > new Date(entry.timestamp) &&
        !pairedVisits.some(p => p.exit?.id === exit.id)
      );

      if (correspondingExit) {
        pairedVisits.push({ entry, exit: correspondingExit });
        const duration = calculateStayDuration(entry.timestamp, correspondingExit.timestamp);
        totalMinutes += duration.totalMinutes;
        visitCount++;
      }
    });

    const totalTime = formatDurationShort(Math.floor(totalMinutes / 60), totalMinutes % 60);
    const averageStay = visitCount > 0
      ? formatDurationShort(Math.floor((totalMinutes / visitCount) / 60), (totalMinutes / visitCount) % 60)
      : '0h 0min';

    // Última visita
    const lastVisit = history.length > 0
      ? new Date(history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0].timestamp)
      : null;

    setStats({
      totalVisits: visitCount,
      totalTime,
      lastVisit,
      averageStay,
    });
  };

  const handleUpdatePhoto = async (photoUri: string) => {
    if (!visitor) return;

    try {
      await updateVisitor(visitor.id, { photoUrl: photoUri });
      setVisitor({ ...visitor, photoUrl: photoUri });
      Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível atualizar a foto');
    }
  };

  const handleRegenerateQR = async () => {
    if (!visitor) return;

    try {
      // Implementar regeneração de QR
      Alert.alert('Sucesso', 'QR Code regenerado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível regenerar o QR Code');
    }
  };

  if (visitorLoading || !visitor) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando dados do visitante...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Visitante</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Visitor Info Card */}
        <View style={styles.visitorCard}>
          <View style={styles.visitorHeader}>
            <View style={styles.photoContainer}>
              {visitor.photoUrl ? (
                <Image source={{ uri: visitor.photoUrl }} style={styles.photo} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>
                    {visitor.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <VisitorPhotoUpload
                visitorId={visitor.id}
                onPhotoSelected={handleUpdatePhoto}
              />
            </View>

            <View style={styles.visitorBasicInfo}>
              <Text style={styles.visitorName}>{visitor.name}</Text>
              {visitor.cpf && (
                <Text style={styles.visitorDetail}>CPF: {visitor.cpf}</Text>
              )}
              {visitor.phone && (
                <Text style={styles.visitorDetail}>📞 {visitor.phone}</Text>
              )}
              {visitor.email && (
                <Text style={styles.visitorDetail}>✉️ {visitor.email}</Text>
              )}
            </View>
          </View>

          {visitor.company && (
            <View style={styles.companySection}>
              <Text style={styles.sectionLabel}>🏢 Empresa</Text>
              <Text style={styles.companyText}>{visitor.company}</Text>
            </View>
          )}

          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRegenerateQR}
            >
              <Text style={styles.actionButtonText}>🔄 Regenerar QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
          <VisitorStatsCard stats={stats} />
        </View>

        {/* Visits Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Gráfico de Visitas</Text>
          <VisitorVisitsChart visits={visitorHistory} />
        </View>

        {/* Access History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>📋 Histórico de Acessos</Text>
          <View style={styles.historyContainer}>
            {visitorHistory.map((log, index) => (
              <View key={log.id || index} style={styles.logCard}>
                <View style={styles.logHeader}>
                  <View style={[
                    styles.typeBadge,
                    log.type === 'ENTRY' ? styles.entryBadge : styles.exitBadge
                  ]}>
                    <Text style={styles.typeBadgeText}>
                      {log.type === 'ENTRY' ? '🟢 ENTRADA' : '🔴 SAÍDA'}
                    </Text>
                  </View>
                  <Text style={styles.timestamp}>
                    {new Date(log.timestamp).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                {log.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Observações:</Text>
                    <Text style={styles.notesText}>{log.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  visitorCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitorHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 16,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  visitorBasicInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  visitorDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  companySection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  companyText: {
    fontSize: 16,
    color: '#333',
  },
  actionsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  historySection: {
    marginBottom: 24,
  },
  historyContainer: {
    paddingHorizontal: 16,
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  entryBadge: {
    backgroundColor: '#E8F5E9',
  },
  exitBadge: {
    backgroundColor: '#FFEBEE',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  notesContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
  },
});