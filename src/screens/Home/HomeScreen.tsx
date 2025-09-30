// src/screens/Home/HomeScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles/HomeScreen.styles";

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
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { WebSidebar } from '../../components/WebSidebar';
import { MobileFooter } from '../../components/MobileFooter';
import { responsive, deviceType, useResponsive } from '../../utils/responsive';

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
	const { theme } = useTheme();
	const navigation = useNavigation<HomeScreenNavigationProp>();
	const [greeting, setGreeting] = useState('');
	const dimensions = useResponsive();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);

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
		setMenuVisible(false);
		console.log('handleLogout chamado');

		if (Platform.OS === 'web' || deviceType.isDesktop) {
			console.log('Estamos no Web');
			const confirmLogout = window.confirm('Deseja realmente sair?');
			if (confirmLogout) {
				logout();
				console.log('Logout confirmado no Web');
			} else {
				console.log('Logout cancelado no Web');
			}
		} else {
			console.log('Estamos no Mobile');
			Alert.alert('Sair', 'Deseja realmente sair?', [
				{ text: 'Cancelar', style: 'cancel' },
				{ text: 'Sair', style: 'destructive', onPress: logout },
			]);
		}
	};

	const quickActionsMobile: QuickAction[] = [
		{ id: '1', title: 'Registrar Entrada', icon: '🚪', color: '#8a2be2', onPress: () => navigation.navigate('RegistrarEntrada') },
		{ id: '2', title: 'Registrar Saída', icon: '🏃‍♂️', color: '#00b894', onPress: () => navigation.navigate('RegistrarSaida') },
		{ id: '3', title: 'Visitantes', icon: '🧑‍🤝‍🧑', color: '#6c5ce7', onPress: () => navigation.navigate('Visitantes') },
		{ id: '4', title: 'Alertas', icon: '⚠️', color: '#e17055', onPress: () => Alert.alert('Alertas', 'Funcionalidade em desenvolvimento') },
		{ id: '5', title: 'Relatórios', icon: '📊', color: '#fdcb6e', onPress: () => navigation.navigate('Relatorios') },
	];

	const quickActionsWeb: QuickAction[] = [
		{ id: '1', title: 'Entrada', icon: '🚪', color: '#8a2be2', onPress: () => navigation.navigate('RegistrarEntrada') },
		{ id: '2', title: 'Saída', icon: '🏃‍♂️', color: '#00b894', onPress: () => navigation.navigate('RegistrarSaida') },
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

	const recommendedCards: ServiceCard[] = [
		{ id: 'r1', title: 'Registrar Entrada', subtitle: 'Mais usado hoje', icon: '🚪', colors: ['#8a2be2', '#da70d6'] },
		{ id: 'r2', title: 'Registrar Saída', subtitle: 'Últimos acessos', icon: '🏃‍♂️', colors: ['#00b894', '#00ffe0'] },
		{ id: 'r3', title: 'Visitantes', subtitle: 'Pendentes', icon: '🧑‍🤝‍🧑', colors: ['#6c5ce7', '#a29bfe'] },
	];

	const loopCards = [...recommendedCards, ...recommendedCards];
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollRef = useRef<ScrollView>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			let nextIndex = activeIndex + 1;
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
		const cardWidth = dimensions.isMobile ? dimensions.width : Math.min(400, dimensions.width * 0.8);
		const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
		setActiveIndex(index);
	};

	const rotateCircle1 = circle1Anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
	const rotateCircle2 = circle2Anim.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
			<StatusBar
				barStyle="light-content"
				backgroundColor={theme.background}
				{...(Platform.OS === 'web' && { hidden: true })}
			/>

			{!deviceType.isDesktop && (
				<>
					<Animated.View style={[styles.backgroundCircle, styles.circle1, { transform: [{ rotate: rotateCircle1 }, { scale: pulseAnim }] }]} />
					<Animated.View style={[styles.backgroundCircle, styles.circle2, { transform: [{ rotate: rotateCircle2 }, { scale: pulseAnim }] }]} />
				</>
			)}

			{deviceType.isDesktop && (
				<WebSidebar
					isOpen={sidebarOpen}
					onToggle={() => setSidebarOpen(!sidebarOpen)}
				/>
			)}

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.scrollContent,
					deviceType.isDesktop && styles.scrollContentDesktop
				]}
			>
				<ResponsiveContainer>
					<View style={[styles.header, deviceType.isDesktop && styles.headerDesktop]}>
						<View style={styles.headerTop}>
							<View style={styles.greetingContainer}>
								<Text style={[styles.greeting, { color: theme.text }, deviceType.isDesktop && styles.greetingDesktop]}>
									{greeting}, {user?.name || 'Usuário'}
								</Text>
								<Text style={[styles.accountType, { color: theme.textSecondary }, deviceType.isDesktop && styles.accountTypeDesktop]}>
									Controle de Acesso
								</Text>
							</View>
							<TouchableOpacity
								style={[styles.profileButton, { backgroundColor: theme.border }]}
								onPress={() => setMenuVisible(true)}
							>
								<Text style={styles.profileIcon}>👤</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Botões Mobile */}
					{dimensions.isMobile && (
						<View style={styles.quickActionsContainer}>
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
								{quickActionsMobile.map((action) => (
									<AnimatedQuickButton key={action.id} action={action} />
								))}
							</ScrollView>
						</View>
					)}

					{/* Botões Web/Desktop */}
					{dimensions.isDesktop && (
						<View style={[styles.quickActionsContainerDesktop, { flexDirection: 'row', justifyContent: 'center' }]}>
							{quickActionsWeb.map((action) => (
								<AnimatedQuickButton key={action.id} action={action} />
							))}
						</View>
					)}

					<View style={styles.serviceCardsContainer}>
						<Text style={[styles.sectionTitle, { color: theme.text }, deviceType.isDesktop && styles.sectionTitleDesktop]}>Estatísticas de Acesso</Text>
						<View style={styles.serviceCardsGrid}>
							{serviceCards.map((card) => (
								<AnimatedGradientCard key={card.id} card={card} />
							))}
						</View>
					</View>

					<View style={{ marginTop: 0 }}>
						<Text style={[styles.sectionTitle, { paddingHorizontal: responsive.padding.md, color: theme.text }, deviceType.isDesktop && styles.sectionTitleDesktop]}>Recomendações</Text>
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
										width: dimensions.isMobile ? dimensions.width : Math.min(400, dimensions.width * 0.8),
										borderRadius: 16,
										padding: 5
									}}
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

				</ResponsiveContainer>
			</ScrollView>

			<MobileFooter visible={!deviceType.isDesktop} />

			<Modal
				animationType="fade"
				transparent={true}
				visible={menuVisible}
				onRequestClose={() => setMenuVisible(false)}
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setMenuVisible(false)}
				>
					<View style={[styles.modalContent, { backgroundColor: theme.backgroundCard }]}>
						<View style={styles.modalHeader}>
							<Text style={[styles.modalTitle, { color: theme.text }]}>Configurações</Text>
							<TouchableOpacity onPress={() => setMenuVisible(false)}>
								<Text style={[styles.modalClose, { color: theme.textSecondary }]}>✕</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.modalSection}>
							<Text style={[styles.modalSectionTitle, { color: theme.textSecondary }]}>Aparência</Text>
							<View style={styles.themeToggleContainer}>
								<Text style={[styles.themeToggleLabel, { color: theme.text }]}>Tema Escuro</Text>
								<ThemeToggle size={54} />
							</View>
						</View>

						<View style={[styles.modalDivider, { backgroundColor: theme.border }]} />

						<TouchableOpacity
							style={[styles.logoutButton, { backgroundColor: theme.error }]}
							onPress={handleLogout}
						>
							<Text style={styles.logoutButtonText}>Sair</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>
		</SafeAreaView>
	);
}

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
			<TouchableOpacity
				style={[styles.quickActionButton, { backgroundColor: action.color }]}
				onPress={handlePress}
				activeOpacity={0.8}
			>
				<Text style={styles.quickActionIcon}>{action.icon}</Text>
				<Text style={styles.quickActionTitle}>{action.title}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const AnimatedGradientCard = ({ card }: { card: ServiceCard }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const dimensions = useResponsive();
	const cardWidth = dimensions.isDesktop ? '23%' : '48%';

	useEffect(() => {
		Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
	}, []);

	return (
		<Animated.View style={{ opacity: fadeAnim, width: cardWidth, marginBottom: 16, alignSelf: 'stretch' }}>
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

// ❌ REMOVA ESTA PARTE - os estilos já estão sendo importados