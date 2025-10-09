// src/components/MobileNavbar.tsx (versão simplificada)
import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Pressable,
	Dimensions,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { deviceType } from '../../utils/responsive';

interface MobileNavbarProps {
	visible?: boolean;
	onMenuToggle?: (isOpen: boolean) => void;
	onActionsPress?: () => void;
	onAddPress: () => void;
	onHomePress?: () => void;
	addButtonLabel?: string;
	searchPlaceholder?: string;
	searchText: string;
	onSearchChange: (text: string) => void;
	screenName: string;
	actionsLabel?: string;
	showHomeButton?: boolean;
	showSearchBar?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
	visible = true,
	onMenuToggle,
	onAddPress,
	onHomePress,
	addButtonLabel,
	searchPlaceholder,
	searchText,
	onSearchChange,
	screenName,
	onActionsPress,
	actionsLabel,
	showHomeButton = false,
	showSearchBar = true,
}) => {
	const { theme: appTheme } = useTheme();
	const slideAnim = useRef(new Animated.Value(visible ? 0 : -100)).current;
	const iconAnim = useRef(new Animated.Value(0)).current;
	const [isOpen, setIsOpen] = useState(false);

	const effectiveAddButtonLabel = addButtonLabel ?? '+';
	const effectiveSearchPlaceholder = searchPlaceholder ?? 'Buscar...';
	const effectiveActionsLabel = actionsLabel ?? '⚙️';


	const toggleMenu = () => {
		const newState = !isOpen;
		setIsOpen(newState);
		onMenuToggle?.(newState);
	};

	// Animação do container principal
	useEffect(() => {
		Animated.spring(slideAnim, {
			toValue: visible ? 0 : -100,
			damping: 20,
			stiffness: 90,
			useNativeDriver: true,
		}).start();
	}, [visible]);

	// Animação do botão do menu
	useEffect(() => {
		Animated.spring(iconAnim, {
			toValue: isOpen ? screenWidth * 0.75 : 0,
			damping: 20,
			stiffness: 90,
			useNativeDriver: true,
		}).start();
	}, [isOpen]);

	const styles = useMemo(() => StyleSheet.create({
		container: {
			backgroundColor: appTheme.backgroundCard,
			paddingTop: 50,
			paddingBottom: 0, // não afasta a borda
			shadowColor: appTheme.shadow,
			shadowOffset: { width: 0, height: 2 }, // reduzido para não sobrepor a borda
			shadowOpacity: 0.04,
			shadowRadius: 6,
			elevation: 2,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			// height: '2%',
		},
		leftSection: {
			flexDirection: 'row',
			alignItems: 'center',
			flex: 1,
		},
		rightSection: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			flex: 1,
			// height: 10,
			width: '100%',

		},
		searchInput: {
			width: 220,
			borderWidth: 1,
			borderRadius: 12,
			paddingHorizontal: 16,
			paddingVertical: 10,
			fontSize: 14,
			backgroundColor: appTheme.background,
			color: appTheme.text,
			borderColor: appTheme.borderLight,
			marginRight: 12,
		},
		addButton: {
			width: 65,
			height: 40,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			backgroundColor: appTheme.primary,
			shadowColor: appTheme.shadow,
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.12,
			shadowRadius: 8,
			elevation: 3,
			marginRight: 12,
		},
		addButtonText: {
			fontSize: 14,
			color: '#ffffff',
			fontWeight: '600',
		},
		toggleButton: {
			width: 44,
			height: 44,
			borderRadius: 12,
			borderWidth: 1,
			justifyContent: 'center',
			alignItems: 'center',
			elevation: 3,
			marginLeft: 20,
			backgroundColor: appTheme.backgroundCard,
			borderColor: appTheme.borderLight,
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
			backgroundColor: appTheme.text,
		},
		menuButtonWrapper: {
			justifyContent: 'center',
			alignItems: 'center',
		},
		actionBar: {
			backgroundColor: appTheme.backgroundCard,
			paddingHorizontal: 14,
			// paddingTop: 14,
			// paddingBottom: 10,
			shadowColor: appTheme.shadow,
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.06,
			shadowRadius: 10,
			elevation: 3,
		},
		actionButton: {
			width: 65,
			height: 40,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			backgroundColor: appTheme.background,
			borderWidth: 1,
			borderColor: appTheme.background,
			marginLeft: 16,
			shadowColor: appTheme.shadow,
			shadowOffset: { width: 0, height: 3 },
			shadowOpacity: 0.06,
			shadowRadius: 6,
			elevation: 2,
		},
		actionButtonText: {
			fontSize: 14,
			color: appTheme.text,
			fontWeight: '500',
		},
		screenName: {
			fontSize: 18,
			fontWeight: '600',
			color: appTheme.text,
		},
		homeButton: {
			width: 44,
			height: 40,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			backgroundColor: appTheme.background,
			borderWidth: 1,
			borderColor: appTheme.borderLight,
			marginRight: 12,
			shadowColor: appTheme.shadow,
			shadowOffset: { width: 0, height: 3 },
			shadowOpacity: 0.06,
			shadowRadius: 6,
			elevation: 2,
		},
		homeIcon: {
			fontSize: 20,
		},
		searchWrapper: {
			position: 'relative',
			flex: 1,
			marginRight: 12,
		},
		searchIcon: {
			position: 'absolute',
			left: 12,
			top: 12,
			fontSize: 14,
			color: appTheme.textSecondary,
			zIndex: 1,
		},
		searchInputWithIcon: {
			paddingLeft: 36,
		},
	}), [appTheme]);

	if (deviceType.isDesktop) return null;

	return (
		<Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]} >



			<View nativeID="div1" style={[styles.row, { paddingHorizontal: 12, height: 20 }]}>
				<Text style={[styles.screenName, { width: 100, textAlign: 'left', fontSize: 14 }]}>
					Entidade
				</Text>
				<TextInput
					style={[
						styles.searchInput,
						{
							width: 100,
							color: appTheme.text,
							backgroundColor: appTheme.background + '40',
							borderColor: appTheme.border,
							marginRight: 8,
							paddingVertical: 4,
							fontSize: 13,
						},
					]}
					placeholder="Buscar funcionalidades..."
					placeholderTextColor={appTheme.textTertiary}
					value={searchText}
					onChangeText={onSearchChange}
					submitBehavior="blurAndSubmit"
					returnKeyType="search"
				/>
				<TouchableOpacity
					style={[styles.addButton, { width: 40, height: 20, marginRight: 0 }]}
					onPress={onAddPress}
					activeOpacity={0.9}
				>
					<Text style={[styles.addButtonText, { fontSize: 13 }]}>{effectiveAddButtonLabel}</Text>
				</TouchableOpacity>
			</View>

		</Animated.View>
	);
};

export default MobileNavbar;