/**
 * HomeScreen - Video Buddy Style Dashboard
 * Interface moderna e limpa inspirada no Video Buddy Pro
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

// Adicione a propriedade 'avatar' ao tipo User se não existir
interface User {
  name?: string;
  avatar?: string;
  // outras propriedades existentes...
}
import { useTheme } from '../../contexts/ThemeContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Toast } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import apiClient from '../../services/api/apiClient';

interface DashboardStats {
  totalEntities: number;
  totalUsers: number;
  totalVisitors: number;
  totalAccessLogs: number;
  recentEntities: any[];
  recentUsers: any[];
  recentVisitors: any[];
}

interface AgendaItem {
  id: string;
  title: string;
  time: string;
  status: 'scheduled' | 'pending';
}

interface Invitation {
  id: string;
  sender: string;
  title: string;
  type: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { toast, hideToast, error } = useToast();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [stats, setStats] = useState<DashboardStats>({
    totalEntities: 0,
    totalUsers: 0,
    totalVisitors: 0,
    totalAccessLogs: 0,
    recentEntities: [],
    recentUsers: [],
    recentVisitors: [],
  });

  // Dados mockados da agenda (em produção, viriam da API)
  const [agenda] = useState<AgendaItem[]>([
    { id: '1', title: 'Morning stand-up', time: '9:00 - 9:15', status: 'scheduled' },
    { id: '2', title: 'Planning catchup', time: '10:00 - 10:30', status: 'scheduled' },
    { id: '3', title: 'Dev 1:1', time: '13:00 - 14:00', status: 'pending' },
    { id: '4', title: 'PM consultation', time: '15:00 - 15:30', status: 'scheduled' },
  ]);

  // Convites mockados
  const [invitations] = useState<Invitation[]>([
    { id: '1', sender: 'Samson', title: 'invited you to Ul planning', type: 'planning' },
    { id: '2', sender: 'Lana', title: 'invited you to Brainstorm!', type: 'brainstorm' },
    { id: '3', sender: 'Seminar', title: 'invited you to Brainstorming', type: 'brainstorming' },
  ]);

  const styles = getStyles(isDark);

  const loadDashboardData = async () => {
    try {
      const [entitiesRes, usersRes, visitorsRes, accessLogsRes] = await Promise.all([
        apiClient.get('/entities').catch(() => ({ data: { data: [] } })),
        apiClient.get('/users').catch(() => ({ data: { data: [] } })),
        apiClient.get('/visitors').catch(() => ({ data: { data: [] } })),
        apiClient.get('/access/logs').catch(() => ({ data: { data: [] } })),
      ]);

      const entities = entitiesRes.data.data || [];
      const users = usersRes.data.data || [];
      const visitors = visitorsRes.data.data || [];
      const accessLogs = accessLogsRes.data.data || [];

      setStats({
        totalEntities: entities.length,
        totalUsers: users.length,
        totalVisitors: visitors.length,
        totalAccessLogs: accessLogs.length,
        recentEntities: entities.slice(0, 5),
        recentUsers: users.slice(0, 5),
        recentVisitors: visitors.slice(0, 5),
      });
    } catch (err) {
      error('Erro ao carregar dados');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const days = [];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarMonth}>
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </View>
        <View style={styles.weekDays}>
          {weekDays.map((day, i) => (
            <Text key={i} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.dayCell} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === new Date().getDate();
            const isSelected = day === selectedDate;
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  isToday && styles.today,
                  isSelected && styles.selectedDay,
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[
                  styles.dayText,
                  (isToday || isSelected) && styles.dayTextActive,
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <View style={[styles.center, { flex: 1 }]}>
          <ActivityIndicator size="large" color="#4F8EF7" />
          <Text style={[styles.loadingText, { color: isDark ? '#fff' : '#333' }]}>
            Carregando seu painel...
          </Text>
        </View>
      </AppLayout>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const isDesktop = screenWidth > 768;

  return (
    <AppLayout>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadDashboardData} />}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Usuário'}!
            </Text>
            <Image
              source={{
                uri: user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Container Principal - Grid Layout */}
        <View style={[styles.mainContent, isDesktop && styles.mainContentDesktop]}>
          {/* Coluna Esquerda */}
          <View style={[styles.leftColumn, isDesktop && styles.leftColumnDesktop]}>
            {/* Agenda do Dia */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your agenda today</Text>
              {agenda.map((item) => (
                <View key={item.id} style={styles.agendaItem}>
                  <View style={styles.agendaInfo}>
                    <Text style={styles.agendaTitle}>{item.title}</Text>
                    <Text style={styles.agendaTime}>{item.time}</Text>
                  </View>
                  <View style={styles.agendaActions}>
                    <TouchableOpacity style={styles.btnSchedule}>
                      <Text style={styles.btnScheduleText}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChange}>
                      <Text style={styles.btnChangeText}>Change attendance</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Grid de Ações e Conteúdo */}
            <View style={styles.bottomGrid}>
              {/* Calendário */}
              <View style={[styles.card, styles.calendarCard]}>
                <Text style={styles.cardTitle}>Calendar</Text>
                {renderCalendar()}
              </View>

              {/* Convites */}
              <View style={[styles.card, styles.invitationsCard]}>
                <Text style={styles.cardTitle}>Invitations</Text>
                {invitations.map((inv) => (
                  <View key={inv.id} style={styles.invitationItem}>
                    <Image
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                      style={styles.invitationAvatar}
                    />
                    <View style={styles.invitationInfo}>
                      <Text style={styles.invitationSender}>{inv.sender}</Text>
                      <Text style={styles.invitationTitle}>{inv.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnRsvp}>
                      <Text style={styles.btnRsvpText}>RSVP</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

                        {/* Coluna Direita - Ações Rápidas */}
          <View style={[styles.rightColumn, isDesktop && styles.rightColumnDesktop]}>
            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardPrimary]}
              onPress={() => navigation.navigate('RegistrarEntrada' as never)}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📹</Text>
              </View>
              <Text style={styles.actionText}>Start a meeting</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Visitantes' as never)}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>➕</Text>
              </View>
              <Text style={styles.actionText}>Join a meeting</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Visitantes' as never)}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>➕</Text>
              </View>
              <Text style={styles.actionText}>Join a meeting</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Visitantes' as never)}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>➕</Text>
              </View>
              <Text style={styles.actionText}>Join a meeting</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Entidade' as never)}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>📅</Text>
              </View>
              <Text style={styles.actionText}>Schedule a meeting</Text>
            </TouchableOpacity>

            {/* KPIs Compactos */}
            <View style={styles.kpiContainer}>
              <View style={[styles.kpiMini, { borderLeftColor: '#4CAF50' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalEntities}</Text>
                <Text style={styles.kpiMiniLabel}>Entidades</Text>
              </View>
              <View style={[styles.kpiMini, { borderLeftColor: '#2196F3' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalUsers}</Text>
                <Text style={styles.kpiMiniLabel}>Usuários</Text>
              </View>
            </View>
             <View style={styles.kpiContainer}>
              <View style={[styles.kpiMini, { borderLeftColor: '#4CAF50' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalEntities}</Text>
                <Text style={styles.kpiMiniLabel}>Entidades</Text>
              </View>
              <View style={[styles.kpiMini, { borderLeftColor: '#2196F3' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalUsers}</Text>
                <Text style={styles.kpiMiniLabel}>Usuários</Text>
              </View>
            </View>
             <View style={styles.kpiContainer}>
              <View style={[styles.kpiMini, { borderLeftColor: '#4CAF50' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalEntities}</Text>
                <Text style={styles.kpiMiniLabel}>Entidades</Text>
              </View>
              <View style={[styles.kpiMini, { borderLeftColor: '#2196F3' }]}>
                <Text style={styles.kpiMiniValue}>{stats.totalUsers}</Text>
                <Text style={styles.kpiMiniLabel}>Usuários</Text>
              </View>
            </View>
          </View>

              {/* Insights */}
              <View style={[styles.card, styles.insightsCard]}>
                <Text style={styles.cardTitle}>Insights</Text>
                <View style={styles.insightItem}>
                  <Text style={styles.insightLabel}>Number of meetings you hosted this week</Text>
                  <Text style={styles.insightValue}>{stats.totalAccessLogs}</Text>
                </View>
                <View style={styles.insightItem}>
                  <Text style={styles.insightLabel}>Number of meetings you joined this week</Text>
                  <Text style={styles.insightValue}>{stats.totalVisitors}</Text>
                </View>
              </View>
            </View>
          </View>


        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            AccessControl v1.0 — {new Date().toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </ScrollView>

      <Toast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />
    </AppLayout>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1A1A1A' : '#F5F7FA',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 14,
    },
    header: {
      backgroundColor: isDark ? '#2563EB' : '#4F8EF7',
      paddingHorizontal: 20,
      paddingVertical: 10,
      // paddingTop: 48,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    greeting: {
      fontSize: 24,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    mainContent: {
      padding: 16,
    },
    mainContentDesktop: {
      flexDirection: 'row',
      gap: 16,
    },
    leftColumn: {
      flex: 1,
    },
    leftColumnDesktop: {
      flex: 2,
    },
    rightColumn: {
      gap: 12,
      marginTop: 16,
    },
    rightColumnDesktop: {
      flex: 1,
      marginTop: 0,
    },
    card: {
      backgroundColor: isDark ? '#2E2E2E' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1F2937',
      marginBottom: 16,
    },
    agendaItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#3E3E3E' : '#E5E7EB',
    },
    agendaInfo: {
      flex: 1,
    },
    agendaTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#FFFFFF' : '#1F2937',
      marginBottom: 4,
    },
    agendaTime: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    agendaActions: {
      flexDirection: 'row',
      gap: 8,
    },
    btnSchedule: {
      backgroundColor: '#4F8EF7',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    btnScheduleText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '500',
    },
    btnChange: {
      backgroundColor: isDark ? '#3E3E3E' : '#F3F4F6',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    btnChangeText: {
      color: isDark ? '#9CA3AF' : '#6B7280',
      fontSize: 11,
      fontWeight: '500',
    },
    bottomGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    calendarCard: {
      flex: 1,
      minWidth: 280,
    },
    invitationsCard: {
      flex: 1,
      minWidth: 280,
    },
    insightsCard: {
      flex: 1,
      minWidth: 280,
    },
    calendar: {
      marginTop: 8,
    },
    calendarHeader: {
      marginBottom: 12,
    },
    calendarMonth: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1F2937',
    },
    weekDays: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
    },
    weekDay: {
      width: 32,
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
    },
    today: {
      backgroundColor: '#4F8EF7',
      borderRadius: 8,
    },
    selectedDay: {
      backgroundColor: isDark ? '#3E3E3E' : '#E5E7EB',
      borderRadius: 8,
    },
    dayText: {
      fontSize: 13,
      color: isDark ? '#FFFFFF' : '#1F2937',
    },
    dayTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    invitationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#3E3E3E' : '#E5E7EB',
    },
    invitationAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    invitationInfo: {
      flex: 1,
    },
    invitationSender: {
      fontSize: 13,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1F2937',
    },
    invitationTitle: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginTop: 2,
    },
    btnRsvp: {
      backgroundColor: '#4F8EF7',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 6,
    },
    btnRsvpText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    insightItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#3E3E3E' : '#E5E7EB',
    },
    insightLabel: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    insightValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#4F8EF7',
    },
    actionCard: {
      backgroundColor: isDark ? '#2E2E2E' : '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    actionCardPrimary: {
      backgroundColor: '#4F8EF7',
    },
    actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? '#3E3E3E' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionIconText: {
      fontSize: 24,
    },
    actionText: {
      fontSize: 15,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1F2937',
      flex: 1,
    },
    kpiContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    kpiMini: {
      flex: 1,
      backgroundColor: isDark ? '#2E2E2E' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    kpiMiniValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#1F2937',
      marginBottom: 4,
    },
    kpiMiniLabel: {
      fontSize: 11,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    footer: {
      padding: 24,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: isDark ? '#6B7280' : '#9CA3AF',
    },
  });