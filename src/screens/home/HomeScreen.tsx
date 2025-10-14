/**
 * Home Screen - Dashboard Principal
 * Visão geral do sistema com KPIs e informações dinâmicas
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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Toast } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { deviceType } from '../../utils/responsive';
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
      console.log('📊 [HOME] Carregando dados do dashboard...');
      
      // Carregar todas as estatísticas em paralelo
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

      console.log('✅ [HOME] Dados carregados com sucesso');
    } catch (error: any) {
      console.error('❌ [HOME] Erro ao carregar dados:', error);
      showError('Erro ao carregar dados do sistema');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login' as never);
    } catch (error) {
      showError('Erro ao fazer logout');
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Carregando dashboard...</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header de Boas-Vindas */}
        {/* <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name || 'Usuário'} 👋</Text>
            <Text style={styles.subtitle}>Bem-vindo ao AccessControl</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View> */}

        {/* KPIs Grid */}
        <View style={styles.kpiGrid}>
          <TouchableOpacity
            style={[styles.kpiCard, styles.kpiEntities]}
            onPress={() => navigation.navigate('Entidade' as never)}
          >
            <Text style={styles.kpiIcon}>🏢</Text>
            <Text style={styles.kpiValue}>{stats.totalEntities}</Text>
            <Text style={styles.kpiLabel}>Entidades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.kpiCard, styles.kpiUsers]}
            onPress={() => navigation.navigate('Users' as never)}
          >
            <Text style={styles.kpiIcon}>👥</Text>
            <Text style={styles.kpiValue}>{stats.totalUsers}</Text>
            <Text style={styles.kpiLabel}>Usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.kpiCard, styles.kpiVisitors]}
            onPress={() => navigation.navigate('Visitantes' as never)}
          >
            <Text style={styles.kpiIcon}>🚶</Text>
            <Text style={styles.kpiValue}>{stats.totalVisitors}</Text>
            <Text style={styles.kpiLabel}>Visitantes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.kpiCard, styles.kpiAccess]}
            onPress={() => navigation.navigate('RegistrarEntrada' as never)}
          >
            <Text style={styles.kpiIcon}>🚪</Text>
            <Text style={styles.kpiValue}>{stats.totalAccessLogs}</Text>
            <Text style={styles.kpiLabel}>Acessos</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Entidade' as never)}
            >
              <Text style={styles.actionIcon}>➕</Text>
              <Text style={styles.actionText}>Nova Entidade</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Users' as never)}
            >
              <Text style={styles.actionIcon}>👤</Text>
              <Text style={styles.actionText}>Novo Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Visitantes' as never)}
            >
              <Text style={styles.actionIcon}>🎫</Text>
              <Text style={styles.actionText}>Novo Visitante</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('RegistrarEntrada' as never)}
            >
              <Text style={styles.actionIcon}>📥</Text>
              <Text style={styles.actionText}>Registrar Entrada</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          
          {stats.recentEntities.length > 0 && (
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>📋 Últimas Entidades</Text>
              {stats.recentEntities.map((entity: any, index: number) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.activityName}>{entity.name}</Text>
                  <Text style={styles.activityType}>{entity.type}</Text>
                </View>
              ))}
            </View>
          )}

          {stats.recentVisitors.length > 0 && (
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>🚶 Últimos Visitantes</Text>
              {stats.recentVisitors.map((visitor: any, index: number) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.activityName}>{visitor.name}</Text>
                  <Text style={styles.activityType}>{visitor.company || 'Sem empresa'}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* System Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sistema de Controle de Acesso v1.0
          </Text>
          <Text style={styles.footerText}>
            {new Date().toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Entidade' as never)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </AppLayout>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: isDark ? '#fff' : '#333',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDark ? '#2D3436' : '#2196F3',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    minWidth: deviceType.isMobile ? '45%' : 150,
    backgroundColor: isDark ? '#2D3436' : '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiEntities: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  kpiUsers: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  kpiVisitors: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  kpiAccess: {
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  kpiIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#333',
  },
  kpiLabel: {
    fontSize: 14,
    color: isDark ? '#aaa' : '#666',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#333',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: deviceType.isMobile ? '45%' : 120,
    backgroundColor: isDark ? '#2D3436' : '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: isDark ? '#fff' : '#333',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: isDark ? '#2D3436' : '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#fff' : '#333',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#444' : '#eee',
  },
  activityName: {
    fontSize: 14,
    color: isDark ? '#fff' : '#333',
  },
  activityType: {
    fontSize: 12,
    color: isDark ? '#aaa' : '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: isDark ? '#aaa' : '#666',
    marginVertical: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});