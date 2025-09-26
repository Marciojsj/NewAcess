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
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { responsive, deviceType, useResponsive } from '../../utils/responsive';

// Definição dos tipos de navegação para tipagem forte do React Navigation
type RootStackParamList = {
  Home: undefined;
  RegistrarEntrada: undefined;
  RegistrarSaida: undefined;
  Visitantes: undefined;
  Relatorios: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Interface para ações rápidas - define estrutura dos botões de acesso rápido
interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

// Interface para cartões de serviço - estrutura dos cards informativos com progresso
interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colors: string[];
  progress?: number;
}

// Captura das dimensões da tela para cálculos responsivos
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [greeting, setGreeting] = useState('');
  const dimensions = useResponsive();

  // Configuração das animações de fundo - círculos rotativos para efeito visual
  // Valores iniciais definidos como 0 para começar a animação do estado inicial
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  // Animação de pulsação - valor inicial 1 (tamanho normal) para criar efeito de respiração
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Configuração da saudação baseada no horário - ajuste dinâmico do texto
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // Animação contínua do primeiro círculo - rotação completa em 30 segundos
    // Duração aumentada para movimento mais suave e menos distração
    Animated.loop(
      Animated.timing(circle1Anim, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Animação contínua do segundo círculo - rotação em 40 segundos (velocidade diferente)
    // Duração maior que o primeiro círculo para criar movimento assimétrico interessante
    Animated.loop(
      Animated.timing(circle2Anim, {
        toValue: 1,
        duration: 40000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Animação de pulsação contínua - escala de 1.0 para 1.05 e volta
    // Valores pequenos (1.05) para efeito sutil, duração de 2s para respiração natural
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

  // Configuração das ações rápidas - botões principais de navegação
  // Cores ajustadas para criar hierarquia visual e diferenciação funcional
  const quickActions: QuickAction[] = [
    // Entrada - cor roxa primária (#8a2be2) para ação principal
    { id: '1', title: 'Registrar Entrada', icon: '🚪', color: '#8a2be2', onPress: () => navigation.navigate('RegistrarEntrada') },
    // Saída - cor verde (#00b894) para indicar ação de saída/liberação
    { id: '2', title: 'Registrar Saída', icon: '🏃‍♂️', color: '#00b894', onPress: () => navigation.navigate('RegistrarSaida') },
    // Visitantes - cor roxa secundária (#6c5ce7) para funcionalidade relacionada
    { id: '3', title: 'Visitantes', icon: '🧑‍🤝‍🧑', color: '#6c5ce7', onPress: () => navigation.navigate('Visitantes') },
    // Alertas - cor laranja (#e17055) para indicar urgência/atenção
    { id: '4', title: 'Alertas', icon: '⚠️', color: '#e17055', onPress: () => Alert.alert('Alertas', 'Funcionalidade em desenvolvimento') },
    // Relatórios - cor amarela (#fdcb6e) para funcionalidade informativa
    { id: '5', title: 'Relatórios', icon: '📊', color: '#fdcb6e', onPress: () => navigation.navigate('Relatorios') },
  ];

  // Configuração dos cartões de serviço - cards informativos com gradientes e progresso
  const serviceCards: ServiceCard[] = [
    // Card de entradas - gradiente roxo, progresso alto (80%) para mostrar atividade
    { id: '1', title: 'Últimas Entradas', subtitle: 'Hoje', icon: '🚪', colors: ['#8a2be2', '#da70d6'], progress: 80 },
    // Card de saídas - gradiente verde-azul, progresso médio-alto (65%)
    { id: '2', title: 'Últimas Saídas', subtitle: 'Hoje', icon: '🏃‍♂️', colors: ['#00b894', '#00ffe0'], progress: 65 },
    // Card de visitantes - gradiente roxo claro, progresso médio (45%) para indicar pendências
    { id: '3', title: 'Visitantes Pendentes', subtitle: 'Hoje', icon: '🧑‍🤝‍🧑', colors: ['#6c5ce7', '#a29bfe'], progress: 45 },
    // Card de alertas - gradiente vermelho, progresso baixo (30%) para indicar criticidade controlada
    { id: '4', title: 'Alertas Críticos', subtitle: 'Últimas 24h', icon: '⚠️', colors: ['#e17055', '#ff6b6b'], progress: 30 },
  ];

  // Configuração do carrossel de recomendações - cards rotativos para engajamento
  const recommendedCards: ServiceCard[] = [
    // Recomendações baseadas em uso - cores consistentes com ações rápidas
    { id: 'r1', title: 'Registrar Entrada', subtitle: 'Mais usado hoje', icon: '🚪', colors: ['#8a2be2', '#da70d6'] },
    { id: 'r2', title: 'Registrar Saída', subtitle: 'Últimos acessos', icon: '🏃‍♂️', colors: ['#00b894', '#00ffe0'] },
    { id: 'r3', title: 'Visitantes', subtitle: 'Pendentes', icon: '🧑‍🤝‍🧑', colors: ['#6c5ce7', '#a29bfe'] },
  ];

  // Duplicação do array para simular loop infinito no carrossel
  // Técnica para criar scroll contínuo sem quebras visuais
  const loopCards = [...recommendedCards, ...recommendedCards];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Configuração do auto-scroll do carrossel - intervalo de 5 segundos para boa UX
  // Tempo ajustado para permitir leitura sem ser muito lento
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;

      // Reset quando chega na metade duplicada - mantém loop infinito suave
      if (nextIndex >= loopCards.length / 2) {
        scrollRef.current?.scrollTo({ x: 0, animated: false });
        nextIndex = 1;
      }

      // Scroll suave para próximo card - largura da tela como base para cálculo
      scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Cálculo da largura do card baseado no tipo de dispositivo
    // Mobile: largura total, Desktop: máximo 400px ou 80% da largura
    const cardWidth = dimensions.isMobile ? dimensions.width : Math.min(400, dimensions.width * 0.8);
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
  };

  // Interpolação das animações de rotação - conversão de valores 0-1 para graus
  const rotateCircle1 = circle1Anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  // Rotação inversa para o segundo círculo - cria movimento mais dinâmico
  const rotateCircle2 = circle2Anim.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0a0a0a"
        {...(Platform.OS === 'web' && { hidden: true })}
      />

      {/* Background Animado - apenas em dispositivos móveis para performance */}
      {/* Condição removida em desktop para evitar sobrecarga visual */}
      {!deviceType.isDesktop && (
        <>
          {/* Primeiro círculo - maior e mais lento, posicionado no topo */}
          <Animated.View style={[styles.backgroundCircle, styles.circle1, { transform: [{ rotate: rotateCircle1 }, { scale: pulseAnim }] }]} />
          {/* Segundo círculo - médio, rotação inversa */}
          <Animated.View style={[styles.backgroundCircle, styles.circle2, { transform: [{ rotate: rotateCircle2 }, { scale: pulseAnim }] }]} />
        </>
      )}

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContent,
          // Estilo específico para desktop - padding ajustado para telas maiores
          deviceType.isDesktop && styles.scrollContentDesktop
        ]}
      >
        <ResponsiveContainer>
        {/* Header - seção superior com saudação e perfil */}
        <View style={[styles.header, deviceType.isDesktop && styles.headerDesktop]}>
          <View style={styles.headerTop}>
            <View style={styles.greetingContainer}>
              {/* Saudação dinâmica - texto ajustado conforme horário */}
              <Text style={[styles.greeting, deviceType.isDesktop && styles.greetingDesktop]}>
                {greeting}, {user?.name || 'Usuário'}
              </Text>
              {/* Subtítulo fixo - identifica o tipo de aplicação */}
              <Text style={[styles.accountType, deviceType.isDesktop && styles.accountTypeDesktop]}>
                Controle de Acesso
              </Text>
            </View>
            {/* Botão de perfil/logout - posicionado à direita */}
            <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Ações Rápidas - botões principais de navegação */}
        <View style={[
          styles.quickActionsContainer,
          // Container ajustado para desktop com espaçamento maior
          deviceType.isDesktop && styles.quickActionsContainerDesktop
        ]}>
          {/* Scroll horizontal para ações - permite mais botões sem quebrar layout */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
            {quickActions.map((action) => (
              {/* Componente animado para cada botão - efeito de pressão */}
              <AnimatedQuickButton key={action.id} action={action} />
            ))}
          </ScrollView>
        </View>

        {/* Seção de Cartões de Serviço - estatísticas e informações */}
        <View style={styles.serviceCardsContainer}>
          <Text style={[
            styles.sectionTitle,
            // Título ajustado para desktop - fonte maior
            deviceType.isDesktop && styles.sectionTitleDesktop
          ]}>Estatísticas de Acesso</Text>
          {/* Grid de cartões - layout flexível para diferentes tamanhos de tela */}
          <View style={styles.serviceCardsGrid}>
            {serviceCards.map((card) => (
              {/* Cartão animado com gradiente e barra de progresso */}
              <AnimatedGradientCard key={card.id} card={card} />
            ))}
          </View>
        </View>

        {/* Carrossel de Recomendações - seção interativa com auto-scroll */}
        <View style={{ marginTop: 0 }}>
          <Text style={[
            styles.sectionTitle, 
            // Padding horizontal para alinhamento com outros elementos
            { paddingHorizontal: responsive.padding.md },
            deviceType.isDesktop && styles.sectionTitleDesktop
          ]}>Recomendações</Text>
          {/* ScrollView horizontal com paginação - carrossel principal */}
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
                style={{ 
                  // Largura ajustada por dispositivo - mobile: tela cheia, desktop: limitado
                  width: dimensions.isMobile ? dimensions.width : Math.min(400, dimensions.width * 0.8), 
                  borderRadius: 16, 
                  // Padding pequeno para espaçamento entre cards
                  padding: 5 
                }}
                activeOpacity={0.8}
                onPress={() => Alert.alert('Recomendação', `Você clicou em ${card.title}`)}
              >
                {/* Gradiente linear para cada card - cores consistentes com tema */}
                <LinearGradient
                  colors={[card.colors[0], card.colors[1]] as const}
                  // Altura fixa para consistência visual - 140px otimizado para conteúdo
                  style={{ flex: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', height: 140 }}
                >
                  {/* Título principal - fonte maior e peso bold */}
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{card.icon} {card.title}</Text>
                  {/* Subtítulo - fonte menor para hierarquia */}
                  <Text style={{ color: '#fff', fontSize: 14 }}>{card.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Indicadores de posição - bolinhas para mostrar card ativo */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {recommendedCards.map((_, idx) => (
              <View
                key={idx}
                style={{
                  // Tamanho pequeno (8x8) para indicadores discretos
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  // Cor dinâmica - branco para ativo, transparente para inativo
                  backgroundColor: activeIndex % recommendedCards.length === idx ? '#fff' : 'rgba(255,255,255,0.3)',
                  // Espaçamento horizontal entre indicadores
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente de Botão Rápido Animado - efeito de pressão com escala
const AnimatedQuickButton = ({ action }: { action: QuickAction }) => {
  // Valor inicial 1 (tamanho normal) para animação de escala
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Sequência de animação: reduz para 0.85 (15% menor) e volta ao normal
    // Duração rápida (100ms cada) para feedback imediato
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(action.onPress);
  };

  return (
    {/* Container animado com margem direita para espaçamento */}
    <Animated.View style={{ transform: [{ scale: scaleAnim }], marginRight: 12 }}>
      {/* Botão com cor dinâmica baseada na ação */}
      <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: action.color }]} onPress={handlePress} activeOpacity={0.8}>
        {/* Ícone grande para fácil identificação */}
        <Text style={styles.quickActionIcon}>{action.icon}</Text>
        {/* Título pequeno e centralizado */}
        <Text style={styles.quickActionTitle}>{action.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Componente de Cartão com Gradiente Animado - fade in e layout responsivo
const AnimatedGradientCard = ({ card }: { card: ServiceCard }) => {
  // Animação de fade - inicia invisível (0) para aparecer gradualmente
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const dimensions = useResponsive();
  // Largura responsiva - desktop: 23% (4 colunas), mobile: 48% (2 colunas)
  const cardWidth = dimensions.isDesktop ? '23%' : '48%';

  useEffect(() => {
    // Animação de entrada - fade in com duração de 700ms para suavidade
    Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  return (
    {/* Container animado com largura responsiva e margem inferior */}
    <Animated.View style={{ opacity: fadeAnim, width: cardWidth, marginBottom: 16, alignSelf: 'stretch' }}>
      {/* Gradiente linear com cores específicas do card */}
      <LinearGradient colors={[card.colors[0], card.colors[1]]} style={styles.serviceCard}>
        {/* Header do card - ícone e subtítulo alinhados */}
        <View style={styles.serviceCardHeader}>
          <Text style={styles.serviceCardIcon}>{card.icon}</Text>
          <Text style={styles.serviceCardSubtitle}>{card.subtitle}</Text>
        </View>
        {/* Título principal do card */}
        <Text style={styles.serviceCardTitle}>{card.title}</Text>
        {/* Barra de progresso condicional - apenas se progress estiver definido */}
        {card.progress !== undefined && (
          <View style={styles.progressContainer}>
            {/* Container da barra de progresso */}
            <View style={styles.progressBar}>
              {/* Preenchimento da barra baseado na porcentagem */}
              <View style={[styles.progressFill, { width: `${card.progress}%` }]} />
            </View>
            {/* Texto indicativo da porcentagem */}
            <Text style={styles.progressText}>{card.progress}% concluído</Text>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

// Estilos - configurações visuais com valores ajustados para responsividade
const styles: { [key: string]: ViewStyle | TextStyle } = {
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  scrollContent: { 
    // Padding inferior para espaço de scroll
    paddingBottom: responsive.padding.lg,
    // Altura mínima para web - garante tela cheia
    ...(Platform.OS === 'web' && { minHeight: screenHeight })
  },
  scrollContentDesktop: {
    // Remove padding horizontal em desktop - ResponsiveContainer já controla
    paddingHorizontal: 0,
  },

  // Círculos de fundo - posicionamento absoluto para não afetar layout
  backgroundCircle: { position: 'absolute' as const, borderRadius: 999, borderWidth: 2, borderColor: 'rgba(138,43,226,0.2)' },
  // Primeiro círculo - 120% da largura da tela, posicionado no topo
  circle1: { width: screenWidth * 1.2, height: screenWidth * 1.2, top: -screenWidth * 0.4, left: -screenWidth * 0.2 },
  // Segundo círculo - 90% da largura, posicionado na metade inferior
  circle2: { width: screenWidth * 0.9, height: screenWidth * 0.9, top: screenHeight * 0.5, right: -screenWidth * 0.3 },

  header: { 
    // Padding horizontal e vertical ajustados responsivamente
    paddingHorizontal: responsive.padding.md, 
    paddingTop: responsive.padding.sm, 
    paddingBottom: responsive.padding.md 
  },
  headerDesktop: {
    // Padding aumentado para desktop - mais espaço disponível
    paddingTop: responsive.padding.lg,
    paddingBottom: responsive.padding.xl,
  },
  // Layout flexível para header - espaço entre elementos
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' as const },
  greetingContainer: { flex: 1 },
  greeting: { 
    // Fonte grande e peso bold para destaque
    fontSize: responsive.fontSize.lg, 
    fontWeight: '700' as const, 
    color: '#fff' 
  },
  greetingDesktop: {
    // Fonte ainda maior em desktop
    fontSize: responsive.fontSize.xxl,
  },
  accountType: { 
    // Fonte menor e cor mais suave para subtítulo
    fontSize: responsive.fontSize.sm, 
    color: '#aaa' 
  },
  accountTypeDesktop: {
    // Fonte média em desktop para melhor legibilidade
    fontSize: responsive.fontSize.md,
  },
  // Botão de perfil - circular com fundo semi-transparente
  profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center' as const, alignItems: 'center' as const },
  profileIcon: { fontSize: 18 },

  quickActionsContainer: { 
    // Margem vertical para separação das seções
    marginVertical: responsive.spacing.lg 
  },
  quickActionsContainerDesktop: {
    // Margem aumentada em desktop
    marginVertical: responsive.spacing.xl,
  },
  quickActionsScroll: { 
    // Padding horizontal para espaçamento das bordas
    paddingHorizontal: responsive.padding.md,
    // Centralização em desktop com crescimento flexível
    ...(deviceType.isDesktop && {
      justifyContent: 'center',
      flexGrow: 1,
    })
  },
  // Botão de ação rápida - quadrado com bordas arredondadas e sombra
  quickActionButton: { width: 80, height: 80, borderRadius: 24, justifyContent: 'center' as const, alignItems: 'center' as const, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 8 },
  // Ícone grande para fácil toque
  quickActionIcon: { fontSize: 28, marginBottom: 6 },
  // Título pequeno, centralizado e peso médio
  quickActionTitle: { fontSize: 12, fontWeight: '600' as const, color: '#fff', textAlign: 'center' as const },

  serviceCardsContainer: { marginBottom: 1 },
  sectionTitle: { 
    // Fonte média com peso semi-bold
    fontSize: responsive.fontSize.md, 
    fontWeight: '600' as const, 
    color: '#fff', 
    // Padding e margem para espaçamento consistente
    paddingHorizontal: responsive.padding.md, 
    marginBottom: responsive.spacing.md 
  },
  sectionTitleDesktop: {
    // Fonte maior e margem aumentada em desktop
    fontSize: responsive.fontSize.lg,
    marginBottom: responsive.spacing.lg,
  },
  serviceCardsGrid: { 
    // Layout flexível com wrap para múltiplas linhas
    flexDirection: 'row', 
    flexWrap: 'wrap' as const, 
    // Espaço entre cards e alinhamento esticado
    justifyContent: 'space-between', 
    paddingHorizontal: responsive.padding.xs, 
    alignItems: 'stretch' as const 
  },

  // Card de serviço - bordas arredondadas, padding e sombra
  serviceCard: { borderRadius: 16, padding: 20, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, flex: 1, justifyContent: 'space-between' as const },
  // Header do card - layout horizontal com espaço entre elementos
  serviceCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' as const, marginBottom: 12 },
  serviceCardIcon: { fontSize: 24 },
  // Subtítulo pequeno com transparência
  serviceCardSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '500' as const },
  // Título principal - fonte média, peso bold e altura de linha ajustada
  serviceCardTitle: { fontSize: 16, fontWeight: '700' as const, color: '#fff', lineHeight: 22, marginBottom: 12 },
  progressContainer: { marginTop: 1 },
  // Barra de progresso - altura pequena com fundo transparente
  progressBar: { height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 4 },
  // Preenchimento da barra - altura total com cor sólida
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  // Texto do progresso - fonte pequena com transparência
  progressText: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '500' as const },
};
