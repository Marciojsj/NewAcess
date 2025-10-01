// src/screens/Home/HomeScreen.tsx
import React, { useState, useRef } from 'react';
import {
	View,
	StatusBar,
	Platform,
	Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importação corrigida
import { useTheme } from '../../contexts/ThemeContext';
import { WebSidebar } from '../../components/WebSidebar';
import { MobileNavbar } from '../../components/MobileNavbar';
import { deviceType } from '../../utils/responsive';

export default function HomeScreen() {
	const { theme, isDark, toggleTheme } = useTheme();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const contentAnim = useRef(new Animated.Value(0)).current;

	const handleMenuToggle = (isOpen: boolean) => {
		// Animar o conteúdo principal quando o menu abrir/fechar
		Animated.spring(contentAnim, {
			toValue: isOpen ? 300 : 0,
			damping: 20,
			stiffness: 90,
			useNativeDriver: true,
		}).start();
	};

	const handleLogout = () => {
		console.log('Logout realizado');
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
			<StatusBar
				barStyle={isDark ? "light-content" : "dark-content"}
				backgroundColor={theme.background}
				{...(Platform.OS === 'web' && { hidden: true })}
			/>

			{/* Sidebar Web */}
			{deviceType.isDesktop && (
				<WebSidebar
					isOpen={sidebarOpen}
					onToggle={() => setSidebarOpen(!sidebarOpen)}
					theme={isDark ? 'dark' : 'light'}
					onThemeChange={toggleTheme}
					onLogout={handleLogout}
				/>
			)}

			{/* Conteúdo principal com animação */}
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: theme.background,
					transform: [{ translateX: contentAnim }]
				}}
			/>

			{/* Navbar Mobile */}
			<MobileNavbar
				visible={!deviceType.isDesktop}
				onMenuToggle={handleMenuToggle}
				onThemeChange={toggleTheme}
				onLogout={handleLogout}
			/>
		</SafeAreaView>
	);
}