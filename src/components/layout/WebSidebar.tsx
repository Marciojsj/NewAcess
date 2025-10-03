// src/components/WebSidebar.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Animated,
	Platform,
	StyleSheet,
	FlatList,
	Modal,
	Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { responsive, deviceType } from '../../utils/responsive';

type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	RegistrarEntrada: undefined;
	RegistrarSaida: undefined;
	Visitantes: undefined;
	Relatorios: undefined;
	Alertas: undefined;
	Entidade: undefined;
	RegistroEntidade: undefined;
};

type WebSidebarNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface SidebarAction {
	id: string;
	title: string;
	icon: string;
	onPress: () => void;
}

interface WebSidebarProps {
	isOpen: boolean;
	onToggle: () => void;
	theme?: 'light' | 'dark';
	onThemeChange?: (theme: 'light' | 'dark') => void;
	onLogout?: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({
	isOpen,
	onToggle,
	theme = 'dark',
	onThemeChange,
	onLogout
}) => {
	const { theme: appTheme, isDark, toggleTheme } = useTheme();
	const navigation = useNavigation<WebSidebarNavigationProp>();
	const slideAnim = useRef(new Animated.Value(-320)).current;
	const overlayAnim = useRef(new Animated.Value(0)).current;
	const iconAnim = useRef(new Animated.Value(0)).current;
	const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredActions, setFilteredActions] = useState<SidebarAction[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [logoutModalVisible, setLogoutModalVisible] = useState(false);
	const searchInputRef = useRef<TextInput>(null);
	const { user, logout } = useAuth();

	const sidebarActions: SidebarAction[] = [
		{ id: '1', title: 'Dashboard', icon: '📊', onPress: () => { navigation.navigate('Home'); onToggle(); } },
		{ id: '2', title: 'Registrar Entrada', icon: '🚪', onPress: () => { navigation.navigate('RegistrarEntrada'); onToggle(); } },
		{ id: '3', title: 'Registrar Saída', icon: '🏃‍♂️', onPress: () => { navigation.navigate('RegistrarSaida'); onToggle(); } },
		{ id: '4', title: 'Visitantes', icon: '👥', onPress: () => { navigation.navigate('Visitantes'); onToggle(); } },
		{ id: '5', title: 'Relatórios', icon: '📈', onPress: () => { navigation.navigate('Relatorios'); onToggle(); } },
		{ id: '6', title: 'Alertas', icon: '⚠️', onPress: () => { navigation.navigate('Alertas'); onToggle(); } },
		{ id: '7', title: 'Entidades', icon: '🏢', onPress: () => { navigation.navigate('Entidade'); onToggle(); } },
	];

	useEffect(() => {
		Animated.parallel([
			Animated.timing(slideAnim, { toValue: isOpen ? 0 : -320, duration: 400, useNativeDriver: true }),
			Animated.timing(overlayAnim, { toValue: isOpen ? 1 : 0, duration: 300, useNativeDriver: true }),
			Animated.timing(iconAnim, { toValue: isOpen ? 320 : 0, duration: 400, useNativeDriver: true }),
		]).start();

		if (isOpen && Platform.OS === 'web') {
			setTimeout(() => searchInputRef.current?.focus(), 400);
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

	const renderSearchResult = ({ item, index }: { item: SidebarAction; index: number }) => (
		<SidebarButton action={item} theme={currentTheme} isSelected={index === selectedIndex} />
	);

	if (!deviceType.isDesktop && Platform.OS !== 'web') return null;

	return (
		<>
			{isOpen && (
				<Animated.View style={[styles.overlay, { opacity: overlayAnim }]}>
					<Pressable style={styles.overlayTouchable} onPress={onToggle} />
				</Animated.View>
			)}

			<Animated.View
				style={[
					styles.sidebar,
					{
						transform: [{ translateX: slideAnim }],
						backgroundColor: currentTheme === 'dark' ? appTheme.backgroundSecondary : appTheme.backgroundCard,
					},
				]}
			>
				{/* HEADER */}
				<View style={styles.header}>
					<Text style={[styles.userName, { color: appTheme.text }]}>
						{user?.name || 'Admin User'}
					</Text>
					<Text style={[styles.userRole, { color: appTheme.textTertiary }]}>
						Administrador
					</Text>
				</View>

				{/* SEARCH */}
				<View style={styles.searchWrapper}>
					<TextInput
						ref={searchInputRef}
						style={[styles.searchInput, {
							color: appTheme.text,
							backgroundColor: appTheme.background + '40',
							borderColor: appTheme.border
						}]}
						placeholder="Buscar funcionalidades..."
						placeholderTextColor={appTheme.textTertiary}
						value={searchQuery}
						onChangeText={setSearchQuery}
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
						onPress={() => {
							toggleTheme();
							setCurrentTheme(isDark ? 'light' : 'dark');
							onThemeChange?.(isDark ? 'light' : 'dark');
						}}
					/>
					<HoverableButton
						label="🚪 Logout"
						color={appTheme.error}
						onPress={() => setLogoutModalVisible(true)}
					/>
				</View>
			</Animated.View>

			{/* TOGGLE BUTTON */}
			<Animated.View style={[styles.toggleButtonWrapper, { transform: [{ translateX: iconAnim }] }]}>
				<Pressable
					style={[styles.toggleButton, { backgroundColor: appTheme.backgroundCard, borderColor: appTheme.borderLight }]}
					onPress={onToggle}
				>
					<View style={styles.toggleIconContainer}>
						<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
						<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
						<View style={[styles.toggleLine, { backgroundColor: appTheme.text }]} />
					</View>
				</Pressable>
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
								onPress={() => {
									setLogoutModalVisible(false);
									logout();
									onLogout?.();
								}}
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

/* === COMPONENTES === */
const SidebarButton: React.FC<{ action: SidebarAction; theme: 'light' | 'dark'; isSelected?: boolean }> = ({
	action, isSelected = false,
}) => {
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
					// CORREÇÃO: Para web, podemos usar boxShadow condicional
					...(Platform.OS === 'web' && {
						boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)' as any,
					}),
					// Para mobile, usamos elevation
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
	isCircle?: boolean;
	customStyle?: any;
	renderContent?: () => React.ReactNode;
}> = ({ label, color, onPress, isCircle = false, customStyle, renderContent }) => {
	const { theme: appTheme } = useTheme();
	const [hovered, setHovered] = useState(false);

	return (
		<Pressable
			onPress={onPress}
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
			style={[
				isCircle ? {} : styles.footerButton,
				customStyle,
				{
					borderColor: appTheme.borderLight,
					borderWidth: 1,
					backgroundColor: appTheme.background + '20',
					// CORREÇÃO: Para web, boxShadow condicional
					...(Platform.OS === 'web' && {
						boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)' as any,
					}),
					// Para mobile, elevation
					elevation: hovered ? 4 : 1,
				},
				hovered && {
					transform: [{ translateY: -2 }],
					backgroundColor: appTheme.primary + '20',
				},
			]}
		>
			{renderContent ? renderContent() : (
				<Text style={[styles.footerButtonText, { color }]}>{label}</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'fixed' as any,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	overlayTouchable: { flex: 1 },
	sidebar: {
		position: "fixed" as any,
		top: 0,
		left: 0,
		bottom: 0,
		width: 280,
		paddingTop: 32,
		zIndex: 999,
		// CORREÇÃO: Para web, usar boxShadow
		...(Platform.OS === 'web' && {
			boxShadow: '2px 0 10px rgba(0,0,0,0.3)' as any,
		}),
		// Para mobile, elevation
		elevation: 10,
	},
	header: { paddingHorizontal: 20, marginBottom: 20 },
	userName: { fontSize: 16, fontWeight: '600' },
	userRole: { fontSize: 13, fontWeight: '400', marginTop: 2 },
	searchWrapper: {
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	searchInput: {
		borderRadius: 8,
		padding: 10,
		fontSize: 14,
		borderWidth: 1,
	},
	actionsContainer: { flex: 1, paddingHorizontal: 8 },
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
	actionIconText: { fontSize: 18 },
	actionTitle: { fontSize: 15, fontWeight: '500', flex: 1 },
	chevronText: { fontSize: 18, fontWeight: '600', opacity: 0.5 },
	toggleButtonWrapper: { position: "fixed" as any, top: 16, left: 20, zIndex: 1000 },
	toggleButton: {
		width: 44,
		height: 44,
		borderRadius: 12,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// CORREÇÃO: Para web, boxShadow
		...(Platform.OS === 'web' && {
			boxShadow: '0 2px 8px rgba(0,0,0,0.15)' as any,
		}),
		// Para mobile, elevation
		elevation: 3,
	},
	toggleIconContainer: { width: 20, height: 16, justifyContent: 'space-between' },
	toggleLine: { height: 2, borderRadius: 1, width: '100%' },
	footer: { paddingHorizontal: 20, paddingBottom: 20 },
	footerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginBottom: 8,
	},
	footerButtonText: { fontSize: 14 },
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContent: {
		width: 280,
		borderRadius: 8,
		padding: 20,
		// CORREÇÃO: Para web, boxShadow
		...(Platform.OS === 'web' && {
			boxShadow: '0 4px 20px rgba(0,0,0,0.3)' as any,
		}),
		// Para mobile, elevation
		elevation: 8,
	},
	modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20 },
	modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
	modalButton: {
		flex: 1,
		padding: 10,
		borderRadius: 8,
		marginHorizontal: 5,
		alignItems: 'center'
	},
	modalButtonText: { fontSize: 14, fontWeight: '500' },
});