// src/components/MobilesSidebar.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Animated,
	Modal,
	Pressable,
	FlatList,
	StyleSheet,
	Dimensions,
	Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { responsive, deviceType } from '../../utils/responsive';

type RootStackParamList = {
	Home: undefined;
	RegistrarEntrada: undefined;
	RegistrarSaida: undefined;
	Visitantes: undefined;
	Relatorios: undefined;
	Alertas: undefined;
	Entidade: undefined;
	RegistroEntidade: undefined;
};

type MobileSidebarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarAction {
	id: string;
	title: string;
	icon: string;
	onPress: () => void;
}

interface MobileSidebarProps {
	visible?: boolean;
	isOpen?: boolean;
	onToggle?: () => void;
	onMenuToggle?: (isOpen: boolean) => void;
	theme?: 'light' | 'dark';
	onThemeChange?: (theme?: 'light' | 'dark') => void;
	onLogout?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
	visible = true,
	isOpen: externalIsOpen = false,
	onToggle,
	onMenuToggle,
	theme: externalTheme,
	onThemeChange,
	onLogout
}) => {
	const { theme: appTheme, isDark, toggleTheme } = useTheme();
	const navigation = useNavigation<MobileSidebarNavigationProp>();
	const slideAnim = useRef(new Animated.Value(visible ? 0 : -100)).current;
	const menuAnim = useRef(new Animated.Value(-300)).current;
	const contentAnim = useRef(new Animated.Value(0)).current;
	const iconAnim = useRef(new Animated.Value(0)).current;
	const [isOpen, setIsOpen] = useState(externalIsOpen);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredActions, setFilteredActions] = useState<SidebarAction[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [logoutModalVisible, setLogoutModalVisible] = useState(false);
	const { user, logout } = useAuth();

	const sidebarActions: SidebarAction[] = [
		{ id: '1', title: 'Dashboard', icon: '📊', onPress: () => { navigation.navigate('Home'); closeMenu(); } },
		{ id: '2', title: 'Registrar Entrada', icon: '🚪', onPress: () => { navigation.navigate('RegistrarEntrada'); closeMenu(); } },
		{ id: '3', title: 'Registrar Saída', icon: '🏃‍♂️', onPress: () => { navigation.navigate('RegistrarSaida'); closeMenu(); } },
		{ id: '4', title: 'Visitantes', icon: '👥', onPress: () => { navigation.navigate('Visitantes'); closeMenu(); } },
		{ id: '5', title: 'Relatórios', icon: '📈', onPress: () => { navigation.navigate('Relatorios'); closeMenu(); } },
		{ id: '6', title: 'Alertas', icon: '⚠️', onPress: () => { navigation.navigate('Alertas'); closeMenu(); } },
		{ id: '7', title: 'Entidades', icon: '🏢', onPress: () => { navigation.navigate('Entidade'); closeMenu(); } },
	];

	// Sincronizar isOpen externo com interno
	useEffect(() => {
		setIsOpen(externalIsOpen);
	}, [externalIsOpen]);

	// Controle do menu
	const toggleMenu = () => {
		const newState = !isOpen;
		setIsOpen(newState);
		onMenuToggle?.(newState);
		onToggle?.();
	};

	const closeMenu = () => {
		setIsOpen(false);
		setSearchQuery('');
		Keyboard.dismiss(); // Fecha o teclado
		onMenuToggle?.(false);
		onToggle?.();
	};

	// Animação do container principal (navbar)
	useEffect(() => {
		Animated.spring(slideAnim, {
			toValue: visible ? 0 : -100,
			damping: 20,
			stiffness: 90,
			useNativeDriver: true,
		}).start();
	}, [visible]);

	// Animação do menu lateral
	useEffect(() => {
		if (isOpen) {
			Animated.parallel([
				Animated.spring(menuAnim, {
					toValue: 0,
					damping: 20,
					stiffness: 90,
					useNativeDriver: true,
				}),
				Animated.spring(iconAnim, {
					toValue: screenWidth * 0.75,
					damping: 20,
					stiffness: 90,
					useNativeDriver: true,
				})
			]).start();
		} else {
			Animated.parallel([
				Animated.spring(menuAnim, {
					toValue: -300,
					damping: 20,
					stiffness: 90,
					useNativeDriver: true,
				}),
				Animated.spring(iconAnim, {
					toValue: 0,
					damping: 20,
					stiffness: 90,
					useNativeDriver: true,
				})
			]).start();
			Keyboard.dismiss(); // Fecha o teclado quando o menu fecha
		}
	}, [isOpen]);

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredActions(sidebarActions);
			setSelectedIndex(-1);
		} else {
			const query = searchQuery.toLowerCase();
			setFilteredActions(sidebarActions.filter(item => item.title.toLowerCase().includes(query)));
		}
	}, [searchQuery]);

	const handleThemeToggle = () => {
		toggleTheme();
		onThemeChange?.(isDark ? 'light' : 'dark');
	};

	const handleLogout = () => {
		setLogoutModalVisible(false);
		logout();
		onLogout?.();
		closeMenu();
	};

	const handleOverlayPress = () => {
		Keyboard.dismiss(); // Fecha o teclado ao clicar no overlay
		closeMenu();
	};

	const renderSearchResult = ({ item, index }: { item: SidebarAction; index: number }) => (
		<SidebarButton 
			action={item} 
			theme={isDark ? 'dark' : 'light'} 
			isSelected={index === selectedIndex} 
		/>
	);

	if (deviceType.isDesktop) return null;

	return (
		<>
			{/* NAVBAR PRINCIPAL */}
			<Animated.View
				style={[
					styles.container,
					{
						transform: [{ translateY: slideAnim }],

					},
				]}
			>
				{/* BOTÃO TOGGLE COM ANIMAÇÃO */}
				<Animated.View
					style={[
						styles.menuButtonWrapper,
						{
							transform: [{ translateX: iconAnim }],
						}
					]}
				>
					<Pressable
						style={[styles.toggleButton, { 
							backgroundColor: appTheme.backgroundCard, 
							borderColor: appTheme.borderLight 
						}]}
						onPress={toggleMenu}
					>
						<View style={styles.toggleIconContainer}>
							<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
							<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
							<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
						</View>
					</Pressable>
				</Animated.View>
			</Animated.View>

			{/* OVERLAY PARA FECHAR AO CLICAR FORA */}
			{isOpen && (
				<Pressable 
					style={styles.overlay} 
					onPress={handleOverlayPress} // Usa a função que fecha o teclado
				/>
			)}

			{/* MENU LATERAL */}
			<Animated.View
				style={[
					styles.sidebar,
					{
						transform: [{ translateX: menuAnim }],
						backgroundColor: isDark ? appTheme.backgroundSecondary : appTheme.backgroundCard,
					},
				]}
			>
				{/* HEADER */}
				<View style={styles.header}>
					<Text style={[styles.userName, { color: appTheme.text }]}>
						{user?.name || 'Admin User'}
					</Text>
					<Text style={[styles.userRole, { color: appTheme.textTertiary }]}>
						Administrador fodao
					</Text>
				</View>

				{/* SEARCH */}
				<View style={styles.searchWrapper}>
					<TextInput
						style={[styles.searchInput, { 
							color: appTheme.text, 
							backgroundColor: 'red' + '40',
							borderColor: appTheme.border 
						}]}
						placeholder="Buscar funcionalidades..."
						placeholderTextColor={appTheme.textTertiary}
						value={searchQuery}
						onChangeText={setSearchQuery}
						blurOnSubmit={true}
						returnKeyType="search"
					/>
				</View>

				{/* ACTIONS */}
				<View style={styles.actionsContainer}>
					<FlatList
						data={filteredActions}
						renderItem={renderSearchResult}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
					/>
				</View>

				{/* FOOTER */}
				<View style={styles.footer}>
					<HoverableButton
						label={isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
						color={appTheme.text}
						onPress={handleThemeToggle}
					/>
					<HoverableButton
						label="🚪 Logout"
						color={appTheme.error}
						onPress={() => setLogoutModalVisible(true)}
					/>
				</View>
			</Animated.View>

			{/* LOGOUT MODAL */}
			<Modal visible={logoutModalVisible} transparent animationType="fade" onRequestClose={() => setLogoutModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<View style={[styles.modalContent, { backgroundColor: appTheme.backgroundCard }]}>
						<Text style={[styles.modalTitle, { color: appTheme.text }]}>
							Deseja realmente sair?
						</Text>
						<View style={styles.modalActions}>
							<Pressable
								style={[styles.modalButton, { backgroundColor: appTheme.primary }]}
								onPress={handleLogout}
							>
								<Text style={[styles.modalButtonText, { color: '#fff' }]}>Sim</Text>
							</Pressable>
							<Pressable
								style={[styles.modalButton, { backgroundColor: appTheme.backgroundSecondary }]}
								onPress={() => setLogoutModalVisible(false)}
							>
								<Text style={[styles.modalButtonText, { color: appTheme.text }]}>Cancelar</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

/* === COMPONENTES REUTILIZADOS === */
const SidebarButton: React.FC<{ 
	action: SidebarAction; 
	theme: 'light' | 'dark'; 
	isSelected?: boolean 
}> = ({ action, isSelected = false }) => {
	const { theme: appTheme } = useTheme();
	const [hovered, setHovered] = useState(false);

	return (
		<Pressable
			onPress={action.onPress}
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
			style={[
				styles.actionButton,
				{
					backgroundColor: hovered || isSelected ? appTheme.primary + '20' : appTheme.background + '20',
					borderColor: hovered || isSelected ? appTheme.primary + '40' : appTheme.borderLight,
					transform: hovered ? [{ translateY: -2 }] : [],
					// CORREÇÃO: Removidas as shadow props e usando apenas elevation
					elevation: hovered ? 4 : 1,
				},
			]}
		>
			<View style={[styles.actionIcon, { 
				borderColor: isSelected ? appTheme.primary : appTheme.border,
				backgroundColor: hovered || isSelected ? appTheme.primary + '10' : 'transparent',
			}]}>
				<Text style={styles.actionIconText}>{action.icon}</Text>
			</View>
			<Text style={[styles.actionTitle, { color: appTheme.text }]}>{action.title}</Text>
			<Text style={[styles.chevronText, { color: appTheme.textTertiary }]}>›</Text>
		</Pressable>
	);
};

const HoverableButton: React.FC<{
	label: string;
	color: string;
	onPress: () => void;
}> = ({ label, color, onPress }) => {
	const { theme: appTheme } = useTheme();
	const [hovered, setHovered] = useState(false);

	return (
		<Pressable
			onPress={onPress}
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
			style={[
				styles.footerButton,
				{
					borderColor: appTheme.borderLight,
					borderWidth: 1,
					backgroundColor: appTheme.background + '20',
					// CORREÇÃO: Removidas as shadow props e usando apenas elevation
					elevation: hovered ? 4 : 1,
				},
				hovered && {
					transform: [{ translateY: -2 }],
					backgroundColor: appTheme.primary + '20',
				},
			]}
		>
			<Text style={[styles.footerButtonText, { color }]}>{label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		paddingTop: 50,
		paddingBottom: 10,
		zIndex: 1000,
	},
	menuButtonWrapper: {
		// A posição é controlada pela animação iconAnim
	},
	toggleButton: {
		width: 44,
		height: 44,
		borderRadius: 12,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// CORREÇÃO: Removidas shadow props e usando elevation
		elevation: 3,
		marginLeft: 20,
	},
	toggleIconContainer: {
		width: 20,
		height: 16,
		justifyContent: 'space-between',
	},
	toggleLine: {
		height: 2,
		borderRadius: 1,
		width: '100%',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: 999,
	},
	sidebar: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 280,
		zIndex: 1001,
		paddingTop: 80,
		// CORREÇÃO: Removidas shadow props e usando elevation
		elevation: 10,
	},
	contentContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'transparent',
		zIndex: 998,
	},
	header: { 
		paddingHorizontal: 20, 
		marginBottom: 20 
	},
	userName: { 
		fontSize: 16, 
		fontWeight: '600' 
	},
	userRole: { 
		fontSize: 13, 
		fontWeight: '400', 
		marginTop: 2 
	},
	searchWrapper: { 
		paddingHorizontal: 20, 
		marginBottom: 10 
	},
	searchInput: { 
		borderRadius: 8, 
		padding: 12, 
		fontSize: 14,
		borderWidth: 1,
	},
	actionsContainer: { 
		flex: 1, 
		paddingHorizontal: 8 
	},
	actionButton: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		paddingVertical: 12, 
		paddingHorizontal: 12, 
		borderRadius: 10, 
		marginBottom: 4,
		borderWidth: 1,
	},
	actionIcon: { 
		width: 36, 
		height: 36, 
		borderRadius: 18, 
		justifyContent: 'center', 
		alignItems: 'center', 
		marginRight: 12, 
		borderWidth: 1 
	},
	actionIconText: { 
		fontSize: 18 
	},
	actionTitle: { 
		fontSize: 15, 
		fontWeight: '500', 
		flex: 1 
	},
	chevronText: { 
		fontSize: 18, 
		fontWeight: '600', 
		opacity: 0.5 
	},
	footer: { 
		paddingHorizontal: 20, 
		paddingBottom: 30,
		paddingTop: 20,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.1)',
	},
	footerButton: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		paddingVertical: 12, 
		paddingHorizontal: 12, 
		borderRadius: 8, 
		marginBottom: 8 
	},
	footerButtonText: { 
		fontSize: 14,
		fontWeight: '500',
	},
	modalOverlay: { 
		flex: 1, 
		backgroundColor: 'rgba(0,0,0,0.4)', 
		justifyContent: 'center', 
		alignItems: 'center' 
	},
	modalContent: { 
		width: 280, 
		borderRadius: 12, 
		padding: 20,
		margin: 20,
	},
	modalTitle: { 
		fontSize: 16, 
		fontWeight: '600', 
		marginBottom: 20,
		textAlign: 'center',
	},
	modalActions: { 
		flexDirection: 'row', 
		justifyContent: 'space-between',
		gap: 12,
	},
	modalButton: { 
		flex: 1, 
		padding: 12, 
		borderRadius: 8, 
		alignItems: 'center' 
	},
	modalButtonText: { 
		fontSize: 14, 
		fontWeight: '600' 
	},
});