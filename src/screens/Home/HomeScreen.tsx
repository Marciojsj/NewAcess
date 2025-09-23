import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  RegistrarEntrada: undefined;
  RegistrarSaida: undefined;
  Visitantes: undefined;
  Relatorios: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  backgroundColor: string;
  progress?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [greeting, setGreeting] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // animação de entrada da tela
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const quickActions: QuickAction[] = [
    { id: '1', title: 'Registrar Entrada', icon: '🚪', color: '#8a2be2', onPress: () => navigation.navigate('RegistrarEntrada') },
    { id: '2', title: 'Registrar Saída', icon: '🏃‍♂️', color: '#00b894', onPress: () => navigation.navigate('RegistrarSaida') },
    { id: '3', title: 'Visitantes', icon: '🧑‍🤝‍🧑', color: '#6c5ce7', onPress: () => navigation.navigate('Visitantes') },
    { id: '4', title: 'Alertas', icon: '⚠️', color: '#e17055', onPress: () => Alert.alert('Alertas', 'Funcionalidade em desenvolvimento') },
    { id: '5', title: 'Relatórios', icon: '📊', color: '#fdcb6e', onPress: () => navigation.navigate('Relatorios') },
  ];

  const serviceCards: ServiceCard[] = [
    { id: '1', title: 'Últimas Entradas', subtitle: 'Hoje', icon: '🚪', backgroundColor: '#8a2be2', progress: 80 },
    { id: '2', title: 'Últimas Saídas', subtitle: 'Hoje', icon: '🏃‍♂️', backgroundColor: '#00b894', progress: 65 },
    { id: '3', title: 'Visitantes Pendentes', subtitle: 'Hoje', icon: '🧑‍🤝‍🧑', backgroundColor: '#6c5ce7', progress: 45 },
    { id: '4', title: 'Alertas Críticos', subtitle: 'Últimas 24h', icon: '⚠️', backgroundColor: '#e17055', progress: 30 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting}, {user?.name || 'Usuário'}</Text>
              <Text style={styles.accountType}>Controle de Acesso</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {quickActions.map((action) => (
              <AnimatedQuickButton key={action.id} action={action} />
            ))}
          </ScrollView>
        </View>

        {/* Service Cards */}
        <View style={styles.serviceCardsContainer}>
          <Text style={styles.sectionTitle}>Estatísticas de Acesso</Text>
          <View style={styles.serviceCardsGrid}>
            {serviceCards.map((card) => (
              <AnimatedServiceCard key={card.id} card={card} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componentes Animados
const AnimatedQuickButton = ({ action }: { action: QuickAction }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(action.onPress);
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], marginRight: 12 }}>
      <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: action.color }]} onPress={handlePress} activeOpacity={0.8}>
        <Text style={styles.quickActionIcon}>{action.icon}</Text>
        <Text style={styles.quickActionTitle}>{action.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const AnimatedServiceCard = ({ card }: { card: ServiceCard }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[styles.serviceCard, { backgroundColor: card.backgroundColor, opacity: fadeAnim }]}>
      <View style={styles.serviceCardHeader}>
        <Text style={styles.serviceCardIcon}>{card.icon}</Text>
        <Text style={styles.serviceCardSubtitle}>{card.subtitle}</Text>
      </View>
      <Text style={styles.serviceCardTitle}>{card.title}</Text>
      {card.progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${card.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{card.progress}% concluído</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  scrollContent: { paddingBottom: 20 },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greetingContainer: { flex: 1 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
  accountType: { fontSize: 14, color: '#aaa' },
  profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  profileIcon: { fontSize: 18 },
  quickActionsContainer: { marginVertical: 20 },
  quickActionsScroll: { paddingHorizontal: 20 },
  quickActionButton: { width: 80, height: 80, borderRadius: 24, justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6 },
  quickActionIcon: { fontSize: 28, marginBottom: 6 },
  quickActionTitle: { fontSize: 12, fontWeight: '600', color: '#fff', textAlign: 'center' },
  serviceCardsContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', paddingHorizontal: 20, marginBottom: 12 },
  serviceCardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  serviceCard: { width: '48%', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6 },
  serviceCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  serviceCardIcon: { fontSize: 24 },
  serviceCardSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  serviceCardTitle: { fontSize: 16, fontWeight: '700', color: '#fff', lineHeight: 22, marginBottom: 12 },
  progressContainer: { marginTop: 8 },
  progressBar: { height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  progressText: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
});
