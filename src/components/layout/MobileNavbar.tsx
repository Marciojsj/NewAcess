// src/components/layout/MobileNavbar.tsx
import React, { useRef, useEffect, useMemo } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Dimensions,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { deviceType } from '../../utils/responsive';

interface MobileNavbarProps {
	visible?: boolean;
	onAddPress: () => void;
	addButtonLabel?: string;
	searchPlaceholder?: string;
	searchText: string;
	onSearchChange: (text: string) => void;
	screenName: string;
	showSearchBar?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
	visible = true,
	onAddPress,
	addButtonLabel = 'Teste de texto muito grande',
	searchPlaceholder = 'Buscar...',
	searchText,
	onSearchChange,
	screenName,
	showSearchBar = true,
}) => {
	const { theme: appTheme } = useTheme();
	const slideAnim = useRef(new Animated.Value(visible ? 0 : -100)).current;

	// Animação de entrada do navbar
	useEffect(() => {
		Animated.spring(slideAnim, {
			toValue: visible ? 0 : -100,
			damping: 20,
			stiffness: 90,
			useNativeDriver: true,
		}).start();
	}, [visible, slideAnim]);

	const styles = useMemo(
		() =>
			StyleSheet.create({
				// Container principal do navbar - POSICIONAMENTO ABSOLUTO PARA NÃO INTERFERIR NO SCROLL
				container: {
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					backgroundColor: appTheme.backgroundCard,
					paddingTop: 50,
					paddingBottom: 12,
					paddingHorizontal: 16,
					shadowColor: appTheme.shadow,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.08,
					shadowRadius: 8,
					elevation: 4,
					borderBottomWidth: 1,
					borderBottomColor: appTheme.borderLight + '20',
				},

				// LINHA 1: Título centralizado
				titleRow: {
					marginBottom: 27,
					alignItems: 'center',
					justifyContent: 'center',
				},
				screenTitle: {
					fontSize: 20,
					fontWeight: '700',
					color: appTheme.text,
					letterSpacing: 0.3,
					textAlign: 'center',
				},

				// LINHA 2: Actions (Busca + Botão)
				actionsRow: {
					flexDirection: 'row',
					alignItems: 'center',
					gap: 12,
				},

				// Seção de busca
				searchSection: {
					flex: 1,
				},
				searchInput: {
					height: 40,
					borderWidth: 1,
					borderRadius: 10,
					paddingHorizontal: 12,
					fontSize: 13,
					backgroundColor: appTheme.background + '60',
					color: appTheme.text,
					borderColor: appTheme.border + '40',
				},

				// Seção do botão adicionar
				actionSection: {
					flex: 0,
				},
				addButton: {
					minWidth: 44,
					height: 40,
					paddingHorizontal: 12,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
					backgroundColor: appTheme.primary,
					shadowColor: appTheme.shadow,
					shadowOffset: { width: 0, height: 3 },
					shadowOpacity: 0.15,
					shadowRadius: 6,
					elevation: 3,
				},
				addButtonText: {
					fontSize: 13,
					color: '#FFFFFF',
					fontWeight: '600',
					letterSpacing: 0.5,
				},
			}),
		[appTheme]
	);

	// Não renderiza em desktop
	if (deviceType.isDesktop) return null;

	return (
		<Animated.View
			style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
			pointerEvents="box-none"
			accessibilityRole="header"
			accessibilityLabel={`Barra de navegação - ${screenName}`}
		>
			<View pointerEvents="auto">
				{/* LINHA 1: Título do documento */}
				<View style={styles.titleRow}>
					<Text style={styles.screenTitle} numberOfLines={1}>
						{screenName}
					</Text>
				</View>

				{/* LINHA 2: Busca + Botão Adicionar */}
				<View style={styles.actionsRow}>
					{showSearchBar && (
						<View style={styles.searchSection}>
							<TextInput
								style={styles.searchInput}
								placeholder={searchPlaceholder}
								placeholderTextColor={appTheme.textTertiary}
								value={searchText}
								onChangeText={onSearchChange}
								returnKeyType="search"
								blurOnSubmit={true}
								accessibilityLabel="Campo de busca"
								accessibilityHint="Digite para buscar"
							/>
						</View>
					)}

					<View style={styles.actionSection}>
						<TouchableOpacity
							style={styles.addButton}
							onPress={onAddPress}
							activeOpacity={0.8}
							accessibilityLabel="Adicionar novo item"
							accessibilityRole="button"
						>
							<Text style={styles.addButtonText}>{addButtonLabel}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

export default MobileNavbar;