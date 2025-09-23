import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Alert,
  ViewStyle,
  TextStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  colors: string[];
  progress?: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [greeting, setGreeting] = useState('');

  // Animações de fundo
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    Animated.loop(
      Animated.timing(circle1Anim, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(circle2Anim, {
        toValue: 1,
        duration: 40000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
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
    { id: '1', title: 'Últimas Entradas', subtitle: 'Hoje', icon: '🚪', colors: ['#8a2be2', '#da70d6'], progress: 80 },
    { id: '2', title: 'Últimas Saídas', subtitle: 'Hoje', icon: '🏃‍♂️', colors: ['#00b894', '#00ffe0'], progress: 65 },
    { id: '3', title: 'Visitantes Pendentes', subtitle: 'Hoje', icon: '🧑‍🤝‍🧑', colors: ['#6c5ce7', '#a29bfe'], progress: 45 },
    { id: '4', title: 'Alertas Críticos', subtitle: 'Últimas 24h', icon: '⚠️', colors: ['#e17055', '#ff6b6b'], progress: 30 },
  ];

  // Carrossel de recomendações
  const recommendedCards: ServiceCard[] = [
    { id: 'r1', title: 'Registrar Entrada', subtitle: 'Mais usado hoje', icon: '🚪', colors: ['#8a2be2', '#da70d6'] },
    { id: 'r2', title: 'Registrar Saída', subtitle: 'Últimos acessos', icon: '🏃‍♂️', colors: ['#00b894', '#00ffe0'] },
    { id: 'r3', title: 'Visitantes', subtitle: 'Pendentes', icon: '🧑‍🤝‍🧑', colors: ['#6c5ce7', '#a29bfe'] },
  ];

  // Duplicamos o array para simular loop infinito
  const loopCards = [...recommendedCards, ...recommendedCards];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll do carrossel a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;

      // Reset quando chega na metade duplicada
      if (nextIndex >= loopCards.length / 2) {
        scrollRef.current?.scrollTo({ x: 0, animated: false });
        nextIndex = 1;
      }

      scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  const rotateCircle1 = circle1Anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateCircle2 = circle2Anim.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Background Animado */}
      <Animated.View style={[styles.backgroundCircle, styles.circle1, { transform: [{ rotate: rotateCircle1 }, { scale: pulseAnim }] }]} />
      <Animated.View style={[styles.backgroundCircle, styles.circle2, { transform: [{ rotate: rotateCircle2 }, { scale: pulseAnim }] }]} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting}, {user?.name || 'Usuário'}</Text>
              <Text style={styles.accountType}>Controle de Acesso</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

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
              <AnimatedGradientCard key={card.id} card={card} />
            ))}
          </View>
        </View>

        {/* Carrossel de Recomendações */}
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>Recomendações</Text>
          <ScrollView
            horizontal
            pagingEnabled
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {loopCards.map((card, idx) => (
              <TouchableOpacity
                key={idx}
                style={{ width: screenWidth, borderRadius: 16, padding: 20 }}
                activeOpacity={0.8}
                onPress={() => Alert.alert('Recomendação', `Você clicou em ${card.title}`)}
              >
                <LinearGradient
                  colors={[card.colors[0], card.colors[1]] as const}
                  style={{ flex: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', height: 140 }}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{card.icon} {card.title}</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>{card.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bolinhas indicadoras */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {recommendedCards.map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: activeIndex % recommendedCards.length === idx ? '#fff' : 'rgba(255,255,255,0.3)',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Animated Quick Button
const AnimatedQuickButton = ({ action }: { action: QuickAction }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
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

// Animated Gradient Card
const AnimatedGradientCard = ({ card }: { card: ServiceCard }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, width: '48%', marginBottom: 16, alignSelf: 'stretch' }}>
      <LinearGradient colors={[card.colors[0], card.colors[1]]} style={styles.serviceCard}>
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
      </LinearGradient>
    </Animated.View>
  );
};

// Styles
const styles: { [key: string]: ViewStyle | TextStyle } = {
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  scrollContent: { paddingBottom: 20 },

  backgroundCircle: { position: 'absolute' as const, borderRadius: 999, borderWidth: 2, borderColor: 'rgba(138,43,226,0.2)' },
  circle1: { width: screenWidth * 1.2, height: screenWidth * 1.2, top: -screenWidth * 0.4, left: -screenWidth * 0.2 },
  circle2: { width: screenWidth * 0.9, height: screenWidth * 0.9, top: screenHeight * 0.5, right: -screenWidth * 0.3 },

  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' as const },
  greetingContainer: { flex: 1 },
  greeting: { fontSize: 20, fontWeight: '700' as const, color: '#fff' },
  accountType: { fontSize: 14, color: '#aaa' },
  profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center' as const, alignItems: 'center' as const },
  profileIcon: { fontSize: 18 },

  quickActionsContainer: { marginVertical: 20 },
  quickActionsScroll: { paddingHorizontal: 20 },
  quickActionButton: { width: 80, height: 80, borderRadius: 24, justifyContent: 'center' as const, alignItems: 'center' as const, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 8 },
  quickActionIcon: { fontSize: 28, marginBottom: 6 },
  quickActionTitle: { fontSize: 12, fontWeight: '600' as const, color: '#fff', textAlign: 'center' as const },

  serviceCardsContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700' as const, color: '#fff', paddingHorizontal: 20, marginBottom: 12 },
  serviceCardsGrid: { flexDirection: 'row', flexWrap: 'wrap' as const, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'stretch' as const },

  serviceCard: { borderRadius: 16, padding: 20, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, flex: 1, justifyContent: 'space-between' as const },
  serviceCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' as const, marginBottom: 12 },
  serviceCardIcon: { fontSize: 24 },
  serviceCardSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '500' as const },
  serviceCardTitle: { fontSize: 16, fontWeight: '700' as const, color: '#fff', lineHeight: 22, marginBottom: 12 },
  progressContainer: { marginTop: 8 },
  progressBar: { height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  progressText: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '500' as const },
};
