// src/screens/Login/LoginScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	Animated,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	Easing,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { responsive, deviceType, useResponsive } from "../../utils/responsive";

import styles from "./styles/LoginScreen.styles";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailFocused, setEmailFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const { login, isLoading } = useAuth();
	const { theme } = useTheme();
	const dimensions = useResponsive();

	// Animações de entrada
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;
	const buttonScale = useRef(new Animated.Value(1)).current;
	const loadingRotation = useRef(new Animated.Value(0)).current;

	// Animações para MOVIMENTO dos círculos (funciona tanto no mobile quanto web)
	const circle1Anim = useRef(new Animated.Value(0)).current;
	const circle2Anim = useRef(new Animated.Value(0)).current;
	const circle3Anim = useRef(new Animated.Value(0)).current;
	// 🆕 NOVA ANIMAÇÃO para o círculo 4 (só web)
	const circle4Anim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Animação de entrada do formulário
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start();

		// Animações de MOVIMENTO para os círculos - FUNCIONA NO WEB TAMBÉM
		const startCircleAnimations = () => {
			// Círculo 1 - movimento vertical suave
			Animated.loop(
				Animated.sequence([
					Animated.timing(circle1Anim, {
						toValue: 1,
						duration: 8000, // ⚡ VELOCIDADE: Mais lento para web (8 segundos)
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle1Anim, {
						toValue: 0,
						duration: 8000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			// Círculo 2 - movimento horizontal suave
			Animated.loop(
				Animated.sequence([
					Animated.timing(circle2Anim, {
						toValue: 1,
						duration: 10000, // ⚡ VELOCIDADE: Mais lento para web (10 segundos)
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle2Anim, {
						toValue: 0,
						duration: 10000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			// Círculo 3 - movimento diagonal suave
			Animated.loop(
				Animated.sequence([
					Animated.timing(circle3Anim, {
						toValue: 1,
						duration: 9000, // ⚡ VELOCIDADE: Mais lento para web (9 segundos)
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle3Anim, {
						toValue: 0,
						duration: 9000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			// 🆕 Círculo 4 - movimento vertical (só no web)
			if (Platform.OS === 'web') {
				Animated.loop(
					Animated.sequence([
						Animated.timing(circle4Anim, {
							toValue: 1,
							duration: 7000, // ⚡ VELOCIDADE: 7 segundos
							easing: Easing.inOut(Easing.sin),
							useNativeDriver: true,
						}),
						Animated.timing(circle4Anim, {
							toValue: 0,
							duration: 7000,
							easing: Easing.inOut(Easing.sin),
							useNativeDriver: true,
						}),
					])
				).start();
			}
		};

		startCircleAnimations();
	}, [fadeAnim, slideAnim, scaleAnim, circle1Anim, circle2Anim, circle3Anim, circle4Anim]);

	useEffect(() => {
		if (isLoading) {
			const loadingAnimation = Animated.loop(
				Animated.timing(loadingRotation, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				})
			);
			loadingAnimation.start();
			return () => loadingAnimation.stop();
		}
	}, [isLoading]);

	// Interpolações para MOVIMENTO dos círculos - VALORES MAIORES PARA WEB
	const circle1TranslateY = circle1Anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -60], // 📍 MOVIMENTO: Distância maior para web (-60px)
	});

	const circle2TranslateX = circle2Anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 80], // 📍 MOVIMENTO: Distância maior para web (80px)
	});

	const circle3TranslateY = circle3Anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -40], // 📍 MOVIMENTO: Distância maior para web (-40px)
	});

	const circle3TranslateX = circle3Anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -30], // 📍 MOVIMENTO: Distância maior para web (-30px)
	});

	// 🆕 INTERPOLAÇÃO para o círculo 4 (só web)
	const circle4TranslateY = circle4Anim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -50], // 📍 MOVIMENTO: Vertical para cima (-50px)
	});

	const loadingRotationInterpolate = loadingRotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			setEmailError("Email é obrigatório");
			return false;
		}
		if (!emailRegex.test(email)) {
			setEmailError("Email inválido");
			return false;
		}
		setEmailError("");
		return true;
	};

	const validatePassword = (password: string) => {
		if (!password) {
			setPasswordError("Senha é obrigatória");
			return false;
		}
		if (password.length < 6) {
			setPasswordError("Senha deve ter pelo menos 6 caracteres");
			return false;
		}
		setPasswordError("");
		return true;
	};

	const handleLogin = async () => {
		const isEmailValid = validateEmail(email);
		const isPasswordValid = validatePassword(password);

		if (!isEmailValid || !isPasswordValid) return;

		Animated.sequence([
			Animated.timing(buttonScale, {
				toValue: 0.95,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(buttonScale, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();

		try {
			await login(email, password);
		} catch (error) {
			Alert.alert("Erro", "Falha no login. Tente novamente.");
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<StatusBar
				barStyle="light-content"
				backgroundColor={theme.background}
				{...(Platform.OS === "web" && { hidden: true })}
			/>

			<View style={styles.themeTogglePosition}>
				<ThemeToggle size={50} />
			</View>

			{/* Fundo animado com círculos em MOVIMENTO - AGORA FUNCIONA NO WEB TAMBÉM */}
			<View style={styles.backgroundContainer}>
				{/* 
          🎨 CÍRCULO 1 - Configurações web:
          - TAMANHO: 400x400 (definido no CSS web)
          - COR: rgba(138, 43, 226, 0.1) (definido no CSS web)
          - MOVIMENTO: Vertical suave
        */}
				<Animated.View
					style={[
						styles.circle1,
						{
							transform: [
								{ translateY: circle1TranslateY }
							]
						},
					]}
				/>

				{/* 
          🎨 CÍRCULO 2 - Configurações web:
          - TAMANHO: 600x600 (definido no CSS web)
          - COR: rgba(138, 43, 226, 0.05) (definido no CSS web)
          - MOVIMENTO: Horizontal suave
        */}
				<Animated.View
					style={[
						styles.circle2,
						{
							transform: [
								{ translateX: circle2TranslateX }
							]
						},
					]}
				/>

				{/* 
          🎨 CÍRCULO 3 - Configurações web:
          - TAMANHO: 300x300 (definido no CSS web)
          - COR: rgba(138, 43, 226, 0.08) (definido no CSS web)
          - MOVIMENTO: Diagonal suave
        */}
				<Animated.View
					style={[
						styles.circle3,
						{
							transform: [
								{ translateY: circle3TranslateY },
								{ translateX: circle3TranslateX }
							]
						},
					]}
				/>

				{/* 🆕 CÍRCULO 4 - SÓ APARECE NO WEB */}
				{Platform.OS === 'web' && (
					<Animated.View
						style={[
							styles.circle4,
							{
								transform: [
									{ translateY: circle4TranslateY }
								]
							},
						]}
					/>
				)}
			</View>

			<ResponsiveContainer maxWidth={deviceType.isDesktop ? 500 : undefined}>
				<Animated.View
					style={[
						styles.formContainer,
						{
							opacity: fadeAnim,
							transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
						},
					]}
				>
					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: theme.text }]}>Controle de Acesso</Text>
						<Text style={[styles.subtitle, { color: theme.textSecondary }]}>Faça login para continuar</Text>
					</View>

					{/* Formulário */}
					<View style={styles.form}>
						<View style={styles.inputContainer}>
							<Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Email</Text>
							<Animated.View
								style={[
									styles.inputWrapper,
									{ backgroundColor: theme.backgroundCard, borderColor: theme.border },
									emailFocused && styles.inputWrapperFocused,
									emailError && styles.inputWrapperError,
								]}
							>
								<TextInput
									style={[styles.input, { color: theme.text }, emailFocused && styles.inputFocused]}
									placeholder="Digite seu email"
									placeholderTextColor={theme.textTertiary}
									value={email}
									onChangeText={(text) => {
										setEmail(text);
										if (emailError) validateEmail(text);
									}}
									onFocus={() => setEmailFocused(true)}
									onBlur={() => {
										setEmailFocused(false);
										validateEmail(email);
									}}
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
								/>
							</Animated.View>
							{emailError ? (
								<Text style={styles.errorText}>{emailError}</Text>
							) : null}
						</View>

						<View style={styles.inputContainer}>
							<Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Senha</Text>
							<Animated.View
								style={[
									styles.inputWrapper,
									{ backgroundColor: theme.backgroundCard, borderColor: theme.border },
									passwordFocused && styles.inputWrapperFocused,
									passwordError && styles.inputWrapperError,
								]}
							>
								<TextInput
									style={[styles.input, { color: theme.text }, passwordFocused && styles.inputFocused]}
									placeholder="Digite sua senha"
									placeholderTextColor={theme.textTertiary}
									value={password}
									onChangeText={(text) => {
										setPassword(text);
										if (passwordError) validatePassword(text);
									}}
									onFocus={() => setPasswordFocused(true)}
									onBlur={() => {
										setPasswordFocused(false);
										validatePassword(password);
									}}
									secureTextEntry
								/>
							</Animated.View>
							{passwordError ? (
								<Text style={styles.errorText}>{passwordError}</Text>
							) : null}
						</View>

						{/* Botão */}
						<Animated.View style={{ transform: [{ scale: buttonScale }] }}>
							<TouchableOpacity
								style={[styles.loginButton, isLoading && styles.loginButtonLoading]}
								onPress={handleLogin}
								disabled={isLoading}
								activeOpacity={0.8}
							>
								{isLoading ? (
									<Animated.View
										style={[
											styles.loadingIcon,
											{ transform: [{ rotate: loadingRotationInterpolate }] },
										]}
									/>
								) : (
									<Text style={styles.loginButtonText}>Entrar</Text>
								)}
							</TouchableOpacity>
						</Animated.View>

						{/* Links */}
						<View style={styles.linksContainer}>
							<TouchableOpacity
								style={styles.linkButton}
								onPress={() =>
									Alert.alert("Info", "Funcionalidade em desenvolvimento")
								}
							>
								<Text style={styles.linkText}>Esqueci minha senha</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.linkButton}
								onPress={() =>
									Alert.alert("Info", "Funcionalidade em desenvolvimento")
								}
							>
								<Text style={styles.linkText}>Criar conta</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
			</ResponsiveContainer>
		</KeyboardAvoidingView>
	);
}