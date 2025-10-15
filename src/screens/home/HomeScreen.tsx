/**
 * HomeScreen Moderna — Dashboard Renovado
 * Interface elegante, moderna e fluida, mantendo a lógica original.
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
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Toast } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import apiClient from '../../services/api/apiClient';
import { deviceType } from '../../utils/responsive';

interface DashboardStats {
  totalEntities: number;
  totalUsers: number;
  totalVisitors: number;
  totalAccessLogs: number;
  recentEntities: any[];
  recentUsers: any[];
  recentVisitors: any[];
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { theme, isDark } = useTheme();
  const { toast, hideToast, success, error: showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalEntities: 0,
    totalUsers: 0,
    totalVisitors: 0,
    totalAccessLogs: 0,
    recentEntities: [],
    recentUsers: [],
    recentVisitors: [],
  });

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
    } catch (error) {
      showError('Erro ao carregar dados');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <View style={[styles.center, { flex: 1 }]}>
          <ActivityIndicator size="large" color="#4F8EF7" />
          <Text style={{ color: isDark ? '#fff' : '#333', marginTop: 12 }}>
            Carregando seu painel...
          </Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadDashboardData} />}
      >
        {/* Cabeçalho moderno */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Olá, {user?.name?.split(' ')[0] || 'Usuário'} 👋</Text>
            <Text style={styles.subtitle}>Bem-vindo de volta ao AccessControl</Text>
          </View>
          {/* <Image
            source={{
              uri:
                user?.avatar ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.avatar}
          /> */}
        </View>

        {/* KPIs com gradientes */}
        <View style={styles.kpiGrid}>
          {[
            { label: 'Entidades', value: stats.totalEntities, color: '#4CAF50', icon: '🏢', route: 'Entidade' },
            { label: 'Usuários', value: stats.totalUsers, color: '#2196F3', icon: '👥', route: 'Users' },
            { label: 'Visitantes', value: stats.totalVisitors, color: '#FF9800', icon: '🚶', route: 'Visitantes' },
            { label: 'Acessos', value: stats.totalAccessLogs, color: '#9C27B0', icon: '🚪', route: 'RegistrarEntrada' },
          ].map((kpi, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.kpiCard, { backgroundColor: isDark ? '#2E2E2E' : '#fff', borderLeftColor: kpi.color }]}
              onPress={() => navigation.navigate(kpi.route as never)}
            >
              <Text style={[styles.kpiIcon, { color: kpi.color }]}>{kpi.icon}</Text>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção de Gráficos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estatísticas Recentes</Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Atividade Semanal</Text>
            <LineChart
              data={{
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{ data: [12, 22, 18, 27, 33, 15, 10] }],
              }}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                backgroundGradientFrom: isDark ? '#1a1a1a' : '#fff',
                backgroundGradientTo: isDark ? '#1a1a1a' : '#fff',
                decimalPlaces: 0,
                color: () => isDark ? '#00E5FF' : '#007BFF',
                labelColor: () => (isDark ? '#eee' : '#333'),
              }}
              bezier
              style={styles.chart}
            />

             <Text style={styles.chartTitle}>Distribuição</Text>
            <PieChart
              data={[
                { name: 'Usuários', population: 45, color: '#2196F3', legendFontColor: '#2196F3', legendFontSize: 14 },
                { name: 'Entidades', population: 30, color: '#4CAF50', legendFontColor: '#4CAF50', legendFontSize: 14 },
                { name: 'Visitantes', population: 25, color: '#FF9800', legendFontColor: '#FF9800', legendFontSize: 14 },
              ]}
              width={Dimensions.get('window').width - 48}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              chartConfig={{ color: () => '#fff' }}
            />

            
          </View>

          {/* <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Distribuição</Text>
            <PieChart
              data={[
                { name: 'Usuários', population: 45, color: '#2196F3', legendFontColor: '#2196F3', legendFontSize: 14 },
                { name: 'Entidades', population: 30, color: '#4CAF50', legendFontColor: '#4CAF50', legendFontSize: 14 },
                { name: 'Visitantes', population: 25, color: '#FF9800', legendFontColor: '#FF9800', legendFontSize: 14 },
              ]}
              width={Dimensions.get('window').width - 48}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              chartConfig={{ color: () => '#fff' }}
            />
          </View> */}
        </View>

        {/* Ações rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {[
              { icon: '➕', text: 'Nova Entidade', route: 'Entidade' },
              { icon: '👤', text: 'Novo Usuário', route: 'Users' },
              { icon: '🎫', text: 'Novo Visitante', route: 'Visitantes' },
              { icon: '📥', text: 'Registrar Entrada', route: 'RegistrarEntrada' },
            ].map((action, i) => (
              <TouchableOpacity key={i} style={styles.actionCard} onPress={() => navigation.navigate(action.route as never)}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AccessControl v1.0 — {new Date().toLocaleDateString('pt-BR')}</Text>
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
      backgroundColor: isDark ? '#121212' : '#F8F9FA',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      elevation: 3,
      marginBottom: 8,
    },
    welcome: {
      fontSize: 22,
      fontWeight: '600',
      color: isDark ? '#fff' : '#333',
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    kpiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 16,
    },
    kpiCard: {
      width: '47%',
      borderRadius: 12,
      padding: 20,
      borderLeftWidth: 4,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      alignItems: 'center',
    },
    kpiIcon: { fontSize: 32, marginBottom: 8 },
    kpiValue: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
    },
    kpiLabel: {
      fontSize: 14,
      color: isDark ? '#bbb' : '#777',
    },
    section: { padding: 16 },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#fff' : '#333',
      marginBottom: 12,
    },
    chartCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
    },
    chartTitle: {
      fontSize: 16,
      color: isDark ? '#fff' : '#333',
      textAlign: 'center',
      marginBottom: 8,
    },
    chart: { borderRadius: 12 },
    actionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12,
    },
    actionCard: {
      width: '47%',
      backgroundColor: isDark ? '#2E2E2E' : '#fff',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      elevation: 3,
    },
    actionIcon: { fontSize: 30, marginBottom: 8 },
    actionText: { fontSize: 13, color: isDark ? '#fff' : '#333', textAlign: 'center' },
    footer: { padding: 20, alignItems: 'center' },
    footerText: { fontSize: 12, color: isDark ? '#999' : '#666' },
  });
